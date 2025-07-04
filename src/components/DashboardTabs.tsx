import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DelegationPanel } from "@/components/DelegationPanel";
import { CreatePoll } from "@/components/CreatePoll";
import { DeletionEventsLog } from "./DeletionEventsLog";
import { CreatedPollsList } from "./CreatedPollsList";
import { Plus, Vote } from "lucide-react";

interface DeletionEvent {
  id: string;
  timestamp: string;
  action: string;
}

interface Poll {
  id: string;
  title: string;
  description: string;
  options: string[];
  duration: string;
  createdAt: string;
  status: string;
}

interface DashboardTabsProps {
  walletAddress: string;
  deletedVotes: number;
  deletionEvents: DeletionEvent[];
  createdPolls: Poll[];
  onVoteDelete: () => void;
  onPollCreated: (pollData: {title: string, description: string, options: string[], duration: string}) => void;
}

export const DashboardTabs = ({ 
  walletAddress, 
  deletedVotes, 
  deletionEvents, 
  createdPolls, 
  onVoteDelete, 
  onPollCreated 
}: DashboardTabsProps) => {
  return (
    <div className="py-8">
      <Tabs defaultValue="delegate" className="space-y-6">
        <TabsList className="bg-gray-900 border-yellow-500/20 p-1 grid grid-cols-3 w-full max-w-2xl mx-auto">
          <TabsTrigger 
            value="delegate" 
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-white"
          >
            Delegation
          </TabsTrigger>
          <TabsTrigger 
            value="create" 
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Poll
          </TabsTrigger>
          <TabsTrigger 
            value="polls" 
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-white"
          >
            <Vote className="h-4 w-4 mr-2" />
            View Polls
          </TabsTrigger>
        </TabsList>

        <TabsContent value="delegate">
          <div className="space-y-6">
            <DelegationPanel address={walletAddress} expanded={true} onVoteDelete={onVoteDelete} />
            <DeletionEventsLog deletedVotes={deletedVotes} deletionEvents={deletionEvents} />
          </div>
        </TabsContent>

        <TabsContent value="create">
          <CreatePoll onPollCreated={onPollCreated} />
        </TabsContent>

        <TabsContent value="polls">
          <CreatedPollsList createdPolls={createdPolls} />
        </TabsContent>
      </Tabs>
    </div>
  );
};