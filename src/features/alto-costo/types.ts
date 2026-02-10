export interface PacienteCAC {
  id: string;
  patientId: string;
  patientDocument: string;
  patientName: string;
  eps: string;
  diagnosis: string;
  diagnosisCode: string;
  registrationDate: string;
  status: 'activo' | 'inactivo' | 'fallecido' | 'trasladado';
  responsiblePhysician?: string;
  lastControl?: string;
}

export interface DiagnosticoCAC {
  id: string;
  code: string;
  name: string;
  category: 'oncologico' | 'renal' | 'hematologico' | 'trasplante' | 'otro';
  treatmentType: string;
  patientCount: number;
}

export interface CostoAcumulado {
  id: string;
  patientId: string;
  patientDocument: string;
  patientName: string;
  diagnosis: string;
  period: string;
  totalCost: number;
  medications: number;
  procedures: number;
  hospitalization: number;
  others: number;
}

export interface IndicadorCAC {
  id: string;
  name: string;
  value: number;
  unit: string;
  target?: number;
  period: string;
  category: 'gestion' | 'cobertura' | 'calidad' | 'costo';
}

export interface ReporteRegulatorio {
  id: string;
  reportType: 'mensual' | 'trimestral' | 'anual';
  period: string;
  status: 'borrador' | 'enviado' | 'validado';
  sentDate?: string;
  patientCount: number;
  totalCost: number;
}
