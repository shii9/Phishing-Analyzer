import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      className="fixed bottom-6 right-6 z-40 md:hidden"
    >
      <Button
        size="icon"
        className="w-14 h-14 rounded-full shadow-glow bg-gradient-primary hover:shadow-glow-lg transition-all"
        onClick={onClick}
      >
        <Menu className="w-6 h-6" />
      </Button>
    </motion.div>
  );
};
