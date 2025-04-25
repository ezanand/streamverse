import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, Bell, Menu, X, Film, Tv, Bookmark, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setSearchVisible(false);
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuOpen && !e.target.closest('.profile-menu')) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${scrolled || searchVisible || mobileMenuOpen ? 'bg-netflixBlack' : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-10">
            <svg width="32" height="32" viewBox="0 0 24 24" className="text-netflixRed fill-current">
              <path d="M5 2V22L13.43 18.03C13.8 17.89 14.198 17.82 14.598 17.82H15C17.757 17.82 20 15.577 20 12.82V5C20 3.343 18.657 2 17 2H5Z" />
              <path d="M5 2V22L8.574 20.598C8.698 20.547 8.83 20.52 8.963 20.52H9.5C11.433 20.52 13 18.953 13 17.02V4.5C13 3.12 11.88 2 10.5 2H5Z" className="fill-[#B20710]" />
            </svg>
            <span className="text-xl font-bold ml-2">StreamVerse</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm hover:text-white font-medium transition-colors">Home</Link>
            <Link to="/movies" className="text-sm hover:text-white font-medium transition-colors">Movies</Link>
            <Link to="/tv" className="text-sm hover:text-white font-medium transition-colors">TV Shows</Link>
          </nav>
        </div>

        {/* Search and User Options */}
        <div className="flex items-center space-x-4">
          {searchVisible ? (
            <div className="animate-fade-in">
              <SearchBar onClose={() => setSearchVisible(false)} />
            </div>
          ) : (
            <button
              onClick={() => setSearchVisible(true)}
              className="p-2 hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          )}

          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center hover:text-white transition-colors focus:outline-none"
                aria-label="Account"
              >
                <img
                  src={currentUser.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded"
                />
              </button>

              {profileMenuOpen && (
                <div className="profile-menu absolute right-0 mt-2 w-48 bg-netflixDarkGray rounded-md shadow-lg py-1 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm text-white font-medium">{currentUser.name}</p>
                    <p className="text-xs text-gray-400">{currentUser.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/my-list"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                  >
                    <Bookmark size={16} className="mr-2" />
                    My List
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-700 transition-colors"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-primary">Sign In</Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:text-white transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-netflixBlack border-t border-gray-800 px-4 py-2 animate-fade-in">
          <nav className="flex flex-col space-y-3 py-3">
            <Link to="/" className="flex items-center text-sm hover:text-white font-medium transition-colors py-2">
              <Film size={16} className="mr-2" />
              Home
            </Link>
            <Link to="/movies" className="flex items-center text-sm hover:text-white font-medium transition-colors py-2">
              <Film size={16} className="mr-2" />
              Movies
            </Link>
            <Link to="/tv" className="flex items-center text-sm hover:text-white font-medium transition-colors py-2">
              <Tv size={16} className="mr-2" />
              TV Shows
            </Link>
            {currentUser && (
              <Link to="/my-list" className="flex items-center text-sm hover:text-white font-medium transition-colors py-2">
                <Bookmark size={16} className="mr-2" />
                My List
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
