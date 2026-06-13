import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white/30 dark:bg-black/45 backdrop-blur-md border-t border-maroon-900/10 dark:border-gold-500/10 text-gray-900 dark:text-gray-100 py-8 sm:py-12 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-white">Sakshi Khade</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              AI Engineer &middot; Full-Stack Developer &middot; Data Engineer
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <button
              onClick={scrollToTop}
              className="mb-3 sm:mb-4 p-2 sm:p-3 bg-maroon-600 dark:bg-gold-400 text-white dark:text-gray-900 hover:bg-maroon-700 dark:hover:bg-gold-500 rounded-full transition-all duration-300 shadow-md hover:scale-105"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 mx-1.5 fill-red-500 animate-pulse" />
              <span>by Sakshi Khade</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-maroon-900/5 dark:border-gold-500/5 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
          <p>&copy; 2026 Sakshi Khade. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;