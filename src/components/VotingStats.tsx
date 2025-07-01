
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Vote, Award } from "lucide-react";

interface VotingStatsProps {
  address: string;
}

export const VotingStats = ({ address }: VotingStatsProps) => {
  // Mock data - in real app, this would come from blockchain/API
  const stats = {
    totalVotingPower: "1,250",
    proposalsVoted: 23,
    delegateesCount: 12,
    successRate: 78
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Voting Power</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Vote className="h-5 w-5 text-yellow-500" />
            <span className="text-2xl font-bold text-white">{stats.totalVotingPower}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Tokens delegated to you</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Proposals Voted</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <span className="text-2xl font-bold text-white">{stats.proposalsVoted}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Total participation</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Delegatees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-400" />
            <span className="text-2xl font-bold text-white">{stats.delegateesCount}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">People who trust you</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Success Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-purple-400" />
            <span className="text-2xl font-bold text-white">{stats.successRate}%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Winning vote ratio</p>
        </CardContent>
      </Card>
    </div>
  );
};
