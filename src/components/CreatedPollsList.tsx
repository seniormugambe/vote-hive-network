import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vote } from "lucide-react";

interface Poll {
  id: string;
  title: string;
  description: string;
  options: string[];
  duration: string;
  createdAt: string;
  status: string;
}

interface CreatedPollsListProps {
  createdPolls: Poll[];
}

export const CreatedPollsList = ({ createdPolls }: CreatedPollsListProps) => {
  return (
    <Card className="bg-gray-900/80 border-yellow-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Vote className="h-5 w-5 text-yellow-500" />
          <span>Created Polls</span>
          <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
            {createdPolls.length} Total
          </Badge>
        </CardTitle>
        <CardDescription className="text-gray-300">
          View and manage your created polls
        </CardDescription>
      </CardHeader>
      <CardContent>
        {createdPolls.length === 0 ? (
          <div className="text-center py-8">
            <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">No polls created yet</p>
            <p className="text-sm text-gray-500">Create your first poll to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {createdPolls.map((poll) => (
              <div key={poll.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white text-lg">{poll.title}</h4>
                  <Badge variant={poll.status === "Active" ? "default" : "secondary"} 
                         className="bg-green-500/20 text-green-400 border-green-500/50">
                    {poll.status}
                  </Badge>
                </div>
                <p className="text-gray-300 mb-3">{poll.description}</p>
                <div className="space-y-2 mb-3">
                  <p className="text-sm text-gray-400">Options:</p>
                  <div className="flex flex-wrap gap-2">
                    {poll.options.map((option, index) => (
                      <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                        {option}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Duration: {poll.duration}</span>
                  <span>Created: {poll.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};