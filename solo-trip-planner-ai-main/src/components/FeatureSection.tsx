
import React from 'react';
import { MapPin, Calculator, TrendingDown, Lightbulb } from 'lucide-react';

export const FeatureSection = () => {
  const features = [
    {
      icon: MapPin,
      title: "Smart Location Analysis",
      description: "Get accurate cost estimates based on real destination data and seasonal variations."
    },
    {
      icon: Calculator,
      title: "AI Budget Calculator",
      description: "Advanced algorithms analyze your preferences to provide personalized budget breakdowns."
    },
    {
      icon: TrendingDown,
      title: "Cost Optimization",
      description: "Receive intelligent suggestions to reduce costs without compromising your experience."
    },
    {
      icon: Lightbulb,
      title: "Travel Tips",
      description: "Get insider tips and recommendations tailored to your travel style and budget."
    }
  ];

  return (
    <div className="py-20 bg-white/10 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose Our AI Estimator?
          </h2>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Harness the power of artificial intelligence to plan and budget your perfect solo travel experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-200 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
