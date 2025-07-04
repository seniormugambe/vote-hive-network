import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Vote, Users, ExternalLink, HelpCircle } from "lucide-react";
import { PhoneMockup } from "./PhoneMockup";

interface WelcomeSectionProps {
  deletedVotes: number;
}

export const WelcomeSection = ({ deletedVotes }: WelcomeSectionProps) => {
  return (
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
            <div className="grid gap-5">
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-gray-900/80 to-gray-800/60 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Vote className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-white text-lg">Direct Voting</h3>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-400 hover:text-yellow-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Vote directly on proposals without delegating to others</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-gray-300 text-base">Vote directly on proposals that matter to you with full transparency</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-gray-900/80 to-gray-800/60 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Users className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-white text-lg">Smart Delegation</h3>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-400 hover:text-yellow-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delegation allows you to assign your voting power to trusted stewards who vote on your behalf</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-gray-300 text-base">Delegate your voting power to trusted stewards with proven track records</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 text-xs">
                      12,450 Total
                    </Badge>
                    <Badge variant="outline" className="border-green-500/50 text-green-400 text-xs">
                      95% Success
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-gray-900/80 to-gray-800/60 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <ExternalLink className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-white text-lg">Unlock DAO Integration</h3>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-400 hover:text-yellow-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Direct integration with Unlock DAO proposals and Snapshot governance</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-gray-300 text-base">Access Unlock DAO proposals and participate via Snapshot integration</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <Badge variant="outline" className="border-blue-500/50 text-blue-400 text-xs">
                      Snapshot Ready
                    </Badge>
                    <Badge variant="outline" className="border-purple-500/50 text-purple-400 text-xs">
                      Live Proposals
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </TooltipProvider>
        </div>

        {/* Right Content - iPhone 13 Pro Mockup */}
        <div className="flex justify-center lg:justify-end">
          <PhoneMockup deletedVotes={deletedVotes} />
        </div>
      </div>
    </div>
  );
};