import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronLeft, ChevronRight, CheckCircle, AlertTriangle, Info, Download, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { selfAssessmentQuestions } from '@/data/selfAssessmentQuestions';
import { calculateAssessmentResult, processAnswers, AssessmentResult } from '@/utils/scoringEngine';
import { toast } from 'sonner';

interface SelfAssessmentQuestionnaireProps {
  onClose: () => void;
}

interface Answer {
  questionId: number;
  selectedKey: string;
}

export const SelfAssessmentQuestionnaire = ({ onClose }: SelfAssessmentQuestionnaireProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [restartKey, setRestartKey] = useState(0);

  const currentQuestion = selfAssessmentQuestions[currentStep];
  const progress = ((currentStep + 1) / selfAssessmentQuestions.length) * 100;

  // Load previous answers if any
  useEffect(() => {
    const savedAnswers = localStorage.getItem('assessment-answers');
    if (savedAnswers) {
      try {
        const parsed = JSON.parse(savedAnswers);
        setAnswers(parsed);
      } catch (error) {
        console.error('Error loading saved answers:', error);
      }
    }
  }, [restartKey]);

  // Update selected option when question or answers change
  useEffect(() => {
    const currentAnswer = answers.find((a: Answer) => a.questionId === currentQuestion.id);
    if (currentAnswer) {
      setSelectedOption(currentAnswer.selectedKey);
    } else {
      setSelectedOption(null);
    }
  }, [currentQuestion.id, answers]);

  const handleOptionSelect = (optionKey: string) => {
    setSelectedOption(optionKey);

    // Update answers
    const newAnswers = answers.filter(a => a.questionId !== currentQuestion.id);
    newAnswers.push({ questionId: currentQuestion.id, selectedKey: optionKey });
    setAnswers(newAnswers);

    // Save to localStorage
    localStorage.setItem('assessment-answers', JSON.stringify(newAnswers));
  };

  const handleNext = () => {
    if (!selectedOption) {
      toast.error('Please select an answer before continuing');
      return;
    }

    if (currentStep < selfAssessmentQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      // Pre-select if already answered
      const nextAnswer = answers.find(a => a.questionId === selfAssessmentQuestions[currentStep + 1].id);
      if (nextAnswer) {
        setSelectedOption(nextAnswer.selectedKey);
      }
    } else {
      // Calculate results
      try {
        const processedAnswers = processAnswers(answers);
        const assessmentResult = calculateAssessmentResult(processedAnswers);
        setResult(assessmentResult);
        setShowResults(true);

        // Save result to history
        const history = JSON.parse(localStorage.getItem('assessment-history') || '[]');
        history.push(assessmentResult);
        localStorage.setItem('assessment-history', JSON.stringify(history));

        // Dispatch custom event to notify other components
        const event = new CustomEvent('assessmentComplete');
        window.dispatchEvent(event);

        toast.success('Assessment completed! Check your results below.');
      } catch (error) {
        toast.error('Error calculating results. Please try again.');
        console.error('Assessment calculation error:', error);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const prevAnswer = answers.find(a => a.questionId === selfAssessmentQuestions[currentStep - 1].id);
      setSelectedOption(prevAnswer?.selectedKey || null);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResults(false);
    setResult(null);
    setSelectedOption(null);
    setRestartKey(restartKey + 1);
    localStorage.removeItem('assessment-answers');
  };

  const exportResults = () => {
    if (!result) return;

    const exportData = {
      assessmentDate: result.timestamp.toISOString(),
      rawScore: result.rawScore,
      normalizedScore: result.normalizedScore,
      riskCategory: result.category.name,
      recommendations: result.recommendations,
      answers: answers
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security-assessment-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Results exported successfully!');
  };

  if (showResults && result) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto"
        >
          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Security Assessment Results</h2>
              </div>
              <div className="flex gap-2">
                <Button onClick={exportResults} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button onClick={handleRestart} variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake
                </Button>
              </div>
            </div>

            {/* Score Display */}
            <div className="text-center mb-8">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-muted-foreground/20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={result.category.color}
                    strokeWidth="8"
                    strokeDasharray={`${(result.normalizedScore / 100) * 283} 283`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold" style={{ color: result.category.color }}>
                      {result.normalizedScore}
                    </div>
                    <div className="text-sm text-muted-foreground">Risk Score</div>
                  </div>
                </div>
              </div>

              <Badge
                className="text-lg px-4 py-2 mb-4"
                style={{
                  backgroundColor: result.category.color + '20',
                  color: result.category.color,
                  borderColor: result.category.color
                }}
              >
                {result.category.name}
              </Badge>

              <p className="text-muted-foreground max-w-2xl mx-auto">
                {result.category.description}
              </p>
            </div>

            {/* Recommendations */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Recommended Actions
              </h3>
              <div className="space-y-3">
                {result.recommendations.map((recommendation, index) => (
                  <Card key={index} className="p-4 bg-secondary/30">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      </div>
                      <p className="text-sm">{recommendation}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Score Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{result.rawScore}</div>
                <div className="text-sm text-muted-foreground">Raw Score</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: result.category.color }}>
                  {result.normalizedScore}/100
                </div>
                <div className="text-sm text-muted-foreground">Normalized Score</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-muted-foreground">
                  {new Date(result.timestamp).toLocaleDateString()}
                </div>
                <div className="text-sm text-muted-foreground">Assessment Date</div>
              </Card>
            </div>

            <div className="flex gap-2">
              <Button onClick={onClose} className="flex-1">
                Close Assessment
              </Button>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl mx-4"
      >
        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Security Self-Assessment</h2>
            </div>
            <div className="text-sm text-muted-foreground">
              {currentStep + 1} of {selfAssessmentQuestions.length}
            </div>
          </div>

          <Progress value={progress} className="mb-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  {currentQuestion.text}
                </h3>

                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <TooltipProvider key={option.key}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Card
                            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                              selectedOption === option.key
                                ? 'ring-2 ring-primary bg-primary/10'
                                : 'hover:bg-secondary/50'
                            }`}
                            onClick={() => handleOptionSelect(option.key)}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{option.text}</span>
                              {selectedOption === option.key && (
                                <CheckCircle className="w-5 h-5 text-primary" />
                              )}
                            </div>
                          </Card>
                        </TooltipTrigger>
                        {option.feedback && (
                          <TooltipContent side="right" className="max-w-xs">
                            <div className="flex items-start gap-2">
                              <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <p className="text-sm">{option.feedback}</p>
                            </div>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-2">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button onClick={handleNext} className="flex-1">
              {currentStep < selfAssessmentQuestions.length - 1 ? (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                'See Results'
              )}
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
