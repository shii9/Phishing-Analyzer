import { Badge } from './ui/badge';
import { Globe } from 'lucide-react';

const languagePatterns = {
  'es': { // Spanish
    urgent: ['urgente', 'inmediatamente', 'acción requerida'],
    prize: ['ganador', 'premio', 'lotería'],
    threat: ['cuenta suspendida', 'verificar cuenta']
  },
  'fr': { // French
    urgent: ['urgent', 'immédiatement', 'action requise'],
    prize: ['gagnant', 'prix', 'loterie'],
    threat: ['compte suspendu', 'vérifier le compte']
  },
  'de': { // German
    urgent: ['dringend', 'sofort', 'aktion erforderlich'],
    prize: ['gewinner', 'preis', 'lotterie'],
    threat: ['konto gesperrt', 'konto überprüfen']
  },
  'zh': { // Chinese
    urgent: ['紧急', '立即', '需要行动'],
    prize: ['中奖', '奖品', '彩票'],
    threat: ['账户暂停', '验证账户']
  }
};

export const detectLanguageThreats = (text: string): { language: string; threats: string[] } => {
  const lowerText = text.toLowerCase();
  
  for (const [lang, patterns] of Object.entries(languagePatterns)) {
    const allPatterns = [...patterns.urgent, ...patterns.prize, ...patterns.threat];
    const matches = allPatterns.filter(pattern => lowerText.includes(pattern));
    
    if (matches.length > 0) {
      return { language: lang, threats: matches };
    }
  }
  
  return { language: 'en', threats: [] };
};

export const LanguageBadge = ({ language }: { language: string }) => {
  const langNames: Record<string, string> = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'zh': 'Chinese'
  };
  
  return (
    <Badge variant="outline" className="gap-1">
      <Globe className="w-3 h-3" />
      {langNames[language] || 'Unknown'}
    </Badge>
  );
};
