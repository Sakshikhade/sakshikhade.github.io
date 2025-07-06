import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';

const Education: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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

  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Education
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-maroon-50 to-gold-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div className="flex items-start mb-4 lg:mb-0">
                    <div className="p-3 bg-maroon-100 dark:bg-maroon-900 rounded-lg mr-4">
                      <GraduationCap className="w-6 h-6 text-maroon-600 dark:text-maroon-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {edu.degree}
                      </h3>
                      <p className="text-lg text-maroon-600 dark:text-gold-400 font-semibold mb-2">
                        {edu.school}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 dark:text-gray-300 space-y-1 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {edu.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {edu.period}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full">
                    <Award className="w-4 h-4 text-maroon-600 dark:text-gold-400 mr-2" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      GPA: {edu.gpa}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Relevant Coursework:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
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
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;