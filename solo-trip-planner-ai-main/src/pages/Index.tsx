
import React, { useState } from 'react';
import { TravelForm } from '@/components/TravelForm';
import { BudgetResult } from '@/components/BudgetResult';
import { HeroSection } from '@/components/HeroSection';
import { FeatureSection } from '@/components/FeatureSection';
import { UserDashboard } from '@/components/UserDashboard';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { User, LogIn } from 'lucide-react';

const Index = () => {
  const [budgetData, setBudgetData] = useState<any>(null);
  const [tripDetails, setTripDetails] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  const handleBudgetCalculation = (data: any, formData: any) => {
    setBudgetData(data);
    setTripDetails(formData);
    setShowResult(true);
    setShowDashboard(false);
  };

  const handlePlanAnother = () => {
    setShowResult(false);
    setShowDashboard(false);
    setBudgetData(null);
    setTripDetails(null);
  };

  const handleGoBack = () => {
    setShowResult(false);
  };

  const handleShowDashboard = () => {
    setShowDashboard(true);
    setShowResult(false);
  };

  const handlePlanNewTrip = () => {
    setShowDashboard(false);
    setShowResult(false);
    setBudgetData(null);
    setTripDetails(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div 
        className="min-h-screen bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        {/* Header with Auth */}
        <div className="absolute top-4 right-4 z-10">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-white">Welcome, {user.name}</span>
              <Button
                onClick={handleShowDashboard}
                variant="outline"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <User className="h-4 w-4 mr-2" />
                My Trips
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setShowAuthModal(true)}
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          )}
        </div>

        {showDashboard ? (
          <UserDashboard onPlanNewTrip={handlePlanNewTrip} />
        ) : showResult ? (
          <BudgetResult 
            budgetData={budgetData}
            tripDetails={tripDetails}
            onPlanAnother={handlePlanAnother}
            onGoBack={handleGoBack}
          />
        ) : (
          <>
            <HeroSection />
            <div className="container mx-auto px-4 pb-16">
              <TravelForm onBudgetCalculated={handleBudgetCalculation} />
            </div>
            <FeatureSection />
          </>
        )}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default Index;
