
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { shareTrip } from '@/utils/shareUtils';
import { toast } from 'sonner';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  budgetData: any;
  tripDetails: any;
}

export const ShareModal: React.FC<ShareModalProps> = ({ 
  isOpen, 
  onClose, 
  budgetData, 
  tripDetails 
}) => {
  const handleShare = (platform: string) => {
    const shareLinks = shareTrip(budgetData, tripDetails);
    
    switch (platform) {
      case 'whatsapp':
        window.open(shareLinks.whatsapp, '_blank');
        break;
      case 'telegram':
        window.open(shareLinks.telegram, '_blank');
        break;
      case 'facebook':
        window.open(shareLinks.facebook, '_blank');
        break;
      case 'twitter':
        window.open(shareLinks.twitter, '_blank');
        break;
      case 'copy':
        shareLinks.copyLink();
        toast.success('Link copied to clipboard!');
        break;
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Trip Plan</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => handleShare('whatsapp')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            WhatsApp
          </Button>
          
          <Button
            onClick={() => handleShare('telegram')}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Telegram
          </Button>
          
          <Button
            onClick={() => handleShare('facebook')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Facebook
          </Button>
          
          <Button
            onClick={() => handleShare('twitter')}
            className="bg-sky-500 hover:bg-sky-600 text-white"
          >
            Twitter
          </Button>
          
          <Button
            onClick={() => handleShare('copy')}
            variant="outline"
            className="col-span-2"
          >
            Copy Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
