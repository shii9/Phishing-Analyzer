import { Shield, BarChart3, History, Brain, Menu, Home, TrendingUp, UserCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onHistoryClick: () => void;
  onQuizClick: () => void;
  onMenuClick: () => void;
}

export const Navbar = ({ onHistoryClick, onQuizClick, onMenuClick }: NavbarProps) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isStats = location.pathname === '/stats';
  const isTrends = location.pathname === '/trends';
  const isAssessment = location.pathname === '/assessment';

  const handleHistoryClick = () => {
    onHistoryClick();
  };

  const handleQuizClick = () => {
    onQuizClick();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-primary shadow-glow">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Phishing Analyzer
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 pl-[0.5in]">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/">
                  <Button
                    variant={isHome ? "default" : "ghost"}
                    size="sm"
                    className={`gap-2 ${isHome ? 'shadow-lg shadow-primary/50 animate-glow' : ''}`}
                  >
                    <Home className="w-4 h-4" />
                    <span className="hidden lg:inline">Detector</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Phishing email analyzer</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/stats">
                  <Button
                    variant={isStats ? "default" : "ghost"}
                    size="sm"
                    className={`gap-2 ${isStats ? 'shadow-lg shadow-primary/50 animate-glow' : ''}`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span className="hidden lg:inline">Statistics</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>View your analysis statistics</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/trends">
                  <Button
                    variant={isTrends ? "default" : "ghost"}
                    size="sm"
                    className={`gap-2 ${isTrends ? 'shadow-lg shadow-primary/50 animate-glow' : ''}`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span className="hidden lg:inline">Trends</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>View analysis trends</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/assessment">
                  <Button
                    variant={isAssessment ? "default" : "ghost"}
                    size="sm"
                    className={`gap-2 ${isAssessment ? 'shadow-lg shadow-primary/50 animate-glow' : ''}`}
                  >
                    <UserCheck className="w-4 h-4" />
                    <span className="hidden lg:inline">Assessment</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Take security self-assessment</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleHistoryClick}
                  className="gap-2"
                >
                  <History className="w-4 h-4" />
                  <span className="hidden lg:inline">History</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>View analysis history</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleQuizClick}
                  className="gap-2"
                >
                  <Brain className="w-4 h-4" />
                  <span className="hidden lg:inline">Quiz</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Test your phishing knowledge</TooltipContent>
            </Tooltip>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
