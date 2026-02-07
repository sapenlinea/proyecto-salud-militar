export type AppointmentStatus = 'programada' | 'confirmada' | 'cancelada' | 'completada' | 'no_asistio';

export interface Specialty {
  id: string;
  name: string;
  code: string;
}

export interface Professional {
  id: string;
  name: string;
  document: string;
  specialtyId: string;
  specialtyName: string;
  scheduleStart: string;
  scheduleEnd: string;
  slotMinutes: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  document: string;
  documentType: string;
  professionalId: string;
  professionalName: string;
  specialtyId: string;
  specialtyName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  reason?: string;
  notes?: string;
  createdAt?: string;
  createdBy?: string;
}
