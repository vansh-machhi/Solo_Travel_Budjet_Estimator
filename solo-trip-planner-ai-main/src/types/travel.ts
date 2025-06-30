
export interface TravelData {
  fromLocation: string;
  toLocation: string;
  travelDate: Date;
  duration: number;
  transport: 'bus' | 'train' | 'flight' | 'personal';
  stay: 'hostel' | 'mid-hotel' | 'luxury-hotel' | 'airbnb';
  food: 'budget' | 'mid-range' | 'luxury';
  activities: string[];
  budgetRange?: string;
}

export interface BudgetBreakdown {
  transport: number;
  stay: number;
  food: number;
  activities: number;
  miscellaneous: number;
  total: number;
}

export interface BudgetResult {
  breakdown: BudgetBreakdown;
  suggestions: string[];
  savings: string[];
}
