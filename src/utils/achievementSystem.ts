import { Achievement } from '@/types/phishing';
import { 
  ScanSearch, 
  Target, 
  ShieldCheck, 
  Crown, 
  TrendingUp, 
  CheckCircle2, 
  FileSpreadsheet, 
  Radar, 
  Flame, 
  Camera,
  Award,
  Zap,
  Star,
  Trophy,
  Sparkles
} from 'lucide-react';

export const achievements: Achievement[] = [
  {
    id: 'first-scan',
    title: 'First Steps',
    description: 'Successfully analyzed your first email - Welcome to security!',
    icon: ScanSearch,
    unlocked: false
  },
  {
    id: 'phishing-hunter',
    title: 'Phishing Hunter',
    description: 'Detected 5 phishing attempts - You have a keen eye!',
    icon: Target,
    unlocked: false
  },
  {
    id: 'milestone-50',
    title: 'Security Analyst',
    description: 'Analyzed 50 emails - You are building expertise!',
    icon: ShieldCheck,
    unlocked: false
  },
  {
    id: 'milestone-100',
    title: 'Security Expert',
    description: 'Analyzed 100 emails - You are a pro!',
    icon: Crown,
    unlocked: false
  },
  {
    id: 'perfect-score',
    title: 'Perfect Detection',
    description: 'Found a critical threat with 100% risk score',
    icon: TrendingUp,
    unlocked: false
  },
  {
    id: 'safe-keeper',
    title: 'Guardian',
    description: 'Verified 10 legitimate emails - Protecting your inbox!',
    icon: CheckCircle2,
    unlocked: false
  },
  {
    id: 'csv-exporter',
    title: 'Data Analyst',
    description: 'Exported security analysis to CSV - Data-driven security!',
    icon: FileSpreadsheet,
    unlocked: false
  },
  {
    id: 'radar-user',
    title: 'Radar Master',
    description: 'Activated security radar visualization',
    icon: Radar,
    unlocked: false
  },
  {
    id: 'heatmap-user',
    title: 'Threat Tracker',
    description: 'Discovered threat patterns with heat map',
    icon: Flame,
    unlocked: false
  },
  {
    id: 'screenshot-user',
    title: 'OCR Specialist',
    description: 'Analyzed email screenshots with OCR technology',
    icon: Camera,
    unlocked: false
  },
  {
    id: 'quiz-perfect',
    title: 'Quiz Champion',
    description: 'Achieved perfect score on phishing quiz - Master detective!',
    icon: Award,
    unlocked: false
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Analyzed 10 emails in under 5 minutes',
    icon: Zap,
    unlocked: false
  },
  {
    id: 'streak-master',
    title: 'Consistency King',
    description: 'Analyzed emails for 7 consecutive days',
    icon: Star,
    unlocked: false
  },
  {
    id: 'threat-veteran',
    title: 'Threat Veteran',
    description: 'Detected 25 phishing attempts - Elite protector!',
    icon: Trophy,
    unlocked: false
  },
  {
    id: 'ai-assistant',
    title: 'AI Collaborator',
    description: 'Used AI assistant to enhance threat analysis',
    icon: Sparkles,
    unlocked: false
  }
];

export const checkAchievements = (stats: { totalAnalyses: number; phishingDetected: number; safeEmails: number; achievements?: Achievement[] }): Achievement[] => {
  const unlocked: Achievement[] = [];
  const currentAchievements = stats.achievements || [];
  
  const isUnlocked = (id: string) => currentAchievements.some((a: Achievement) => a.id === id && a.unlocked);
  
  if (stats.totalAnalyses >= 1 && !isUnlocked('first-scan')) {
    unlocked.push({ ...achievements[0], unlocked: true });
  }
  if (stats.phishingDetected >= 5 && !isUnlocked('phishing-hunter')) {
    unlocked.push({ ...achievements[1], unlocked: true });
  }
  if (stats.totalAnalyses >= 50 && !isUnlocked('milestone-50')) {
    unlocked.push({ ...achievements[2], unlocked: true });
  }
  if (stats.totalAnalyses >= 100 && !isUnlocked('milestone-100')) {
    unlocked.push({ ...achievements[3], unlocked: true });
  }
  if (stats.safeEmails >= 10 && !isUnlocked('safe-keeper')) {
    unlocked.push({ ...achievements[5], unlocked: true });
  }
  
  return unlocked;
};
