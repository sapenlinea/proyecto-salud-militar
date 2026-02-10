import type {
  AuditoriaConcurrente,
  AuditoriaPosterior,
  GlosaAuditoria,
  TrazabilidadAuditoria,
  InformeAuditoria,
} from '../types';

export const MOCK_AUDITORIA_CONCURRENTE: AuditoriaConcurrente[] = [
  { id: 'ac1', invoiceNumber: 'FAC-2025-00150', patientDocument: '52345678', patientName: 'Juan Pérez', serviceCode: '890201', serviceName: 'Consulta medicina general', auditDate: '2025-02-05', result: 'aprobado', auditor: 'Dra. Sánchez' },
  { id: 'ac2', invoiceNumber: 'FAC-2025-00151', patientDocument: '80123456', patientName: 'María López', serviceCode: '300101', serviceName: 'Hemograma', auditDate: '2025-02-05', result: 'observado', auditor: 'Dra. Sánchez', observations: 'Falta soporte de solicitud' },
  { id: 'ac3', invoiceNumber: 'FAC-2025-00152', patientDocument: '10987654', patientName: 'Carlos Rodríguez', serviceCode: '412001', serviceName: 'RX tórax', auditDate: '2025-02-06', result: 'aprobado', auditor: 'Dr. Martínez' },
  { id: 'ac4', invoiceNumber: 'FAC-2025-00153', patientDocument: '52555123', patientName: 'Ana Martínez', serviceCode: '510001', serviceName: 'Procedimiento menor', auditDate: '2025-02-06', result: 'rechazado', auditor: 'Dr. Martínez', observations: 'Sin registro en HCE' },
];

export const MOCK_AUDITORIA_POSTERIOR: AuditoriaPosterior[] = [
  { id: 'ap1', invoiceNumber: 'FAC-2025-00100', patientDocument: '52345678', patientName: 'Juan Pérez', period: '2025-01', auditDate: '2025-02-01', totalItems: 5, approvedItems: 4, observedItems: 1, rejectedItems: 0, status: 'completada', auditor: 'Dra. Sánchez' },
  { id: 'ap2', invoiceNumber: 'FAC-2025-00110', patientDocument: '80123456', patientName: 'María López', period: '2025-01', auditDate: '2025-02-02', totalItems: 8, approvedItems: 6, observedItems: 2, rejectedItems: 0, status: 'completada', auditor: 'Dr. Martínez' },
  { id: 'ap3', invoiceNumber: 'FAC-2025-00120', patientDocument: '10987654', patientName: 'Carlos Rodríguez', period: '2025-01', auditDate: '2025-02-04', totalItems: 12, approvedItems: 9, observedItems: 1, rejectedItems: 2, status: 'completada', auditor: 'Dra. Sánchez' },
  { id: 'ap4', invoiceNumber: 'FAC-2025-00130', patientDocument: '52555123', patientName: 'Ana Martínez', period: '2025-01', auditDate: '', totalItems: 6, approvedItems: 0, observedItems: 0, rejectedItems: 0, status: 'pendiente', auditor: '' },
];

export const MOCK_GLOSAS_AUDITORIA: GlosaAuditoria[] = [
  { id: 'g1', invoiceNumber: 'FAC-2025-00123', patientDocument: '52345678', patientName: 'Juan Pérez', glosaType: 'técnica', amount: 45000, origin: 'eps', date: '2025-01-15', status: 'en_gestion', resolution: undefined },
  { id: 'g2', invoiceNumber: 'FAC-2025-00145', patientDocument: '80123456', patientName: 'María López', glosaType: 'administrativa', amount: 75000, origin: 'eps', date: '2025-01-18', status: 'pendiente' },
  { id: 'g3', invoiceNumber: 'FAC-2025-00100', patientDocument: '52345678', patientName: 'Juan Pérez', glosaType: 'facturación', amount: 25000, origin: 'interno', date: '2025-02-01', status: 'aceptada', resolution: 'Corrección aplicada' },
  { id: 'g4', invoiceNumber: 'FAC-2024-09850', patientDocument: '52555123', patientName: 'Ana Martínez', glosaType: 'técnica', amount: 35000, origin: 'eps', date: '2024-12-15', status: 'rechazada', resolution: 'Documentación completa enviada' },
];

export const MOCK_TRAZABILIDAD: TrazabilidadAuditoria[] = [
  { id: 't1', documentRef: 'FAC-2025-00150', action: 'creacion', date: '2025-02-04 10:30', user: 'Sistema', description: 'Factura generada' },
  { id: 't2', documentRef: 'FAC-2025-00150', action: 'auditoria', date: '2025-02-05 14:15', user: 'Dra. Sánchez', description: 'Auditoría concurrente realizada', details: 'Resultado: Aprobado' },
  { id: 't3', documentRef: 'FAC-2025-00151', action: 'auditoria', date: '2025-02-05 15:20', user: 'Dra. Sánchez', description: 'Auditoría concurrente realizada', details: 'Resultado: Observado - Falta soporte' },
  { id: 't4', documentRef: 'FAC-2025-00123', action: 'glosa', date: '2025-01-15 09:00', user: 'EPS Sura', description: 'Glosa técnica recibida', details: 'Monto: $45.000' },
  { id: 't5', documentRef: 'FAC-2025-00123', action: 'respuesta', date: '2025-01-20 11:45', user: 'Dr. Martínez', description: 'Respuesta a glosa enviada' },
];

export const MOCK_INFORMES_AUDITORIA: InformeAuditoria[] = [
  { id: 'i1', title: 'Informe auditoría concurrente enero 2025', period: '2025-01', reportType: 'concurrente', generatedDate: '2025-02-01', totalAudited: 245, totalApproved: 218, totalObserved: 22, totalRejected: 5 },
  { id: 'i2', title: 'Informe auditoría posterior enero 2025', period: '2025-01', reportType: 'posterior', generatedDate: '2025-02-10', totalAudited: 85, totalApproved: 72, totalObserved: 10, totalRejected: 3 },
  { id: 'i3', title: 'Informe glosas enero 2025', period: '2025-01', reportType: 'glosas', generatedDate: '2025-02-05', totalAudited: 18, totalApproved: 8, totalObserved: 6, totalRejected: 4 },
  { id: 'i4', title: 'Informe consolidado auditoría enero 2025', period: '2025-01', reportType: 'consolidado', generatedDate: '2025-02-12', totalAudited: 330, totalApproved: 298, totalObserved: 38, totalRejected: 12 },
];
