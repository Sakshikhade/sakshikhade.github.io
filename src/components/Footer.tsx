import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Sakshi Khade</h3>
            <p className="text-gray-400">
              AI & Robotics Engineer | Building the future with data and intelligence
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <button
              onClick={scrollToTop}
              className="mb-4 p-3 bg-maroon-600 hover:bg-maroon-700 rounded-full transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
            
            <div className="flex items-center text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 mx-1" />
              <span>by Sakshi Khade</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Sakshi Khade. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;