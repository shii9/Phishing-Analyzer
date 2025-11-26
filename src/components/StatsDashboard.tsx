import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { TrendingUp, Shield, AlertTriangle, Award } from 'lucide-react';
import { UserStats } from '@/types/phishing';
import { Progress } from './ui/progress';

interface StatsDashboardProps {
  stats: UserStats;
}

export const StatsDashboard = ({ stats }: StatsDashboardProps) => {
  const accuracy = stats.totalAnalyses > 0 
    ? ((stats.safeEmails + stats.phishingDetected) / stats.totalAnalyses * 100).toFixed(1)
    : 0;

  const statsCards = [
    {
      icon: TrendingUp,
      label: 'Total Analyses',
      value: stats.totalAnalyses,
      color: 'text-primary'
    },
    {
      icon: AlertTriangle,
      label: 'Phishing Detected',
      value: stats.phishingDetected,
      color: 'text-danger'
    },
    {
      icon: Shield,
      label: 'Safe Items',
      value: stats.safeEmails,
      color: 'text-success'
    },
    {
      icon: Award,
      label: 'Achievements',
      value: stats.achievements.filter(a => a.unlocked).length,
      color: 'text-accent'
    }
  ];

  return (
    <div className="mb-8">
      <Card className="p-8 bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          Your Security Stats
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {statsCards.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl bg-secondary/30 border border-border/30 hover:bg-secondary/50 hover:border-primary/20 transition-all duration-300"
            >
              <div className="p-3 rounded-lg bg-background/40 inline-flex mb-3">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-3 p-4 rounded-xl bg-secondary/20 border border-border/20">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">Detection Accuracy</span>
            <span className="font-bold text-primary">{accuracy}%</span>
          </div>
          <Progress value={Number(accuracy)} className="h-3" />
        </div>

        {stats.achievements.filter(a => a.unlocked).length > 0 && (
          <div className="mt-6 pt-6 border-t border-border/30">
            <p className="text-sm text-muted-foreground font-medium mb-3">Recent Achievements:</p>
            <div className="flex gap-3 flex-wrap">
              {stats.achievements
                .filter(a => a.unlocked)
                .slice(0, 5)
                .map(achievement => (
                  <div
                    key={achievement.id}
                    className="text-3xl p-3 rounded-xl bg-accent/10 hover:bg-accent/20 transition-colors duration-300"
                    title={achievement.title}
                  >
                    {typeof achievement.icon === 'string' ? (
                      achievement.icon
                    ) : (
                      <achievement.icon className="w-8 h-8 text-foreground" />
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
