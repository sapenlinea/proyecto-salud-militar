import type {
  EvaluacionMedicaLaboral,
  RiesgoLaboral,
  AccidenteTrabajo,
  SeguimientoSaludOperacional,
  ReporteARL,
} from '../types';

export const MOCK_EVALUACIONES: EvaluacionMedicaLaboral[] = [
  { id: 'e1', employeeDocument: '52345678', employeeName: 'Juan Pérez', evaluationType: 'ingreso', evaluationDate: '2025-01-15', result: 'apto', position: 'Médico general', area: 'Consultorios', evaluator: 'Dr. Martínez', nextEvaluationDate: '2026-01-15' },
  { id: 'e2', employeeDocument: '80123456', employeeName: 'María López', evaluationType: 'periodica', evaluationDate: '2025-01-20', result: 'apto_con_restricciones', position: 'Enfermera', area: 'Urgencias', evaluator: 'Dr. Rodríguez', nextEvaluationDate: '2025-07-20' },
  { id: 'e3', employeeDocument: '10987654', employeeName: 'Carlos Rodríguez', evaluationType: 'post_incapacidad', evaluationDate: '2025-02-01', result: 'apto', position: 'Técnico laboratorio', area: 'Laboratorio', evaluator: 'Dr. Martínez' },
  { id: 'e4', employeeDocument: '52555123', employeeName: 'Ana Martínez', evaluationType: 'retiro', evaluationDate: '2025-02-05', result: 'apto', position: 'Auxiliar administrativa', area: 'Administración', evaluator: 'Dr. Pérez' },
];

export const MOCK_RIESGOS: RiesgoLaboral[] = [
  { id: 'r1', area: 'Laboratorio', position: 'Técnico', riskType: 'biologico', description: 'Exposición a muestras biológicas', level: 'alto', controls: 'EPP, lavado de manos, bioseguridad', lastUpdate: '2025-01-10' },
  { id: 'r2', area: 'Limpieza', position: 'Auxiliar', riskType: 'quimico', description: 'Manejo de desinfectantes', level: 'medio', controls: 'Guantes, ventilación', lastUpdate: '2025-01-15' },
  { id: 'r3', area: 'Consultorios', position: 'Médico', riskType: 'ergonomico', description: 'Postura prolongada, uso computador', level: 'medio', controls: 'Pausas activas, silla ergonómica', lastUpdate: '2025-01-08' },
  { id: 'r4', area: 'Urgencias', position: 'Enfermera', riskType: 'psicosocial', description: 'Carga laboral, turnos rotativos', level: 'alto', controls: 'Rotación, apoyo psicosocial', lastUpdate: '2025-01-12' },
  { id: 'r5', area: 'Imagenología', position: 'Técnico', riskType: 'fisico', description: 'Exposición a radiación', level: 'alto', controls: 'Dosímetro, barreras plomo', lastUpdate: '2025-01-05' },
];

export const MOCK_ACCIDENTES: AccidenteTrabajo[] = [
  { id: 'a1', employeeDocument: '80123456', employeeName: 'María López', accidentDate: '2025-01-18', accidentType: 'traumatico', description: 'Caída en pasillo', area: 'Urgencias', position: 'Enfermera', status: 'cerrado', arl: 'Sura', daysLost: 3 },
  { id: 'a2', employeeDocument: '10987654', employeeName: 'Carlos Rodríguez', accidentDate: '2025-01-25', accidentType: 'traumatico', description: 'Pinchazo con aguja contaminada', area: 'Laboratorio', position: 'Técnico', status: 'en_gestion_arl', arl: 'Liberty', daysLost: 5 },
  { id: 'a3', employeeDocument: '52555123', employeeName: 'Ana Martínez', accidentDate: '2025-02-02', accidentType: 'ergonomico', description: 'Lumbalgia por sobreesfuerzo', area: 'Administración', position: 'Auxiliar', status: 'reportado', arl: 'Colmena' },
];

export const MOCK_SEGUIMIENTOS: SeguimientoSaludOperacional[] = [
  { id: 's1', referenceId: 'a1', referenceType: 'accidente', employeeDocument: '80123456', employeeName: 'María López', followUpDate: '2025-01-22', type: 'reincorporacion', description: 'Reincorporación a labores', responsible: 'Dr. Martínez' },
  { id: 's2', referenceId: 'a2', referenceType: 'accidente', employeeDocument: '10987654', employeeName: 'Carlos Rodríguez', followUpDate: '2025-02-01', type: 'control', description: 'Control post exposición', responsible: 'Dr. Rodríguez' },
  { id: 's3', referenceId: 'e2', referenceType: 'evaluacion', employeeDocument: '80123456', employeeName: 'María López', followUpDate: '2025-01-25', type: 'revaluacion', description: 'Revaluación por restricciones', responsible: 'Dr. Martínez' },
];

export const MOCK_REPORTES_ARL: ReporteARL[] = [
  { id: 'ra1', reportType: 'accidente', period: '2025-01', status: 'enviado', sentDate: '2025-02-05', accidentCount: 2 },
  { id: 'ra2', reportType: 'evaluaciones', period: '2025-01', status: 'enviado', sentDate: '2025-02-01', evaluationCount: 45 },
  { id: 'ra3', reportType: 'periodico', period: '2025-Q1', status: 'borrador', accidentCount: 3, evaluationCount: 120 },
];
