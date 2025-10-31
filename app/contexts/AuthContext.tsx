import { router } from 'expo-router';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { User } from '@supabase/supabase-js';

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
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false)
    }
  };

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    router.replace('/(tabs)' as any);
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsAuthenticated(false);
      router.replace('/(auth)/login' as any);
    }
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
