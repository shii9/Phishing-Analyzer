import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ChevronDown, AlertCircle, ShieldCheck, AlertTriangle, Eye, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { exampleEmails, ExampleEmail } from '@/data/exampleEmails';
import { useState } from 'react';
import type { PhishingResult } from '@/types/phishing';

interface ExampleEmailSelectorProps {
  onSelectEmail: (content: string) => void;
  onAnalyzeEmail?: (email: string) => Promise<PhishingResult>;
}

export const ExampleEmailSelector = ({ onSelectEmail, onAnalyzeEmail }: ExampleEmailSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<ExampleEmail | null>(null);
  const [analysisResult, setAnalysisResult] = useState<PhishingResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getCategoryIcon = (category: ExampleEmail['category']) => {
    switch (category) {
      case 'safe':
        return <ShieldCheck className="w-4 h-4 text-success" />;
      case 'suspicious':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'phishing':
        return <AlertCircle className="w-4 h-4 text-danger" />;
    }
  };

  const getCategoryColor = (category: ExampleEmail['category']) => {
    switch (category) {
      case 'safe':
        return 'border-l-success';
      case 'suspicious':
        return 'border-l-warning';
      case 'phishing':
        return 'border-l-danger';
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
          <Mail className="w-4 h-4" />
          Try Example Emails
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
                {exampleEmails.map((email, index) => (
                  <div key={email.id} className="flex gap-2">
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        onSelectEmail(email.content);
                        setIsOpen(false);
                      }}
                      className={`flex-1 text-left p-3 rounded-lg bg-secondary/30 hover:bg-secondary/60 transition-all border-l-4 ${getCategoryColor(email.category)} group`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {getCategoryIcon(email.category)}
                            <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                              {email.title}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {email.content.substring(0, 100)}...
                          </p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-background/50 text-muted-foreground capitalize whitespace-nowrap">
                          {email.category}
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
                            setSelectedEmail(email);
                            setAnalysisResult(null);
                            setIsAnalyzing(true);
                            if (onAnalyzeEmail) {
                              onAnalyzeEmail(email.content).then((result) => {
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
                            {selectedEmail && getCategoryIcon(selectedEmail.category)}
                            {selectedEmail?.title}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Email Content:</h4>
                            <div className="max-h-64 overflow-y-auto p-3 bg-secondary rounded-lg">
                              <pre className="text-sm whitespace-pre-wrap break-words">
                                {selectedEmail?.content}
                              </pre>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Details:</h4>
                            <p className="text-sm text-muted-foreground">
                              {selectedEmail?.description}
                            </p>
                          </div>
                          {isAnalyzing && (
                            <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span className="text-sm">Analyzing email...</span>
                            </div>
                          )}
                          {analysisResult && !isAnalyzing && (
                            <div className="space-y-3">
                              <h4 className="font-semibold">Analysis Results:</h4>
                              <div className="grid grid-cols-2 gap-4 p-3 bg-secondary/30 rounded-lg">
                                <div>
                                  <span className="text-sm font-medium">Expected Category:</span>
                                  <div className={`text-sm font-semibold capitalize ${
                                    selectedEmail?.category === 'safe' ? 'text-success' :
                                    selectedEmail?.category === 'suspicious' ? 'text-warning' : 'text-danger'
                                  }`}>
                                    {selectedEmail?.category}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-sm font-medium">Analysis Score:</span>
                                  <div className={`text-2xl font-bold ${
                                    analysisResult.score < 30 ? 'text-success' :
                                    analysisResult.score < 70 ? 'text-warning' : 'text-danger'
                                  }`}>
                                    {analysisResult.score}/100
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-sm font-medium">Analysis Status:</span>
                                  <div className={`text-sm font-semibold ${
                                    analysisResult.score < 30 ? 'text-success' :
                                    analysisResult.score < 70 ? 'text-warning' : 'text-danger'
                                  }`}>
                                    {analysisResult.score < 30 ? 'SAFE' :
                                     analysisResult.score < 70 ? 'SUSPICIOUS' : 'PHISHING'}
                                  </div>
                                </div>
                              </div>
                              {selectedEmail && (
                                <div className={`p-3 rounded-lg ${
                                  (selectedEmail.category === 'safe' && analysisResult.score < 30) ||
                                  (selectedEmail.category === 'suspicious' && analysisResult.score >= 30 && analysisResult.score < 70) ||
                                  (selectedEmail.category === 'phishing' && analysisResult.score >= 70)
                                    ? 'bg-success/10 border border-success/20'
                                    : 'bg-warning/10 border border-warning/20'
                                }`}>
                                  <div className="text-sm">
                                    <span className="font-medium">Result: </span>
                                    {((selectedEmail.category === 'safe' && analysisResult.score < 30) ||
                                      (selectedEmail.category === 'suspicious' && analysisResult.score >= 30 && analysisResult.score < 70) ||
                                      (selectedEmail.category === 'phishing' && analysisResult.score >= 70)) ? (
                                      <span className="text-success font-semibold">✓ Correct Analysis</span>
                                    ) : (
                                      <span className="text-warning font-semibold">⚠️ Analysis Mismatch</span>
                                    )}
                                  </div>
                                </div>
                              )}
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
                                if (selectedEmail) {
                                  onSelectEmail(selectedEmail.content);
                                  setIsOpen(false);
                                }
                              }}
                              className="flex items-center gap-2"
                            >
                              <Search className="w-4 h-4" />
                              Analyze Email
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
