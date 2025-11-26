import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { AlertTriangle, Info, Link } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { PhishingResult } from '../types/phishing';

interface URLHeatMapProps {
  urlText: string;
  result?: PhishingResult;
}

export const URLHeatMap = ({ urlText, result }: URLHeatMapProps) => {
  const [selectedThreat, setSelectedThreat] = useState<{ word: string; category: string; } | null>(null);

  const highlightedText = useMemo(() => {
    if (!urlText) return [];

    const urls = urlText.split('\n').filter(line => line.trim());
    const allWords: Array<{ word: string; intensity: number; category: string; index: number }> = [];

    urls.forEach((url, urlIndex) => {
      const words = url.split(/(\s+|[:\/\.\-_?&=#])/);
      words.forEach((word, wordIndex) => {
        const lowerWord = word.toLowerCase().trim();
        let intensity = 0;
        let category = '';

        if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(word)) {
          intensity = 4;
          category = 'ip';
        } else if (/(bit\.ly|tinyurl|goo\.gl|ow\.ly|t\.co)/.test(lowerWord)) {
          intensity = 3;
          category = 'shortener';
        } else if (/\.(tk|ml|ga|cf|gq|xyz|top|club|online|site)$/.test(lowerWord)) {
          intensity = 3;
          category = 'suspicious_tld';
        } else if (lowerWord.includes('login') || lowerWord.includes('password') || lowerWord.includes('verify')) {
          intensity = 3;
          category = 'sensitive_params';
        } else if (word.length > 50) {
          intensity = 2;
          category = 'long_url';
        }

        allWords.push({ word, intensity, category, index: urlIndex * 100 + wordIndex });
      });
    });

    return allWords;
  }, [urlText]);

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
      ip: 'IP-based URL',
      shortener: 'URL Shortener',
      suspicious_tld: 'Suspicious TLD',
      sensitive_params: 'Sensitive Parameters',
      long_url: 'Unusually Long URL'
    };
    return labels[category] || '';
  };

  const suspiciousCount = highlightedText.filter(item => item.intensity > 0).length;

  const getThreatExplanation = (category: string) => {
    const explanations: Record<string, { title: string; description: string; tips: string[] }> = {
      ip: {
        title: 'IP-based URL',
        description: 'URLs using IP addresses instead of domain names are highly suspicious.',
        tips: [
          'Legitimate websites use domain names, not IP addresses',
          'Hover over links to check the actual destination',
          'Avoid clicking IP-based links from emails or messages'
        ]
      },
      shortener: {
        title: 'URL Shortener Service',
        description: 'Shortened URLs hide the real destination and are commonly used in phishing.',
        tips: [
          'Use URL expanders to see the full destination',
          'Avoid shortened URLs from unknown sources',
          'Check the domain before clicking'
        ]
      },
      suspicious_tld: {
        title: 'Suspicious Top-Level Domain',
        description: 'Free or unusual TLDs are often used by malicious websites.',
        tips: [
          'Stick to .com, .org, .edu for trusted sites',
          'Research unfamiliar TLDs before visiting',
          'Be extra cautious with new or free TLDs'
        ]
      },
      sensitive_params: {
        title: 'Sensitive URL Parameters',
        description: 'URLs containing login or password parameters are dangerous.',
        tips: [
          'Never enter credentials on URLs with sensitive parameters',
          'Use official login pages instead of links',
          'Check for HTTPS and verify the domain'
        ]
      },
      long_url: {
        title: 'Unusually Long URL',
        description: 'Very long URLs can hide malicious content or tracking parameters.',
        tips: [
          'Check the domain carefully in long URLs',
          'Look for suspicious parameters or redirects',
          'Use URL scanners for unknown long links'
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
              <Link className="w-5 h-5" />
              URL Threat Heat Map
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
              {urlText.split('\n').map((url, urlIndex) => (
                <div key={urlIndex} className="mb-2">
                  {url.split(/(\s+|[:\/\.\-_?&=#])/).map((word, wordIndex) => {
                    const item = highlightedText.find(h => h.index === urlIndex * 100 + wordIndex);
                    return (
                      <motion.span
                        key={wordIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: (urlIndex * 100 + wordIndex) * 0.01 }}
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
