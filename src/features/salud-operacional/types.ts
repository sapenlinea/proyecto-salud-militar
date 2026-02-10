export interface EvaluacionMedicaLaboral {
  id: string;
  employeeDocument: string;
  employeeName: string;
  evaluationType: 'ingreso' | 'periodica' | 'retiro' | 'post_incapacidad';
  evaluationDate: string;
  result: 'apto' | 'apto_con_restricciones' | 'no_apto';
  position: string;
  area: string;
  evaluator: string;
  nextEvaluationDate?: string;
}

export interface RiesgoLaboral {
  id: string;
  area: string;
  position: string;
  riskType: 'biologico' | 'quimico' | 'fisico' | 'ergonomico' | 'psicosocial';
  description: string;
  level: 'bajo' | 'medio' | 'alto' | 'critico';
  controls: string;
  lastUpdate: string;
}

export interface AccidenteTrabajo {
  id: string;
  employeeDocument: string;
  employeeName: string;
  accidentDate: string;
  accidentType: 'traumatico' | 'enfermedad_laboral' | 'ergonomico' | 'covid';
  description: string;
  area: string;
  position: string;
  status: 'reportado' | 'en_gestion_arl' | 'incapacidad' | 'cerrado';
  arl: string;
  daysLost?: number;
}

export interface SeguimientoSaludOperacional {
  id: string;
  referenceId: string;
  referenceType: 'evaluacion' | 'accidente' | 'riesgo';
  employeeDocument: string;
  employeeName: string;
  followUpDate: string;
  type: 'control' | 'reincorporacion' | 'revaluacion' | 'cierre';
  description: string;
  responsible: string;
}

export interface ReporteARL {
  id: string;
  reportType: 'accidente' | 'incapacidad' | 'evaluaciones' | 'periodico';
  period: string;
  status: 'borrador' | 'enviado' | 'validado';
  sentDate?: string;
  accidentCount?: number;
  evaluationCount?: number;
}
