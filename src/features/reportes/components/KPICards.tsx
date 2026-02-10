import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { KPI } from '../types';

interface KPICardsProps {
  kpis: KPI[];
}

export default function KPICards({ kpis }: KPICardsProps) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
      {kpis.map((kpi) => (
        <Card key={kpi.id} variant="outlined" sx={{ minHeight: 100 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {kpi.label}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="h5" fontWeight={600}>
                {typeof kpi.value === 'number' ? kpi.value.toLocaleString('es-CO') : kpi.value}
              </Typography>
              {kpi.unit && (
                <Typography variant="body2" color="text.secondary">
                  {kpi.unit}
                </Typography>
              )}
            </Box>
            {kpi.trend && kpi.trendValue && (
              <Typography
                variant="caption"
                sx={{
                  color: kpi.trend === 'up' ? 'success.main' : kpi.trend === 'down' ? 'error.main' : 'text.secondary',
                  fontWeight: 500,
                }}
              >
                {kpi.trend === 'up' && '↑ '}
                {kpi.trend === 'down' && '↓ '}
                {kpi.trendValue} vs período anterior
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
