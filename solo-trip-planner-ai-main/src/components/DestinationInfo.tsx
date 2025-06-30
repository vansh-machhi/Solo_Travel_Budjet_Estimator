
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Info, Heart, AlertTriangle } from 'lucide-react';

interface DestinationInfoProps {
  destination: string;
}

export const DestinationInfo: React.FC<DestinationInfoProps> = ({ destination }) => {
  const getDestinationInfo = (dest: string) => {
    const city = dest.toLowerCase();
    
    const destinationData: { [key: string]: any } = {
      'goa': {
        safety: ['Generally safe for solo travelers', 'Avoid isolated beaches at night', 'Keep valuables secure'],
        tips: ['Best time: November to February', 'Try local seafood', 'Rent a scooter for easy travel'],
        cultural: ['Respect local customs', 'Dress modestly in religious places', 'Portuguese influence in architecture'],
        images: [
          'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80'
        ]
      },
      'manali': {
        safety: ['Mountain weather can change quickly', 'Carry warm clothes', 'Inform someone about your itinerary'],
        tips: ['Best time: March to June, September to December', 'Try local Himachali cuisine', 'Book accommodation in advance'],
        cultural: ['Respect local traditions', 'Remove shoes before entering temples', 'Ask before photographing locals'],
        images: [
          'https://images.unsplash.com/photo-1486022419619-a57ad2aabc43?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80'
        ]
      },
      'default': {
        safety: ['Research your destination', 'Keep emergency contacts handy', 'Trust your instincts'],
        tips: ['Pack light but smart', 'Learn basic local phrases', 'Keep digital copies of documents'],
        cultural: ['Respect local customs', 'Dress appropriately', 'Be open to new experiences'],
        images: [
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80'
        ]
      }
    };

    for (const [key, data] of Object.entries(destinationData)) {
      if (city.includes(key)) {
        return data;
      }
    }
    return destinationData.default;
  };

  const info = getDestinationInfo(destination);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <Shield className="h-5 w-5" />
            Safety Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {info.safety.map((tip: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <Info className="h-5 w-5" />
            Travel Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {info.tips.map((tip: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-600">
            <Heart className="h-5 w-5" />
            Cultural Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {info.cultural.map((tip: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
