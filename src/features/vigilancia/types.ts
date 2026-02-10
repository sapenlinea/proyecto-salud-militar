export interface NotificationEvent {
  id: string;
  code: string;
  name: string;
  type: string;
  date: string;
  patientId?: string;
  patientName?: string;
  status: 'notificado' | 'confirmado' | 'descartado' | 'en_seguimiento';
  sivigilaId?: string;
}

export interface SivigilaCase {
  id: string;
  sivigilaId: string;
  eventCode: string;
  eventName: string;
  patientDocument: string;
  patientName: string;
  notificationDate: string;
  status: string;
  source: string;
}

export interface EarlyAlert {
  id: string;
  type: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  detectedAt: string;
  zone?: string;
  status: 'activa' | 'en_seguimiento' | 'cerrada';
}

export interface EpidemiologicalPoint {
  id: string;
  eventCode: string;
  eventName: string;
  lat: number;
  lng: number;
  address: string;
  cases: number;
  date: string;
}

export interface ActiveCase {
  id: string;
  eventCode: string;
  eventName: string;
  patientDocument: string;
  patientName: string;
  notificationDate: string;
  status: 'activo' | 'recuperado' | 'fallecido';
  responsible: string;
}
