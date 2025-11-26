import { Card } from './ui/card';
import { AnalysisHistory } from '@/types/phishing';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface RiskDistributionChartProps {
  history: AnalysisHistory[];
}

export const RiskDistributionChart = ({ history }: RiskDistributionChartProps) => {
  const distribution = history.reduce((acc, item) => {
    const score = item.result.score;
    if (score < 30) acc.safe++;
    else if (score < 70) acc.suspicious++;
    else acc.danger++;
    return acc;
  }, { safe: 0, suspicious: 0, danger: 0 });

  const chartData = [
    { name: 'Safe', value: distribution.safe, color: 'hsl(var(--success))' },
    { name: 'Suspicious', value: distribution.suspicious, color: 'hsl(var(--warning))' },
    { name: 'Danger', value: distribution.danger, color: 'hsl(var(--danger))' }
  ].filter(d => d.value > 0);

  const total = distribution.safe + distribution.suspicious + distribution.danger;

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="font-semibold text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <Card className="p-8 bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <PieChartIcon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Risk Distribution</h3>
        </div>

        {total > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={CustomLabel}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 rounded-lg bg-success/10 border border-success/20">
                <div className="text-2xl font-bold text-success">{distribution.safe}</div>
                <div className="text-xs text-muted-foreground mt-1">Safe</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-warning/10 border border-warning/20">
                <div className="text-2xl font-bold text-warning">{distribution.suspicious}</div>
                <div className="text-xs text-muted-foreground mt-1">Suspicious</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-danger/10 border border-danger/20">
                <div className="text-2xl font-bold text-danger">{distribution.danger}</div>
                <div className="text-xs text-muted-foreground mt-1">Dangerous</div>
              </div>
            </div>
          </>
        ) : (
          <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground gap-2">
            <PieChartIcon className="w-12 h-12 opacity-50" />
            <p>No analysis history to display</p>
          </div>
        )}
      </Card>
    </div>
  );
};
