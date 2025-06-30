
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BudgetChart } from '@/components/BudgetChart';
import { DestinationInfo } from '@/components/DestinationInfo';
import { DestinationGallery } from '@/components/DestinationGallery';
import { ShareModal } from '@/components/ShareModal';
import { useAuth } from '@/contexts/AuthContext';
import { generateTripPDF } from '@/utils/pdfGenerator';
import { toast } from 'sonner';
import { 
  MapPin, 
  Plane, 
  Hotel, 
  Utensils, 
  Camera, 
  DollarSign,
  Lightbulb,
  TrendingDown,
  Download,
  RefreshCw,
  Share2,
  ArrowLeft,
  Save
} from 'lucide-react';

interface BudgetResultProps {
  budgetData: any;
  tripDetails: any;
  onPlanAnother: () => void;
  onGoBack: () => void;
}

export const BudgetResult: React.FC<BudgetResultProps> = ({ 
  budgetData, 
  tripDetails, 
  onPlanAnother, 
  onGoBack 
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { breakdown, suggestions, savings } = budgetData;
  const { user, saveTrip } = useAuth();

  const categoryIcons = {
    transport: Plane,
    stay: Hotel,
    food: Utensils,
    activities: Camera,
    miscellaneous: DollarSign
  };

  const handleDownloadPDF = async () => {
    try {
      await generateTripPDF(budgetData, tripDetails);
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      toast.error('Failed to generate PDF');
    }
  };

  const handleSaveTrip = () => {
    if (user) {
      saveTrip({ budgetData, formData: tripDetails });
      toast.success('Trip saved to your profile!');
    } else {
      toast.error('Please login to save trips');
    }
  };

  // Get dynamic background based on destination
  const getDestinationBackground = (destination: string) => {
    const city = destination.toLowerCase();
    if (city.includes('goa')) return 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2000&q=80';
    if (city.includes('manali')) return 'https://images.unsplash.com/photo-1486022419619-a57ad2aabc43?auto=format&fit=crop&w=2000&q=80';
    if (city.includes('kerala')) return 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=80';
    return 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80';
  };

  return (
    <div 
      className="min-h-screen py-12 bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${getDestinationBackground(tripDetails.toLocation)}')`
      }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onGoBack}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Form
          </Button>
          {user && (
            <Button
              onClick={handleSaveTrip}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Trip
            </Button>
          )}
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6 animate-pulse">
            <DollarSign className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Travel Budget is Ready!
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            AI-powered analysis complete. Here's your personalized budget breakdown with smart optimization tips.
          </p>
        </div>

        {/* Destination Gallery */}
        <DestinationGallery destination={tripDetails.toLocation} />

        {/* Budget Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Total Budget Card */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Total Estimated Budget</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-5xl font-bold mb-2">
                  ₹{breakdown.total.toLocaleString()}
                </div>
                <p className="text-green-100">
                  This includes all major expenses for your solo trip
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Budget Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Budget Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <BudgetChart data={breakdown} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Object.entries(breakdown).filter(([key]) => key !== 'total').map(([category, amount]) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            return (
              <Card key={category} className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold capitalize text-gray-800">{category}</h3>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    ₹{(amount as number).toLocaleString()}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${((amount as number) / breakdown.total) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {Math.round(((amount as number) / breakdown.total) * 100)}% of total budget
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Destination Information */}
        <DestinationInfo destination={tripDetails.toLocation} />

        {/* AI Suggestions and Savings */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* AI Suggestions */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                <Lightbulb className="h-6 w-6 text-yellow-500" />
                AI Travel Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestions.map((suggestion: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">{suggestion}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Money Saving Tips */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                <TrendingDown className="h-6 w-6 text-green-500" />
                Money Saving Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savings.map((saving: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">{saving}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleDownloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 text-lg"
          >
            <Download className="h-5 w-5" />
            Save as PDF
          </Button>
          
          <Button 
            onClick={() => setIsShareModalOpen(true)}
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg flex items-center gap-2 text-lg"
          >
            <Share2 className="h-5 w-5" />
            Share Trip Plan
          </Button>
          
          <Button 
            onClick={onPlanAnother}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 text-lg"
          >
            <RefreshCw className="h-5 w-5" />
            Plan Another Trip
          </Button>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        budgetData={budgetData}
        tripDetails={tripDetails}
      />
    </div>
  );
};
