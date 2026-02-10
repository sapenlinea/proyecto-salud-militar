export interface KPI {
  id: string;
  label: string;
  value: number | string;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  previousValue?: number | string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface ReportFilters {
  fechaDesde?: string;
  fechaHasta?: string;
  eps?: string;
  especialidad?: string;
  tipoServicio?: string;
}

export interface ReportDashboard {
  kpis: KPI[];
  chartData: ChartDataPoint[];
  topData: ChartDataPoint[];
}
