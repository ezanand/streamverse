import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('netflix_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      if (!email || !password) {
        reject(new Error('Email and password are required'));
        return;
      }
      
      if (password.length < 6) {
        reject(new Error('Password must be at least 6 characters'));
        return;
      }

      const user = { 
        id: 'user123', 
        email, 
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}` 
      };
      
      setCurrentUser(user);
      localStorage.setItem('netflix_user', JSON.stringify(user));
      resolve(user);
    });
  };

  const signup = (email, password, name) => {
    return new Promise((resolve, reject) => {
      if (!email || !password || !name) {
        reject(new Error('All fields are required'));
        return;
      }
      
      if (password.length < 6) {
        reject(new Error('Password must be at least 6 characters'));
        return;
      }

      const user = { 
        id: 'user' + Math.floor(Math.random() * 1000), 
        email, 
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      
      setCurrentUser(user);
      localStorage.setItem('netflix_user', JSON.stringify(user));
      resolve(user);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('netflix_user');
    return Promise.resolve();
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};