import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const colors = [
  'rgb(219 39 119)', // pink-600
  'rgb(236 72 153)', // pink-500
  'rgb(251 113 133)', // rose-400
  'rgb(244 63 94)',  // rose-500
];

export function InteractiveBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setParticles(newParticles);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => {
        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;
        let newVx = particle.vx;
        let newVy = particle.vy;

        // Bounce off edges
        if (newX <= 0 || newX >= window.innerWidth) newVx *= -1;
        if (newY <= 0 || newY >= window.innerHeight) newVy *= -1;

        // Mouse interaction
        const dx = mousePos.x - newX;
        const dy = mousePos.y - newY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          newVx += (dx / distance) * force * 0.5;
          newVy += (dy / distance) * force * 0.5;
        }

        // Damping
        newVx *= 0.99;
        newVy *= 0.99;

        return {
          ...particle,
          x: Math.max(0, Math.min(window.innerWidth, newX)),
          y: Math.max(0, Math.min(window.innerHeight, newY)),
          vx: newVx,
          vy: newVy,
        };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [mousePos]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <svg className="w-full h-full">
        {particles.map((particle, i) => (
          <g key={particle.id}>
            <motion.circle
              cx={particle.x}
              cy={particle.y}
              r={particle.size}
              fill={particle.color}
              opacity={0.6}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.01 }}
            />
            {/* Connect nearby particles */}
            {particles.slice(i + 1).map(otherParticle => {
              const dx = particle.x - otherParticle.x;
              const dy = particle.y - otherParticle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 150) {
                return (
                  <line
                    key={`${particle.id}-${otherParticle.id}`}
                    x1={particle.x}
                    y1={particle.y}
                    x2={otherParticle.x}
                    y2={otherParticle.y}
                    stroke={particle.color}
                    strokeWidth={0.5}
                    opacity={Math.max(0, (150 - distance) / 150) * 0.3}
                  />
                );
              }
              return null;
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}