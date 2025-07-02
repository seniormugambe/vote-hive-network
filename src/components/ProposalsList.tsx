
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Vote, Clock, CheckCircle, Users, ExternalLink } from "lucide-react";

interface ProposalsListProps {
  limit?: number;
}

export const ProposalsList = ({ limit }: ProposalsListProps) => {
  const [votingStates, setVotingStates] = useState<{ [key: number]: boolean }>({});

  // Mock Unlock DAO proposals data  
  const allProposals = [
    {
      id: 1,
      title: "Protocol Upgrade v3.0 - Enhanced Security Features",
      description: "Implement new security protocols and upgrade smart contracts to improve overall platform security and gas efficiency.",
      status: "active",
      timeLeft: "2 days left",
      yesVotes: 73,
      noVotes: 27,
      totalVotes: "45,230",
      myVote: null,
      snapshotUrl: "https://snapshot.org/#/unlock-protocol.eth/proposal/0x123",
      delegatedVotes: "12,450"
    },
    {
      id: 2,
      title: "Community Treasury Allocation for Q3 2024",
      description: "Proposal to allocate 500,000 UDT tokens from the community treasury for ecosystem development and grants program.",
      status: "active",
      timeLeft: "5 days left", 
      yesVotes: 68,
      noVotes: 32,
      totalVotes: "38,900",
      myVote: "yes",
      snapshotUrl: "https://snapshot.org/#/unlock-protocol.eth/proposal/0x456",
      delegatedVotes: "8,320"
    },
    {
      id: 3,
      title: "Governance Parameter Updates",
      description: "Adjust voting thresholds and proposal requirements to improve governance efficiency.",
      status: "passed",
      timeLeft: "Ended",
      yesVotes: 82,
      noVotes: 18,
      totalVotes: "62,100",
      myVote: "yes",
      snapshotUrl: "https://snapshot.org/#/unlock-protocol.eth/proposal/0x789",
      delegatedVotes: "15,280"
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
          <ExternalLink className="h-5 w-5 text-yellow-500" />
          <span>Unlock DAO Proposals</span>
          <Badge variant="outline" className="border-purple-500/50 text-purple-400">
            Live from Snapshot
          </Badge>
        </CardTitle>
        <CardDescription className="text-gray-300">
          {limit ? "Recent Unlock DAO proposals" : "All active and past Unlock DAO proposals with delegation data"}
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
                    <span className="text-white">{proposal.totalVotes} total votes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-white">{proposal.timeLeft}</span>
                  </div>
                  {proposal.delegatedVotes && (
                    <div className="flex items-center space-x-1">
                      <Vote className="h-4 w-4" />
                      <span className="text-yellow-400">{proposal.delegatedVotes} delegated</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  {proposal.snapshotUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                      onClick={() => window.open(proposal.snapshotUrl, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Snapshot
                    </Button>
                  )}
                  
                  {proposal.status === "active" && (
                    <>
                      {proposal.myVote ? (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-white">
                            Voted {proposal.myVote === "yes" ? "Yes" : "No"}
                          </span>
                        </div>
                      ) : (
                        <>
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
                        </>
                      )}
                    </>
                  )}
                </div>
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
