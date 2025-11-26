import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Shield, Zap, CheckCircle2 } from 'lucide-react';

interface Step {
  label: string;
  status: 'complete' | 'active' | 'pending';
}

interface ProgressStepperProps {
  steps: Step[];
}

const stepIcons = [Sparkles, Shield, Zap, CheckCircle2];

export const ProgressStepper = ({ steps }: ProgressStepperProps) => {
  return (
    <div className="relative flex items-center justify-between mb-8 px-4">
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 0% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {steps.map((step, index) => {
        const Icon = stepIcons[index] || Sparkles;
        const isComplete = step.status === 'complete';
        const isActive = step.status === 'active';
        
        return (
          <div key={index} className="flex items-center flex-1 relative">
            <div className="flex flex-col items-center w-full">
              {/* Step circle with enhanced animations */}
              <motion.div
                initial={{ scale: 0, rotateY: -180 }}
                animate={{ 
                  scale: 1, 
                  rotateY: 0,
                }}
                transition={{ 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className="relative"
              >
                {/* Outer glow ring for active/complete states */}
                <AnimatePresence>
                  {(isActive || isComplete) && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.2, 0.5],
                      }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className={`absolute inset-0 rounded-full ${
                        isComplete ? 'bg-success/30' : 'bg-primary/30'
                      } blur-md`}
                    />
                  )}
                </AnimatePresence>
                
                {/* Main step circle */}
                <motion.div
                  animate={isActive ? {
                    boxShadow: [
                      '0 0 20px hsl(var(--primary) / 0.4)',
                      '0 0 40px hsl(var(--primary) / 0.6)',
                      '0 0 20px hsl(var(--primary) / 0.4)',
                    ],
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`relative w-14 h-14 rounded-full flex items-center justify-center border-2 backdrop-blur-sm transition-all duration-300 ${
                    isComplete
                      ? 'bg-gradient-to-br from-success to-success/80 border-success shadow-lg shadow-success/30'
                      : isActive
                      ? 'bg-gradient-to-br from-primary via-primary to-primary/80 border-primary'
                      : 'bg-secondary/50 border-border/50'
                  }`}
                >
                  {/* Particles effect for active step */}
                  {isActive && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-primary rounded-full"
                          animate={{
                            x: [0, Math.random() * 40 - 20],
                            y: [0, Math.random() * 40 - 20],
                            opacity: [1, 0],
                            scale: [1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </>
                  )}
                  
                  <AnimatePresence mode="wait">
                    {isComplete ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Check className="w-6 h-6 text-white" strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="icon"
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: 1,
                          rotate: isActive ? [0, 10, -10, 0] : 0
                        }}
                        transition={{
                          scale: { type: "spring", stiffness: 200 },
                          rotate: { duration: 2, repeat: Infinity }
                        }}
                      >
                        <Icon className={`w-6 h-6 ${
                          isActive ? 'text-white' : 'text-muted-foreground'
                        }`} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
              
              {/* Step label with fade in */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 + 0.2 }}
                className={`text-xs mt-2 text-center font-medium ${
                  isComplete || isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </motion.span>
            </div>
            
            {/* Connecting line between steps */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 bg-border/30 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isComplete ? '100%' : '0%' }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15 + 0.3,
                    ease: "easeOut"
                  }}
                  className="h-full bg-gradient-to-r from-success via-success/80 to-success rounded-full relative"
                >
                  {/* Shimmer effect on completed line */}
                  {isComplete && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  )}
                </motion.div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
