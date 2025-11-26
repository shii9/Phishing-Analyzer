import { TrendsChart } from '../components/TrendsChart';
import { ThreatPatternTimeline } from '../components/ThreatPatternTimeline';
import { BreadcrumbNav } from '../components/ui/breadcrumb-nav';
import { useAnalytics } from '../contexts/AnalyticsContext';
import { Navbar } from '../components/Navbar';
import { HistorySidebar } from '../components/HistorySidebar';
import { QuizMode } from '../components/QuizMode';
import { MessageSquare, Download, FileJson, FileText, TrendingUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Button } from '../components/ui/button';
import { exportHistoryToCSV } from '../utils/csvExport';
import { exportHistoryToJSON } from '../utils/jsonExport';
import { exportHistoryToPDF } from '../utils/pdfExport';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import APIKeysModal from '../components/APIKeysModal';
import { AIAssistant } from '../components/AIAssistant';


const Trends = () => {
  const { history, setHistory, sidebarHistory, setSidebarHistory, historyOpen, setHistoryOpen, quizOpen, setQuizOpen } = useAnalytics();
  const [apiModalOpen, setApiModalOpen] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [dataRange, setDataRange] = useState<'week' | 'month' | 'all'>('month');

  const handleQuizAchievement = (achievement: any) => {
    // Handle quiz achievement - could be implemented later
  };

  const getFilteredData = () => {
    let filtered = history;
    const now = Date.now();

    switch (dataRange) {
      case 'week':
        filtered = history.filter(item => now - item.timestamp <= 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        filtered = history.filter(item => now - item.timestamp <= 30 * 24 * 60 * 60 * 1000);
        break;
      case 'all':
        filtered = history;
        break;
    }

    return filtered;
  };

  const handleExportCSV = () => {
    const filteredData = getFilteredData();
    exportHistoryToCSV(filteredData);
  };

  const handleExportJSON = () => {
    const filteredData = getFilteredData();
    exportHistoryToJSON(filteredData);
  };

  const handleExportPDF = () => {
    const filteredData = getFilteredData();
    exportHistoryToPDF(filteredData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onHistoryClick={() => setHistoryOpen(!historyOpen)} onQuizClick={() => setQuizOpen(!quizOpen)} onMenuClick={() => {}} />

      {/* Desktop Quick Actions - Hidden on Mobile */}
      <div className="hidden md:flex fixed top-20 right-4 flex-col gap-2 z-30 no-print">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAI(true)}
              className="gap-2 bg-gradient-to-r from-secondary/5 to-secondary/10 hover:from-secondary/10 hover:to-secondary/20 border-secondary/30 hover:border-secondary/50 transition-all animate-glow-pulse shadow-sm hover:shadow-md"
            >
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                N
              </div>
              <span className="hidden">Nio AI</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>AI Assistant</TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={history.length === 0}
              className="gap-2 bg-gradient-to-r from-secondary/5 to-secondary/10 hover:from-secondary/10 hover:to-secondary/20 border-secondary/30 hover:border-secondary/50 transition-all shadow-sm hover:shadow-md"
            >
              <Download className="w-4 h-4" />
              <span className="hidden">Export {dataRange === 'week' ? 'Week' : dataRange === 'month' ? 'Month' : 'All'}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-card border-border z-50">
            <DropdownMenuItem
              onClick={handleExportCSV}
              disabled={getFilteredData().length === 0}
              className="cursor-pointer hover:bg-primary/10"
            >
              <FileJson className="w-4 h-4 mr-2" />
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleExportJSON}
              disabled={getFilteredData().length === 0}
              className="cursor-pointer hover:bg-primary/10"
            >
              <FileJson className="w-4 h-4 mr-2" />
              Export as JSON
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleExportPDF}
              disabled={getFilteredData().length === 0}
              className="cursor-pointer hover:bg-primary/10"
            >
              <FileText className="w-4 h-4 mr-2" />
              Export as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setApiModalOpen(true)}
              className="gap-2 bg-gradient-to-r from-secondary/5 to-secondary/10 hover:from-secondary/10 hover:to-secondary/20 border-secondary/30 hover:border-secondary/50 transition-all shadow-sm hover:shadow-md"
            >
              <FileJson className="w-4 h-4" />
              <span className="hidden">API Keys</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Manage API keys</TooltipContent>
        </Tooltip>
      </div>

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-6">
            <BreadcrumbNav currentView="trends" />
          </div>

          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border border-border/50">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 animate-pulse"></div>
              <div className="relative p-8 md:p-12">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Security Trends</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Track Your Security Evolution
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Monitor your phishing detection trends over time, identify emerging patterns,
                    and visualize your journey towards better cybersecurity awareness and protection.
                  </p>
                </div>
              </div>
            </div>

            <TrendsChart history={history} />
            <ThreatPatternTimeline history={history} />
          </div>
        </div>
      </div>

      <APIKeysModal isOpen={apiModalOpen} onClose={() => setApiModalOpen(false)} />

      <AIAssistant isOpen={showAI} onClose={() => setShowAI(false)} />

      <AnimatePresence>
        {quizOpen && (
          <QuizMode
            onClose={() => setQuizOpen(false)}
            onAchievement={handleQuizAchievement}
          />
        )}
      </AnimatePresence>

      <HistorySidebar
        history={history}
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onSelect={(item) => {
          // Stay on current page and just load the selected item
          // Store the selected item in sessionStorage to be picked up by Index page
          sessionStorage.setItem('selectedHistoryItem', JSON.stringify(item));
          // Navigate to home page and load the selected item
          window.location.href = '/';
        }}
        onClear={() => {
          // Clear sidebar history only - this doesn't affect trends/stats data
          setHistoryOpen(false);
        }}
        useSidebarHistory={true}
      />


    </div>
  );
};

export default Trends;
