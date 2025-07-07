import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section className="h-full flex items-center justify-center py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
        >
          About Me
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm a passionate AI and Robotics graduate student at Arizona State University, 
                combining technical expertise with real-world problem-solving. My journey spans 
                from data engineering pipelines to machine learning applications, always focused 
                on creating impactful solutions.
              </p>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                With a strong foundation in computer science and hands-on experience in both 
                project management and software development, I bridge the gap between technical 
                innovation and practical implementation.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-maroon-100 dark:bg-maroon-900 text-maroon-700 dark:text-maroon-300 rounded-full text-sm">
                  Python
                </span>
                <span className="px-4 py-2 bg-maroon-100 dark:bg-maroon-900 text-maroon-700 dark:text-maroon-300 rounded-full text-sm">
                  Apache Spark
                </span>
                <span className="px-4 py-2 bg-maroon-100 dark:bg-maroon-900 text-maroon-700 dark:text-maroon-300 rounded-full text-sm">
                  Power BI
                </span>
                <span className="px-4 py-2 bg-maroon-100 dark:bg-maroon-900 text-maroon-700 dark:text-maroon-300 rounded-full text-sm">
                  React
                </span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-maroon-50 to-gold-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-maroon-600 dark:text-gold-400 mb-2">
                    3.72
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Master's GPA
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-maroon-600 dark:text-gold-400 mb-2">
                    4+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Years Experience
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-maroon-600 dark:text-gold-400 mb-2">
                    10+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Projects Completed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-maroon-600 dark:text-gold-400 mb-2">
                    5
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Programming Languages
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;