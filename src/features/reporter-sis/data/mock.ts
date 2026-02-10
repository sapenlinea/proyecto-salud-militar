import type {
  RegulatoryReport,
  ValidationResult,
  ExternalEntity,
  ReportSubmission,
} from '../types';

export const MOCK_REGULATORY_REPORTS: RegulatoryReport[] = [
  {
    id: 'r1',
    code: 'SISPRO-001',
    name: 'Reporte de atenciones SISPRO',
    period: '2025-01',
    entity: 'Ministerio de Salud',
    dueDate: '2025-02-15',
    status: 'enviado',
    generatedAt: '2025-02-05T10:00:00',
    sentAt: '2025-02-05T14:30:00',
  },
  {
    id: 'r2',
    code: 'CUENTAS-002',
    name: 'Cuenta de alto costo',
    period: '2025-01',
    entity: 'ADRES',
    dueDate: '2025-02-28',
    status: 'validado',
    generatedAt: '2025-02-06T09:00:00',
  },
  {
    id: 'r3',
    code: 'INS-003',
    name: 'Reporte inspección vigilancia',
    period: '2025-01',
    entity: 'Invima',
    dueDate: '2025-03-10',
    status: 'borrador',
  },
];

export const MOCK_VALIDATION_RESULTS: ValidationResult[] = [
  { id: 'v1', reportId: 'r1', field: 'Total atenciones', rule: 'Consistencia', status: 'ok', message: 'Validado correctamente' },
  { id: 'v2', reportId: 'r1', field: 'Afiliados', rule: 'Rango', status: 'ok', message: 'Valor dentro del rango esperado' },
  { id: 'v3', reportId: 'r2', field: 'Pacientes crónicos', rule: 'Obligatorio', status: 'error', message: 'Campo requerido sin valor' },
  { id: 'v4', reportId: 'r2', field: 'Costos', rule: 'Formato', status: 'warning', message: 'Revisar formato monetario' },
];

export const MOCK_EXTERNAL_ENTITIES: ExternalEntity[] = [
  {
    id: 'e1',
    name: 'Ministerio de Salud - SISPRO',
    type: 'Ministerio',
    endpoint: 'https://sispro.gov.co/api',
    contactEmail: 'reportes@sispro.gov.co',
  },
  {
    id: 'e2',
    name: 'ADRES',
    type: 'Superintendencia',
    endpoint: 'https://adres.gov.co/api',
    contactEmail: 'cuentas@adres.gov.co',
  },
  {
    id: 'e3',
    name: 'Invima',
    type: 'Instituto',
    endpoint: 'https://invima.gov.co/api',
  },
];

export const MOCK_REPORT_HISTORY: ReportSubmission[] = [
  {
    id: 'h1',
    reportId: 'r1',
    reportName: 'Reporte de atenciones SISPRO',
    entity: 'Ministerio de Salud',
    sentAt: '2025-02-05T14:30:00',
    status: 'recibido',
    transactionId: 'TXN-2025-002345',
  },
  {
    id: 'h2',
    reportId: 'r1',
    reportName: 'Reporte de atenciones SISPRO',
    entity: 'Ministerio de Salud',
    sentAt: '2025-01-08T11:20:00',
    status: 'recibido',
    transactionId: 'TXN-2025-000892',
  },
  {
    id: 'h3',
    reportId: 'r2',
    reportName: 'Cuenta de alto costo',
    entity: 'ADRES',
    sentAt: '2024-12-15T16:45:00',
    status: 'recibido',
    transactionId: 'TXN-2024-015672',
  },
];
