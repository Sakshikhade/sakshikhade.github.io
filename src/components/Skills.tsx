import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Wrench, Layout } from 'lucide-react';

const Skills: React.FC = () => {

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

  return (
    <section className="h-full flex items-center justify-center py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
        >
          Technical Skills
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">{skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-maroon-100 dark:bg-maroon-900 rounded-lg">
                      <Icon className="w-6 h-6 text-maroon-600 dark:text-maroon-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">
                      {category.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;