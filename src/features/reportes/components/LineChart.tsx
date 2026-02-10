import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import type { ChartDataPoint } from '../types';

interface LineChartProps {
  data: ChartDataPoint[];
  dataKey: string;
  title?: string;
  color?: string;
}

export default function LineChart({ data, dataKey, title, color = 'primary.main' }: LineChartProps) {
  const theme = useTheme();
  const [key, shade] = color.split('.');
  const strokeColor = key && shade && key in theme.palette
    ? (theme.palette as Record<string, Record<string, string>>)[key]?.[shade] ?? color
    : color;
  const { max, min } = useMemo(() => {
    const vals = data.map((d) => (typeof d[dataKey] === 'number' ? (d[dataKey] as number) : 0));
    return { max: Math.max(...vals, 1), min: Math.min(...vals, 0) };
  }, [data, dataKey]);

  const range = max - min || 1;
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartWidth = 400;
  const chartHeight = height - padding.top - padding.bottom;

  const points = data.map((item, i) => {
    const val = typeof item[dataKey] === 'number' ? (item[dataKey] as number) : 0;
    const x = padding.left + (i / Math.max(data.length - 1, 1)) * (chartWidth - padding.left - padding.right);
    const y = padding.top + chartHeight - ((val - min) / range) * chartHeight;
    return { x, y, val, name: item.name };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  return (
    <Box>
      {title && (
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
      <Box sx={{ width: '100%', maxWidth: 600, overflow: 'auto' }}>
        <svg width={chartWidth + padding.left + padding.right} height={height} style={{ display: 'block' }}>
          <path d={pathD} fill="none" stroke={strokeColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          {points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={5} fill={strokeColor} stroke={theme.palette.background.paper} strokeWidth={2} />
              <title>{`${p.name}: ${p.val.toLocaleString('es-CO')}`}</title>
              <text x={p.x} y={height - 5} textAnchor="middle" fontSize={10} fill="currentColor">
                {p.name}
              </text>
            </g>
          ))}
        </svg>
      </Box>
    </Box>
  );
}
