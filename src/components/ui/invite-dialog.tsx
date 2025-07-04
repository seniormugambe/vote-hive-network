import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface InviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appUrl: string;
  lockAddress: string;
}

export function InviteDialog({ open, onOpenChange, appUrl, lockAddress }: InviteDialogProps) {
  const [copied, setCopied] = useState(false);
  const checkoutUrl = `https://app.unlock-protocol.com/checkout?locks=${lockAddress}&network=8453`;
  const inviteMessage = `Hi!\n\nI’d like to invite you to participate in our community governance.\n\nYou can vote in polls and delegate your voting power!\n\n1. Visit: ${appUrl}\n2. Connect your wallet (MetaMask, Coinbase Wallet, etc.)\n3. If you don’t have a membership key, get one here: ${checkoutUrl}\n4. Once you have a key, you’ll be able to vote and delegate!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Someone to Vote or Delegate</DialogTitle>
          <DialogDescription>
            Share this message with anyone you want to invite to vote in polls or participate in delegations:
          </DialogDescription>
        </DialogHeader>
        <div className="bg-gray-900 rounded p-3 text-sm whitespace-pre-wrap border border-gray-700 mb-3">
          {inviteMessage}
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCopy}>{copied ? "Copied!" : "Copy to Clipboard"}</Button>
          <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">Unlock Checkout</Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
} 