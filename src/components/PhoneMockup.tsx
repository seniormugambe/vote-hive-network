import { Users, Vote, Signal, Wifi, Battery } from "lucide-react";

interface PhoneMockupProps {
  deletedVotes: number;
}

export const PhoneMockup = ({ deletedVotes }: PhoneMockupProps) => {
  return (
    <div className="relative" style={{ perspective: '1000px' }}>
      {/* iPhone 13 Pro Frame - Smaller, more realistic */}
      <div className="w-64 h-[500px] bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-[2.8rem] p-2.5 shadow-2xl border-2 border-gray-700 relative animate-rotate-slow" style={{ transformStyle: 'preserve-3d' }}>
        {/* iPhone 13 Pro Camera Notch */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-2xl z-20 border border-gray-800"></div>
        
        {/* Screen - Counter-rotate to keep content readable */}
        <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative border border-gray-600 animate-counter-rotate" style={{ transformStyle: 'preserve-3d' }}>
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-black z-10 flex items-center justify-between px-6 pt-1.5">
            <div className="flex items-center space-x-1">
              <span className="text-white text-xs font-medium">9:41</span>
            </div>
            <div className="flex items-center space-x-1">
              <Signal className="h-3 w-3 text-white" />
              <Wifi className="h-3 w-3 text-white" />
              <Battery className="h-3 w-3 text-white" />
            </div>
          </div>
          
          {/* Screen Content */}
          <div className="p-6 pt-16 h-full bg-gradient-to-b from-gray-900 via-black to-gray-900">
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <h3 className="text-white font-bold text-lg">VOTYX Mobile</h3>
                <p className="text-gray-400 text-xs">Governance on the go</p>
              </div>
              
              <div className="space-y-3 mt-6">
                <div className="bg-gradient-to-r from-yellow-500/15 to-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-white text-xs font-medium">Active Proposal</span>
                  </div>
                  <p className="text-gray-300 text-xs mt-1">Protocol Upgrade v2.0</p>
                </div>
                
                <div className="bg-gray-800/60 rounded-lg p-3 border border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <div className="text-left">
                      <span className="text-gray-200 text-xs font-medium">Delegated Votes</span>
                      <p className="text-yellow-400 text-sm font-bold">1,250</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/60 rounded-lg p-3 border border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Vote className="h-4 w-4 text-gray-400" />
                    <div className="text-left">
                      <span className="text-gray-200 text-xs font-medium">Deleted Votes</span>
                      <p className="text-red-400 text-sm font-bold">{deletedVotes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Glow Effect */}
      <div className="absolute inset-0 bg-yellow-500/20 rounded-[2.8rem] blur-2xl -z-10 animate-pulse"></div>
      <div className="absolute inset-4 bg-yellow-500/15 rounded-[2.5rem] blur-xl -z-10"></div>
    </div>
  );
};
