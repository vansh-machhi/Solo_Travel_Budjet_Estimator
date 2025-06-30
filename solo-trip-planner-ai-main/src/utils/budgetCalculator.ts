
import { TravelData, BudgetResult, BudgetBreakdown } from '@/types/travel';

export class BudgetCalculator {
  private cityMultipliers: { [key: string]: number } = {
    'goa': 1.2,
    'manali': 0.9,
    'ladakh': 1.1,
    'kerala': 1.0,
    'rajasthan': 0.8,
    'himachal': 0.9,
    'mumbai': 1.3,
    'delhi': 1.1,
    'bangalore': 1.2,
    'chennai': 1.0,
    'kolkata': 0.9,
    'pune': 1.1,
    'default': 1.0
  };

  private transportCosts = {
    bus: { basePrice: 500, perKm: 2 },
    train: { basePrice: 800, perKm: 3 },
    flight: { basePrice: 3000, perKm: 8 },
    personal: { basePrice: 200, perKm: 5 }
  };

  private stayCosts = {
    hostel: 750,
    'mid-hotel': 3000,
    'luxury-hotel': 8000,
    airbnb: 2000
  };

  private foodCosts = {
    budget: 300,
    'mid-range': 800,
    luxury: 2000
  };

  private activityCosts = {
    'Sightseeing': 500,
    'Adventure': 1500,
    'Shopping': 2000,
    'Cultural Experiences': 800,
    'Nightlife': 1200
  };

  calculateBudget(data: TravelData): BudgetResult {
    const cityMultiplier = this.getCityMultiplier(data.toLocation);
    const distance = this.estimateDistance(data.fromLocation, data.toLocation);
    
    // Calculate transport cost
    const transportBase = this.transportCosts[data.transport];
    const transportCost = transportBase.basePrice + (distance * transportBase.perKm);

    // Calculate stay cost
    const stayCostPerNight = this.stayCosts[data.stay] * cityMultiplier;
    const totalStayCost = stayCostPerNight * data.duration;

    // Calculate food cost
    const foodCostPerDay = this.foodCosts[data.food] * cityMultiplier;
    const totalFoodCost = foodCostPerDay * data.duration;

    // Calculate activities cost
    const totalActivitiesCost = data.activities.reduce((sum, activity) => {
      return sum + (this.activityCosts[activity as keyof typeof this.activityCosts] || 0) * cityMultiplier;
    }, 0);

    // Calculate miscellaneous (10% of total)
    const subtotal = transportCost + totalStayCost + totalFoodCost + totalActivitiesCost;
    const miscellaneousCost = subtotal * 0.1;

    const breakdown: BudgetBreakdown = {
      transport: Math.round(transportCost),
      stay: Math.round(totalStayCost),
      food: Math.round(totalFoodCost),
      activities: Math.round(totalActivitiesCost),
      miscellaneous: Math.round(miscellaneousCost),
      total: Math.round(subtotal + miscellaneousCost)
    };

    const suggestions = this.generateSuggestions(data, breakdown, cityMultiplier);
    const savings = this.generateSavings(data, breakdown);

    return { breakdown, suggestions, savings };
  }

  private getCityMultiplier(destination: string): number {
    const city = destination.toLowerCase();
    for (const [key, multiplier] of Object.entries(this.cityMultipliers)) {
      if (city.includes(key)) {
        return multiplier;
      }
    }
    return this.cityMultipliers.default;
  }

  private estimateDistance(from: string, to: string): number {
    // Simplified distance estimation (in real app, use Google Maps API)
    const distances: { [key: string]: number } = {
      'mumbai-goa': 450,
      'delhi-manali': 540,
      'bangalore-kerala': 350,
      'mumbai-rajasthan': 600,
      'delhi-ladakh': 1000,
      'default': 500
    };

    const route = `${from.toLowerCase()}-${to.toLowerCase()}`;
    const reverseRoute = `${to.toLowerCase()}-${from.toLowerCase()}`;
    
    return distances[route] || distances[reverseRoute] || distances.default;
  }

  private generateSuggestions(data: TravelData, breakdown: BudgetBreakdown, cityMultiplier: number): string[] {
    const suggestions = [];

    // Transport suggestions
    if (data.transport === 'flight' && breakdown.transport > 5000) {
      suggestions.push("Consider train travel to save ₹2000-3000 on transportation");
    }

    // Stay suggestions
    if (data.stay === 'luxury-hotel') {
      suggestions.push("Try mid-range hotels or Airbnb to save 40-60% on accommodation");
    }

    // Food suggestions
    if (data.food === 'luxury') {
      suggestions.push("Mix luxury dining with local food to save ₹800-1200 per day");
    }

    // Seasonal suggestions
    const month = data.travelDate.getMonth();
    if (month >= 10 || month <= 2) { // Winter months
      suggestions.push("Great choice! You're traveling in off-season to save 15-25% on overall costs");
    } else if (month >= 3 && month <= 5) { // Summer
      suggestions.push("Consider hill stations during summer for better weather and reasonable prices");
    }

    // City-specific suggestions
    if (cityMultiplier > 1.1) {
      suggestions.push("This is a premium destination. Book accommodations early for better deals");
    }

    return suggestions.slice(0, 3); // Return top 3 suggestions
  }

  private generateSavings(data: TravelData, breakdown: BudgetBreakdown): string[] {
    const savings = [];

    if (data.transport === 'flight') {
      savings.push("Book flights 45-60 days in advance to save up to 30%");
    }

    if (data.activities.length > 3) {
      savings.push("Look for combo activity packages to save ₹500-1000");
    }

    savings.push("Use travel apps for last-minute hotel deals");
    savings.push("Carry a reusable water bottle to save ₹50-100 daily");

    return savings;
  }
}
