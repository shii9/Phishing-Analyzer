import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Shield, AlertTriangle, XCircle, CheckCircle, FileText, Link, MapPin, Globe } from 'lucide-react';
import { Button } from './ui/button';
import type { InputType } from '../types/phishing';

interface SecurityRecommendationProps {
  score: number;
  reasons: string[];
  inputType?: InputType;
}

export const SecurityRecommendation = ({ score, reasons, inputType = 'email' }: SecurityRecommendationProps) => {
  const getRecommendation = () => {
    const baseRecommendations = {
      email: {
        safe: [
          'Still verify the sender\'s email address matches official communications',
          'Hover over any links before clicking to check destinations',
          'Be cautious of unexpected attachments',
          'Report suspicious emails to your IT department'
        ],
        caution: [
          'Do not click any links or download attachments',
          'Verify sender identity through official channels',
          'Look for signs of spoofed email addresses',
          'Report to your security team if from work email',
          'Delete the email if you don\'t recognize the sender'
        ],
        danger: [
          'DO NOT click any links or open attachments',
          'DO NOT provide any personal information',
          'DO NOT reply to this email',
          'Report this as phishing to your email provider',
          'Delete the email immediately',
          'Change passwords if you\'ve already clicked links',
          'Enable two-factor authentication on affected accounts'
        ]
      },
      file: {
        safe: [
          'Still scan the file with antivirus software',
          'Verify the file type matches the expected format',
          'Check file size is reasonable for the content type',
          'Ensure the source is trustworthy before opening'
        ],
        caution: [
          'Do not open the file without scanning it first',
          'Verify the file extension is legitimate',
          'Check for double extensions (e.g., .pdf.exe)',
          'Use a virtual machine or sandbox to test suspicious files'
        ],
        danger: [
          'DO NOT open or execute this file',
          'Quarantine the file immediately',
          'Scan your system for malware',
          'Report to your security team',
          'Change passwords if the file was accessed',
          'Monitor your accounts for suspicious activity'
        ]
      },
      url: {
        safe: [
          'Still check the URL matches the expected domain',
          'Look for HTTPS and valid SSL certificate',
          'Verify the website is legitimate before entering data',
          'Be cautious of shortened URLs'
        ],
        caution: [
          'Do not click the link or enter any information',
          'Verify the URL by typing it manually',
          'Check for misspellings in the domain name',
          'Use URL scanners to verify safety'
        ],
        danger: [
          'DO NOT visit this URL',
          'DO NOT enter any credentials or personal information',
          'Report the URL as malicious to your security team',
          'Add the domain to your block list',
          'Scan your device for malware if already visited',
          'Change passwords for any accounts accessed'
        ]
      },
      ip: {
        safe: [
          'Still verify the IP belongs to a legitimate service',
          'Check IP reputation using online tools',
          'Ensure the IP is not in private ranges if public',
          'Monitor for unusual network activity'
        ],
        caution: [
          'Do not connect to this IP address',
          'Verify the IP through multiple reputation services',
          'Check if the IP is associated with known threats',
          'Block the IP in your firewall if suspicious'
        ],
        danger: [
          'DO NOT connect to this IP address',
          'Block the IP immediately in your firewall',
          'Report to your network security team',
          'Scan your network for unauthorized access',
          'Change network passwords and credentials',
          'Monitor for data exfiltration'
        ]
      },
      domain: {
        safe: [
          'Still check domain registration and ownership',
          'Verify the domain has proper DNS records',
          'Look for HTTPS and security certificates',
          'Monitor for domain changes or redirects'
        ],
        caution: [
          'Do not visit websites on this domain',
          'Check domain age and registration details',
          'Verify through multiple WHOIS services',
          'Add domain to monitoring lists'
        ],
        danger: [
          'DO NOT visit any websites on this domain',
          'Block the domain in your hosts file or firewall',
          'Report as malicious domain to security services',
          'Check for malware if domain was previously visited',
          'Update DNS settings if compromised',
          'Monitor for phishing emails from this domain'
        ]
      }
    };

    const typeRecommendations = baseRecommendations[inputType] || baseRecommendations.email;

    if (score < 30) {
      return {
        icon: CheckCircle,
        title: `✅ ${inputType.charAt(0).toUpperCase() + inputType.slice(1)} Appears Safe`,
        color: 'success',
        recommendations: typeRecommendations.safe
      };
    } else if (score < 70) {
      return {
        icon: AlertTriangle,
        title: '⚠️ Exercise Caution',
        color: 'warning',
        recommendations: typeRecommendations.caution
      };
    } else {
      return {
        icon: XCircle,
        title: '🚨 High Risk - Likely Malicious',
        color: 'danger',
        recommendations: typeRecommendations.danger
      };
    }
  };

  const recommendation = getRecommendation();
  const Icon = recommendation.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-6"
    >
      <Card className={`p-6 border-2 ${
        recommendation.color === 'success' 
          ? 'bg-success/10 border-success' 
          : recommendation.color === 'warning'
          ? 'bg-warning/10 border-warning'
          : 'bg-danger/10 border-danger'
      }`}>
        <div className="flex items-start gap-3 mb-4">
          <Icon className={`w-6 h-6 flex-shrink-0 ${
            recommendation.color === 'success' 
              ? 'text-success' 
              : recommendation.color === 'warning'
              ? 'text-warning'
              : 'text-danger'
          }`} />
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">{recommendation.title}</h3>
            <p className="text-sm text-muted-foreground">
              Based on {reasons.length} detection indicator{reasons.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm mb-2">Recommended Actions:</h4>
          <ul className="space-y-2">
            {recommendation.recommendations.map((rec, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-2 text-sm"
              >
                <span className={`mt-0.5 ${
                  recommendation.color === 'success' 
                    ? 'text-success' 
                    : recommendation.color === 'warning'
                    ? 'text-warning'
                    : 'text-danger'
                }`}>•</span>
                <span>{rec}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {score >= 70 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 pt-4 border-t border-border"
          >
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-danger" />
              <span className="font-semibold text-danger">
                This email shows multiple high-risk indicators. Treat as malicious.
              </span>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};
