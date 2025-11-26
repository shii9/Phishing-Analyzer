import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown, AlertCircle, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { exampleFiles, ExampleFile } from '../data/exampleFiles';

interface ExampleFileSelectorProps {
  onSelectFile: (fileName: string, fileType: string, fileSize: number, exampleFile: ExampleFile) => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const ExampleFileSelector = ({ onSelectFile }: ExampleFileSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getCategoryIcon = (category: ExampleFile['category']) => {
    switch (category) {
      case 'safe':
        return <ShieldCheck className="w-4 h-4 text-success" />;
      case 'suspicious':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'phishing':
        return <AlertCircle className="w-4 h-4 text-danger" />;
    }
  };

  const getCategoryColor = (category: ExampleFile['category']) => {
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
          <FileText className="w-4 h-4" />
          Try Example Files
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
                {exampleFiles
                  .sort((a, b) => {
                    const riskOrder = { safe: 0, suspicious: 1, phishing: 2 };
                    return riskOrder[a.category] - riskOrder[b.category];
                  })
                  .map((file, index) => (
                    <motion.button
                      key={file.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        onSelectFile(file.fileName, file.fileType, file.fileSize, file);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg bg-secondary/30 hover:bg-secondary/60 transition-all border-l-4 ${getCategoryColor(file.category)} group`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {getCategoryIcon(file.category)}
                            <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                              {file.title}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {file.description}
                          </p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-background/50 text-muted-foreground capitalize whitespace-nowrap">
                          {file.category}
                        </span>
                      </div>
                    </motion.button>
                  ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

