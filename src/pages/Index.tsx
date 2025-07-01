
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WalletConnection } from "@/components/WalletConnection";
import { DelegationPanel } from "@/components/DelegationPanel";
import { CreatePoll } from "@/components/CreatePoll";
import { ProposalsList } from "@/components/ProposalsList";
import { VotingStats } from "@/components/VotingStats";
import { Vote, Users, TrendingUp, Plus } from "lucide-react";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-black via-yellow-900/20 to-black border-b border-yellow-500/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-500 rounded-lg">
                <Vote className="h-6 w-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
                  DeVote Protocol
                </h1>
                <p className="text-gray-400 text-sm">Delegation-Based Voting System</p>
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

      <div className="container mx-auto px-4 py-8">
        {!isConnected ? (
          // Welcome screen when not connected
          <div className="text-center py-20">
            <div className="mb-8">
              <div className="inline-flex p-4 bg-yellow-500/10 rounded-full mb-6">
                <Vote className="h-12 w-12 text-yellow-500" />
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
                Welcome to DeVote Protocol
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                A next-generation delegation-based voting system. Connect your wallet to participate in governance,
                delegate your voting power, or create proposals.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <Card className="bg-gray-900/50 border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
                <CardHeader className="text-center">
                  <Vote className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <CardTitle className="text-white">Direct Voting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Vote directly on proposals that matter to you</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900/50 border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
                <CardHeader className="text-center">
                  <Users className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <CardTitle className="text-white">Delegation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Delegate your voting power to trusted representatives</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900/50 border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
                <CardHeader className="text-center">
                  <TrendingUp className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <CardTitle className="text-white">Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Track voting patterns and delegation statistics</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Main dashboard when connected
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-gray-900 border-yellow-500/20 p-1">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="delegate" 
                className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
              >
                Delegation
              </TabsTrigger>
              <TabsTrigger 
                value="proposals" 
                className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
              >
                Proposals
              </TabsTrigger>
              <TabsTrigger 
                value="create" 
                className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Poll
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <VotingStats address={walletAddress} />
              <div className="grid lg:grid-cols-2 gap-6">
                <DelegationPanel address={walletAddress} />
                <ProposalsList limit={3} />
              </div>
            </TabsContent>

            <TabsContent value="delegate">
              <DelegationPanel address={walletAddress} expanded={true} />
            </TabsContent>

            <TabsContent value="proposals">
              <ProposalsList />
            </TabsContent>

            <TabsContent value="create">
              <CreatePoll />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Index;
