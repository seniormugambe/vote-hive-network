
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Vote, Clock, CheckCircle, Users } from "lucide-react";

interface ProposalsListProps {
  limit?: number;
}

export const ProposalsList = ({ limit }: ProposalsListProps) => {
  const [votingStates, setVotingStates] = useState<{ [key: number]: boolean }>({});

  // Mock proposals data
  const allProposals = [
    {
      id: 1,
      title: "Protocol Fee Reduction",
      description: "Proposal to reduce protocol fees from 0.3% to 0.25% to increase competitiveness",
      status: "active",
      timeLeft: "2 days left",
      yesVotes: 65,
      noVotes: 35,
      totalVotes: "12,450",
      myVote: null
    },
    {
      id: 2,
      title: "Treasury Diversification",
      description: "Allocate 20% of treasury to stable assets for risk management",
      status: "active",
      timeLeft: "5 days left",
      yesVotes: 78,
      noVotes: 22,
      totalVotes: "8,320",
      myVote: "yes"
    },
    {
      id: 3,
      title: "Governance Token Burn",
      description: "Burn 5% of total token supply to increase token value",
      status: "passed",
      timeLeft: "Ended",
      yesVotes: 82,
      noVotes: 18,
      totalVotes: "15,280",
      myVote: "yes"
    },
    {
      id: 4,
      title: "New Partnership Program",
      description: "Launch partnership program with major DeFi protocols",
      status: "active",
      timeLeft: "1 day left",
      yesVotes: 45,
      noVotes: 55,
      totalVotes: "6,890",
      myVote: null
    }
  ];

  const proposals = limit ? allProposals.slice(0, limit) : allProposals;

  const handleVote = async (proposalId: number, vote: "yes" | "no") => {
    setVotingStates(prev => ({ ...prev, [proposalId]: true }));
    
    // Simulate voting transaction
    setTimeout(() => {
      setVotingStates(prev => ({ ...prev, [proposalId]: false }));
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>;
      case "passed":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Passed</Badge>;
      case "failed":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/50">Failed</Badge>;
      default:
        return <Badge variant="outline" className="border-gray-500/50 text-gray-400">Unknown</Badge>;
    }
  };

  return (
    <Card className="bg-gray-900/80 border-yellow-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Vote className="h-5 w-5 text-yellow-500" />
          <span>Proposals</span>
        </CardTitle>
        <CardDescription className="text-gray-300">
          {limit ? "Recent proposals" : "All active and past proposals"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-colors">
            <div className="space-y-4">
              {/* Proposal Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-lg">{proposal.title}</h4>
                  <p className="text-gray-300 text-sm mt-1">{proposal.description}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {getStatusBadge(proposal.status)}
                </div>
              </div>

              {/* Voting Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Yes: {proposal.yesVotes}%</span>
                  <span className="text-gray-300">No: {proposal.noVotes}%</span>
                </div>
                <Progress value={proposal.yesVotes} className="h-2 bg-gray-700">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all"
                    style={{ width: `${proposal.yesVotes}%` }}
                  />
                </Progress>
              </div>

              {/* Proposal Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span className="text-white">{proposal.totalVotes} votes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-white">{proposal.timeLeft}</span>
                  </div>
                </div>

                {/* Voting Buttons */}
                {proposal.status === "active" && (
                  <div className="flex items-center space-x-2">
                    {proposal.myVote ? (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-white">
                          Voted {proposal.myVote === "yes" ? "Yes" : "No"}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleVote(proposal.id, "yes")}
                          disabled={votingStates[proposal.id]}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          {votingStates[proposal.id] ? "..." : "Yes"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVote(proposal.id, "no")}
                          disabled={votingStates[proposal.id]}
                          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                        >
                          {votingStates[proposal.id] ? "..." : "No"}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {limit && proposals.length >= limit && (
          <Button 
            variant="outline" 
            className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
          >
            View All Proposals
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
