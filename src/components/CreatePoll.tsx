import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Calendar } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

interface CreatePollProps {
  address: string;
  onPollCreated?: (pollData: {title: string, description: string, options: string[], duration: string}) => void;
}

export const CreatePoll = ({ address, onPollCreated }: CreatePollProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreatePoll = async () => {
    setIsCreating(true);
    setError(null);
    try {
      // 1. Create the poll
      const { data: poll, error: pollError } = await supabase
        .from('polls')
        .insert([{
          title,
          description,
          created_by: address,
          duration
        }])
        .select()
        .single();
      if (pollError) throw pollError;
      // 2. Add options
      const filteredOptions = options.filter(opt => opt.trim());
      const { error: optionsError } = await supabase
        .from('options')
        .insert(filteredOptions.map(text => ({
          poll_id: poll.id,
          text
        })));
      if (optionsError) throw optionsError;
      // 3. Callback and reset
      if (onPollCreated) {
        onPollCreated({ title, description, options: filteredOptions, duration });
      }
      setTitle("");
      setDescription("");
      setOptions(["", ""]);
      setDuration("");
    } catch (err: any) {
      setError(err.message || 'Failed to create poll.');
    } finally {
      setIsCreating(false);
    }
  };

  const isFormValid = title && description && options.every(opt => opt.trim()) && duration;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gray-900/80 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Plus className="h-5 w-5 text-yellow-500" />
            <span>Create New Poll</span>
          </CardTitle>
          <CardDescription className="text-gray-300">
            Create a new proposal for the community to vote on
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Poll Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white font-medium">Poll Title</Label>
            <Input
              id="title"
              placeholder="Enter poll title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-yellow-500"
            />
          </div>

          {/* Poll Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white font-medium">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what this poll is about..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-yellow-500 resize-none"
            />
          </div>

          {/* Poll Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-white font-medium">Poll Options</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOption}
                className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Option
              </Button>
            </div>
            
            <div className="space-y-3">
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex-1">
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-yellow-500"
                    />
                  </div>
                  {options.length > 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeOption(index)}
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Poll Duration */}
          <div className="space-y-2">
            <Label className="text-white font-medium">Poll Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-yellow-500" />
                  <SelectValue placeholder="Select duration" className="text-gray-400" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="1d" className="text-white hover:bg-gray-700">1 Day</SelectItem>
                <SelectItem value="3d" className="text-white hover:bg-gray-700">3 Days</SelectItem>
                <SelectItem value="7d" className="text-white hover:bg-gray-700">1 Week</SelectItem>
                <SelectItem value="14d" className="text-white hover:bg-gray-700">2 Weeks</SelectItem>
                <SelectItem value="30d" className="text-white hover:bg-gray-700">1 Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Create Button */}
          <div className="pt-4">
            <Button
              onClick={handleCreatePoll}
              disabled={!isFormValid || isCreating}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3"
            >
              {isCreating ? "Creating Poll..." : "Create Poll"}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-sm text-red-500 text-center">
              {error}
            </div>
          )}

          {/* Form Validation Info */}
          {!isFormValid && (
            <div className="text-sm text-gray-400 text-center">
              Please fill in all fields to create your poll
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
