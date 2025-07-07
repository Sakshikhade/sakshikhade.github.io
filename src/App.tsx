import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sections = [
    { id: 'hero', component: Hero },
    { id: 'about', component: About },
    { id: 'skills', component: Skills },
    { id: 'experience', component: Experience },
    { id: 'projects', component: Projects },
    { id: 'education', component: Education },
    { id: 'contact', component: Contact }
  ];

  useEffect(() => {
    let isScrolling = false;
    let scrollDirection = 0;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      
      const currentIndex = sections.findIndex(s => s.id === activeSection);
      
      if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
        setIsTransitioning(true);
        setActiveSection(sections[currentIndex + 1].id);
        setTimeout(() => setIsTransitioning(false), 300);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        setIsTransitioning(true);
        setActiveSection(sections[currentIndex - 1].id);
        setTimeout(() => setIsTransitioning(false), 300);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isTransitioning || isScrolling) return;
      
      // Only respond to significant scroll movements
      if (Math.abs(e.deltaY) < 10) return;
      
      // Determine scroll direction
      const newScrollDirection = e.deltaY > 0 ? 1 : -1;
      
      // If we're already processing a scroll in the same direction, ignore
      if (isScrolling && scrollDirection === newScrollDirection) return;
      
      // Set scrolling state
      isScrolling = true;
      scrollDirection = newScrollDirection;
      
      const currentIndex = sections.findIndex(s => s.id === activeSection);
      
      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        // Scrolling down - move to next section
        setIsTransitioning(true);
        setActiveSection(sections[currentIndex + 1].id);
        setTimeout(() => setIsTransitioning(false), 300);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scrolling up - move to previous section
        setIsTransitioning(true);
        setActiveSection(sections[currentIndex - 1].id);
        setTimeout(() => setIsTransitioning(false), 300);
      }
      
      // Reset scrolling state after a delay
      setTimeout(() => {
        isScrolling = false;
        scrollDirection = 0;
      }, 500); // Increased delay to prevent rapid section changes
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeSection, sections, isTransitioning]);

  const navigateToSection = (sectionId: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveSection(sectionId);
    setTimeout(() => setIsTransitioning(false), 300); // Reduced from 800ms
  };

  const CurrentComponent = sections.find(s => s.id === activeSection)?.component || Hero;

  return (
    <ThemeProvider>
      <div className="h-screen overflow-hidden bg-white dark:bg-gray-900 transition-colors">
        <Header activeSection={activeSection} onNavigate={navigateToSection} />
        
        {/* Section Indicators */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => navigateToSection(section.id)}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-maroon-600 border-maroon-600 dark:bg-gold-400 dark:border-gold-400'
                  : 'bg-transparent border-gray-400 hover:border-maroon-600 dark:hover:border-gold-400'
              }`}
              aria-label={`Go to ${section.id} section`}
            />
          ))}
        </div>
        
        <main className="h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="h-full"
            >
              <CurrentComponent />
            </motion.div>
          </AnimatePresence>
        </main>
        {activeSection === 'contact' && <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;