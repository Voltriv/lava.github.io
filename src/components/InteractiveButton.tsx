import { useState, forwardRef } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

interface InteractiveButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  ripple?: boolean;
  glow?: boolean;
  bounce?: boolean;
  pulse?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const InteractiveButton = forwardRef<HTMLButtonElement, InteractiveButtonProps>(({ 
  children, 
  ripple = true, 
  glow = false, 
  bounce = false,
  pulse = false,
  className = '', 
  onClick,
  ...props 
}, ref) => {
  const [isClicked, setIsClicked] = useState(false);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect();
      setRipplePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 500);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={bounce ? { y: [0, -5, 0] } : {}}
      transition={bounce ? { duration: 2, repeat: Infinity } : { type: "spring", stiffness: 300 }}
    >
      <Button
        {...props}
        ref={ref}
        onClick={handleClick}
        className={`
          relative overflow-hidden transition-all duration-300
          ${glow ? 'hover:shadow-lg hover:shadow-primary/25' : ''}
          ${pulse ? 'animate-pulse' : ''}
          ${className}
        `}
      >
        {children}
        
        {/* Ripple effect */}
        {ripple && isClicked && (
          <motion.div
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{
              left: ripplePosition.x - 10,
              top: ripplePosition.y - 10,
              width: 20,
              height: 20,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
        
        {/* Glow effect */}
        {glow && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md"
            initial={false}
          />
        )}
      </Button>
    </motion.div>
  );
});

InteractiveButton.displayName = 'InteractiveButton';