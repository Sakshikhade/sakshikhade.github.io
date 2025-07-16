import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, FileText, Briefcase } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="h-full flex items-center justify-center bg-gradient-to-br from-maroon-50 via-white to-gold-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Sakshi Sanjay Khade
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI & Robotics M.S. Candidate @ ASU | Data-Driven Engineer
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative group">
              <a
                href="mailto:skhade5@asu.edu"
                className="flex items-center space-x-2 px-6 py-3 bg-maroon-600 text-white rounded-full hover:bg-maroon-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>Contact Me</span>
              </a>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 whitespace-nowrap">
                Looking forward to connect with you!
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45"></div>
              </div>
            </div>
            
            <div className="relative group">
              <a
                href="https://linkedin.com/in/sakshikhade16/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 border-2 border-maroon-600 text-maroon-600 dark:text-gold-400 dark:border-gold-400 rounded-full hover:bg-maroon-600 hover:text-white dark:hover:bg-gold-400 dark:hover:text-gray-900 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 whitespace-nowrap">
                Let's connect professionally!
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45"></div>
              </div>
            </div>
            
            <div className="relative group">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-maroon-600 text-white rounded-full hover:bg-maroon-700 transition-colors"
              >
                <FileText className="w-5 h-5" />
                <span>Resume</span>
              </a>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 whitespace-nowrap">
                Check out my experience and skills!
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45"></div>
              </div>
            </div>
            
            <div className="relative group">
              <a
                href="mailto:skhade5@asu.edu"
                className="flex items-center space-x-2 px-6 py-3 border-2 border-maroon-600 text-maroon-600 dark:text-gold-400 dark:border-gold-400 rounded-full hover:bg-maroon-600 hover:text-white dark:hover:bg-gold-400 dark:hover:text-gray-900 transition-colors"
              >
                <Briefcase className="w-5 h-5" />
                <span>Hire me!</span>
              </a>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 whitespace-nowrap">
                Ready to join your team!
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="inline-block animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;