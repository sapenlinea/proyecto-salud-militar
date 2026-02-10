export interface SurgicalSchedule {
  id: string;
  patientDocument: string;
  patientName: string;
  procedure: string;
  surgeon: string;
  date: string;
  time: string;
  room: string;
  status: 'programada' | 'en_curso' | 'completada' | 'cancelada';
}

export interface Preoperative {
  id: string;
  scheduleId: string;
  patientName: string;
  procedure: string;
  date: string;
  labResults?: string;
  anesthesiologist: string;
  clearance: 'apto' | 'apto_con_observaciones' | 'no_apto';
  notes?: string;
}

export interface Postoperative {
  id: string;
  scheduleId: string;
  patientName: string;
  procedure: string;
  surgeryDate: string;
  followUpDate: string;
  status: string;
  complications?: string;
  responsible: string;
}

export interface SurgicalSupply {
  id: string;
  scheduleId: string;
  patientName: string;
  procedure: string;
  item: string;
  quantity: number;
  unit: string;
  date: string;
}

export interface SurgicalReport {
  id: string;
  period: string;
  totalSurgeries: number;
  byProcedure: { procedure: string; count: number }[];
  cancelledCount: number;
  complicationsCount: number;
}
