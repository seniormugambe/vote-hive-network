import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DeletionEvent {
  id: string;
  timestamp: string;
  action: string;
}

interface DeletionEventsLogProps {
  deletedVotes: number;
  deletionEvents: DeletionEvent[];
}

export const DeletionEventsLog = ({ deletedVotes, deletionEvents }: DeletionEventsLogProps) => {
  return (
    <Card className="bg-gray-900/80 border-yellow-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <span>Deletion Events Log</span>
          <Badge variant="outline" className="border-red-500/50 text-red-400">
            {deletedVotes} Total
          </Badge>
        </CardTitle>
        <CardDescription className="text-gray-300">
          Track your delegation revocation history
        </CardDescription>
      </CardHeader>
      <CardContent>
        {deletionEvents.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No deletion events recorded</p>
        ) : (
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {deletionEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <div>
                  <p className="text-white font-medium">{event.action}</p>
                  <p className="text-xs text-gray-400">{event.timestamp}</p>
                </div>
                <Badge variant="outline" className="border-red-500/50 text-red-400">
                  Event #{deletionEvents.indexOf(event) + 1}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};