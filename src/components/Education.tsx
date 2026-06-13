import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';

const Education: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [mainContainer, setMainContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMainContainer(document.querySelector('main'));
  }, []);

  // Set up container scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: mainContainer ? { current: mainContainer } : undefined,
    offset: ["start center", "end center"]
  });

  // Map scroll progress to line height and dot position
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const education = [
    {
      degree: 'Master of Science in Robotics and Autonomous Systems (AI)',
      school: 'Arizona State University',
      location: 'Tempe, AZ',
      period: '2024 - 2026',
      gpa: '3.81',
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
    <section ref={containerRef} className="min-h-screen w-full flex flex-col justify-center py-12 sm:py-16 md:py-20 relative">
      <div className="container mx-auto px-4 max-w-4xl my-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-10 sm:mb-16">
            Education
          </h2>
          
          <div className="relative max-w-3xl mx-auto pl-10 md:pl-0">
            {/* Timeline scroll path line */}
            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-2 bottom-2 w-1 bg-gray-200 dark:bg-gray-800/60 rounded-full pointer-events-none">
              {/* Highlight fill line */}
              <motion.div 
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-purple-500 via-fuchsia-500 to-violet-500 rounded-full origin-top"
                style={{ height: lineHeight }}
              />
              {/* Glowing scroll-pointer dot */}
              <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-500 border-2 border-white dark:border-gray-950 shadow-[0_0_12px_rgba(168,85,247,0.85)] z-25"
                style={{ top: dotY }}
              />
            </div>
            
            {/* List of Education */}
            <div className="space-y-12 md:space-y-16">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative md:grid md:grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)] md:gap-0 flex flex-col text-left"
                >
                  {/* Left Column (Desktop: Right aligned) */}
                  <div className="md:text-right md:pr-8 flex flex-col justify-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                      {edu.degree}
                    </h3>
                    <div className="flex items-center md:justify-end text-maroon-600 dark:text-gold-400 font-semibold text-xs sm:text-sm mt-1.5">
                      <GraduationCap className="w-3.5 h-3.5 mr-1.5" />
                      <span>{edu.school}</span>
                    </div>
                    <div className="flex items-center md:justify-end text-gray-500 dark:text-gray-400 text-xs mt-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 mr-1.5" />
                      <span>{edu.location}</span>
                    </div>
                    <div className="flex items-center md:justify-end text-maroon-600 dark:text-gold-400 text-xs mt-1 font-semibold">
                      <Award className="w-3.5 h-3.5 mr-1.5" />
                      <span>GPA: {edu.gpa}</span>
                    </div>
                  </div>

                  {/* Middle Column (Spacer for Desktop Year representation next to the line) */}
                  <div className="hidden md:flex items-center justify-end pr-[68px]">
                    <span className="font-mono text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                      {edu.period.split(' - ')[1]}
                    </span>
                  </div>

                  {/* Right Column (Coursework list) */}
                  <div className="md:pl-8 text-left mt-3 md:mt-0 flex flex-col justify-center">
                    {/* Period badge visible on mobile */}
                    <div className="md:hidden flex items-center text-maroon-600 dark:text-gold-400 text-[11px] font-bold font-mono bg-maroon-50 dark:bg-maroon-950/35 px-2 py-0.5 rounded border border-maroon-500/10 self-start mb-2.5">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      <span>{edu.period}</span>
                    </div>
                    
                    <ul className="space-y-2">
                      {edu.coursework.map((course, i) => (
                        <li
                          key={i}
                          className="flex items-start text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 bg-maroon-500 dark:bg-gold-400 rounded-full mt-1.5 mr-2.5 flex-shrink-0" />
                          <span>{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;