'use client';
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useCallback,
} from 'react';
import Cookies from 'js-cookie';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { ReconditionHouse } from '@/model/type';
import { getMyInfo } from '@/helper';
import { User } from '@/types/auth';

interface AuthContextType {
  user: ReconditionHouse | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<User>;
  loading: boolean;
}

const handleError = (errorResponse: { [key: string]: string | string[] }) => {
  if (typeof errorResponse === 'object') {
    Object.entries(errorResponse).forEach(([key, value]) => {
      const message = Array.isArray(value) ? value.join(', ') : value;
      enqueueSnackbar(message, { variant: 'error' });
    });
  } else {
    enqueueSnackbar(errorResponse || 'An unexpected error occurred.', {
      variant: 'error',
    });
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<ReconditionHouse | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(!!Cookies.get('refreshToken'));
  const router = useRouter();

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/auth/jwt/refresh/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: refreshToken }),
        },
      );

      if (response.ok) {
        const { access } = await response.json();
        Cookies.set('accessToken', access, { expires: 7, path: '/' });
        setIsAuthenticated(true);
        return access;
      } else {
        enqueueSnackbar('Session expired. Please log in again.', {
          variant: 'error',
        });
        logout();
      }
    } catch (error) {
      console.error('Access token refresh error:', error);
    }
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/auth/jwt/create/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        },
      );

      if (response.ok) {
        const { access, refresh } = await response.json();
        Cookies.set('accessToken', access, { expires: 7, path: '/' });
        Cookies.set('refreshToken', refresh, { expires: 7, path: '/' });

        const userData = await getMyInfo(access);
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem('activeReconUser', JSON.stringify(userData));
        }
        enqueueSnackbar('Login successful', { variant: 'success' });
        router.push('/');
        return access;
      } else {
        const errorResponse = await response.json();
        handleError(errorResponse);
        return null;
      }
    } catch (error) {
      enqueueSnackbar('Login failed', { variant: 'error' });
      console.error('Login error:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/auth/users/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        },
      );

      if (response.ok) {
        enqueueSnackbar('Registration successful! Please log in.', {
          variant: 'success',
        });
        router.push('/login');
        return response.json();
      } else {
        const errorResponse = await response.json();
        handleError(errorResponse);
        return null;
      }
    } catch (error) {
      enqueueSnackbar('Sign up failed. Please try again.', {
        variant: 'error',
      });
      console.error('Sign up error:', error);
      return;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    localStorage.removeItem('activeReconUser');
    enqueueSnackbar('Logout successful', { variant: 'success' });
    router.push('/login');
  }, [router]);

  useEffect(() => {
    const initializeAuth = async () => {
      const refreshToken = Cookies.get('refreshToken');
      if (refreshToken) {
        await refreshAccessToken();
      }
      setLoading(false);
    };

    initializeAuth();
  }, [refreshAccessToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        refreshAccessToken,
        loading,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
