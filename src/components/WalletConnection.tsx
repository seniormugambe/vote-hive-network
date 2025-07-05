import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import { ethers } from "ethers";
import { supabase } from "../lib/supabaseClient";

interface WalletConnectionProps {
  isConnected: boolean;
  onConnect: (connected: boolean) => void;
  address: string;
  onAddressChange: (address: string) => void;
}

export const WalletConnection = ({ 
  isConnected, 
  onConnect, 
  address, 
  onAddressChange 
}: WalletConnectionProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      if (!(window as any).ethereum) {
        setError("No Ethereum wallet found. Please install MetaMask.");
        setIsConnecting(false);
        return;
      }
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const walletAddress = accounts[0];
      onAddressChange(walletAddress);
      onConnect(true);
      // Upsert wallet address to Supabase users table
      await supabase.from('users').upsert([{ wallet_address: walletAddress }]);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    onConnect(false);
    onAddressChange("");
  };

  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <Button 
          onClick={handleConnect}
          disabled={isConnecting}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 transition-all duration-200 hover:scale-105"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
        {error && <span className="text-red-500 text-xs">{error}</span>}
      </div>
    );
  }

  return (
    <Card className="bg-gray-900/80 border-yellow-500/30">
      <CardContent className="p-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-yellow-500/20 rounded-full">
            <User className="h-4 w-4 text-yellow-500" />
          </div>
          <div className="flex flex-col">
            <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 mb-1">
              Connected
            </Badge>
            <span className="text-sm font-mono text-white">
              {formatAddress(address)}
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDisconnect}
            className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-white"
          >
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
