
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Users, User, CheckCircle, ArrowRight, Trash2 } from "lucide-react";
import { ethers } from "ethers";
import { supabase } from "../lib/supabaseClient";
import { InviteDialog } from "@/components/ui/invite-dialog";

// Unlock Protocol Token (ERC20Votes) on Base
const UNLOCK_TOKEN_ADDRESS = "0xac27fa800955849d6d17cc8952ba9dd6eaa66187";
const ERC20Votes_ABI = [
  "function delegate(address delegatee) external",
  "function delegates(address account) view returns (address)",
  "function getVotes(address account) view returns (uint256)"
];

const stewards = [
  { address: "0xabc123456789abcdef0000000000000000000001", name: "Mr Dhaboye" },
  { address: "0xdef123456789abcdef0000000000000000000002", name: "Rena Governance" },
  { address: "0x789123456789abcdef0000000000000000000003", name: "Carol DAO" }
];

interface DelegationPanelProps {
  address: string;
  expanded?: boolean;
  onVoteDelete?: () => void;
}

export const DelegationPanel = ({ address, expanded = false, onVoteDelete }: DelegationPanelProps) => {
  const [delegationType, setDelegationType] = useState("self");
  const [customAddress, setCustomAddress] = useState("");
  const [selectedSteward, setSelectedSteward] = useState(stewards[0].address);
  const [isDelegating, setIsDelegating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);

  // Mock data - in real app, this would come from blockchain
  const [delegationStatus, setDelegationStatus] = useState({
    currentDelegatee: {
      address: "0x1234567890abcdef1234567890abcdef12345678",
      name: "Self",
      isActive: true
    },
    votingPower: "1,250",
    delegatedVotes: "0",
    lastUpdated: "2024-01-15"
  });

  const popularDelegates = [
    { address: "0xabc123...", name: "Mr Dhaboye", votes: "12,450", successRate: "92%" },
    { address: "0xdef456...", name: "Rena Governance", votes: "8,320", successRate: "87%" },
    { address: "0x789xyz...", name: "Carol DAO", votes: "6,180", successRate: "95%" }
  ];

  const APP_URL = window.location.origin;
  const LOCK_ADDRESS = '0xac27fa800955849d6d17cc8952ba9dd6eaa66187';

  // Helper to get the delegatee address based on selection
  const getDelegatee = () => {
    if (delegationType === "self") return address;
    if (delegationType === "popular") return selectedSteward;
    if (delegationType === "custom") return customAddress;
    return address;
  };

  // On-chain delegation logic
  const handleDelegate = async () => {
    setIsDelegating(true);
    setError(null);
    setSuccess(null);
    try {
      if (!(window as any).ethereum) throw new Error("No Ethereum wallet found. Please install MetaMask.");
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(UNLOCK_TOKEN_ADDRESS, ERC20Votes_ABI, signer);
      const delegatee = getDelegatee();
      if (!ethers.isAddress(delegatee)) throw new Error("Invalid delegatee address.");
      const tx = await contract.delegate(delegatee);
      await tx.wait();
      setSuccess("Delegation successful!");
      // Record in Supabase
      await supabase.from("delegations").insert([
        {
          delegator_address: address,
          delegatee_address: delegatee,
          timestamp: new Date().toISOString(),
          revoked: false
        }
      ]);
    } catch (err: any) {
      setError(err.message || "Delegation failed.");
    } finally {
      setIsDelegating(false);
    }
  };

  // On-chain revoke (delegate to self) and record deletion
  const handleDeleteVote = async () => {
    setIsDeleting(true);
    setError(null);
    setSuccess(null);
    try {
      if (!(window as any).ethereum) throw new Error("No Ethereum wallet found. Please install MetaMask.");
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(UNLOCK_TOKEN_ADDRESS, ERC20Votes_ABI, signer);
      const tx = await contract.delegate(address); // delegate to self
      await tx.wait();
      setSuccess("Delegation revoked (reset to self)!");
      // Record revocation in Supabase
      await supabase.from("delegations").insert([
        {
          delegator_address: address,
          delegatee_address: address,
          timestamp: new Date().toISOString(),
          revoked: true,
          revoked_at: new Date().toISOString()
        }
      ]);
      if (onVoteDelete) onVoteDelete();
    } catch (err: any) {
      setError(err.message || "Revocation failed.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Fetch delegation history from Supabase
  useEffect(() => {
    if (!address) return;
    setHistoryLoading(true);
    setHistoryError(null);
    supabase
      .from("delegations")
      .select("*")
      .eq("delegator_address", address)
      .order("timestamp", { ascending: false })
      .then(({ data, error }) => {
        if (error) setHistoryError(error.message);
        else setHistory(data || []);
        setHistoryLoading(false);
      });
  }, [address, success, error]);

  const revocationCount = history.filter((h) => h.revoked).length;

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <Card className="bg-gray-900/80 border-yellow-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Users className="h-5 w-5 text-yellow-500" />
          <span>Delegation Panel</span>
          <Button size="sm" style={{ background: '#FFD600', color: '#222', fontWeight: 'bold', border: '2px solid #FFB300', marginLeft: 16 }} onClick={() => setInviteOpen(true)}>
            Invite
          </Button>
        </CardTitle>
        <InviteDialog open={inviteOpen} onOpenChange={setInviteOpen} appUrl={APP_URL} lockAddress={LOCK_ADDRESS} />
        <CardDescription className="text-gray-300">
          Manage your delegation and invite others to participate.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Delegation Status Display */}
        <div className="space-y-4">
          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-white text-lg">Delegation Status</h4>
              <Badge variant={delegationStatus.currentDelegatee.isActive ? "default" : "secondary"} 
                     className="bg-green-500/20 text-green-400 border-green-500/50">
                {delegationStatus.currentDelegatee.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Current Delegatee</p>
                <p className="text-white font-medium">{delegationStatus.currentDelegatee.name}</p>
                <p className="text-xs font-mono text-gray-400">{formatAddress(delegationStatus.currentDelegatee.address)}</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Your Voting Power</p>
                <p className="text-2xl font-bold text-yellow-400">{delegationStatus.votingPower}</p>
                <p className="text-xs text-gray-400">votes available</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700">
              <div>
                <p className="text-xs text-gray-400">Delegated Votes Received</p>
                <p className="text-sm text-white font-medium">{delegationStatus.delegatedVotes}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Last Updated</p>
                <p className="text-sm text-white">{delegationStatus.lastUpdated}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delegation/Revocation History */}
        <div className="space-y-2">
          <h4 className="text-white font-semibold text-lg flex items-center">History <span className="ml-2 text-xs text-red-400">{revocationCount} revocations</span></h4>
          {historyLoading ? (
            <div className="text-gray-400 text-sm">Loading history...</div>
          ) : historyError ? (
            <div className="text-red-500 text-sm">{historyError}</div>
          ) : history.length === 0 ? (
            <div className="text-gray-400 text-sm">No delegation history found.</div>
          ) : (
            <ul className="space-y-1 max-h-40 overflow-y-auto">
              {history.map((event) => (
                <li key={event.id} className="flex items-center justify-between p-2 bg-gray-800/50 rounded border border-gray-700">
                  <div>
                    <span className={event.revoked ? "text-red-400" : "text-yellow-400"}>
                      {event.revoked ? "Revocation" : "Delegation"}
                    </span>
                    <span className="ml-2 text-white font-mono text-xs">{event.delegatee_address.slice(0, 6)}...{event.delegatee_address.slice(-4)}</span>
                  </div>
                  <span className="text-gray-400 text-xs">{new Date(event.timestamp).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
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
                  <span>Choose from Popular Unlock Stewards</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Select from trusted community members</p>
                <select
                  className="mt-2 bg-gray-800 border border-gray-700 text-white rounded px-2 py-1"
                  value={selectedSteward}
                  onChange={e => setSelectedSteward(e.target.value)}
                  disabled={delegationType !== "popular"}
                >
                  {stewards.map(steward => (
                    <option key={steward.address} value={steward.address}>{steward.name} ({steward.address.slice(0, 6)}...{steward.address.slice(-4)})</option>
                  ))}
                </select>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button 
            onClick={handleDelegate}
            disabled={isDelegating || (delegationType === "custom" && !customAddress) || (delegationType === "popular" && !selectedSteward)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
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
            {isDeleting ? "Revoking..." : "Revoke Delegation"}
          </Button>

          <Button
            onClick={() => {
              setDelegationType("self");
              handleDelegate();
            }}
            disabled={isDelegating}
            variant="outline"
            className="border-gray-500/50 text-gray-400 hover:bg-gray-500/10 hover:text-gray-300"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Reset to Self
          </Button>
        </div>
        {/* Show error/success messages */}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        {success && <div className="text-green-500 text-sm mt-2">{success}</div>}
      </CardContent>
    </Card>
  );
};
