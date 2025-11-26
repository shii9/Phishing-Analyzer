import { AnalysisHistory, PhishingResult } from '@/types/phishing';

export const exportHistoryToJSON = (history: AnalysisHistory[]) => {
  if (history.length === 0) return;

  const exportData = {
    exportDate: new Date().toISOString(),
    totalAnalyses: history.length,
    analyses: history.map(item => ({
      timestamp: new Date(item.timestamp).toISOString(),
      score: item.result.score,
      riskLevel: item.result.score < 30 ? 'Safe' : item.result.score < 70 ? 'Suspicious' : 'Phishing',
      confidence: Number(item.result.confidence.toFixed(1)),
      details: {
        keywordMatches: item.result.details.keywordMatches,
        urlIssues: item.result.details.urlIssues,
        sensitiveRequests: item.result.details.sensitiveRequests,
        brandImpersonation: item.result.details.brandImpersonation
      },
      reasons: item.result.reasons,
      emailPreview: item.result.emailPreview
    }))
  };

  const json = JSON.stringify(exportData, null, 2);
  
  const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `phishing-analysis-history-${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportResultToJSON = (result: PhishingResult, emailText: string) => {
  console.log('exportResultToJSON called', result);
  const exportData = {
    exportDate: new Date().toISOString(),
    analysis: {
      timestamp: new Date(result.timestamp).toISOString(),
      score: result.score,
      riskLevel: result.score < 30 ? 'Safe' : result.score < 70 ? 'Suspicious' : 'Phishing',
      confidence: Number(result.confidence.toFixed(1)),
      details: result.details,
      reasons: result.reasons,
      emailContent: emailText
    }
  };

  const json = JSON.stringify(exportData, null, 2);
  
  const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `phishing-analysis-${Date.now()}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  console.log('JSON export completed');
};
