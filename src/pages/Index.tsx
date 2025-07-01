
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
import { Vote, Users, TrendingUp, Plus, Smartphone } from "lucide-react";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-black via-yellow-500/10 to-black border-b border-yellow-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-500 rounded-lg">
                <Vote className="h-6 w-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
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

      <div className="container mx-auto px-4">
        {!isConnected ? (
          // Welcome screen when not connected - full height layout
          <div className="h-[calc(100vh-100px)] flex items-center">
            <div className="grid lg:grid-cols-2 gap-12 w-full items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex p-3 bg-yellow-500/10 rounded-full">
                    <Vote className="h-10 w-10 text-yellow-500" />
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Welcome to <span className="text-yellow-500">VOTYX</span>
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    A next-generation delegation-based voting system. Connect your wallet to participate in governance,
                    delegate your voting power, or create proposals.
                  </p>
                </div>
                
                <div className="grid gap-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-lg border border-yellow-500/20">
                    <Vote className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Direct Voting</h3>
                      <p className="text-sm text-gray-300">Vote directly on proposals that matter to you</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-lg border border-yellow-500/20">
                    <Users className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Delegation</h3>
                      <p className="text-sm text-gray-300">Delegate your voting power to trusted representatives</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-lg border border-yellow-500/20">
                    <TrendingUp className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Analytics</h3>
                      <p className="text-sm text-gray-300">Track voting patterns and delegation statistics</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - iPhone Mockup */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  {/* iPhone Frame */}
                  <div className="w-64 h-[520px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl border border-gray-700">
                    <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                      {/* iPhone Notch */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-full z-10"></div>
                      
                      {/* Screen Content */}
                      <div className="p-6 pt-12 h-full bg-gradient-to-b from-gray-900 to-black">
                        <div className="text-center space-y-4">
                          <div className="inline-flex p-2 bg-yellow-500/20 rounded-lg">
                            <Vote className="h-6 w-6 text-yellow-500" />
                          </div>
                          <h3 className="text-white font-bold text-lg">VOTYX Mobile</h3>
                          <p className="text-gray-400 text-sm">Vote on the go</p>
                          
                          <div className="space-y-3 mt-8">
                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <span className="text-white text-sm">Active Proposal</span>
                              </div>
                            </div>
                            <div className="bg-gray-800/50 rounded-lg p-3">
                              <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-300 text-sm">Delegated Votes: 1,250</span>
                              </div>
                            </div>
                            <div className="bg-gray-800/50 rounded-lg p-3">
                              <div className="flex items-center space-x-2">
                                <TrendingUp className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-300 text-sm">Success Rate: 78%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-yellow-500/20 rounded-[3rem] blur-xl -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Main dashboard when connected
          <div className="py-8">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-gray-900 border-yellow-500/20 p-1">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="delegate" 
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-white"
                >
                  Delegation
                </TabsTrigger>
                <TabsTrigger 
                  value="proposals" 
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-white"
                >
                  Proposals
                </TabsTrigger>
                <TabsTrigger 
                  value="create" 
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-white"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
