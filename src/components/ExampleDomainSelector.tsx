import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, AlertCircle, ShieldCheck, AlertTriangle, Eye, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { exampleDomains, ExampleDomain } from '@/data/exampleDomains';
import type { PhishingResult } from '@/types/phishing';

interface ExampleDomainSelectorProps {
  onSelectDomain: (content: string) => void;
  onAnalyzeDomain?: (domain: string) => Promise<PhishingResult>;
  onSelectExample?: (example: ExampleDomain) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ExampleDomainSelector = ({ onSelectDomain, onAnalyzeDomain, onSelectExample, isOpen: externalIsOpen, onOpenChange }: ExampleDomainSelectorProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;
  const [selectedDomain, setSelectedDomain] = useState<ExampleDomain | null>(null);
  const [analysisResult, setAnalysisResult] = useState<PhishingResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getCategoryIcon = (category: ExampleDomain['category']) => {
    switch (category) {
      case 'safe':
        return <ShieldCheck className="w-4 h-4 text-success" />;
      case 'suspicious':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'phishing':
        return <AlertCircle className="w-4 h-4 text-danger" />;
    }
  };

  const getCategoryColor = (category: ExampleDomain['category']) => {
    switch (category) {
      case 'safe':
        return 'border-l-success';
      case 'suspicious':
        return 'border-l-warning';
      case 'phishing':
        return 'border-l-danger';
    }
  };

  const getCategoryBadgeColor = (category: ExampleDomain['category']) => {
    switch (category) {
      case 'safe':
        return 'bg-success/20 text-success border-success/30';
      case 'suspicious':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'phishing':
        return 'bg-danger/20 text-danger border-danger/30';
    }
  };

  return (
    <div className="w-full">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="w-full justify-between border-border hover:bg-secondary/50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Try Example Domains
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="mt-3 p-3 bg-gradient-card border-border">
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {exampleDomains.map((domain, index) => (
                  <div key={domain.id} className="flex gap-2">
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        onSelectDomain(domain.content);
                        setIsOpen(false);
                        if (onSelectExample) {
                          onSelectExample(domain);
                        }
                      }}
                      className={`flex-1 text-left p-3 rounded-lg bg-secondary/30 hover:bg-secondary/60 transition-all border-l-4 ${getCategoryColor(domain.category)} group`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {getCategoryIcon(domain.category)}
                            <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                              {domain.title}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {domain.content}
                          </p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-background/50 text-muted-foreground capitalize whitespace-nowrap">
                          {domain.category}
                        </span>
                      </div>
                    </motion.button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-3 py-2 h-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDomain(domain);
                            setAnalysisResult(null);
                            setIsAnalyzing(true);
                            if (onAnalyzeDomain) {
                              onAnalyzeDomain(domain.content).then((result) => {
                                setAnalysisResult(result);
                                setIsAnalyzing(false);
                              }).catch(() => {
                                setIsAnalyzing(false);
                              });
                            } else {
                              setIsAnalyzing(false);
                            }
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            {selectedDomain && getCategoryIcon(selectedDomain.category)}
                            {selectedDomain?.title}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Domain Content Analysis:</h4>
                            <div className="max-h-64 overflow-y-auto p-3 bg-secondary rounded-lg">
                              <pre className="text-sm whitespace-pre-wrap break-words">
                                {selectedDomain?.content}
                              </pre>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Details:</h4>
                            <p className="text-sm text-muted-foreground">
                              {selectedDomain?.description}
                            </p>
                          </div>
                          {isAnalyzing && (
                            <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span className="text-sm">Analyzing domain...</span>
                            </div>
                          )}
                          {analysisResult && !isAnalyzing && (
                            <div className="space-y-3">
                              <h4 className="font-semibold">Analysis Results:</h4>
                              <div className="grid grid-cols-2 gap-4 p-3 bg-secondary/30 rounded-lg">
                                <div>
                                  <span className="text-sm font-medium">Score:</span>
                                  <div className={`text-2xl font-bold ${
                                    analysisResult.score < 30 ? 'text-success' :
                                    analysisResult.score < 70 ? 'text-warning' : 'text-danger'
                                  }`}>
                                    {analysisResult.score}/100
                                  </div>
                                </div>
                                <div>
                                  <span className="text-sm font-medium">Status:</span>
                                  <div className={`text-sm font-semibold ${
                                    analysisResult.score < 30 ? 'text-success' :
                                    analysisResult.score < 70 ? 'text-warning' : 'text-danger'
                                  }`}>
                                    {analysisResult.score < 30 ? 'SAFE' :
                                     analysisResult.score < 70 ? 'SUSPICIOUS' : 'PHISHING'}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h5 className="font-medium mb-2">Detection Reasons:</h5>
                                <div className="space-y-1 max-h-32 overflow-y-auto">
                                  {analysisResult.reasons.slice(0, 5).map((reason, index) => (
                                    <div key={index} className="text-xs text-muted-foreground">
                                      • {reason}
                                    </div>
                                  ))}
                                  {analysisResult.reasons.length > 5 && (
                                    <div className="text-xs text-muted-foreground">
                                      • ... and {analysisResult.reasons.length - 5} more reasons
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="flex gap-2 pt-4">
                            <Button
                              onClick={() => {
                                if (selectedDomain) {
                                  onSelectDomain(selectedDomain.content);
                                  setIsOpen(false);
                                }
                              }}
                              className="flex items-center gap-2"
                            >
                              <Search className="w-4 h-4" />
                              Analyze Domain
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
