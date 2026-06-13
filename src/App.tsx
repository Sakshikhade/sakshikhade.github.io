import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

const sections = [
  { id: 'hero', component: Hero },
  { id: 'about', component: About },
  { id: 'skills', component: Skills },
  { id: 'experience', component: Experience },
  { id: 'projects', component: Projects },
  { id: 'education', component: Education },
  { id: 'contact', component: Contact }
];

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Tracking section elements during normal scroll mode
  useEffect(() => {
    if (isLoading) return;

    const mainEl = document.querySelector('main');
    const observerOptions = {
      root: mainEl,
      rootMargin: '-40% 0px -40% 0px', // Trigger when crossing the central band of view
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  if (isLoading) {
    return (
      <ThemeProvider>
        <div className="h-screen bg-[#fdfcff] dark:bg-[#06020d] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-maroon-600 to-maroon-700 dark:from-gold-400 dark:to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white dark:text-gray-900 font-bold text-lg sm:text-xl">SK</span>
            </div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-gray-600 dark:text-gray-300 text-sm sm:text-base"
            >
              Loading...
            </motion.div>
          </motion.div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="h-screen overflow-hidden bg-gradient-to-br from-[#fdfcff] via-[#f9f8ff] to-[#f3f0ff] dark:from-[#06020d] dark:via-[#0f0524] dark:to-[#1d0a42] transition-colors relative cyber-grid">
        {/* Background Glowing Ambient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-violet-500/10 dark:bg-violet-500/10 rounded-full filter blur-[80px] sm:blur-[120px] pointer-events-none glow-pulse-1" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-fuchsia-500/10 dark:bg-fuchsia-500/10 rounded-full filter blur-[80px] sm:blur-[120px] pointer-events-none glow-pulse-2" />
        <div className="absolute top-1/3 right-1/3 w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] bg-pink-500/5 dark:bg-pink-500/5 rounded-full filter blur-[80px] sm:blur-[120px] pointer-events-none glow-pulse-1" />

        <Header 
          activeSection={activeSection} 
          onNavigate={navigateToSection} 
        />
        
        <main className="h-full overflow-y-auto scroll-smooth pt-16 sm:pt-20">
          {sections.map((section) => {
            const Comp = section.component;
            return (
              <div key={section.id} id={section.id} className="relative w-full">
                <Comp />
              </div>
            );
          })}
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;