import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, AuthContextType, User } from '../types/auth';
import { 
  authenticateUser, 
  generateMockJWT, 
  isTokenValid,
  AUTH_STORAGE_KEY,
  USER_STORAGE_KEY,
} from '../services/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const initialAuthState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialAuthState);

  const restoreSession = useCallback(async () => {
    try {
      const [token, userJson] = await Promise.all([
        AsyncStorage.getItem(AUTH_STORAGE_KEY),
        AsyncStorage.getItem(USER_STORAGE_KEY),
      ]);

      if (token && userJson && isTokenValid(token)) {
        const user = JSON.parse(userJson) as User;
        setState({
          user,
          token,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        });
      } else {
        await clearStorage();
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Error restoring session:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const clearStorage = async () => {
    await Promise.all([
      AsyncStorage.removeItem(AUTH_STORAGE_KEY),
      AsyncStorage.removeItem(USER_STORAGE_KEY),
    ]);
  };

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const authResult = authenticateUser(email, password);

      if (!authResult.success) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: authResult.error || 'Login failed',
        }));
        return false;
      }

      if (!authResult.user) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Authentication failed',
        }));
        return false;
      }

      const token = generateMockJWT(authResult.user);

      await Promise.all([
        AsyncStorage.setItem(AUTH_STORAGE_KEY, token),
        AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authResult.user)),
      ]);

      setState({
        user: authResult.user,
        token,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });

      return true;
    } catch (error) {
      console.error('Login error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'An unexpected error occurred',
      }));
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await clearStorage();
      setState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  if (state.isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
