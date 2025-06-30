
import React from 'react';
import { MapPin, Calculator, Plane } from 'lucide-react';

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
      
      <div className="relative container mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Plane className="h-16 w-16 text-white animate-pulse" />
              <div className="absolute -top-2 -right-2">
                <Calculator className="h-8 w-8 text-yellow-300" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Solo Travel
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Budget Estimator
            </span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Plan your perfect solo adventure with AI-powered budget estimation. 
            Get personalized cost breakdowns and smart saving tips for your dream destination.
          </p>
          
          <div className="flex items-center justify-center space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>500+ Destinations</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>AI-Powered Estimates</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
