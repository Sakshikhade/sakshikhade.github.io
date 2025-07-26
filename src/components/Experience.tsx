import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Building, ChevronLeft, ChevronRight } from 'lucide-react';

const Experience: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Auto-advance carousel on mobile
  useEffect(() => {
    if (!isMobile) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % experiences.length);
    }, 10000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [isMobile]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % experiences.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  const experiences = [
    {
      title: 'Project Management Intern',
      company: 'SRRS Software Solutions',
      period: 'Mar 2024 – Aug 2024',
      location: 'Remote',
      achievements: [
        'Planned & executed ERP implementations for multiple clients',
        'Coordinated sprint planning using Excel and Trello',
        'Maintained comprehensive project documentation',
        'Facilitated cross-team communication and stakeholder alignment'
      ]
    },
    {
      title: 'Front-end Development Intern',
      company: 'The Language Network',
      period: 'Oct 2023 – Feb 2024',
      location: 'Remote',
      achievements: [
        'Built responsive UIs using HTML, CSS, JavaScript, and Bootstrap',
        'Integrated Git workflows for version control and collaboration',
        'Optimized application performance across multiple devices',
        'Collaborated on UI/UX fixes and enhancements'
      ]
    }
  ];

  return (
    <section className="h-full flex items-center justify-center py-12 sm:py-20 bg-white dark:bg-gray-900 overflow-y-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
            Professional Experience
          </h2>
          
          {/* Desktop Layout - Show all experiences */}
          <div className="hidden lg:block max-w-4xl mx-auto space-y-6 sm:space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 sm:mb-6">
                  <div className="mb-4 lg:mb-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {exp.title}
                    </h3>
                    <div className="flex items-center text-maroon-600 dark:text-gold-400 mb-2">
                      <Building className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="font-semibold text-sm sm:text-base">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex flex-col lg:items-end text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{exp.period}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{exp.location}</span>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-2 sm:space-y-3">
                  {exp.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm sm:text-base text-gray-700 dark:text-gray-300"
                    >
                      <span className="w-2 h-2 bg-maroon-500 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0"></span>
                      <span className="leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Mobile/Tablet Layout - Carousel */}
          <div className="lg:hidden max-w-4xl mx-auto relative">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-6 sm:p-8 rounded-2xl shadow-lg"
                >
                  <div className="flex flex-col mb-4 sm:mb-6">
                    <div className="mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {experiences[currentSlide].title}
                      </h3>
                      <div className="flex items-center text-maroon-600 dark:text-gold-400 mb-2">
                        <Building className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="font-semibold text-sm sm:text-base">{experiences[currentSlide].company}</span>
                      </div>
                    </div>
                    <div className="flex flex-col text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{experiences[currentSlide].period}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{experiences[currentSlide].location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 sm:space-y-3">
                    {experiences[currentSlide].achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start text-sm sm:text-base text-gray-700 dark:text-gray-300"
                      >
                        <span className="w-2 h-2 bg-maroon-500 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0"></span>
                        <span className="leading-relaxed">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-maroon-600 dark:text-gold-400 p-2 rounded-full shadow-lg hover:shadow-xl transition-all z-10 border border-gray-200 dark:border-gray-700"
              aria-label="Previous experience"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-maroon-600 dark:text-gold-400 p-2 rounded-full shadow-lg hover:shadow-xl transition-all z-10 border border-gray-200 dark:border-gray-700"
              aria-label="Next experience"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {experiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-maroon-600 dark:bg-gold-400'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-maroon-400 dark:hover:bg-gold-300'
                  }`}
                  aria-label={`Go to experience ${index + 1}`}
                />
              ))}
            </div>

            {/* Experience Counter */}
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {currentSlide + 1} of {experiences.length}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;