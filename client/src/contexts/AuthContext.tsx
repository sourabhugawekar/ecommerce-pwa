import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, api } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (name: string, email: string, password: string, phoneNumber?: string) => Promise<User>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      const savedToken = localStorage.getItem('babybliss_token');
      
      if (savedToken) {
        setToken(savedToken);
        try {
          const currentUser = await api.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error('Failed to load user:', error);
          localStorage.removeItem('babybliss_token');
        }
      }
      
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await api.login({ email, password });
      
      localStorage.setItem('babybliss_token', data.token);
      setToken(data.token);
      setUser(data.user);
      
      return data.user; // Return user data for role-based redirect
    } catch (error) {
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string, phoneNumber?: string) => {
    try {
      const data = await api.signup({ name, email, password, phoneNumber });
      
      localStorage.setItem('babybliss_token', data.token);
      setToken(data.token);
      setUser(data.user);
      
      return data.user; // Return user data
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('babybliss_token');
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    if (token) {
      try {
        const currentUser = await api.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to refresh user:', error);
      }
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    signup,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
