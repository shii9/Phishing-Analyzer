import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { AlertTriangle, Info, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { PhishingResult } from '../types/phishing';

interface FileHeatMapProps {
  fileName: string;
  result?: PhishingResult;
}

export const FileHeatMap = ({ fileName, result }: FileHeatMapProps) => {
  const [selectedThreat, setSelectedThreat] = useState<{ word: string; category: string; } | null>(null);

  const highlightedText = useMemo(() => {
    if (!fileName) return [];

    const words = fileName.split(/(\s+|[\-_])/);
    const suspiciousExtensions = ['.exe', '.bat', '.cmd', '.scr', '.pif', '.com', '.vbs', '.js', '.jar', '.zip', '.rar'];
    const suspiciousNames = ['password', 'bank', 'login', 'account', 'invoice', 'resume', 'cv'];

    return words.map((word, index) => {
      const lowerWord = word.toLowerCase().trim();
      let intensity = 0;
      let category = '';

      if (suspiciousExtensions.some(ext => lowerWord.endsWith(ext))) {
        intensity = 4;
        category = 'extension';
      } else if (suspiciousNames.some(name => lowerWord.includes(name))) {
        intensity = 3;
        category = 'name';
      } else if (lowerWord.length > 20) {
        intensity = 2;
        category = 'long';
      }

      return { word, intensity, category, index };
    });
  }, [fileName]);

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
      extension: 'Suspicious Extension',
      name: 'Suspicious Name',
      long: 'Unusual Length'
    };
    return labels[category] || '';
  };

  const suspiciousCount = highlightedText.filter(item => item.intensity > 0).length;

  const getThreatExplanation = (category: string) => {
    const explanations: Record<string, { title: string; description: string; tips: string[] }> = {
      extension: {
        title: 'Suspicious File Extension',
        description: 'This file extension is commonly associated with malware or executable files.',
        tips: [
          'Avoid opening files with .exe, .bat, .js extensions from unknown sources',
          'Scan files with antivirus before opening',
          'Verify the sender and context before downloading'
        ]
      },
      name: {
        title: 'Suspicious File Name',
        description: 'The file name contains keywords that may indicate phishing or malware.',
        tips: [
          'Be cautious with files claiming to be invoices, resumes, or login forms',
          'Verify the file contents match the claimed purpose',
          'Contact the sender through official channels to confirm'
        ]
      },
      long: {
        title: 'Unusually Long Filename',
        description: 'Very long filenames can be used to hide malicious extensions or confuse users.',
        tips: [
          'Check the full filename carefully',
          'Look for double extensions (e.g., .pdf.exe)',
          'Use file properties to see the actual extension'
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
              <FileText className="w-5 h-5" />
              File Threat Heat Map
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
              <span className="text-muted-foreground">High Risk</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-danger/40 border-b-2 border-danger rounded" />
              <span className="text-muted-foreground">Critical</span>
            </div>
          </div>

          <div className="bg-background/50 p-4 rounded-lg border border-border">
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
