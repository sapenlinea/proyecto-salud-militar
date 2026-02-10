import type { KPI, ChartDataPoint } from '../types';

export const MOCK_KPIS: KPI[] = [
  { id: 'k1', label: 'Total atendidos', value: 1247, unit: 'pacientes', trend: 'up', trendValue: '+12%', previousValue: 1113 },
  { id: 'k2', label: 'Citas programadas', value: 89, unit: '%', trend: 'up', trendValue: '+3%', previousValue: 86 },
  { id: 'k3', label: 'Tiempo promedio espera', value: 28, unit: 'min', trend: 'down', trendValue: '-8%', previousValue: 30 },
  { id: 'k4', label: 'Camas ocupadas', value: 78, unit: '%', trend: 'neutral', trendValue: '0%', previousValue: 78 },
];

export const MOCK_CHART_ATENCIONES: ChartDataPoint[] = [
  { name: 'Ene', atenciones: 420 },
  { name: 'Feb', atenciones: 380 },
  { name: 'Mar', atenciones: 450 },
  { name: 'Abr', atenciones: 410 },
  { name: 'May', atenciones: 485 },
  { name: 'Jun', atenciones: 520 },
  { name: 'Jul', atenciones: 490 },
  { name: 'Ago', atenciones: 530 },
  { name: 'Sep', atenciones: 510 },
  { name: 'Oct', atenciones: 545 },
  { name: 'Nov', atenciones: 560 },
  { name: 'Dic', atenciones: 580 },
];

export const MOCK_CHART_ESPECIALIDADES: ChartDataPoint[] = [
  { name: 'Medicina general', value: 1250 },
  { name: 'Pediatría', value: 890 },
  { name: 'Ginecología', value: 620 },
  { name: 'Traumatología', value: 410 },
  { name: 'Oftalmología', value: 380 },
  { name: 'Otras', value: 720 },
];

export const MOCK_CHART_URGENCIAS: ChartDataPoint[] = [
  { name: 'Lun', urgencias: 85 },
  { name: 'Mar', urgencias: 92 },
  { name: 'Mié', urgencias: 78 },
  { name: 'Jue', urgencias: 95 },
  { name: 'Vie', urgencias: 88 },
  { name: 'Sáb', urgencias: 102 },
  { name: 'Dom', urgencias: 115 },
];
