import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Wrench, Layout, ChevronLeft, ChevronRight } from 'lucide-react';

const Skills: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  React.useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const skillCategories = [
    {
      icon: Code,
      title: 'Programming Languages',
      skills: ['C/C++', 'Python', 'R', 'SQL', 'JavaScript', 'Lingua Franca']
    },
    {
      icon: Database,
      title: 'Tools & Platforms',
      skills: ['Firebase', 'Git', 'AWS', 'MATLAB', 'Power BI', 'Tableau']
    },
    {
      icon: Wrench,
      title: 'Frameworks',
      skills: ['React', 'Node.js', 'Bootstrap', 'Apache Spark', 'TensorFlow']
    },
    {
      icon: Layout,
      title: 'Applications',
      skills: ['Figma', 'Adobe Suite', 'Salesforce', 'Microsoft Office', 'Trello']
    }
  ];

  const totalSlides = Math.ceil(skillCategories.length / itemsPerView);

  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlay || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, totalSlides]);

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
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getVisibleItems = () => {
    const start = currentIndex * itemsPerView;
    return skillCategories.slice(start, start + itemsPerView);
  };

  return (
    <section className="h-full flex items-center justify-center py-12 sm:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12"
        >
          Technical Skills
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Carousel Navigation */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
                aria-label="Previous skills"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
                aria-label="Next skills"
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
                className={`grid gap-6 lg:gap-8 ${
                  itemsPerView === 1 
                    ? 'grid-cols-1' 
                    : itemsPerView === 2 
                    ? 'grid-cols-2' 
                    : 'grid-cols-4'
                }`}
              >
                {getVisibleItems().map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={`${currentIndex}-${category.title}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-center mb-4">
                        <div className="p-2 sm:p-3 bg-maroon-100 dark:bg-maroon-900 rounded-lg">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-maroon-600 dark:text-maroon-300" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white ml-2 sm:ml-3 leading-tight">
                          {category.title}
                        </h3>
                      </div>
                      
                      <div className="space-y-2">
                        {category.skills.map((skill) => (
                          <div
                            key={skill}
                            className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-maroon-600 dark:bg-gold-400'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;