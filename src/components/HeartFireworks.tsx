import { motion } from 'motion/react';

interface HeartFireworksProps {
  active: boolean;
}

export function HeartFireworks({ active }: HeartFireworksProps) {
  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-rose-400 text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-10%',
          }}
          animate={{
            y: ['0%', '-120%'],
            opacity: [1, 0],
            scale: [0.5, 1.5],
            rotate: [0, Math.random() > 0.5 ? 45 : -45],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: i * 0.1,
            repeat: Infinity,
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
