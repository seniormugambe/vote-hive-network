
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Vote, Clock, Users, TrendingUp } from "lucide-react";

interface ProposalsListProps {
  limit?: number;
}

const MOCK_PROPOSALS = [
  {
    id: 1,
    title: "Increase Block Rewards by 15%",
    description: "Proposal to increase mining rewards to improve network security and attract more validators to the protocol.",
    author: "0xA1B2...ABCD",
    status: "Active",
    timeLeft: "2 days",
    totalVotes: 15420,
    forVotes: 8950,
    againstVotes: 6470,
    forPercentage: 58,
    voterCount: 342
  },
  {
    id: 2,
    title: "Treasury Allocation for Development Fund",
    description: "Allocate 500,000 tokens from treasury to fund core development initiatives for the next quarter.",
    author: "0xB2C3...CDE1",
    status: "Active",
    timeLeft: "5 days",
    totalVotes: 23100,
    forVotes: 18480,
    againstVotes: 4620,
    forPercentage: 80,
    voterCount: 567
  },
  {
    id: 3,
    title: "Upgrade Governance Contract v2.1",
    description: "Technical upgrade to improve delegation mechanics and add new voting features including quadratic voting.",
    author: "0xC3D4...DE12",
    status: "Pending",
    timeLeft: "Starts in 1 day",
    totalVotes: 0,
    forVotes: 0,
    againstVotes: 0,
    forPercentage: 0,
    voterCount: 0
  },
  {
    id: 4,
    title: "Partnership with DeFi Protocol XYZ",
    description: "Strategic partnership proposal to integrate liquidity pools and enable cross-chain governance features.",
    author: "0xD4E5...E123",
    status: "Ended",
    timeLeft: "Ended",
    totalVotes: 31500,
    forVotes: 12600,
    againstVotes: 18900,
    forPercentage: 40,
    voterCount: 821
  }
];

export const ProposalsList = ({ limit }: ProposalsListProps) => {
  const proposals = limit ? MOCK_PROPOSALS.slice(0, limit) : MOCK_PROPOSALS;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500/20 text-green-400 border-green-500/50";
      case "Pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "Ended": return "bg-gray-500/20 text-gray-400 border-gray-500/50";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="space-y-4">
      {!limit && (
        <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Vote className="h-6 w-6 text-yellow-500" />
              <span>Active Proposals</span>
            </CardTitle>
            <CardDescription>Vote on proposals or track their progress</CardDescription>
          </CardHeader>
        </Card>
      )}

      {proposals.map((proposal) => (
        <Card key={proposal.id} className="bg-gray-900 border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <CardTitle className="text-lg">{proposal.title}</CardTitle>
                  <Badge className={getStatusColor(proposal.status)}>
                    {proposal.status}
                  </Badge>
                </div>
                <CardDescription className="text-base mb-3">
                  {proposal.description}
                </CardDescription>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>By {proposal.author}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{proposal.timeLeft}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{proposal.voterCount} voters</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          
          {proposal.status !== "Pending" && (
            <CardContent className="space-y-4">
              {/* Voting Progress */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-yellow-400 font-semibold">Voting Results</span>
                  <span className="text-sm text-gray-400">
                    {formatNumber(proposal.totalVotes)} total votes
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">For ({proposal.forPercentage}%)</span>
                    <span className="text-green-400">{formatNumber(proposal.forVotes)}</span>
                  </div>
                  <Progress 
                    value={proposal.forPercentage} 
                    className="h-2 bg-gray-700"
                  />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-red-400">Against ({100 - proposal.forPercentage}%)</span>
                    <span className="text-red-400">{formatNumber(proposal.againstVotes)}</span>
                  </div>
                  <Progress 
                    value={100 - proposal.forPercentage} 
                    className="h-2 bg-gray-700"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              {proposal.status === "Active" && (
                <div className="flex space-x-3 pt-2">
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white flex-1"
                  >
                    Vote For
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10 flex-1"
                  >
                    Vote Against
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
                  >
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};
