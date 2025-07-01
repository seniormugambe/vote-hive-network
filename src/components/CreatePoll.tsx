
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Calendar } from "lucide-react";

export const CreatePoll = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState("");
  const [isCreating, setIsCreating] = useState(false);

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
    
    // Simulate poll creation
    console.log("Creating poll:", {
      title,
      description,
      options: options.filter(opt => opt.trim() !== ""),
      duration
    });
    
    setTimeout(() => {
      setIsCreating(false);
      // Reset form
      setTitle("");
      setDescription("");
      setOptions(["", ""]);
      setDuration("");
      
      alert("Poll created successfully!");
    }, 2000);
  };

  const isFormValid = title.trim() && 
                     description.trim() && 
                     options.filter(opt => opt.trim()).length >= 2 && 
                     duration;

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-yellow-500/20 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-2xl">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Plus className="h-6 w-6 text-yellow-500" />
          </div>
          <span>Create New Poll</span>
        </CardTitle>
        <CardDescription className="text-lg">
          Create a new proposal for the community to vote on
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Poll Title */}
        <div className="space-y-2">
          <Label htmlFor="poll-title" className="text-yellow-400 font-semibold">
            Poll Title *
          </Label>
          <Input
            id="poll-title"
            placeholder="Enter a clear and concise title for your poll"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-black/50 border-gray-600 focus:border-yellow-500 text-lg p-4"
          />
        </div>

        {/* Poll Description */}
        <div className="space-y-2">
          <Label htmlFor="poll-description" className="text-yellow-400 font-semibold">
            Description *
          </Label>
          <Textarea
            id="poll-description"
            placeholder="Provide detailed information about what you're proposing and why the community should consider it..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-black/50 border-gray-600 focus:border-yellow-500 min-h-32 p-4"
          />
        </div>

        {/* Poll Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-yellow-400 font-semibold">
              Poll Options * (minimum 2)
            </Label>
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
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50 min-w-fit">
                  {index + 1}
                </Badge>
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  className="bg-black/50 border-gray-600 focus:border-yellow-500"
                />
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
          <Label className="text-yellow-400 font-semibold flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Poll Duration *</span>
          </Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="bg-black/50 border-gray-600 focus:ring-yellow-500">
              <SelectValue placeholder="Select poll duration" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="1-day">1 Day</SelectItem>
              <SelectItem value="3-days">3 Days</SelectItem>
              <SelectItem value="1-week">1 Week</SelectItem>
              <SelectItem value="2-weeks">2 Weeks</SelectItem>
              <SelectItem value="1-month">1 Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Preview */}
        {isFormValid && (
          <Card className="bg-black/30 border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-300">{description}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-yellow-400 font-semibold">Options:</p>
                {options.filter(opt => opt.trim()).map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Badge variant="outline" className="border-gray-500">
                      {index + 1}
                    </Badge>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>Duration: {duration?.replace('-', ' ')}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleCreatePoll}
            disabled={!isFormValid || isCreating}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 text-lg transition-all duration-200 hover:scale-105"
          >
            {isCreating ? "Creating Poll..." : "Create Poll"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
