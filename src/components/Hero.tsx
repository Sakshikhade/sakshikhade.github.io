import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Linkedin, Mail, FileText, Github } from 'lucide-react';
import NeuralCanvas from './NeuralCanvas';
import InteractiveConsole from './InteractiveConsole';

const titles = [
  "AI Engineer",
  "Full-Stack Developer",
  "Data Engineer",
  "Robotics & AI M.S. @ ASU"
];

const Hero: React.FC = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(currentTitle.substring(0, currentText.length - 1));
      }, 30);
    } else {
      timer = setTimeout(() => {
        setCurrentText(currentTitle.substring(0, currentText.length + 1));
      }, 70);
    }

    if (!isDeleting && currentText === currentTitle) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex]);

  return (
    <section className="min-h-screen w-full flex flex-col relative py-20 lg:py-24">
      {/* Interactive canvas behind everything */}
      <NeuralCanvas />

      <div className="container mx-auto px-4 z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Intro */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 text-left space-y-4 sm:space-y-6"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-maroon-100/80 dark:bg-maroon-900/30 text-maroon-700 dark:text-gold-400 text-xs sm:text-sm font-semibold border border-maroon-500/10">
              <span className="w-2 h-2 rounded-full bg-maroon-600 dark:bg-gold-400 animate-pulse" />
              <span>Seeking Full-Time Opportunities starting May 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
              Hi, I'm <br className="hidden sm:inline" />
              <span className="font-signature bg-gradient-to-r from-maroon-600 to-maroon-400 dark:from-gold-400 dark:to-gold-200 bg-clip-text text-transparent text-5xl sm:text-6xl md:text-7xl block mt-3 font-normal tracking-wide py-2">
                Sakshi Sanjay Khade
              </span>
            </h1>
            
            <div className="min-h-[40px] text-lg sm:text-xl md:text-2xl font-mono text-gray-600 dark:text-gray-300">
              <span className="typing-cursor font-bold text-maroon-600 dark:text-gold-400">{currentText}</span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
              I build end-to-end intelligent systems—from data ingestion and signal processing pipelines to AI models, backend APIs, and responsive dashboards. Master's candidate in Robotics & AI at Arizona State University.
            </p>
            
            {/* Quick action buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
              <a
                href="mailto:skhade5@asu.edu"
                className="flex items-center justify-center space-x-2 px-5 py-3 bg-maroon-600 text-white rounded-full hover:bg-maroon-700 transition-colors shadow-lg hover:shadow-maroon-600/20 text-sm sm:text-base font-semibold"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Email Me</span>
              </a>
              
              <a
                href="https://www.linkedin.com/in/sakshikhade16/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-5 py-3 border-2 border-maroon-600 text-maroon-600 dark:text-gold-400 dark:border-gold-400 rounded-full hover:bg-maroon-600 hover:text-white dark:hover:bg-gold-400 dark:hover:text-gray-900 transition-all text-sm sm:text-base font-semibold"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>LinkedIn</span>
              </a>
              
              <a
                href="/Sakshi%20Master%20Resume%20.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-5 py-3 bg-maroon-600 text-white rounded-full hover:bg-maroon-700 transition-colors shadow-lg hover:shadow-maroon-600/20 text-sm sm:text-base font-semibold"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Resume</span>
              </a>

              <a
                href="https://github.com/Sakshikhade/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-5 py-3 border-2 border-maroon-600 text-maroon-600 dark:text-gold-400 dark:border-gold-400 rounded-full hover:bg-maroon-600 hover:text-white dark:hover:bg-gold-400 dark:hover:text-gray-900 transition-all text-sm sm:text-base font-semibold"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>
          
          {/* Right Column - Terminal Console */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 flex justify-center w-full z-20"
          >
            <InteractiveConsole />
          </motion.div>
        </div>
      </div>
      
      {/* Floating scroll down arrow */}
      <motion.div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 hidden lg:block"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
      >
        <ChevronDown className="w-6 h-6 text-gray-400 dark:text-gray-600" />
      </motion.div>
    </section>
  );
};

export default Hero;