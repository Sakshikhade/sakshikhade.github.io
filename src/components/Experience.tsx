import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Building } from 'lucide-react';

const Experience: React.FC = () => {
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

  const experiences = [
    {
      title: 'Learning Something New',
      company: 'Self-Development',
      period: 'NOW',
      location: 'Open to Relocate',
      achievements: [
        'Learning new skills and technologies while actively searching for full-time employment. (Open to relocate)'
      ]
    },
    {
      title: 'Graduate Student Assistant — Real-Time Embedded Systems',
      company: 'Arizona State University',
      period: 'Aug 2025 – Dec 2025',
      location: 'Tempe, AZ',
      achievements: [
        'Assisted in teaching CSE 522: Real-Time Embedded Systems, supporting a cohort of 52 students through hands-on labs in Lingua Franca and C.',
        'Designed lab assignments from scratch and set the technical standard for concurrency, real-time scheduling, and synchronization.',
        'Conducted flipped learning sessions, run live-coding debugging sessions, and provided detailed grading/feedback on system behavior.',
        'Collaborated with course faculty weekly to iterate and improve lab materials and timing-critical assignments.'
      ]
    },
    {
      title: 'Research Analyst',
      company: 'Digitech Services Inc',
      period: 'Jul 2025 – Dec 2025',
      location: 'Remote, USA',
      achievements: [
        'Researched LLMs, embeddings, and conversational systems to improve model performance.',
        'Collaborated with cross-functional teams to support AI and data workflow improvements.',
        'Contributed to evaluation strategies for scalable AI system development.'
      ]
    },
    {
      title: 'Data Analytics Intern',
      company: 'SRRS Software Solutions Pvt. Ltd.',
      period: 'Mar 2024 – Aug 2024',
      location: 'Mumbai, India',
      achievements: [
        'Automated cleaning and transforming of 50,000+ sales records using Python and MySQL, improving data accuracy by 30%.',
        'Built 5 interactive reporting dashboards in Power BI and Tableau for live tracking of revenue trends and regional performance.',
        'Developed time-series forecasting models achieving 85% accuracy on quarterly projection trends.',
        'Established reliable data engineering pipelines with clean data extraction, transformation, and load sequences.'
      ]
    },
    {
      title: 'Front-End Developer Intern',
      company: 'The Language Network',
      period: 'Oct 2023 – Feb 2024',
      location: 'Mumbai, India',
      achievements: [
        'Rebuilt major student-facing web components, reducing page load times by 35% through lazy loading and asset management.',
        'Resolved critical cross-browser and cross-device display bugs across the edtech platform.',
        'Integrated Git-based version control into team workflows and supported the automated deployment of student dashboards.',
        'Collaborated closely with product designers and backend engineers to deliver end-to-end user features.'
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
            Work Experience
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
            
            {/* List of Experiences */}
            <div className="space-y-12 md:space-y-16">
              {experiences.map((exp, index) => (
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
                      {exp.title}
                    </h3>
                    <div className="flex items-center md:justify-end text-maroon-600 dark:text-gold-400 font-semibold text-xs sm:text-sm mt-1.5">
                      <Building className="w-3.5 h-3.5 mr-1.5" />
                      <span>{exp.company}</span>
                    </div>
                    <div className="flex items-center md:justify-end text-gray-500 dark:text-gray-400 text-xs mt-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 mr-1.5" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Middle Column (Spacer for Desktop Year representation next to the line) */}
                  <div className="hidden md:flex items-center justify-end pr-[68px]">
                    <span className="font-mono text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                      {exp.period.split(' – ')[0]}
                    </span>
                  </div>

                  {/* Right Column (Achievements list) */}
                  <div className="md:pl-8 text-left mt-3 md:mt-0 flex flex-col justify-center">
                    {/* Period badge visible on mobile */}
                    <div className="md:hidden flex items-center text-maroon-600 dark:text-gold-400 text-[11px] font-bold font-mono bg-maroon-50 dark:bg-maroon-950/35 px-2 py-0.5 rounded border border-maroon-500/10 self-start mb-2.5">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{exp.period}</span>
                    </div>
                    
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 bg-maroon-500 dark:bg-gold-400 rounded-full mt-1.5 mr-2.5 flex-shrink-0" />
                          <span>{achievement}</span>
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
export default Experience;