import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, MapPin, Calendar, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const Education: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const education = [
    {
      degree: 'Master of Science in Robotics and Autonomous Systems (AI)',
      school: 'Arizona State University',
      location: 'Tempe, AZ',
      period: '2024 - 2026',
      gpa: '3.72',
      coursework: [
        'Machine Learning',
        'Computer Vision',
        'Robotics Systems',
        'Artificial Intelligence',
        'Deep Learning',
        'Natural Language Processing'
      ]
    },
    {
      degree: 'Bachelor of Engineering in Information Technology',
      school: 'Terna Engineering College',
      location: 'Mumbai, India',
      period: '2020 - 2024',
      gpa: '3.32',
      coursework: [
        'Data Structures & Algorithms',
        'Database Management Systems',
        'Software Engineering',
        'Web Development',
        'Operating Systems',
        'Network Security'
      ]
    }
  ];

  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlay || education.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % education.length);
    }, 10000); 
    return () => clearInterval(interval);
  }, [isAutoPlay, education.length]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [education.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % education.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + education.length) % education.length);
  };

  return (
    <section id="education" className="py-12 sm:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
            Education
          </h2>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Carousel Navigation */}
            {education.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
                  aria-label="Previous education"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
                  aria-label="Next education"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </>
            )}

            {/* Carousel Container */}
            <div 
              className="overflow-hidden mx-8"
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-maroon-50 to-gold-50 dark:from-gray-800 dark:to-gray-700 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div className="flex items-start mb-4 lg:mb-0">
                      <div className="p-3 bg-maroon-100 dark:bg-maroon-900 rounded-lg mr-4">
                        <GraduationCap className="w-6 h-6 text-maroon-600 dark:text-maroon-300" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {education[currentIndex].degree}
                        </h3>
                        <p className="text-base sm:text-lg text-maroon-600 dark:text-gold-400 font-semibold mb-2">
                          {education[currentIndex].school}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 dark:text-gray-300 space-y-1 sm:space-y-0 sm:space-x-4">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {education[currentIndex].location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {education[currentIndex].period}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full">
                      <Award className="w-4 h-4 text-maroon-600 dark:text-gold-400 mr-2" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        GPA: {education[currentIndex].gpa}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Relevant Coursework:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {education[currentIndex].coursework.map((course) => (
                        <span
                          key={course}
                          className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            {education.length > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {education.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-maroon-600 dark:bg-gold-400'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-label={`Go to education ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;