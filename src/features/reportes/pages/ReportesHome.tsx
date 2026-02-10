import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import KPICards from '../components/KPICards';
import ReportFilters from '../components/ReportFilters';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import { exportToCSV, exportToPDF } from '../utils/exportUtils';
import {
  MOCK_KPIS,
  MOCK_CHART_ATENCIONES,
  MOCK_CHART_ESPECIALIDADES,
  MOCK_CHART_URGENCIAS,
} from '../data/mock';
import type { KPI, ChartDataPoint, ReportFilters as ReportFiltersType } from '../types';

export default function ReportesHome() {
  const [filters, setFilters] = useState<ReportFiltersType>({});
  const [kpis, setKpis] = useState<KPI[]>(MOCK_KPIS);
  const [chartAtenciones, setChartAtenciones] = useState<ChartDataPoint[]>(MOCK_CHART_ATENCIONES);
  const [chartEspecialidades, setChartEspecialidades] = useState<ChartDataPoint[]>(MOCK_CHART_ESPECIALIDADES);
  const [chartUrgencias, setChartUrgencias] = useState<ChartDataPoint[]>(MOCK_CHART_URGENCIAS);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity?: 'success' | 'error' | 'info' }>({
    open: false,
    message: '',
  });

  function handleApplyFilters() {
    setSnackbar({
      open: true,
      message: 'Filtros aplicados correctamente.',
      severity: 'success',
    });
  }

  function handleExportExcel() {
    exportToCSV(kpis, chartAtenciones, 'atenciones', 'reporte-atenciones.csv');
    setSnackbar({
      open: true,
      message: 'Reporte exportado a Excel (CSV) correctamente.',
      severity: 'success',
    });
  }

  function handleExportPDF() {
    exportToPDF(kpis, chartAtenciones, 'atenciones', 'Atenciones mensuales');
    setSnackbar({
      open: true,
      message: 'Use la ventana de impresión para guardar como PDF.',
      severity: 'info',
    });
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        <Box>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Reportes
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Visualización de información estratégica. Dashboards, KPIs, filtros dinámicos y exportación.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button variant="outlined" onClick={handleExportExcel}>
            Exportar Excel
          </Button>
          <Button variant="outlined" onClick={handleExportPDF}>
            Exportar PDF
          </Button>
        </Box>
      </Box>

      <ReportFilters
        filters={filters}
        onFiltersChange={setFilters}
        onApply={handleApplyFilters}
      />

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
          KPIs
        </Typography>
        <KPICards kpis={kpis} />
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%', minHeight: 340 }}>
            <LineChart
              data={chartAtenciones}
              dataKey="atenciones"
              title="Atenciones mensuales"
              color="primary.main"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%', minHeight: 340 }}>
            <BarChart
              data={chartUrgencias}
              dataKey="urgencias"
              title="Urgencias por día de la semana"
              color="error.main"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%', minHeight: 340 }}>
            <BarChart
              data={chartEspecialidades}
              dataKey="value"
              title="Atenciones por especialidad"
              color="secondary.main"
            />
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity ?? 'info'}
          onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
