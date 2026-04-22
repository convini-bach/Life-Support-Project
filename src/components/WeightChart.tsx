"use client";

import { WeightLog } from "@/lib/storage";

interface WeightChartProps {
  data: WeightLog[];
  height?: number;
}

export default function WeightChart({ data, height = 200 }: WeightChartProps) {
  if (!data || data.length < 2) {
    return (
      <div style={{ 
        height, display: 'flex', alignItems: 'center', justifyContent: 'center', 
        color: '#475569', fontSize: '0.85rem', background: 'rgba(255,255,255,0.02)',
        borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)'
      }}>
        データを2件以上記録するとグラフが表示されます
      </div>
    );
  }

  // 日付順にソート（昇順）
  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // 直近30件程度に絞る
  const chartData = sortedData.slice(-30);

  const weights = chartData.map(d => d.weight);
  const minWeight = Math.min(...weights) - 1;
  const maxWeight = Math.max(...weights) + 1;
  const weightRange = maxWeight - minWeight || 1;

  const padding = 40;
  const chartWidth = 500;
  const chartHeight = height;
  const drawableWidth = chartWidth - padding * 2;
  const drawableHeight = chartHeight - padding * 2;

  const points = chartData.map((d, i) => {
    const x = padding + (i * drawableWidth) / (chartData.length - 1);
    const y = chartHeight - padding - ((d.weight - minWeight) * drawableHeight) / weightRange;
    return { x, y, weight: d.weight, date: d.date };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`;

  return (
    <div style={{ width: '100%', overflowX: 'auto', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', padding: '1rem' }}>
      <svg 
        viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
        style={{ width: '100%', height: 'auto', minWidth: '400px' }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(r => {
          const y = padding + r * drawableHeight;
          const val = (maxWeight - r * weightRange).toFixed(1);
          return (
            <g key={r}>
              <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
              <text x={padding - 5} y={y} fill="#475569" fontSize="10" textAnchor="end" alignmentBaseline="middle">{val}</text>
            </g>
          );
        })}

        {/* Area */}
        <path d={areaPath} fill="url(#areaGradient)" />

        {/* Line */}
        <path 
          d={linePath} 
          fill="none" 
          stroke="url(#lineGradient)" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* Points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="var(--bg)" stroke="var(--primary)" strokeWidth="2" />
            {/* Show label for last point or every few points */}
            {(i === points.length - 1 || i % 5 === 0) && (
              <>
                <text x={p.x} y={p.y - 12} fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">{p.weight}</text>
                <text x={p.x} y={chartHeight - padding + 15} fill="#475569" fontSize="8" textAnchor="middle">
                  {new Date(p.date).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
                </text>
              </>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
