import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial auth state from localStorage or sessionStorage
    const storedToken = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
    const storedUser = localStorage.getItem('admin_user') || sessionStorage.getItem('admin_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error parsing saved admin session', err);
        clearAuthData();
      }
    }
    setLoading(false);
  }, []);

  const clearAuthData = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    sessionStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_user');
    setUser(null);
    setToken(null);
  };

  const login = async (email, password, rememberMe = false) => {
    const res = await authService.login(email, password, rememberMe);
    const { token: jwtToken, user: userData } = res.data;

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('admin_token', jwtToken);
    storage.setItem('admin_user', JSON.stringify(userData));

    setToken(jwtToken);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    clearAuthData();
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const newObj = { ...prev, ...updatedFields };
      if (localStorage.getItem('admin_user')) {
        localStorage.setItem('admin_user', JSON.stringify(newObj));
      }
      if (sessionStorage.getItem('admin_user')) {
        sessionStorage.setItem('admin_user', JSON.stringify(newObj));
      }
      return newObj;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        loading,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
