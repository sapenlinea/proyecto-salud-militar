import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ChartDataPoint } from '../types';

interface BarChartProps {
  data: ChartDataPoint[];
  dataKey: string;
  title?: string;
  color?: string;
  maxValue?: number;
}

export default function BarChart({ data, dataKey, title, color = 'primary.main', maxValue }: BarChartProps) {
  const max = useMemo(() => {
    if (maxValue != null) return maxValue;
    return Math.max(...data.map((d) => (typeof d[dataKey] === 'number' ? (d[dataKey] as number) : 0)), 1);
  }, [data, dataKey, maxValue]);

  return (
    <Box>
      {title && (
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {data.map((item, idx) => {
          const val = typeof item[dataKey] === 'number' ? (item[dataKey] as number) : 0;
          const pct = (val / max) * 100;
          return (
            <Box key={idx}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2">{item.name}</Typography>
                <Typography variant="body2" fontWeight={500}>
                  {val.toLocaleString('es-CO')}
                </Typography>
              </Box>
              <Box
                sx={{
                  height: 24,
                  borderRadius: 1,
                  bgcolor: 'action.hover',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  '&:hover .bar-fill': { opacity: 0.9 },
                }}
                title={`${item.name}: ${val.toLocaleString('es-CO')}`}
              >
                <Box
                  className="bar-fill"
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${Math.min(pct, 100)}%`,
                    bgcolor: color,
                    borderRadius: 1,
                    transition: 'width 0.3s ease, opacity 0.2s',
                  }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
