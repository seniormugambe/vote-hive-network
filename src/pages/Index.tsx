
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
    <div className="min-h-screen bg-black text-white">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-black via-yellow-500/10 to-black border-b border-yellow-500/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-500 rounded-xl shadow-lg">
                <Vote className="h-7 w-7 text-black" />
              </div>
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
          // Welcome screen when not connected - professional full height layout
          <div className="min-h-[calc(100vh-120px)] flex items-center py-12">
            <div className="grid lg:grid-cols-2 gap-16 w-full items-center">
              {/* Left Content - Well Padded */}
              <div className="space-y-10 lg:pr-8">
                <div className="space-y-8">
                  <div className="inline-flex p-4 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded-2xl border border-yellow-500/30">
                    <Vote className="h-12 w-12 text-yellow-500" />
                  </div>
                  <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Welcome to <span className="text-yellow-500 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">VOTYX</span>
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed font-light">
                    A next-generation delegation-based voting system built for the future. Connect your wallet to participate in governance, delegate your voting power, or create proposals with ease.
                  </p>
                </div>
                
                <div className="grid gap-6">
                  <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-gray-900/80 to-gray-800/60 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                    <div className="p-3 bg-yellow-500/20 rounded-lg">
                      <Vote className="h-7 w-7 text-yellow-500 flex-shrink-0" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-white text-lg">Direct Voting</h3>
                      <p className="text-gray-300">Vote directly on proposals that matter to you with full transparency</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-gray-900/80 to-gray-800/60 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                    <div className="p-3 bg-yellow-500/20 rounded-lg">
                      <Users className="h-7 w-7 text-yellow-500 flex-shrink-0" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-white text-lg">Smart Delegation</h3>
                      <p className="text-gray-300">Delegate your voting power to trusted representatives you believe in</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-gray-900/80 to-gray-800/60 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                    <div className="p-3 bg-yellow-500/20 rounded-lg">
                      <TrendingUp className="h-7 w-7 text-yellow-500 flex-shrink-0" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-white text-lg">Real-time Analytics</h3>
                      <p className="text-gray-300">Track voting patterns and delegation statistics in real-time</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - iPhone 13 Pro Mockup */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  {/* iPhone 13 Pro Frame - More accurate proportions */}
                  <div className="w-72 h-[580px] bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-[3.5rem] p-3 shadow-2xl border-2 border-gray-700 relative">
                    {/* iPhone 13 Pro Camera Notch */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-2xl z-20 border border-gray-800"></div>
                    
                    {/* Screen */}
                    <div className="w-full h-full bg-black rounded-[3rem] overflow-hidden relative border border-gray-600">
                      {/* Screen Content */}
                      <div className="p-8 pt-16 h-full bg-gradient-to-b from-gray-900 via-black to-gray-900">
                        <div className="text-center space-y-6">
                          <div className="inline-flex p-3 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
                            <Vote className="h-8 w-8 text-yellow-500" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-white font-bold text-xl">VOTYX Mobile</h3>
                            <p className="text-gray-400 text-sm">Governance on the go</p>
                          </div>
                          
                          <div className="space-y-4 mt-8">
                            <div className="bg-gradient-to-r from-yellow-500/15 to-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                                <span className="text-white text-sm font-medium">Active Proposal</span>
                              </div>
                              <p className="text-gray-300 text-xs mt-1">Protocol Upgrade v2.0</p>
                            </div>
                            
                            <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700">
                              <div className="flex items-center space-x-3">
                                <Users className="h-5 w-5 text-gray-400" />
                                <div className="text-left">
                                  <span className="text-gray-200 text-sm font-medium">Delegated Votes</span>
                                  <p className="text-yellow-400 text-lg font-bold">1,250</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700">
                              <div className="flex items-center space-x-3">
                                <TrendingUp className="h-5 w-5 text-gray-400" />
                                <div className="text-left">
                                  <span className="text-gray-200 text-sm font-medium">Success Rate</span>
                                  <p className="text-green-400 text-lg font-bold">78%</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Glow Effect */}
                  <div className="absolute inset-0 bg-yellow-500/30 rounded-[3.5rem] blur-2xl -z-10 animate-pulse"></div>
                  <div className="absolute inset-4 bg-yellow-500/20 rounded-[3rem] blur-xl -z-10"></div>
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
