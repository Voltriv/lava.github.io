import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { MilestonesSection } from './components/MilestonesSection';
import { LoveNotesSection } from './components/LoveNotesSection';
import { Toaster } from './components/ui/sonner';
import { FloatingHearts } from './components/FloatingHearts';
import { InteractiveBackground } from './components/InteractiveBackground';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { LoadingScreen } from './components/LoadingSpinner';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Apply dark mode class and save preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (isLoading) {
    return (
      <AnimatePresence>
        <LoadingScreen />
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Interactive Elements */}
      <ScrollProgressBar />
      <FloatingHearts />
      <InteractiveBackground />
      
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <MilestonesSection />
        <LoveNotesSection />
      </motion.main>

      {/* Enhanced Footer */}
      <motion.footer 
        className="bg-gradient-to-r from-muted/20 via-accent/10 to-muted/20 py-12 px-4 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Footer background effects */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 20 + 10}px`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              💕
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <motion.div 
            className="flex justify-center items-center space-x-2 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span 
              className="text-2xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💕
            </motion.span>
            <span className="font-medium">Elijah & Annielyn</span>
            <motion.span 
              className="text-2xl"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💕
            </motion.span>
          </motion.div>
          <motion.p 
            className="text-muted-foreground mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Our love story, captured in pixels and preserved in memories.
          </motion.p>
          <motion.div 
            className="flex justify-center items-center space-x-4 text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span>Made with ❤️ in</span>
            <span>•</span>
            <span>Dagupan, PH</span>
          </motion.div>
        </div>
      </motion.footer>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}