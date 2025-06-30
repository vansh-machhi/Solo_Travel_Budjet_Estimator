
export const shareTrip = (budgetData: any, tripDetails: any) => {
  const shareText = `🌍 Planning a solo trip to ${tripDetails.toLocation} for ${tripDetails.duration} days under ₹${budgetData.breakdown.total.toLocaleString()}! 
✈️ Using AI Budget Estimator to plan smartly. 
🔗 Check it out: ${window.location.origin}`;

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTextEncoded = encodeURIComponent(shareText);
  
  return {
    whatsapp: `https://wa.me/?text=${shareTextEncoded}`,
    telegram: `https://t.me/share/url?url=${shareUrl}&text=${shareTextEncoded}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${shareTextEncoded}`,
    copyLink: () => {
      navigator.clipboard.writeText(shareText);
      return true;
    }
  };
};
