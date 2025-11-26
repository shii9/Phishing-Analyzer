import { AnalysisHistory } from '@/types/phishing';

export const exportHistoryToCSV = (history: AnalysisHistory[]) => {
  if (history.length === 0) return;

  const headers = ['Timestamp', 'Score', 'Risk Level', 'Confidence', 'Keywords', 'URL Issues', 'Sensitive Requests', 'Email Preview'];
  
  const rows = history.map(item => {
    const date = new Date(item.timestamp).toLocaleString();
    const riskLevel = item.result.score < 30 ? 'Safe' : item.result.score < 70 ? 'Suspicious' : 'Phishing';
    
    return [
      date,
      item.result.score,
      riskLevel,
      item.result.confidence.toFixed(1) + '%',
      item.result.details.keywordMatches,
      item.result.details.urlIssues,
      item.result.details.sensitiveRequests,
      `"${item.result.emailPreview.replace(/"/g, '""')}"`
    ].join(',');
  });

  const csv = [headers.join(','), ...rows].join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `phishing-analysis-history-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
