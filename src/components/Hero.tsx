import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-maroon-50 via-white to-gold-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
            className="flex justify-center space-x-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="mailto:skhade5@asu.edu"
              className="flex items-center space-x-2 px-6 py-3 bg-maroon-600 text-white rounded-full hover:bg-maroon-700 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Me</span>
            </a>
            <a
              href="https://linkedin.com/in/SAKSHI-KHADE"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-6 py-3 border-2 border-maroon-600 text-maroon-600 dark:text-gold-400 dark:border-gold-400 rounded-full hover:bg-maroon-600 hover:text-white dark:hover:bg-gold-400 dark:hover:text-gray-900 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a href="#about" className="inline-block animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;