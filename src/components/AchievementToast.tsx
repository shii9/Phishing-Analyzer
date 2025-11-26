import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { Achievement } from '@/types/phishing';

interface AchievementToastProps {
  achievement: Achievement;
}

export const AchievementToast = ({ achievement }: AchievementToastProps) => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
      className="bg-gradient-primary p-4 rounded-lg shadow-glow flex items-center gap-3"
    >
      <div className="text-4xl">
        {typeof achievement.icon === 'string' ? (
          achievement.icon
        ) : (
          <achievement.icon className="w-10 h-10 text-primary-foreground" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-primary-foreground" />
          <span className="font-semibold text-primary-foreground">Achievement Unlocked!</span>
        </div>
        <h4 className="font-bold text-primary-foreground">{achievement.title}</h4>
        <p className="text-sm text-primary-foreground/90">{achievement.description}</p>
      </div>
    </motion.div>
  );
};
