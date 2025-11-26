import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Globe, CheckCircle, XCircle, AlertTriangle, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContentAnalysis {
  title: string;
  metaDescription: string;
  suspiciousKeywords: string[];
  forms: number;
  externalLinks: number;
  scripts: number;
  iframes: number;
  warnings: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export const URLContentAnalyzer = () => {
  const [content, setContent] = useState('');
  const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null);

  const analyzeContent = () => {
    const warnings: string[] = [];
    const suspiciousKeywords: string[] = [];

    // Extract title
    const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : 'No title found';

    // Extract meta description
    const metaMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
    const metaDescription = metaMatch ? metaMatch[1] : 'No description found';

    // Count forms
    const forms = (content.match(/<form[^>]*>/gi) || []).length;

    // Count external links
    const links = content.match(/<a[^>]*href=["']([^"']+)["'][^>]*>/gi) || [];
    const externalLinks = links.filter(link => {
      const href = link.match(/href=["']([^"']+)["']/i)?.[1] || '';
      return href.startsWith('http') && !href.includes(window.location.hostname);
    }).length;

    // Count scripts
    const scripts = (content.match(/<script[^>]*>/gi) || []).length;

    // Count iframes
    const iframes = (content.match(/<iframe[^>]*>/gi) || []).length;

    // Check for suspicious keywords
    const suspiciousWords = [
      'login', 'password', 'verify', 'account', 'security', 'bank', 'paypal', 'amazon',
      'urgent', 'immediate', 'verify now', 'account suspended', 'unusual activity',
      'confirm identity', 'update payment', 'credit card', 'social security', 'ssn'
    ];

    suspiciousWords.forEach(word => {
      if (content.toLowerCase().includes(word)) {
        suspiciousKeywords.push(word);
      }
    });

    // Generate warnings
    if (forms > 3) warnings.push('⚠️ Multiple forms detected - potential credential harvesting');
    if (externalLinks > 10) warnings.push('⚠️ Excessive external links - possible redirect chain');
    if (scripts > 5) warnings.push('⚠️ Multiple scripts detected - potential malware injection');
    if (iframes > 0) warnings.push('⚠️ Iframes detected - potential content injection');
    if (suspiciousKeywords.length > 5) warnings.push('🚨 High number of suspicious keywords detected');
    if (!content.includes('https://') && content.includes('http://')) warnings.push('⚠️ Mixed or insecure content detected');

    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (warnings.length >= 3 || suspiciousKeywords.length >= 5) riskLevel = 'high';
    else if (warnings.length >= 1 || suspiciousKeywords.length >= 2) riskLevel = 'medium';

    setAnalysis({
      title,
      metaDescription,
      suspiciousKeywords,
      forms,
      externalLinks,
      scripts,
      iframes,
      warnings,
      riskLevel
    });
  };

  const getRiskColor = (level: string) => {
    if (level === 'low') return 'bg-success/20 text-success';
    if (level === 'medium') return 'bg-warning/20 text-warning';
    return 'bg-danger/20 text-danger';
  };

  const getRiskIcon = (level: string) => {
    if (level === 'low') return <CheckCircle className="w-4 h-4 text-success" />;
    if (level === 'medium') return <AlertTriangle className="w-4 h-4 text-warning" />;
    return <XCircle className="w-4 h-4 text-danger" />;
  };

  return (
    <Card className="p-6 bg-gradient-card border-border shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
          <Globe className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">URL Content Analysis</h3>
          <p className="text-sm text-muted-foreground">Analyze webpage HTML content for phishing indicators</p>
        </div>
      </div>

      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste webpage HTML content here for analysis..."
        className="min-h-[200px] mb-4 font-mono text-sm"
      />

      <div className="flex gap-2 mb-4">
        <Button onClick={analyzeContent} disabled={!content.trim()} className="flex-1">
          Analyze Content
        </Button>
        <Button
          variant="outline"
          onClick={() => setContent('')}
          disabled={!content.trim()}
        >
          Clear
        </Button>
      </div>

      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-secondary/40 to-secondary/20 rounded-lg border border-border">
            <div>
              <h4 className="font-semibold mb-1">Risk Assessment</h4>
              <p className="text-sm text-muted-foreground">Overall threat level based on content analysis</p>
            </div>
            <div className="flex items-center gap-2">
              {getRiskIcon(analysis.riskLevel)}
              <Badge className={getRiskColor(analysis.riskLevel)}>
                {analysis.riskLevel.toUpperCase()} RISK
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-3 bg-gradient-to-br from-secondary/40 to-secondary/20 rounded-lg border border-border text-center"
            >
              <div className="text-2xl font-bold text-primary">{analysis.forms}</div>
              <div className="text-xs text-muted-foreground">Forms</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-3 bg-gradient-to-br from-secondary/40 to-secondary/20 rounded-lg border border-border text-center"
            >
              <div className="text-2xl font-bold text-primary">{analysis.externalLinks}</div>
              <div className="text-xs text-muted-foreground">External Links</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-3 bg-gradient-to-br from-secondary/40 to-secondary/20 rounded-lg border border-border text-center"
            >
              <div className="text-2xl font-bold text-primary">{analysis.scripts}</div>
              <div className="text-xs text-muted-foreground">Scripts</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-3 bg-gradient-to-br from-secondary/40 to-secondary/20 rounded-lg border border-border text-center"
            >
              <div className="text-2xl font-bold text-primary">{analysis.iframes}</div>
              <div className="text-xs text-muted-foreground">Iframes</div>
            </motion.div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-muted-foreground">Page Title:</span>
              <p className="text-sm mt-1 font-medium">{analysis.title}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Meta Description:</span>
              <p className="text-sm mt-1 text-muted-foreground">{analysis.metaDescription}</p>
            </div>
          </div>

          {analysis.suspiciousKeywords.length > 0 && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <p className="font-semibold text-warning mb-2">Suspicious Keywords ({analysis.suspiciousKeywords.length}):</p>
              <div className="flex flex-wrap gap-2">
                {analysis.suspiciousKeywords.map((keyword, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {analysis.warnings.length > 0 && (
            <div className="bg-danger/10 border border-danger/20 rounded-lg p-4">
              <p className="font-semibold text-danger mb-2">Security Warnings:</p>
              <ul className="space-y-1 text-sm">
                {analysis.warnings.map((warning, i) => (
                  <li key={i}>{warning}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis.warnings.length === 0 && analysis.suspiciousKeywords.length === 0 && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <p className="font-semibold text-success mb-2">✅ Content Analysis Complete</p>
              <p className="text-sm text-muted-foreground">No immediate security concerns detected in the webpage content.</p>
            </div>
          )}
        </motion.div>
      )}
    </Card>
  );
};
