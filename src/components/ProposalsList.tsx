import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Vote, Clock, CheckCircle, Users, ExternalLink } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { Web3Service } from '@unlock-protocol/unlock-js';

const LOCK_ADDRESS = '0x259813B665C8f6074391028ef782e27B65840d89';
const NETWORK_ID = 84532; // Base Sepolia

const web3Service = new Web3Service();

async function hasValidKey(lockAddress: string, owner: string, network: number): Promise<boolean> {
  try {
    return await web3Service.getHasValidKey({
      lockAddress,
      owner,
      network,
    });
  } catch (e) {
    return false;
  }
}

interface ProposalsListProps {
  address: string;
  limit?: number;
}

export const ProposalsList = ({ address, limit }: ProposalsListProps) => {
  const [proposals, setProposals] = useState<any[]>([]);
  const [votingStates, setVotingStates] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      const { data, error } = await supabase
        .from('polls')
        .select('*, options(*)');
      if (error) {
        setError(error.message);
      } else {
        setProposals(limit ? data.slice(0, limit) : data);
      }
    };
    fetchProposals();
  }, [limit]);

  const handleVote = async (pollId: string, optionId: string, vote: "yes" | "no") => {
    setVotingStates(prev => ({ ...prev, [pollId]: true }));
    setError(null);

    // Unlock Protocol gating
    const isKeyHolder = await hasValidKey(LOCK_ADDRESS, address, NETWORK_ID);
    if (!isKeyHolder) {
      setError('You must own a membership key to vote.');
      setVotingStates(prev => ({ ...prev, [pollId]: false }));
      return;
    }

    try {
      const { error } = await supabase
        .from('votes')
        .insert([{ poll_id: pollId, option_id: optionId, user_wallet_address: address, vote }]);
      if (error) throw error;
      // Optionally update UI to reflect the vote
    } catch (err: any) {
      setError(err.message || 'Failed to vote.');
    } finally {
      setVotingStates(prev => ({ ...prev, [pollId]: false }));
    }
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
            Live from Supabase
          </Badge>
        </CardTitle>
        <CardDescription className="text-gray-300">
          {limit ? "Recent Unlock DAO proposals" : "All active and past Unlock DAO proposals with delegation data"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="text-sm text-red-500 text-center">{error}</div>
        )}
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
              {/* You can calculate yes/no percentages from votes if you fetch them */}

              {/* Proposal Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span className="text-white">{proposal.options?.length || 0} options</span>
                  </div>
                  {/* Add more stats as needed */}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  {proposal.status === "active" && proposal.options && proposal.options.length > 0 && (
                    proposal.options.map((option: any) => (
                      <Button
                        key={option.id}
                        size="sm"
                        onClick={() => handleVote(proposal.id, option.id, option.text.toLowerCase() === 'yes' ? 'yes' : 'no')}
                        disabled={votingStates[proposal.id]}
                        className={option.text.toLowerCase() === 'yes' ? "bg-green-600 hover:bg-green-700 text-white" : "border-red-500/50 text-red-400 hover:bg-red-500/10"}
                        variant={option.text.toLowerCase() === 'yes' ? undefined : "outline"}
                      >
                        {votingStates[proposal.id] ? "..." : option.text}
                      </Button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
