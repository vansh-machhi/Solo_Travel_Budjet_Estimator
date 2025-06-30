
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { MapPin, Calendar, DollarSign, Trash2 } from 'lucide-react';

interface UserDashboardProps {
  onPlanNewTrip: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ onPlanNewTrip }) => {
  const { user, trips, logout, deleteTrip } = useAuth();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-200">Manage your travel plans and budgets</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={onPlanNewTrip} className="bg-green-600 hover:bg-green-700">
              Plan New Trip
            </Button>
            <Button onClick={logout} variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
              Logout
            </Button>
          </div>
        </div>

        {trips.length === 0 ? (
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips planned yet</h3>
              <p className="text-gray-600 mb-6">Start planning your first solo adventure!</p>
              <Button onClick={onPlanNewTrip} className="bg-blue-600 hover:bg-blue-700">
                Plan Your First Trip
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <Card key={trip.id} className="bg-white/95 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg">{trip.toLocation}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteTrip(trip.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>From {trip.fromLocation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{new Date(trip.travelDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span>₹{trip.budgetData.breakdown.total.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-gray-500">
                      {trip.duration} days • Created {new Date(trip.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
