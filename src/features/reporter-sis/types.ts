export interface RegulatoryReport {
  id: string;
  code: string;
  name: string;
  period: string;
  entity: string;
  dueDate: string;
  status: 'borrador' | 'validado' | 'enviado' | 'recibido';
  generatedAt?: string;
  sentAt?: string;
}

export interface ValidationResult {
  id: string;
  reportId: string;
  field: string;
  rule: string;
  status: 'ok' | 'error' | 'warning';
  message: string;
}

export interface ExternalEntity {
  id: string;
  name: string;
  type: string;
  endpoint?: string;
  contactEmail?: string;
}

export interface ReportSubmission {
  id: string;
  reportId: string;
  reportName: string;
  entity: string;
  sentAt: string;
  status: 'enviado' | 'recibido' | 'error';
  transactionId?: string;
}
