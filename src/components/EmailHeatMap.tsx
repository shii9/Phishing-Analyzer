import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { AlertTriangle, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { PhishingResult } from '../types/phishing';

interface EmailHeatMapProps {
  emailText: string;
  result?: PhishingResult;
}

export const EmailHeatMap = ({ emailText, result }: EmailHeatMapProps) => {
  const [selectedThreat, setSelectedThreat] = useState<{ word: string; category: string; } | null>(null);

  const highlightedText = useMemo(() => {
    if (!emailText) return [];

    const words = emailText.split(/(\s+)/);
    const urgentKeywords = ['urgent', 'immediately', 'action required', 'verify now', 'within 24 hours', 'expires', 'suspended', 'locked', 'act now', 'asap'];
    const prizeKeywords = ['winner', 'prize', 'congratulations', 'lottery', 'inheritance', 'millions', 'selected', 'claim'];
    const threatKeywords = ['account suspended', 'verify account', 'unusual activity', 'security alert', 'confirm identity', 'unauthorized', 'verify your account', 'confirm your account'];
    const sensitiveKeywords = ['password', 'ssn', 'credit card', 'bank account', 'pin', 'cvv', 'social security', 'otp', 'token'];
    const actionKeywords = ['click', 'click here', 'open', 'download', 'verify', 'confirm', 'update', 'login', 'sign in'];
    const brandKeywords = [
      'paypal','amazon','microsoft','apple','google','netflix','bank','paytm','aadhaar','uidai','gmail','outlook',
      // Bangladeshi/local brands and services
      'bkash','nagad','rocket','sonali','brac','dbbl','dutch bangla','city bank','janata bank','islami bank','robi','banglalink','daraz','pathao','shohoz','chaldal'
    ];

    return words.map((word, index) => {
      const lowerWord = word.toLowerCase().trim();
      let intensity = 0;
      let category = '';

      if (urgentKeywords.some(kw => lowerWord.includes(kw))) {
        intensity = Math.max(intensity, 1);
        category = 'urgent';
      }
      if (prizeKeywords.some(kw => lowerWord.includes(kw))) {
        intensity = Math.max(intensity, 2);
        category = 'prize';
      }
      if (threatKeywords.some(kw => lowerWord.includes(kw))) {
        intensity = Math.max(intensity, 3);
        category = 'threat';
      }
      if (sensitiveKeywords.some(kw => lowerWord.includes(kw))) {
        intensity = Math.max(intensity, 4);
        category = 'sensitive';
      }
      if (actionKeywords.some(kw => lowerWord.includes(kw))) {
        intensity = Math.max(intensity, 2);
        category = 'action';
      }
      if (brandKeywords.some(kw => lowerWord.includes(kw))) {
        intensity = Math.max(intensity, 2);
        category = 'brand';
      }

      // Mark ALL-CAPS suspicious tokens (e.g., KYC, IMPORTANT)
      if (/^[A-Z]{3,}$/.test(word.replace(/[^A-Z]/g, ''))) {
        intensity = Math.max(intensity, 2);
        category = 'caps';
      }

      // Check for URLs (including bare domain patterns)
      if (/https?:\/\/|www\.|bit\.ly|tinyurl|\.[a-z]{2,3}\b/i.test(word)) {
        intensity = Math.max(intensity, 3);
        category = 'url';
      }

      return { word, intensity, category, index };
    });
  }, [emailText]);

  const getHighlightClass = (intensity: number, category: string) => {
    switch (intensity) {
      case 1:
        return 'bg-warning/20 text-warning-foreground border-b-2 border-warning';
      case 2:
        return 'bg-warning/30 text-warning-foreground border-b-2 border-warning font-semibold';
      case 3:
        return 'bg-danger/30 text-danger-foreground border-b-2 border-danger font-semibold';
      case 4:
        return 'bg-danger/40 text-danger-foreground border-b-2 border-danger font-bold animate-pulse';
      default:
        return '';
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      urgent: 'Urgency',
      prize: 'Prize/Reward',
      threat: 'Threat',
      sensitive: 'Sensitive Data',
      url: 'Suspicious Link',
      action: 'Call to Action',
      brand: 'Brand Mention',
      caps: 'All-caps'
    };
    return labels[category] || '';
  };

  const suspiciousCount = highlightedText.filter(item => item.intensity > 0).length;

  const getThreatExplanation = (category: string) => {
    const explanations: Record<string, { title: string; description: string; tips: string[] }> = {
      urgent: {
        title: 'Urgency Tactics',
        description: 'Phishers create false urgency to pressure you into acting without thinking.',
        tips: [
          'Legitimate companies rarely demand immediate action',
          'Take time to verify the request through official channels',
          'Be suspicious of countdown timers or threats of account closure'
        ]
      },
      prize: {
        title: 'Prize/Reward Scams',
        description: 'Unexpected prizes or rewards are common phishing baits.',
        tips: [
          'You can\'t win a contest you didn\'t enter',
          'Legitimate prizes don\'t require personal information upfront',
          'Research the company before responding'
        ]
      },
      threat: {
        title: 'Threatening Language',
        description: 'Scammers use threats to create panic and bypass your judgment.',
        tips: [
          'Banks don\'t threaten customers via email',
          'Verify account issues by logging in directly (not through email links)',
          'Contact the company through their official website'
        ]
      },
      sensitive: {
        title: 'Sensitive Data Request',
        description: 'Requests for passwords, SSN, or financial info are major red flags.',
        tips: [
          'Never share passwords or PINs via email',
          'Legitimate companies already have your information',
          'Use secure channels for sensitive communications'
        ]
      },
      url: {
        title: 'Suspicious Link',
        description: 'Malicious URLs often use disguises or suspicious patterns.',
        tips: [
          'Hover over links to see the real destination',
          'Check for misspellings in domain names',
          'Avoid clicking shortened URLs from unknown sources'
        ]
      }
    };
    return explanations[category] || { title: 'Unknown Threat', description: '', tips: [] };
  };

  return (
    <>
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-6 bg-gradient-card border-border shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Email Threat Heat Map</h3>
          {suspiciousCount > 0 && (
            <div className="flex items-center gap-2 text-warning">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">{suspiciousCount} suspicious terms</span>
            </div>
          )}
        </div>

        <div className="mb-4 flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-warning/20 border-b-2 border-warning rounded" />
            <span className="text-muted-foreground">Low Risk</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-warning/30 border-b-2 border-warning rounded" />
            <span className="text-muted-foreground">Medium Risk</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-danger/30 border-b-2 border-danger rounded" />
            <span className="text-muted-foreground">High Risk</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-danger/40 border-b-2 border-danger rounded" />
            <span className="text-muted-foreground">Critical</span>
          </div>
        </div>

        <div className="bg-background/50 p-4 rounded-lg border border-border max-h-[300px] overflow-y-auto">
          <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {highlightedText.map((item, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.01 }}
                className={`${getHighlightClass(item.intensity, item.category)} transition-all duration-200 rounded px-0.5 ${
                  item.intensity > 0 ? 'cursor-pointer hover:opacity-80' : ''
                }`}
                title={item.intensity > 0 ? `Click to learn about: ${getCategoryLabel(item.category)}` : ''}
                onClick={() => item.intensity > 0 && setSelectedThreat({ word: item.word, category: item.category })}
              >
                {item.word}
              </motion.span>
            ))}
          </div>
        </div>

        {suspiciousCount > 0 && (
          <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20 flex items-start gap-2">
            <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Click on any highlighted term to learn why it's suspicious
            </p>
          </div>
        )}
      </Card>
    </motion.div>

      <Dialog open={!!selectedThreat} onOpenChange={() => setSelectedThreat(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              {selectedThreat && getThreatExplanation(selectedThreat.category).title}
            </DialogTitle>
          </DialogHeader>
          {selectedThreat && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">Detected term:</p>
                <p className="text-lg font-bold text-primary mt-1">"{selectedThreat.word}"</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">
                  {getThreatExplanation(selectedThreat.category).description}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Protection Tips:</p>
                <ul className="space-y-2">
                  {getThreatExplanation(selectedThreat.category).tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
