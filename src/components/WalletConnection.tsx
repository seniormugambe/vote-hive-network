
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

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

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      const mockAddress = "0x1234567890abcdef1234567890abcdef12345678";
      onAddressChange(mockAddress);
      onConnect(true);
      setIsConnecting(false);
    }, 1500);
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
      <Button 
        onClick={handleConnect}
        disabled={isConnecting}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 transition-all duration-200 hover:scale-105"
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
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
