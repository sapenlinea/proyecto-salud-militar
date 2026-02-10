export interface EstratificacionRiesgo {
  id: string;
  patientId: string;
  patientDocument: string;
  patientName: string;
  riskLevel: 'bajo' | 'medio' | 'alto' | 'muy_alto';
  score: number;
  stratificationDate: string;
  riskFactors: string[];
  nextReviewDate?: string;
}

export interface PacientePriorizado {
  id: string;
  patientId: string;
  patientDocument: string;
  patientName: string;
  riskLevel: 'bajo' | 'medio' | 'alto' | 'muy_alto';
  priority: number;
  reason: string;
  lastIntervention?: string;
  pendingActions: string[];
}

export interface AlertaRiesgo {
  id: string;
  patientId: string;
  patientDocument: string;
  patientName: string;
  type: 'clínica' | 'biopsicosocial' | 'farmacológica' | 'hospitalización';
  severity: 'baja' | 'media' | 'alta' | 'crítica';
  description: string;
  date: string;
  status: 'activa' | 'en_seguimiento' | 'resuelta';
  assignedTo?: string;
}

export interface PlanIntervencion {
  id: string;
  patientId: string;
  patientDocument: string;
  patientName: string;
  title: string;
  objectives: string[];
  activities: PlanActividad[];
  startDate: string;
  endDate: string;
  status: 'vigente' | 'en_progreso' | 'completado' | 'suspendido';
  responsible: string;
}

export interface PlanActividad {
  id: string;
  description: string;
  dueDate: string;
  completed: boolean;
  completedDate?: string;
}
