export interface AuditoriaConcurrente {
  id: string;
  invoiceNumber: string;
  patientDocument: string;
  patientName: string;
  serviceCode: string;
  serviceName: string;
  auditDate: string;
  result: 'aprobado' | 'observado' | 'rechazado';
  auditor: string;
  observations?: string;
}

export interface AuditoriaPosterior {
  id: string;
  invoiceNumber: string;
  patientDocument: string;
  patientName: string;
  period: string;
  auditDate: string;
  totalItems: number;
  approvedItems: number;
  observedItems: number;
  rejectedItems: number;
  status: 'en_proceso' | 'completada' | 'pendiente';
  auditor: string;
}

export interface GlosaAuditoria {
  id: string;
  invoiceNumber: string;
  patientDocument: string;
  patientName: string;
  glosaType: 'técnica' | 'administrativa' | 'facturación';
  amount: number;
  origin: 'eps' | 'interno';
  date: string;
  status: 'pendiente' | 'en_gestion' | 'aceptada' | 'rechazada';
  resolution?: string;
}

export interface TrazabilidadAuditoria {
  id: string;
  documentRef: string;
  action: 'creacion' | 'auditoria' | 'glosa' | 'respuesta' | 'cierre';
  date: string;
  user: string;
  description: string;
  details?: string;
}

export interface InformeAuditoria {
  id: string;
  title: string;
  period: string;
  reportType: 'concurrente' | 'posterior' | 'glosas' | 'consolidado';
  generatedDate: string;
  totalAudited: number;
  totalApproved: number;
  totalObserved: number;
  totalRejected: number;
}
