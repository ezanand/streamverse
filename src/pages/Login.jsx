import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    try {
      setIsLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90 py-20">
      <div className="w-full max-w-md px-6">
        <div className="bg-netflixDarkGray rounded-lg p-8 shadow-xl animate-fade-in">
          <h1 className="text-3xl font-bold mb-8 text-white">Sign In</h1>
          
          {error && (
            <div className="bg-red-600 text-white p-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="input-field"
                required
              />
            </div>
            
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input-field"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 flex justify-center items-center"
            >
              {isLoading ? (
                <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : null}
              Sign In
            </button>
            
            <div className="flex justify-between items-center mt-4 text-sm">
              <label className="inline-flex items-center text-gray-400">
                <input type="checkbox" className="form-checkbox h-4 w-4 mr-2" />
                Remember me
              </label>
              
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Need help?
              </a>
            </div>
          </form>
          
          <div className="mt-8 border-t border-gray-700 pt-6">
            <p className="text-gray-400">
              New to StreamVerse?{' '}
              <Link to="/signup" className="text-white hover:underline">
                Sign up now
              </Link>
            </p>
            
            <p className="text-sm text-gray-500 mt-4">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.
            </p>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default Login;