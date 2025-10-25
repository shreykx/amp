import { router } from 'expo-router';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
  email: string;
  name: string | null;
  givenName: string | null;
  familyName: string | null;
  id: string;
  photo: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing authentication state
    // This could be checking AsyncStorage, SecureStore, or your auth service
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      // TODO: Implement actual auth state check
      // For now, we'll simulate a check
      setIsLoading(false);
      // Default to showing auth screen
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error checking auth state:', error);
      setIsLoading(false);
      setIsAuthenticated(false);
    }
  };

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    router.replace('/(tabs)' as any);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    router.replace('/(auth)/login' as any);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
