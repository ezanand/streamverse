import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && !currentUser) {
      setRedirecting(true);
      const timer = setTimeout(() => {
        navigate('/login', { replace: true });
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [currentUser, loading, navigate]);

  if (loading || redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflixRed"></div>
      </div>
    );
  }

  return currentUser ? children : null;
};

export default ProtectedRoute;
