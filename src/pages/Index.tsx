import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PhishingDetectorEnhanced } from '../components/PhishingDetectorEnhanced';
import { useAnalytics } from '../contexts/AnalyticsContext';

const Index = () => {
  const [searchParams] = useSearchParams();
  const { setHistoryOpen } = useAnalytics();

  useEffect(() => {
    const history = searchParams.get('history');
    const quiz = searchParams.get('quiz');

    if (history === 'true') {
      // Trigger history modal after component mounts
      setTimeout(() => {
        setHistoryOpen(true);
      }, 100);
    }

    if (quiz === 'true') {
      // Trigger quiz modal after component mounts
      setTimeout(() => {
        const event = new CustomEvent('openQuiz');
        window.dispatchEvent(event);
      }, 100);
    }

    // Check for selected history item from other pages
    const selectedItem = sessionStorage.getItem('selectedHistoryItem');
    if (selectedItem) {
      try {
        const item = JSON.parse(selectedItem);
        // Trigger loading the selected item
        setTimeout(() => {
          const event = new CustomEvent('loadHistoryItem', { detail: item });
          window.dispatchEvent(event);
        }, 100);
        sessionStorage.removeItem('selectedHistoryItem');
      } catch (e) {
        console.error('Failed to parse selected history item:', e);
      }
    }
  }, [searchParams, setHistoryOpen]);

  return <PhishingDetectorEnhanced />;
};

export default Index;
