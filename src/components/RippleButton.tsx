import { useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from './ui/button';
import { cn } from '@/lib/utils';

interface RippleButtonProps extends ButtonProps {
  children: React.ReactNode;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

export const RippleButton = ({ children, className, onClick, ...props }: RippleButtonProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;
      
      const newRipple: Ripple = {
        x,
        y,
        size,
        id: Date.now()
      };
      
      setRipples((prev) => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    }
    
    onClick?.(e);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="relative inline-block w-full"
    >
      <Button
        ref={buttonRef}
        className={cn('relative overflow-hidden', className)}
        onClick={handleClick}
        {...props}
      >
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            initial={{
              width: 0,
              height: 0,
              x: ripple.x,
              y: ripple.y,
              opacity: 0.5
            }}
            animate={{
              width: ripple.size,
              height: ripple.size,
              x: ripple.x - ripple.size / 2,
              y: ripple.y - ripple.size / 2,
              opacity: 0
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
        {children}
      </Button>
    </motion.div>
  );
};
