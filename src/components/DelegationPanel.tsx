
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Users, User, CheckCircle, ArrowRight, Trash2 } from "lucide-react";

interface DelegationPanelProps {
  address: string;
  expanded?: boolean;
  onVoteDelete?: () => void;
}

export const DelegationPanel = ({ address, expanded = false, onVoteDelete }: DelegationPanelProps) => {
  const [delegationType, setDelegationType] = useState("self");
  const [customAddress, setCustomAddress] = useState("");
  const [isDelegating, setIsDelegating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Mock data - in real app, this would come from blockchain
  const currentDelegate = {
    address: "0x1234567890abcdef1234567890abcdef12345678",
    name: "Self",
    votingPower: "1,250"
  };

  const popularDelegates = [
    { address: "0xabc123...", name: "Alice Protocol", votes: "12,450", successRate: "92%" },
    { address: "0xdef456...", name: "Bob Governance", votes: "8,320", successRate: "87%" },
    { address: "0x789xyz...", name: "Carol DAO", votes: "6,180", successRate: "95%" }
  ];

  const handleDelegate = async () => {
    setIsDelegating(true);
    // Simulate delegation transaction
    setTimeout(() => {
      setIsDelegating(false);
    }, 2000);
  };

  const handleDeleteVote = async () => {
    setIsDeleting(true);
    // Simulate vote deletion
    setTimeout(() => {
      setIsDeleting(false);
      if (onVoteDelete) {
        onVoteDelete();
      }
    }, 1500);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <Card className="bg-gray-900/80 border-yellow-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Users className="h-5 w-5 text-yellow-500" />
          <span>Delegation Manager</span>
        </CardTitle>
        <CardDescription className="text-gray-300">
          Delegate your voting power or vote directly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Delegation Status */}
        <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">Currently Delegated To</h4>
              <p className="text-sm text-gray-300">{currentDelegate.name}</p>
              <p className="text-xs font-mono text-gray-400">{formatAddress(currentDelegate.address)}</p>
            </div>
            <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
              {currentDelegate.votingPower} votes
            </Badge>
          </div>
        </div>

        {/* Delegation Options */}
        <div className="space-y-4">
          <Label className="text-white font-medium">Choose Delegation Option</Label>
          <RadioGroup value={delegationType} onValueChange={setDelegationType}>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-colors">
              <RadioGroupItem value="self" id="self" className="border-gray-400 text-yellow-500" />
              <Label htmlFor="self" className="text-white cursor-pointer flex-1">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-yellow-500" />
                  <span>Delegate to Self</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Vote directly on all proposals</p>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-colors">
              <RadioGroupItem value="popular" id="popular" className="border-gray-400 text-yellow-500" />
              <Label htmlFor="popular" className="text-white cursor-pointer flex-1">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-yellow-500" />
                  <span>Choose from Popular Delegates</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Select from trusted community members</p>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-colors">
              <RadioGroupItem value="custom" id="custom" className="border-gray-400 text-yellow-500" />
              <Label htmlFor="custom" className="text-white cursor-pointer flex-1">
                <div className="flex items-center space-x-2">
                  <ArrowRight className="h-4 w-4 text-yellow-500" />
                  <span>Custom Address</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Enter a specific wallet address</p>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Popular Delegates List */}
        {delegationType === "popular" && (
          <div className="space-y-3">
            <Label className="text-white font-medium">Popular Delegates</Label>
            {popularDelegates.map((delegate, index) => (
              <div key={index} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-white">{delegate.name}</h5>
                    <p className="text-xs font-mono text-gray-400">{delegate.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white">{delegate.votes} votes</p>
                    <p className="text-xs text-green-400">{delegate.successRate} success</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Address Input */}
        {delegationType === "custom" && (
          <div className="space-y-2">
            <Label htmlFor="customAddress" className="text-white">Delegate Address</Label>
            <Input
              id="customAddress"
              placeholder="0x..."
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-yellow-500"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button 
            onClick={handleDelegate}
            disabled={isDelegating || (delegationType === "custom" && !customAddress)}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
          >
            {isDelegating ? "Delegating..." : "Update Delegation"}
          </Button>
          
          <Button
            onClick={handleDeleteVote}
            disabled={isDeleting}
            variant="outline"
            className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {isDeleting ? "Deleting..." : "Delete Vote"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
