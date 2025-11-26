import { Card } from './ui/card';
import { motion } from 'framer-motion';
import { ExternalLink, AlertTriangle, ShieldCheck, AlertCircle } from 'lucide-react';
import { exampleUrls } from '@/data/exampleUrls';

interface URLHighlighterProps {
  emailText: string;
}

export const URLHighlighter = ({ emailText }: URLHighlighterProps) => {

  // Extract all URLs from email
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const urls = emailText.match(urlPattern) || [];

  const suspiciousPatterns = [
    /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, // IP addresses
    /\.(tk|ml|ga|cf|gq)\//, // Suspicious TLDs
    /(bit\.ly|tinyurl|goo\.gl)/, // URL shorteners
  ];

  const isSuspicious = (url: string) => {
    return suspiciousPatterns.some(pattern => pattern.test(url));
  };

  const getURLInfo = (url: string) => {
    // Try to find matching example URL
    const example = exampleUrls.find(ex => ex.content === url);
    if (example) {
      return {
        category: example.category,
        description: example.description,
        title: example.title
      };
    }

    // If no exact match, determine category based on patterns
    if (isSuspicious(url)) {
      return {
        category: 'suspicious' as const,
        description: 'This URL contains suspicious patterns that may indicate phishing or malicious activity.',
        title: 'Suspicious URL'
      };
    }

    return {
      category: 'unknown' as const,
      description: 'This URL was detected in the email content. Exercise caution when clicking unknown links.',
      title: 'Detected URL'
    };
  };



  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'safe':
        return <ShieldCheck className="w-4 h-4 text-green-500" />;
      case 'suspicious':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'phishing':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <ExternalLink className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'safe':
        return 'border-l-success';
      case 'suspicious':
        return 'border-l-warning';
      case 'phishing':
        return 'border-l-danger';
      default:
        return 'border-l-gray-400';
    }
  };
  
  if (urls.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4"
    >
      <Card className="p-4 bg-secondary/30 border-border">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          Detected URLs ({urls.length})
        </h4>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {urls.map((url, index) => {
            const urlInfo = getURLInfo(url);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="space-y-2"
              >
                <div
                  className={`w-full text-left p-3 rounded-lg text-xs font-mono transition-all border bg-secondary/30 border-border hover:bg-secondary/60 ${getCategoryColor(urlInfo.category)}`}
                >
                  <div className="flex items-start gap-2">
                    {getCategoryIcon(urlInfo.category)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{urlInfo.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                          urlInfo.category === 'safe' ? 'bg-green-100 text-green-700' :
                          urlInfo.category === 'suspicious' ? 'bg-yellow-100 text-yellow-700' :
                          urlInfo.category === 'phishing' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {urlInfo.category}
                        </span>
                      </div>
                      <span className="break-all text-gray-600">{url}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </Card>
    </motion.div>
  );
};
