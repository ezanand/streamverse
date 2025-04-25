import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 pt-12 pb-8 text-gray-400">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6 space-x-6">
          <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">
            <Facebook size={20} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-white transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-white transition-colors">
            <Youtube size={20} />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-white transition-colors">Accessibility</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Content Guidelines</Link></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-white transition-colors">Support Center</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Ad Preferences</Link></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-white transition-colors">Gift Subscriptions</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Company Info</Link></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-white transition-colors">Press Room</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Get in Touch</Link></li>
            </ul>
          </div>
        </div>

        <div className="mb-6">
          <button className="text-sm border border-gray-700 px-2 py-1 hover:text-white transition-colors">
            Creator Mode
          </button>
        </div>

        <div className="text-xs">
          <p>&copy; {new Date().getFullYear()} StreamVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
