import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Code, Briefcase, GraduationCap } from 'lucide-react';

const CountUp: React.FC<{ end: number; decimals?: number; duration?: number }> = ({ end, decimals = 0, duration = 1.2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const frames = duration * 60;
    const increment = end / frames;
    let currentFrame = 0;

    const handle = setInterval(() => {
      currentFrame++;
      start += increment;
      if (currentFrame >= frames) {
        setCount(end);
        clearInterval(handle);
      } else {
        setCount(start);
      }
    }, 1000 / 60);

    return () => clearInterval(handle);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toFixed(decimals)}</span>;
};

const About: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const timelineItems = [
    { year: '2020', title: 'IT Bachelor\'s Degree', desc: 'Began B.E. in IT at Terna College, Mumbai University, getting hands-on with IoT and big data.' },
    { year: '2023', title: 'Front-End Developer Intern', desc: 'Rebuilt student experience at The Language Network, reducing page loads by 35%.' },
    { year: '2024', title: 'Data Analytics Intern & Grad', desc: 'Automated sales pipelines at SRRS Software, improving accuracy by 30%. Began M.S. at ASU.' },
    { year: '2025', title: 'Graduate TA & Embedded Systems', desc: 'TA for Graduate Real-Time Embedded Systems at ASU, teaching concurrency and timing critical labs.' }
  ];

  return (
    <section className="min-h-screen w-full flex flex-col justify-center py-12 sm:py-16 md:py-20 relative">
      <div ref={containerRef} className="container mx-auto px-4 max-w-5xl my-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12"
        >
          About My Journey
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Left Column - Biography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm a Master's student in Robotics and Autonomous Systems (AI) at Arizona State University, graduating in May 2026 with a GPA of 3.81. My work sits at the intersection of machine learning, full-stack engineering, and data systems — I don't just build models, I build the entire pipeline around them: the data ingestion, the APIs, the dashboards, and the deployment infrastructure.
            </p>
            
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Over the past two years, I've shipped production systems that classify human emotions from physiological signals at 96% accuracy, processed 50,000+ social media records a day through NLP pipelines, and built multi-tenant platforms used end-to-end from mobile browsers to cloud backends. I care about systems that work in the real world — not just in a notebook.
            </p>
            
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {['Python', 'TypeScript', 'FastAPI', 'Apache Spark', 'Deep Learning', 'Embedded Systems'].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 sm:px-4 py-1.5 bg-maroon-100/50 dark:bg-maroon-900/20 text-maroon-700 dark:text-gold-400 rounded-full text-xs sm:text-sm border border-maroon-500/10 font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
          
          {/* Right Column - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: 'Master\'s GPA', value: 3.81, decimals: 2, icon: Award, suffix: '/4.0' },
              { label: 'Project Portfolio', value: 7, decimals: 0, icon: Code, suffix: '+' },
              { label: 'Industry Months', value: 20, decimals: 0, icon: Briefcase, suffix: '+' },
              { label: 'Core Languages', value: 6, decimals: 0, icon: GraduationCap, suffix: '' }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx} 
                  className="glass-panel p-5 rounded-2xl border flex flex-col items-center text-center shadow-lg transition-transform hover:scale-105"
                >
                  <div className="p-2.5 bg-maroon-100 dark:bg-maroon-900/40 rounded-xl mb-3 border border-maroon-500/10">
                    <Icon className="w-5 h-5 text-maroon-600 dark:text-gold-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    <CountUp end={stat.value} decimals={stat.decimals} />
                    <span className="text-maroon-600 dark:text-gold-400">{stat.suffix}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Timeline Path */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-maroon-900/10 dark:border-gold-500/10">
          <h3 className="text-lg sm:text-xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Academic & Professional Milestones
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {timelineItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                className="relative group h-full"
              >
                {/* Purple Enlightening Glow oozing out on hover */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-violet-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-85 group-hover:scale-[1.06] transition-all duration-500 ease-out pointer-events-none" />
                
                {/* Card Container */}
                <div className="glass-panel p-4 rounded-xl border relative text-left h-full transition-all duration-300 group-hover:border-purple-500/40 z-10">
                  <div className="absolute top-3 right-3 text-lg font-bold font-mono text-maroon-500/35 dark:text-gold-400/25 group-hover:text-purple-500/40 transition-colors duration-300">
                    {item.year}
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white mb-1.5 pr-12 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-300">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;