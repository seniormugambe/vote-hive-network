
import { useState } from "react";
import { WalletConnection } from "@/components/WalletConnection";
import { WelcomeSection } from "@/components/WelcomeSection";
import { DashboardTabs } from "@/components/DashboardTabs";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [deletedVotes, setDeletedVotes] = useState(0);
  const [deletionEvents, setDeletionEvents] = useState<Array<{id: string, timestamp: string, action: string}>>([]);
  const [createdPolls, setCreatedPolls] = useState<Array<{id: string, title: string, description: string, options: string[], duration: string, createdAt: string, status: string}>>([]);

  const handleVoteDeletion = () => {
    setDeletedVotes(prev => prev + 1);
    const newEvent = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      action: "Delegation Revoked"
    };
    setDeletionEvents(prev => [newEvent, ...prev]);
    console.log(`Vote deleted. Total deleted votes: ${deletedVotes + 1}`);
  };

  const handlePollCreation = (pollData: {title: string, description: string, options: string[], duration: string}) => {
    const newPoll = {
      id: Date.now().toString(),
      ...pollData,
      createdAt: new Date().toLocaleString(),
      status: "Active"
    };
    setCreatedPolls(prev => [newPoll, ...prev]);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-black via-yellow-500/10 to-black border-b border-yellow-500/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/9f9f06fe-1537-42b9-9ed3-33e694cd0cbf.png" 
                alt="VOTYX Logo" 
                className="w-10 h-10"
              />
              <div>
                <h1 className="text-3xl font-bold text-white">
                  VOTYX
                </h1>
                <p className="text-gray-300 text-sm">Delegation-Based Voting System</p>
              </div>
            </div>
            <WalletConnection 
              isConnected={isConnected}
              onConnect={setIsConnected}
              address={walletAddress}
              onAddressChange={setWalletAddress}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {!isConnected ? (
          <WelcomeSection deletedVotes={deletedVotes} />
        ) : (
          <DashboardTabs 
            walletAddress={walletAddress}
            deletedVotes={deletedVotes}
            deletionEvents={deletionEvents}
            createdPolls={createdPolls}
            onVoteDelete={handleVoteDeletion}
            onPollCreated={handlePollCreation}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
