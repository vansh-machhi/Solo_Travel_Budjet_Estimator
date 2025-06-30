
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, MapPin, Clock, Bus, Train, Plane, Hotel, Utensils } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { BudgetCalculator } from '@/utils/budgetCalculator';
import { TravelData } from '@/types/travel';
import { AnimatedTeddyBear } from '@/components/AnimatedTeddyBear';

interface TravelFormProps {
  onBudgetCalculated: (data: any, formData: any) => void;
}

export const TravelForm: React.FC<TravelFormProps> = ({ onBudgetCalculated }) => {
  const [formData, setFormData] = useState<TravelData>({
    fromLocation: '',
    toLocation: '',
    travelDate: new Date(),
    duration: 3,
    transport: 'flight',
    stay: 'mid-hotel',
    food: 'mid-range',
    activities: [],
    budgetRange: ''
  });

  const [isCalculating, setIsCalculating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    
    // Simulate AI calculation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const calculator = new BudgetCalculator();
    const result = calculator.calculateBudget(formData);
    
    setIsCalculating(false);
    onBudgetCalculated(result, formData);
  };

  const transportOptions = [
    { value: 'bus', label: 'Bus', icon: Bus },
    { value: 'train', label: 'Train', icon: Train },
    { value: 'flight', label: 'Flight', icon: Plane },
    { value: 'personal', label: 'Personal Vehicle', icon: MapPin }
  ];

  const stayOptions = [
    { value: 'hostel', label: 'Budget Hostel', price: '₹500-1000/night' },
    { value: 'mid-hotel', label: 'Mid-range Hotel', price: '₹2000-4000/night' },
    { value: 'luxury-hotel', label: 'Luxury Hotel', price: '₹6000+/night' },
    { value: 'airbnb', label: 'Airbnb', price: '₹1500-3000/night' }
  ];

  const foodOptions = [
    { value: 'budget', label: 'Budget Local', price: '₹200-400/day' },
    { value: 'mid-range', label: 'Mid-range', price: '₹600-1000/day' },
    { value: 'luxury', label: 'Luxury Restaurants', price: '₹1500+/day' }
  ];

  const activityOptions = [
    'Sightseeing', 'Adventure', 'Shopping', 'Cultural Experiences', 'Nightlife'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Animated Teddy Bear */}
      <AnimatedTeddyBear />
      
      <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Plan Your Solo Adventure
          </CardTitle>
          <p className="text-gray-600 mt-2">Fill in your travel preferences for personalized budget estimation</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Location Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="from" className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  From Location
                </Label>
                <Input
                  id="from"
                  placeholder="e.g., Mumbai, Delhi"
                  value={formData.fromLocation}
                  onChange={(e) => setFormData({...formData, fromLocation: e.target.value})}
                  required
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="to" className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Destination
                </Label>
                <Input
                  id="to"
                  placeholder="e.g., Goa, Manali, Ladakh"
                  value={formData.toLocation}
                  onChange={(e) => setFormData({...formData, toLocation: e.target.value})}
                  required
                  className="h-12"
                />
              </div>
            </div>

            {/* Date and Duration */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Travel Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left font-normal",
                        !formData.travelDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.travelDate ? format(formData.travelDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.travelDate}
                      onSelect={(date) => date && setFormData({...formData, travelDate: date})}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Trip Duration (Days)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  max="30"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                  className="h-12"
                />
              </div>
            </div>

            {/* Transport Mode */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Mode of Transport</Label>
              <RadioGroup
                value={formData.transport}
                onValueChange={(value: any) => setFormData({...formData, transport: value})}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {transportOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label 
                      htmlFor={option.value} 
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <option.icon className="h-4 w-4" />
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Stay Type */}
            <div className="space-y-4">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Hotel className="h-4 w-4" />
                Type of Stay
              </Label>
              <RadioGroup
                value={formData.stay}
                onValueChange={(value: any) => setFormData({...formData, stay: value})}
                className="grid md:grid-cols-2 gap-4"
              >
                {stayOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="cursor-pointer flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-500">{option.price}</div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Food Preference */}
            <div className="space-y-4">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                Food Preference
              </Label>
              <RadioGroup
                value={formData.food}
                onValueChange={(value: any) => setFormData({...formData, food: value})}
                className="grid md:grid-cols-3 gap-4"
              >
                {foodOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="cursor-pointer flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-500">{option.price}</div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Activities */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Activities (Select multiple)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {activityOptions.map((activity) => (
                  <label key={activity} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.activities.includes(activity)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({...formData, activities: [...formData.activities, activity]});
                        } else {
                          setFormData({...formData, activities: formData.activities.filter(a => a !== activity)});
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{activity}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isCalculating}
            >
              {isCalculating ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Calculating Your Perfect Budget...
                </div>
              ) : (
                'Calculate My Travel Budget'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
