export interface SolicitudLaboratorio {
  id: string;
  patientDocument: string;
  patientName: string;
  studyCode: string;
  studyName: string;
  orderDate: string;
  status: 'solicitado' | 'en_proceso' | 'resultado_listo' | 'validado' | 'entregado';
  orderedBy: string;
  priority?: 'rutina' | 'urgente' | 'estat';
}

export interface SolicitudImagen {
  id: string;
  patientDocument: string;
  patientName: string;
  studyCode: string;
  studyName: string;
  modality: 'rx' | 'ecografia' | 'tomografia' | 'resonancia' | 'otro';
  orderDate: string;
  appointmentDate?: string;
  status: 'solicitado' | 'agendado' | 'realizado' | 'informado' | 'validado' | 'entregado';
  orderedBy: string;
}

export interface ResultadoEstudio {
  id: string;
  requestId: string;
  patientDocument: string;
  patientName: string;
  studyType: 'laboratorio' | 'imagen';
  studyName: string;
  resultDate: string;
  status: 'pendiente' | 'preliminar' | 'definitivo' | 'validado';
  values?: ResultadoValor[];
  report?: string;
}

export interface ResultadoValor {
  parameter: string;
  value: string;
  unit?: string;
  referenceRange?: string;
  flag?: 'normal' | 'alto' | 'bajo';
}

export interface ValidacionMedica {
  id: string;
  resultId: string;
  patientDocument: string;
  patientName: string;
  studyName: string;
  validationDate: string;
  validatedBy: string;
  status: 'pendiente' | 'validado' | 'observaciones';
  observations?: string;
}

export interface EntregaResultado {
  id: string;
  resultId: string;
  patientDocument: string;
  patientName: string;
  studyName: string;
  deliveryDate: string;
  deliveryMethod: 'presencial' | 'portal' | 'correo';
  deliveredBy: string;
  recipient?: string;
}
