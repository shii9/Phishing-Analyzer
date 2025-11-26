import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const tips = [
  "Always verify the sender's email address - phishers often use similar-looking domains",
  "Hover over links before clicking to see the actual destination URL",
  "Legitimate companies never ask for passwords or sensitive data via email",
  "Check for spelling and grammar errors - they're common in phishing emails",
  "Be suspicious of urgent requests or threats about account suspension",
  "Look for generic greetings like 'Dear Customer' instead of your name",
  "Don't trust email attachments from unknown senders",
  "Enable two-factor authentication on all important accounts",
  "If in doubt, contact the company directly through their official website",
  "Keep your browser and security software up to date"
];

export const TipsCarousel = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextTip = () => setCurrentTip((prev) => (prev + 1) % tips.length);
  const prevTip = () => setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center gap-3">
        <Lightbulb className="w-5 h-5 text-accent flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTip}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-foreground"
            >
              <span className="font-semibold text-accent">Security Tip:</span> {tips[currentTip]}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <Button
            size="sm"
            variant="ghost"
            onClick={prevTip}
            className="h-7 w-7 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={nextTip}
            className="h-7 w-7 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex gap-1 mt-2 justify-center">
        {tips.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all ${
              index === currentTip ? 'w-6 bg-accent' : 'w-1 bg-accent/30'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};
