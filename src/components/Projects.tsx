import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';

const Projects: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeFilter, setActiveFilter] = useState('All');

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

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Featured Projects
          </h2>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeFilter === category
                    ? 'bg-maroon-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-maroon-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-maroon-100 dark:bg-maroon-900 text-maroon-700 dark:text-maroon-300 rounded-full text-sm">
                    {project.category}
                  </span>
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-maroon-600 dark:hover:text-gold-400 transition-colors"
                      aria-label="View demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-maroon-600 dark:hover:text-gold-400 transition-colors"
                      aria-label="View source"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Key Achievements:
                  </h4>
                  <ul className="space-y-2">
                    {project.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start text-sm text-gray-600 dark:text-gray-300"
                      >
                        <span className="w-1.5 h-1.5 bg-maroon-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;