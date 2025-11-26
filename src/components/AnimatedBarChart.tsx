import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { PhishingResult } from '@/types/phishing';

interface AnimatedBarChartProps {
  result: PhishingResult;
}

export const AnimatedBarChart = ({ result }: AnimatedBarChartProps) => {
  const data = [
    {
      name: 'Keyword Matches',
      value: result.details.keywordMatches,
      color: 'hsl(var(--warning))'
    },
    {
      name: 'URL Issues',
      value: result.details.urlIssues,
      color: 'hsl(var(--danger))'
    },
    {
      name: 'Sensitive Requests',
      value: result.details.sensitiveRequests,
      color: 'hsl(var(--destructive))'
    },
    {
      name: 'Brand Issues',
      value: result.details.brandImpersonation ? 1 : 0,
      color: 'hsl(var(--primary))'
    }
  ].filter(item => item.value > 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-6 bg-gradient-card border-border shadow-xl">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Threat Detection Breakdown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }}
              angle={-15}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
            />
            <Bar 
              dataKey="value" 
              radius={[8, 8, 0, 0]}
              animationDuration={1000}
              animationBegin={300}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </motion.div>
  );
};
