
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface Trip {
  id: string;
  fromLocation: string;
  toLocation: string;
  travelDate: string;
  duration: number;
  budgetData: any;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  trips: Trip[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  saveTrip: (tripData: any) => void;
  deleteTrip: (tripId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('travelBudgetUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      // Load user's trips
      const savedTrips = localStorage.getItem(`trips_${userData.id}`);
      if (savedTrips) {
        setTrips(JSON.parse(savedTrips));
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple localStorage-based authentication
    const users = JSON.parse(localStorage.getItem('travelBudgetUsers') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      const userData = { id: user.id, email: user.email, name: user.name };
      setUser(userData);
      localStorage.setItem('travelBudgetUser', JSON.stringify(userData));
      
      // Load user's trips
      const savedTrips = localStorage.getItem(`trips_${user.id}`);
      if (savedTrips) {
        setTrips(JSON.parse(savedTrips));
      }
      
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('travelBudgetUsers') || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return false;
    }
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password
    };
    
    users.push(newUser);
    localStorage.setItem('travelBudgetUsers', JSON.stringify(users));
    
    const userData = { id: newUser.id, email: newUser.email, name: newUser.name };
    setUser(userData);
    localStorage.setItem('travelBudgetUser', JSON.stringify(userData));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setTrips([]);
    localStorage.removeItem('travelBudgetUser');
  };

  const saveTrip = (tripData: any) => {
    if (!user) return;
    
    const newTrip: Trip = {
      id: Date.now().toString(),
      fromLocation: tripData.formData.fromLocation,
      toLocation: tripData.formData.toLocation,
      travelDate: tripData.formData.travelDate.toISOString(),
      duration: tripData.formData.duration,
      budgetData: tripData.budgetData,
      createdAt: new Date().toISOString()
    };
    
    const updatedTrips = [...trips, newTrip];
    setTrips(updatedTrips);
    localStorage.setItem(`trips_${user.id}`, JSON.stringify(updatedTrips));
  };

  const deleteTrip = (tripId: string) => {
    if (!user) return;
    
    const updatedTrips = trips.filter(trip => trip.id !== tripId);
    setTrips(updatedTrips);
    localStorage.setItem(`trips_${user.id}`, JSON.stringify(updatedTrips));
  };

  return (
    <AuthContext.Provider value={{
      user,
      trips,
      login,
      register,
      logout,
      saveTrip,
      deleteTrip
    }}>
      {children}
    </AuthContext.Provider>
  );
};
