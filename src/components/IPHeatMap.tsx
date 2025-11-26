import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { AlertTriangle, Info, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import type { PhishingResult } from '../types/phishing';

interface IPHeatMapProps {
  ipText: string;
  result?: PhishingResult;
}

export const IPHeatMap = ({ ipText, result }: IPHeatMapProps) => {
  const [selectedThreat, setSelectedThreat] = useState<{ word: string; category: string; } | null>(null);

  const highlightedText = useMemo(() => {
    if (!ipText) return [];

    const ips = ipText.split('\n').filter(line => line.trim());
    const allWords: Array<{ word: string; intensity: number; category: string; index: number }> = [];

    ips.forEach((ip, ipIndex) => {
      const words = ip.split(/(\s+|\.)/);
      words.forEach((word, wordIndex) => {
        const lowerWord = word.toLowerCase().trim();
        let intensity = 0;
        let category = '';

        if (/^\d{1,3}$/.test(word)) {
          const num = parseInt(word);
          if (num === 0 || num >= 224) {
            intensity = 3;
            category = 'unusual_range';
          } else if (num === 10 || (num === 172) || (num === 192)) {
            intensity = 2;
            category = 'private';
          }
        } else if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip.trim())) {
          intensity = 4;
          category = 'invalid';
        }

        allWords.push({ word, intensity, category, index: ipIndex * 100 + wordIndex });
      });
    });

    return allWords;
  }, [ipText]);

  const getHighlightClass = (intensity: number, category: string) => {
    switch (intensity) {
      case 2:
        return 'bg-warning/20 text-warning-foreground border-b-2 border-warning';
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
      private: 'Private IP Range',
      unusual_range: 'Unusual IP Range',
      invalid: 'Invalid IP Format'
    };
    return labels[category] || '';
  };

  const suspiciousCount = highlightedText.filter(item => item.intensity > 0).length;

  const getThreatExplanation = (category: string) => {
    const explanations: Record<string, { title: string; description: string; tips: string[] }> = {
      private: {
        title: 'Private IP Address',
        description: 'This IP address falls within private network ranges and may be suspicious in external contexts.',
        tips: [
          'Private IPs (10.x.x.x, 172.16-31.x.x, 192.168.x.x) should not appear in public URLs',
          'Verify if this IP is expected for your network',
          'Be cautious with private IPs in phishing attempts'
        ]
      },
      unusual_range: {
        title: 'Unusual IP Range',
        description: 'This IP address uses reserved or unusual ranges that are rarely used legitimately.',
        tips: [
          'IP 0.x.x.x and 224+ are typically reserved for special purposes',
          'Research the IP range before trusting connections',
          'Use IP reputation services to check suspicious addresses'
        ]
      },
      invalid: {
        title: 'Invalid IP Format',
        description: 'This does not follow proper IPv4 address formatting.',
        tips: [
          'Valid IPs have 4 numbers (0-255) separated by dots',
          'Check for typos or malicious formatting',
          'Use proper IP validation tools'
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
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              IP Address Threat Heat Map
            </h3>
            {suspiciousCount > 0 && (
              <div className="flex items-center gap-2 text-warning">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">{suspiciousCount} suspicious elements</span>
              </div>
            )}
          </div>

          <div className="mb-4 flex flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-warning/20 border-b-2 border-warning rounded" />
              <span className="text-muted-foreground">Medium Risk</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-danger/30 border-b-2 border-danger rounded" />
              <span className="text-sm font-medium">High Risk</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-danger/40 border-b-2 border-danger rounded" />
              <span className="text-muted-foreground">Critical</span>
            </div>
          </div>

          <div className="bg-background/50 p-4 rounded-lg border border-border max-h-[300px] overflow-y-auto">
            <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {ipText.split('\n').map((ip, ipIndex) => (
                <div key={ipIndex} className="mb-2">
                  {ip.split(/(\s+|\.)/).map((word, wordIndex) => {
                    const item = highlightedText.find(h => h.index === ipIndex * 100 + wordIndex);
                    return (
                      <motion.span
                        key={wordIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: (ipIndex * 100 + wordIndex) * 0.01 }}
                        className={`${item ? getHighlightClass(item.intensity, item.category) : ''} transition-all duration-200 rounded px-0.5 ${
                          item && item.intensity > 0 ? 'cursor-pointer hover:opacity-80' : ''
                        }`}
                        title={item && item.intensity > 0 ? `Click to learn about: ${getCategoryLabel(item.category)}` : ''}
                        onClick={() => item && item.intensity > 0 && setSelectedThreat({ word: item.word, category: item.category })}
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {suspiciousCount > 0 && (
            <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20 flex items-start gap-2">
              <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Click on any highlighted element to learn why it's suspicious
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
                <p className="text-sm font-medium">Detected element:</p>
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
