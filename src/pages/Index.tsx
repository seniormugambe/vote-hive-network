
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WalletConnection } from "@/components/WalletConnection";
import { DelegationPanel } from "@/components/DelegationPanel";
import { CreatePoll } from "@/components/CreatePoll";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Vote, Users, Plus, Wifi, Battery, Signal, ExternalLink, HelpCircle } from "lucide-react";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [deletedVotes, setDeletedVotes] = useState(0);

  const handleVoteDeletion = () => {
    setDeletedVotes(prev => prev + 1);
    console.log(`Vote deleted. Total deleted votes: ${deletedVotes + 1}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-black via-yellow-500/10 to-black border-b border-yellow-500/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/2622a6dd-905c-4bae-90cd-3231612a2a2c.png" 
                alt="VOTYX Logo" 
                className="w-10 h-10 brightness-0 saturate-100 invert-0 sepia-100 saturate-7500 hue-rotate-[45deg]"
                style={{ filter: 'brightness(0) saturate(100%) invert(77%) sepia(81%) saturate(1869%) hue-rotate(1deg) brightness(102%) contrast(101%)' }}
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
          // Welcome screen when not connected - professional full height layout
          <div className="min-h-[calc(100vh-120px)] flex items-center py-8">
            <div className="grid lg:grid-cols-2 gap-12 w-full items-center">
              {/* Left Content - Well Padded */}
              <div className="space-y-12 lg:pr-12">
                <div className="space-y-8">
                  <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                    Welcome to <span className="text-yellow-500 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">VOTYX</span>
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed font-light">
                    A next-generation delegation-based voting system built for the future. Connect your wallet to participate in governance, delegate your voting power, or create proposals with ease.
                  </p>
                </div>
                
                <TooltipProvider>
                  <div className="grid gap-8">
                    <div className="flex items-start space-x-6 p-8 bg-gradient-to-r from-gray-900/80 to-gray-800/60 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                      <div className="p-4 bg-yellow-500/20 rounded-lg">
                        <Vote className="h-8 w-8 text-yellow-500 flex-shrink-0" />
                      </div>
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-white text-xl">Direct Voting</h3>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-gray-400 hover:text-yellow-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Vote directly on proposals without delegating to others</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <p className="text-gray-300 text-lg">Vote directly on proposals that matter to you with full transparency</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-6 p-8 bg-gradient-to-r from-gray-900/80 to-gray-800/60 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                      <div className="p-4 bg-yellow-500/20 rounded-lg">
                        <Users className="h-8 w-8 text-yellow-500 flex-shrink-0" />
                      </div>
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-white text-xl">Smart Delegation</h3>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-gray-400 hover:text-yellow-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delegation allows you to assign your voting power to trusted stewards who vote on your behalf</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <p className="text-gray-300 text-lg">Delegate your voting power to trusted stewards with proven track records</p>
                        <div className="flex items-center space-x-4 mt-3">
                          <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                            12,450 Total Delegated
                          </Badge>
                          <Badge variant="outline" className="border-green-500/50 text-green-400">
                            95% Success Rate
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-6 p-8 bg-gradient-to-r from-gray-900/80 to-gray-800/60 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                      <div className="p-4 bg-yellow-500/20 rounded-lg">
                        <ExternalLink className="h-8 w-8 text-yellow-500 flex-shrink-0" />
                      </div>
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-white text-xl">Unlock DAO Integration</h3>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-gray-400 hover:text-yellow-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Direct integration with Unlock DAO proposals and Snapshot governance</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <p className="text-gray-300 text-lg">Access Unlock DAO proposals and participate via Snapshot integration</p>
                        <div className="flex items-center space-x-4 mt-3">
                          <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                            Snapshot Ready
                          </Badge>
                          <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                            Live Proposals
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </TooltipProvider>
              </div>

              {/* Right Content - iPhone 13 Pro Mockup */}
              <div className="flex justify-center lg:justify-center">
                <div className="relative">
                  {/* iPhone 13 Pro Frame - More realistic proportions */}
                  <div className="w-80 h-[620px] bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-[3.5rem] p-3 shadow-2xl border-2 border-gray-700 relative">
                    {/* iPhone 13 Pro Camera Notch */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-2xl z-20 border border-gray-800"></div>
                    
                    {/* Screen */}
                    <div className="w-full h-full bg-black rounded-[3rem] overflow-hidden relative border border-gray-600">
                      {/* Status Bar */}
                      <div className="absolute top-0 left-0 right-0 h-12 bg-black z-10 flex items-center justify-between px-8 pt-2">
                        <div className="flex items-center space-x-1">
                          <span className="text-white text-sm font-medium">9:41</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Signal className="h-4 w-4 text-white" />
                          <Wifi className="h-4 w-4 text-white" />
                          <Battery className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      
                      {/* Screen Content */}
                      <div className="p-8 pt-20 h-full bg-gradient-to-b from-gray-900 via-black to-gray-900">
                        <div className="text-center space-y-6">
                          <div className="space-y-3">
                            <h3 className="text-white font-bold text-2xl">VOTYX Mobile</h3>
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
                                <Vote className="h-5 w-5 text-gray-400" />
                                <div className="text-left">
                                  <span className="text-gray-200 text-sm font-medium">Deleted Votes</span>
                                  <p className="text-red-400 text-lg font-bold">{deletedVotes}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Glow Effect */}
                  <div className="absolute inset-0 bg-yellow-500/20 rounded-[3.5rem] blur-2xl -z-10 animate-pulse"></div>
                  <div className="absolute inset-4 bg-yellow-500/15 rounded-[3rem] blur-xl -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Main dashboard when connected
          <div className="py-8">
            <Tabs defaultValue="delegate" className="space-y-6">
              <TabsList className="bg-gray-900 border-yellow-500/20 p-1 grid grid-cols-2 w-full max-w-lg mx-auto">
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
              </TabsList>

              <TabsContent value="delegate">
                <DelegationPanel address={walletAddress} expanded={true} onVoteDelete={handleVoteDeletion} />
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
