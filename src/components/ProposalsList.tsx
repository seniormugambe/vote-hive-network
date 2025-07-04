import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Vote, Clock, CheckCircle, Users, ExternalLink } from "lucide-react";
import { Web3Service } from '@unlock-protocol/unlock-js';
import { InviteDialog } from "@/components/ui/invite-dialog";
import { supabase } from "@/lib/supabaseClient";

const APP_URL = window.location.origin;
const LOCK_ADDRESS = '0xac27fa800955849d6d17cc8952ba9dd6eaa66187';
const NETWORK_ID = 8453; // Base Mainnet chain ID

const web3Service = new Web3Service();

async function hasValidKey(lockAddress: string, owner: string, network: number): Promise<boolean> {
  try {
    return await web3Service.getHasValidKey(lockAddress, owner, network);
  } catch (e) {
    return false;
  }
}

interface ProposalsListProps {
  address: string;
  limit?: number;
  polls: Array<{
    id: string;
    title: string;
    description: string;
    options: string[];
    duration: string;
    createdAt: string;
    status: string;
  }>;
}

export const ProposalsList = ({ address, limit, polls }: ProposalsListProps) => {
  const [votes, setVotes] = useState<{ [pollId: string]: { [optionIdx: number]: number } }>({});
  const [userVotes, setUserVotes] = useState<{ [pollId: string]: number | null }>({});
  const [votingStates, setVotingStates] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);

  // Initialize votes state for each poll
  useEffect(() => {
    const initialVotes: { [pollId: string]: { [optionIdx: number]: number } } = {};
    const initialUserVotes: { [pollId: string]: number | null } = {};
    polls.forEach((poll) => {
      if (!votes[poll.id]) {
        initialVotes[poll.id] = {};
        poll.options.forEach((_, idx) => {
          initialVotes[poll.id][idx] = 0;
        });
      }
      if (!userVotes[poll.id]) {
        initialUserVotes[poll.id] = null;
      }
    });
    setVotes((prev) => ({ ...initialVotes, ...prev }));
    setUserVotes((prev) => ({ ...initialUserVotes, ...prev }));
    // eslint-disable-next-line
  }, [polls]);

  // Disable voting logic
  const handleVote = async (pollId: string, optionIdx: number) => {
    setError('Voting is currently disabled.');
    return;
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
          <Button size="sm" style={{ background: '#FFD600', color: '#222', fontWeight: 'bold', border: '2px solid #FFB300', marginLeft: 16 }} onClick={() => setInviteOpen(true)}>
            Invite
          </Button>
        </CardTitle>
        <InviteDialog open={inviteOpen} onOpenChange={setInviteOpen} appUrl={APP_URL} lockAddress={LOCK_ADDRESS} />
        <CardDescription className="text-gray-300">
          {limit ? "Recent Unlock DAO proposals" : "All active and past Unlock DAO proposals with delegation data"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="text-sm text-red-500 text-center">{error}</div>
        )}
        {polls.map((poll) => (
          <div key={poll.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-colors">
            <div className="space-y-4">
              {/* Proposal Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-lg">{poll.title}</h4>
                  <p className="text-gray-300 text-sm mt-1">{poll.description}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {getStatusBadge(poll.status)}
                </div>
              </div>

              {/* Voting Progress */}
              {/* You can calculate yes/no percentages from votes if you fetch them */}

              {/* Proposal Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span className="text-white">{poll.options?.length || 0} options</span>
                  </div>
                  {/* Add more stats as needed */}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  {poll.status === "active" && poll.options && poll.options.length > 0 && (
                    poll.options.map((option: string, idx: number) => (
                      <Button
                        key={idx}
                        size="sm"
                        onClick={() => handleVote(poll.id, idx)}
                        disabled={true} // Voting is disabled
                        className={"opacity-50 cursor-not-allowed border-red-500/50 text-red-400"}
                        variant={"outline"}
                      >
                        {option}
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
