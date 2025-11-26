import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import { PhishingResult } from '@/types/phishing';

interface SecurityRadarChartProps {
  result: PhishingResult;
}

export const SecurityRadarChart = ({ result }: SecurityRadarChartProps) => {
  const data = [
    {
      category: 'Keywords',
      score: Math.min(result.details.keywordMatches * 20, 100),
      fullMark: 100
    },
    {
      category: 'URLs',
      score: Math.min(result.details.urlIssues * 25, 100),
      fullMark: 100
    },
    {
      category: 'Sensitive Data',
      score: Math.min(result.details.sensitiveRequests * 30, 100),
      fullMark: 100
    },
    {
      category: 'Brand Impersonation',
      score: result.details.brandImpersonation ? 100 : 0,
      fullMark: 100
    },
    {
      category: 'Overall Threat',
      score: result.score,
      fullMark: 100
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-card border-border shadow-xl">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Multi-Dimensional Security Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis 
              dataKey="category" 
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            />
            <Radar
              name="Threat Level"
              dataKey="score"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.6}
              animationDuration={1000}
              animationBegin={200}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
          </RadarChart>
        </ResponsiveContainer>
      </Card>
    </motion.div>
  );
};
