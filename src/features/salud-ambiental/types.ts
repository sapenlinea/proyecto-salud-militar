export interface SanitaryInspection {
  id: string;
  establishment: string;
  address: string;
  type: string;
  date: string;
  inspector: string;
  score: number;
  status: 'cumple' | 'cumple_parcial' | 'no_cumple';
  findings?: string;
}

export interface EnvironmentalRiskFactor {
  id: string;
  category: string;
  description: string;
  location: string;
  level: 'bajo' | 'medio' | 'alto';
  detectedAt: string;
  status: 'activo' | 'en_control' | 'mitigado';
}

export interface EventReport {
  id: string;
  date: string;
  type: string;
  description: string;
  location: string;
  lat?: number;
  lng?: number;
  reportedBy: string;
  status: 'reportado' | 'en_curso' | 'atendido' | 'cerrado';
}

export interface GeoLocation {
  id: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  address: string;
  riskLevel?: string;
  lastInspection?: string;
}

export interface ImprovementPlan {
  id: string;
  title: string;
  description: string;
  relatedTo: string;
  startDate: string;
  endDate?: string;
  responsible: string;
  status: 'pendiente' | 'en_ejecución' | 'completado';
  progress?: number;
}
