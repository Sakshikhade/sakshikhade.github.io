import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Github, Cpu, Award, Server } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  achievements: string[];
  metrics: { name: string; value: string }[];
  githubUrl: string;
  demoUrl: string;
  architectureNodes: string[]; // Node names for the SVG diagram
}

export const Projects: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects: Project[] = [
    {
      title: 'Emotion Classification from Physiological Data',
      category: 'Embedded ML & Signals',
      description: 'Real-time classification system distinguishing excitement from fear by streaming physiological telemetry (HRV, SpO2) over BLE sensors to a custom Android processing pipeline.',
      technologies: ['Python', 'CNN', 'LSTM', 'Random Forest', 'scikit-learn', 'BLE', 'Android'],
      achievements: [
        'Engineered real-time telemetry streaming using Bluetooth Low Energy (BLE) from wearable sensors (Empatica E4, Rhythm24).',
        'Built feature extraction pipelines running signal processing methods directly on limited mobile computing envelopes.',
        'Compared CNN-LSTM sequential architectures against Random Forest classifiers, hitting a peak classification accuracy of 96%.'
      ],
      metrics: [
        { name: 'Classification Accuracy', value: '96%' },
        { name: 'Inference Speed', value: '<30ms' },
        { name: 'Signal Channels', value: 'HRV & SpO₂' }
      ],
      githubUrl: 'https://github.com/SAKSHI-KHADE',
      demoUrl: '#',
      architectureNodes: ['Wearables', 'BLE Android Stream', 'Signal Prep', 'CNN-LSTM Inference']
    },
    {
      title: 'AI Emotion Detection & Intelligence Platform',
      category: 'Full-Stack AI Platform',
      description: 'Full-stack AI platform conducting real-time emotional intensity/valence analysis from text input, driving an adaptive agent model that adjusts reply tone based on user state.',
      technologies: ['FastAPI', 'React', 'PostgreSQL', 'AWS EC2', 'Transformers', 'Hugging Face'],
      achievements: [
        'Designed low-latency inference endpoints in FastAPI deployed on highly available AWS EC2 computing clusters.',
        'Implemented PostgreSQL relational schemas mapping session histories, valence intensities, and engagement trends.',
        'Created interactive React dashboards displaying session history, emotional trajectories, and real-time conversation graphs.'
      ],
      metrics: [
        { name: 'Inference Latency', value: '<50ms' },
        { name: 'API Availability', value: '99.9%' },
        { name: 'Emotion Factors', value: '3 (Valence/Arousal/Sentiment)' }
      ],
      githubUrl: 'https://github.com/SAKSHI-KHADE',
      demoUrl: '#',
      architectureNodes: ['React UI', 'FastAPI Server', 'HuggingFace Model', 'PostgreSQL DB']
    },
    {
      title: 'Real-Time Traffic Data Pipeline & Forecasting',
      category: 'Data Engineering',
      description: 'Automated distributed ETL pipeline handling traffic records ingestion, validation, and storage with Prophet time-series volume forecasting.',
      technologies: ['Apache Spark', 'Python', 'Prophet', 'Power BI', 'AWS', 'MySQL'],
      achievements: [
        'Built Apache Spark ETL workflows processing 20K+ daily traffic logs across 5 geographic nodes.',
        'Trained Prophet time-series models for volume forecasting, reaching 88% prediction accuracy on irregular peak schedules.',
        'Developed automated alerting systems within Power BI reporting dashboards to monitor telemetry health.'
      ],
      metrics: [
        { name: 'Forecast Accuracy', value: '88%' },
        { name: 'Daily Ingestion', value: '20K+ records' },
        { name: 'Coverage Locations', value: '5 zones' }
      ],
      githubUrl: 'https://github.com/SAKSHI-KHADE',
      demoUrl: '#',
      architectureNodes: ['Traffic Sources', 'Spark ETL', 'MySQL / AWS', 'Power BI Alerts']
    },
    {
      title: 'Twitter Sentiment Analysis for Brand Monitoring',
      category: 'NLP & Data Analytics',
      description: 'End-to-end NLP data workflow tracking real-time public opinion and spike detection trends for brand monitoring.',
      technologies: ['Python', 'LSTM', 'Transformers', 'Hugging Face', 'Tableau', 'Twitter API'],
      achievements: [
        'Created pipelines handling 50K+ daily social media feeds, processing tokenization, cleaning, and filtering.',
        'Fine-tuned pre-trained Transformer models on Hugging Face to outperform custom-trained LSTM architectures with a 93% accuracy rate.',
        'Designed Tableau visualizations detailing sentiment shifts over time and automated keyword spike alerts.'
      ],
      metrics: [
        { name: 'Transformer Accuracy', value: '93%' },
        { name: 'Throughput', value: '50K/day' },
        { name: 'Visualizations', value: 'Tableau Dash' }
      ],
      githubUrl: 'https://github.com/SAKSHI-KHADE',
      demoUrl: '#',
      architectureNodes: ['Twitter API', 'Pre-processing', 'Transformer Core', 'Tableau Dash']
    },
    {
      title: 'Quit Hero — Addiction Recovery Platform',
      category: 'Full-Stack Web & Mobile',
      description: 'Mobile-first addiction recovery tool hosting structured 10-day programs, craving mitigation tools, and comprehensive analytics tracking.',
      technologies: ['React', 'TypeScript', 'Node.js', 'PocketBase', 'Recharts', 'Docker'],
      achievements: [
        'Engineered client-side React/TypeScript interfaces utilizing React Query with full caching and offline capabilities.',
        'Developed backend services on PocketBase implementing secure role-based access control and admin ticketing pipelines.',
        'Rendered real-time user recovery statistics, streak achievements, and program metrics using Recharts graphs.'
      ],
      metrics: [
        { name: 'Onboarding Flow', value: 'Multi-Step' },
        { name: 'Backend', value: 'PocketBase REST API' },
        { name: 'Admin Analytics', value: 'Recharts Charts' }
      ],
      githubUrl: 'https://github.com/SAKSHI-KHADE',
      demoUrl: '#',
      architectureNodes: ['React Frontend', 'React Query Cache', 'PocketBase Service', 'Docker Container']
    },
    {
      title: 'Rave — Event Ticketing Platform',
      category: 'Full-Stack Finance Platform',
      description: 'Production-grade event reservation and ticketing system engineered for high-concurrency seat inventory and financial payouts.',
      technologies: ['Next.js', 'Node.js', 'TypeScript', 'PocketBase', 'Razorpay', 'D3.js', 'Docker'],
      achievements: [
        'Constructed Next.js client-facing web application and administrative analytics dashboard featuring D3.js visualization panels.',
        'Integrated Razorpay payment gateways handling automatic refunds and GST-aware settlement schedules.',
        'Prevented ticket duplication by deploying database transaction logic to secure seat allocations under heavy user loads.'
      ],
      metrics: [
        { name: 'Settlement', value: 'GST-Aware T+2' },
        { name: 'Authentication', value: 'Google OAuth' },
        { name: 'Visualizations', value: 'D3.js Dashboard' }
      ],
      githubUrl: 'https://github.com/SAKSHI-KHADE',
      demoUrl: '#',
      architectureNodes: ['Next.js App', 'Node.js Backend', 'Razorpay API', 'D3.js Dashboard']
    },
    {
      title: 'Restaurant Management System',
      category: 'Multi-Tenant Enterprise',
      description: 'Multi-tenant business service containerizing QR-based customer ordering, kitchen execution screens, and real-time floor plans.',
      technologies: ['Next.js 14', 'TypeScript', 'TurboRepo', 'PocketBase', 'Razorpay', 'Real-Time WebSockets'],
      achievements: [
        'Built a TurboRepo monorepo unifying the client interface, kitchen display system (KDS), and back-office dashboards.',
        'Engineered instant synchronized system updates across devices using PocketBase subscription channels.',
        'Structured granular tenant isolation and role-based policies for Admin, Manager, and Staff accounts.'
      ],
      metrics: [
        { name: 'Architecture', value: 'TurboRepo Monorepo' },
        { name: 'Sync Latency', value: 'Real-time WebSocket' },
        { name: 'Tenant Scopes', value: 'Admin/Manager/Staff' }
      ],
      githubUrl: 'https://github.com/SAKSHI-KHADE',
      demoUrl: '#',
      architectureNodes: ['QR Scanner', 'TurboRepo Apps', 'PocketBase LiveSync', 'KDS Screen']
    }
  ];

  const toggleExpand = (title: string) => {
    setExpandedProject((prev) => (prev === title ? null : title));
  };

  const ArchitectureDiagram: React.FC<{ nodes: string[] }> = ({ nodes }) => {
    return (
      <div className="w-full bg-gray-950/95 p-4 rounded-xl border border-maroon-900/30 dark:border-gold-500/20 font-mono text-[10px] sm:text-xs text-gray-400 mt-4 overflow-x-auto scrollbar-hide">
        <p className="text-left text-maroon-400 dark:text-gold-400 font-bold mb-3 flex items-center space-x-1.5">
          <Server className="w-3.5 h-3.5" />
          <span>SYSTEM ARCHITECTURE PIPELINE</span>
        </p>
        
        <div className="min-w-[450px] flex items-center justify-between py-4 px-2 relative h-16">
          {nodes.map((node, idx) => {
            const isLast = idx === nodes.length - 1;
            return (
              <React.Fragment key={idx}>
                <div className="px-2.5 py-1.5 rounded bg-gray-900 border border-gray-800 text-white font-semibold text-center shadow-md relative z-10 flex flex-col items-center">
                  <span className="text-[10px] uppercase text-maroon-400 dark:text-gold-400 font-bold tracking-wider mb-0.5">Node {idx+1}</span>
                  <span>{node}</span>
                </div>

                {!isLast && (
                  <div className="flex-grow mx-2 relative h-[2px] bg-gray-800 flex items-center">
                    <svg className="absolute w-full h-[6px] top-1/2 left-0 -translate-y-1/2 overflow-visible">
                      <line 
                        x1="0%" 
                        y1="3" 
                        x2="100%" 
                        y2="3" 
                        stroke="rgba(255, 198, 39, 0.2)" 
                        strokeWidth="2" 
                      />
                      <circle cx="0" cy="3" r="3" fill="#FFC627" className="animate-pulse">
                        <animate 
                          attributeName="cx" 
                          from="0%" 
                          to="100%" 
                          dur="2s" 
                          repeatCount="infinity" 
                        />
                      </circle>
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCardBody = (project: Project, isExpanded: boolean, isHovered: boolean, isOverlay: boolean) => {
    return (
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="px-2.5 py-1 bg-maroon-100/60 dark:bg-maroon-900/30 text-maroon-700 dark:text-gold-400 text-xs font-semibold rounded-full border border-maroon-500/10">
              {project.category}
            </span>
            <div className="flex space-x-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 text-gray-500 hover:text-maroon-600 dark:hover:text-gold-400 transition-colors"
                title="View source repository"
                aria-label="View source repository"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 text-left">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-left mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 rounded text-[11px] font-medium border border-gray-200/50 dark:border-gray-700/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800/85">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand(project.title);
            }}
            className="text-xs font-bold text-maroon-600 dark:text-gold-400 hover:underline flex items-center space-x-1"
          >
            <Cpu className="w-3.5 h-3.5 mr-1" />
            <span>{isExpanded ? 'Close System Details' : 'View System Architecture'}</span>
          </button>
          
          <div className="flex space-x-3 text-xs font-semibold text-gray-500">
            {project.metrics.slice(0, 1).map((m, idx) => (
              <div key={idx} className="flex items-center space-x-1">
                <Award className="w-3.5 h-3.5 text-maroon-500" />
                <span>{m.name}: <strong className="text-gray-900 dark:text-white">{m.value}</strong></span>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden text-left"
            >
              <ArchitectureDiagram nodes={project.architectureNodes} />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="sm:col-span-1 bg-gray-50 dark:bg-gray-950 p-4 rounded-xl border border-gray-200/60 dark:border-gray-900">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-2 tracking-wide uppercase">Performance Metrics</h4>
                  <div className="space-y-2">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="flex justify-between border-b border-dashed border-gray-200 dark:border-gray-800 pb-1 text-xs">
                        <span className="text-gray-500 dark:text-gray-400">{m.name}</span>
                        <span className="font-bold text-maroon-600 dark:text-gold-400">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2 bg-gray-50 dark:bg-gray-950 p-4 rounded-xl border border-gray-200/60 dark:border-gray-900">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-2 tracking-wide uppercase">Core Achievements</h4>
                  <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                    {project.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-maroon-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 w-full min-h-screen flex flex-col justify-center relative animate-fade-in">
      <div ref={containerRef} className="container mx-auto px-4 max-w-5xl my-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Practical demonstrations of neural networks, streaming architectures, and control logic. Click any project to inspect its architecture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {projects.map((project, index) => {
            const isExpanded = expandedProject === project.title;
            const isHovered = hoveredProject === project.title;
            const isAnyHovered = hoveredProject !== null;
            const isDimmed = isAnyHovered && !isHovered;

            if (isHovered) {
              // Invisible placeholder to maintain grid size
              return (
                <div
                  key={`placeholder-${project.title}`}
                  className={`glass-panel border rounded-2xl p-5 sm:p-6 shadow-lg relative opacity-0 ${
                    isExpanded ? 'md:col-span-2' : ''
                  }`}
                >
                  {renderCardBody(project, isExpanded, false, false)}
                </div>
              );
            }

            return (
              <motion.div
                key={project.title}
                layoutId={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setHoveredProject(project.title)}
                className={`glass-panel border rounded-2xl p-5 sm:p-6 shadow-lg transition-all duration-500 relative cursor-pointer hover:scale-[1.03] hover:shadow-[0_15px_40px_rgba(168,85,247,0.15)] hover:border-purple-500/30 dark:hover:border-purple-400/30 ${
                  isExpanded ? 'ring-2 ring-maroon-600/40 dark:ring-gold-400/40 md:col-span-2' : ''
                } ${
                  isDimmed ? 'opacity-15 scale-[0.96] blur-[1.5px]' : 'z-10'
                }`}
              >
                {renderCardBody(project, isExpanded, false, false)}
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {hoveredProject && (
          <div 
            onClick={() => setHoveredProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md cursor-pointer"
          >
            {/* Centered enlarged card */}
            {projects.map((project) => {
              if (project.title !== hoveredProject) return null;
              const isExpanded = expandedProject === project.title;
              return (
                <motion.div
                  key={`overlay-${project.title}`}
                  layoutId={project.title}
                  onClick={(e) => e.stopPropagation()}
                  className="glass-panel border rounded-2xl p-6 sm:p-8 shadow-2xl relative w-full max-w-2xl z-50 border-purple-500/40 dark:border-purple-400/40 ring-1 ring-purple-500/20 bg-white/95 dark:bg-[#0f061a]/95 max-h-[90vh] overflow-y-auto project-card-centered select-text cursor-default"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/20 via-fuchsia-500/10 to-violet-600/20 rounded-3xl blur-3xl -z-10 pointer-events-none opacity-100 scale-105" />
                  {renderCardBody(project, isExpanded, true, true)}
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;