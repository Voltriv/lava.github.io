import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card } from './ui/card';
import { HERO_BACKGROUND } from '@/lib/constants';

export function HeroSection() { 
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Anniversary date - you can change this to your actual anniversary
  const anniversaryDate = new Date('September 30, 2025'); // Example: March 14, 2025

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const anniversary = anniversaryDate.getTime();
      const difference = anniversary - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [anniversaryDate]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={HERO_BACKGROUND}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-4xl mb-6 tracking-tight"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(219, 39, 119, 0.5)",
                "0 0 40px rgba(219, 39, 119, 0.8)",
                "0 0 20px rgba(219, 39, 119, 0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Elijah & Annielyn
          </motion.h1>
        </motion.div>

        <motion.p 
          className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          
          Hi love, an
        </motion.p>

        {/* Floating Hearts */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              💕
            </motion.div>
          ))}
        </div>

        {/* Anniversary Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 mx-auto max-w-lg mb-8 hover:bg-white/20 transition-all duration-300">
            <h3 className="text-lg mb-4 text-white">Next Monthsary In:</h3>
            <div className="grid grid-cols-4 gap-4">
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl md:text-3xl text-white">{timeLeft.days}</div>
                <div className="text-sm text-white/80">Days</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl md:text-3xl text-white">{timeLeft.hours}</div>
                <div className="text-sm text-white/80">Hours</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl md:text-3xl text-white">{timeLeft.minutes}</div>
                <div className="text-sm text-white/80">Minutes</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl md:text-3xl text-white">{timeLeft.seconds}</div>
                <div className="text-sm text-white/80">Seconds</div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Interactive Scroll Indicator */}
        <motion.div
          className="cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.2 }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto hover:border-white transition-colors">
            <motion.div 
              className="w-1 h-3 bg-white/50 rounded-full mx-auto mt-2"
              animate={{ 
                y: [0, 6, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
