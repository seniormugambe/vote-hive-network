
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Users, User, ArrowRight } from "lucide-react";

interface DelegationPanelProps {
  address: string;
  expanded?: boolean;
}

const STEWARDS = [
  { address: "0xA1B2C3D4E5F6789012345678901234567890ABCD", name: "Alice Johnson", votes: "2,847", description: "DeFi Expert" },
  { address: "0xB2C3D4E5F6789012345678901234567890ABCDE1", name: "Bob Smith", votes: "1,923", description: "Protocol Developer" },
  { address: "0xC3D4E5F6789012345678901234567890ABCDE12", name: "Carol Williams", votes: "3,156", description: "Governance Lead" },
  { address: "0xD4E5F6789012345678901234567890ABCDE123", name: "David Brown", votes: "897", description: "Community Manager" },
];

export const DelegationPanel = ({ address, expanded = false }: DelegationPanelProps) => {
  const [currentDelegate, setCurrentDelegate] = useState("Self");
  const [customAddress, setCustomAddress] = useState("");
  const [votingPower, setVotingPower] = useState("1,250");

  const handleDelegate = (delegateAddress: string, name?: string) => {
    setCurrentDelegate(name || `${delegateAddress.slice(0, 6)}...${delegateAddress.slice(-4)}`);
    setCustomAddress("");
  };

  const handleCustomDelegate = () => {
    if (customAddress) {
      handleDelegate(customAddress);
    }
  };

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="space-y-6">
      {/* Current Delegation Status */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-yellow-500" />
            <span>Your Delegation Status</span>
          </CardTitle>
          <CardDescription>Current voting power and delegation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
            <div>
              <p className="text-sm text-gray-400">Voting Power</p>
              <p className="text-2xl font-bold text-yellow-500">{votingPower}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Delegated To</p>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                {currentDelegate}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delegation Options */}
      <Card className="bg-gray-900 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-yellow-500" />
            <span>Delegate Your Vote</span>
          </CardTitle>
          <CardDescription>
            Choose a trusted steward or delegate to a custom address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Self Delegation */}
          <div className="p-4 border border-gray-700 rounded-lg hover:border-yellow-500/50 transition-colors">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">Delegate to Self</h4>
                <p className="text-sm text-gray-400">Keep your voting power</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => handleDelegate(address, "Self")}
                className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
              >
                Select
              </Button>
            </div>
          </div>

          {/* Trusted Stewards */}
          <div className="space-y-3">
            <h4 className="font-semibold text-yellow-400">Trusted Stewards</h4>
            {STEWARDS.map((steward) => (
              <div 
                key={steward.address}
                className="p-4 border border-gray-700 rounded-lg hover:border-yellow-500/50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-semibold">{steward.name}</h5>
                      <Badge variant="secondary" className="text-xs">
                        {steward.votes} votes
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">{steward.description}</p>
                    <p className="text-xs font-mono text-gray-500">
                      {formatAddress(steward.address)}
                    </p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => handleDelegate(steward.address, steward.name)}
                    className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
                  >
                    Delegate
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Address */}
          <div className="space-y-3">
            <Label htmlFor="custom-address" className="text-yellow-400">
              Custom Address
            </Label>
            <div className="flex space-x-2">
              <Input
                id="custom-address"
                placeholder="0x..."
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                className="bg-black/50 border-gray-600 focus:border-yellow-500"
              />
              <Button 
                onClick={handleCustomDelegate}
                disabled={!customAddress}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
