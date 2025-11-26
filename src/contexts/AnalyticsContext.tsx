import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { AnalysisHistory, UserStats } from '@/types/phishing';

interface AnalyticsContextType {
  history: AnalysisHistory[];
  setHistory: (history: AnalysisHistory[]) => void;
  sidebarHistory: AnalysisHistory[];
  setSidebarHistory: (history: AnalysisHistory[]) => void;
  stats: UserStats;
  setStats: (stats: UserStats) => void;
  historyOpen: boolean;
  setHistoryOpen: (open: boolean) => void;
  quizOpen: boolean;
  setQuizOpen: (open: boolean) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useLocalStorage<AnalysisHistory[]>('phishing-history', []);
  const [sidebarHistory, setSidebarHistory] = useLocalStorage<AnalysisHistory[]>('sidebar-history', []);
  const [stats, setStats] = useLocalStorage<UserStats>('phishing-stats', {
    totalAnalyses: 0,
    phishingDetected: 0,
    safeEmails: 0,
    accuracy: 0,
    achievements: []
  });
  const [historyOpen, setHistoryOpen] = useLocalStorage<boolean>('history-open', false);
  const [quizOpen, setQuizOpen] = useLocalStorage<boolean>('quiz-open', false);

  // Clear old assessment history on app initialization
  useEffect(() => {
    const assessmentHistory = localStorage.getItem('assessment-history');
    if (assessmentHistory) {
      localStorage.removeItem('assessment-history');
    }
  }, []);

  return (
    <AnalyticsContext.Provider value={{ history, setHistory, sidebarHistory, setSidebarHistory, stats, setStats, historyOpen, setHistoryOpen, quizOpen, setQuizOpen }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
};
