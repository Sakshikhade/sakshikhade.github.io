import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const projects = [
    {
      title: 'Traffic Data Pipeline',
      category: 'Data Engineering',
      description: 'Real-time data pipeline processing traffic information with machine learning forecasting capabilities and interactive dashboards.',
      technologies: ['Python', 'Apache Spark', 'MySQL', 'Power BI', 'Machine Learning'],
      achievements: [
        '88% forecast accuracy for traffic prediction',
        'Real-time data processing pipeline',
        'Interactive Power BI dashboard',
        'Scalable architecture for large datasets'
      ],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Emotion Classification System',
      category: 'Machine Learning',
      description: 'Advanced emotion detection system using physiological signals and deep learning models for real-time classification.',
      technologies: ['Python', 'CNN', 'LSTM', 'TensorFlow', 'Signal Processing'],
      achievements: [
        'Real-time fear vs. excitement detection',
        'CNN and LSTM model implementation',
        'Heart rate and SpO₂ signal analysis',
        'High accuracy emotion classification'
      ],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Twitter Sentiment Analysis',
      category: 'NLP',
      description: 'Large-scale sentiment analysis system processing thousands of tweets daily using advanced NLP techniques and transformers.',
      technologies: ['Python', 'NLP', 'Transformers', 'BERT', 'Data Processing'],
      achievements: [
        '93% accuracy on sentiment classification',
        'Processing 50K+ tweets daily',
        'Transformer-based model architecture',
        'Scalable text processing pipeline'
      ],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'CROPIFY',
      category: 'Machine Learning',
      description: 'Agricultural intelligence platform providing crop recommendations and disease detection using computer vision and machine learning.',
      technologies: ['Python', 'Random Forest', 'Computer Vision', 'Image Processing', 'Agriculture'],
      achievements: [
        '95% accuracy in crop recommendations',
        '92% accuracy in fertilizer recommendations',
        'Image-based disease detection',
        'Comprehensive agricultural insights'
      ],
      demoUrl: '#',
      githubUrl: '#'
    }
  ];

  const categories = ['All', 'Data Engineering', 'Machine Learning', 'NLP'];
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setCurrentProjectIndex(0);
  };

  if (filteredProjects.length === 0) return null;

  const currentProject = filteredProjects[currentProjectIndex];

  return (
    <section className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12 mt-24 sm:mt-28">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
              Featured Projects
            </h2>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
              {categories.map((category) => {
                const isActive = activeFilter === category || 
                  (activeFilter === 'All' && category === currentProject.category);
                
                return (
                  <button
                    key={category}
                    onClick={() => handleFilterChange(category)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-all text-sm sm:text-base ${
                      isActive
                        ? 'bg-maroon-600 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-maroon-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative px-4 sm:px-12 md:px-24">
            {/* Navigation Buttons */}
            <button
              onClick={prevProject}
              className="absolute left-2 sm:left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 sm:p-3 bg-white dark:bg-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
              disabled={filteredProjects.length <= 1}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
            </button>
            
            <button
              onClick={nextProject}
              className="absolute right-2 sm:right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 sm:p-3 bg-white dark:bg-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
              disabled={filteredProjects.length <= 1}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Project Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeFilter}-${currentProjectIndex}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 min-h-[350px] sm:min-h-[400px] max-w-3xl mx-auto"
              >
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-start h-full">
                  {/* Left Column - Project Info */}
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <span className="px-2 sm:px-3 py-1 bg-maroon-100 dark:bg-maroon-900 text-maroon-700 dark:text-maroon-300 rounded-full text-xs sm:text-sm font-medium">
                          {currentProject.category}
                        </span>
                        <div className="flex space-x-2 sm:space-x-3">
                          <a
                            href={currentProject.demoUrl}
                            className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:text-maroon-600 dark:hover:text-gold-400 transition-colors"
                            aria-label="View demo"
                          >
                            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                          </a>
                          <a
                            href={currentProject.githubUrl}
                            className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:text-maroon-600 dark:hover:text-gold-400 transition-colors"
                            aria-label="View source"
                          >
                            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                          </a>
                        </div>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                        {currentProject.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                        {currentProject.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {currentProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Achievements */}
                  <div className="flex flex-col h-full">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                      Key Achievements
                    </h4>
                    <ul className="space-y-1.5 sm:space-y-2 flex-grow">
                      {currentProject.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start text-gray-600 dark:text-gray-300 text-xs sm:text-sm"
                        >
                          <span className="w-1.5 h-1.5 bg-maroon-500 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 sm:mt-8 space-x-1 sm:space-x-1.5">
              {filteredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProjectIndex(index)}
                  className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-all ${
                    index === currentProjectIndex
                      ? 'bg-maroon-600 w-2 sm:w-3'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Project Counter */}
            <div className="text-center mt-6">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {currentProjectIndex + 1} of {filteredProjects.length}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
