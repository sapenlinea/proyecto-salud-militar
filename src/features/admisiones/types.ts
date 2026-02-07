export type BedStatus = 'disponible' | 'ocupada' | 'mantenimiento' | 'reservada';

export type AdmissionType = 'urgencias' | 'hospitalaria' | 'programada';

export type DischargeType = 'alta_medica' | 'alta_voluntaria' | 'fallecimiento' | 'traslado' | 'fuga';

export interface Bed {
  id: string;
  code: string;
  room: string;
  unit: string;
  floor?: string;
  status: BedStatus;
  patientId?: string;
  patientName?: string;
  admissionId?: string;
  admissionDate?: string;
}

export interface Admission {
  id: string;
  patientId: string;
  patientName: string;
  document: string;
  documentType: string;
  eps: string;
  admissionType: AdmissionType;
  admissionDate: string;
  admissionTime: string;
  bedId: string;
  bedCode: string;
  room: string;
  unit: string;
  diagnosis?: string;
  triageLevel?: string;
  priority?: 'baja' | 'media' | 'alta' | 'crítica';
  status: 'activo' | 'trasladado' | 'egresado';
  admittedBy?: string;
}

export interface InternalTransfer {
  id: string;
  admissionId: string;
  patientId: string;
  patientName: string;
  fromBedId: string;
  fromBedCode: string;
  fromRoom: string;
  fromUnit: string;
  toBedId: string;
  toBedCode: string;
  toRoom: string;
  toUnit: string;
  transferDate: string;
  transferTime: string;
  reason?: string;
  transferredBy?: string;
}

export interface Discharge {
  id: string;
  admissionId: string;
  patientId: string;
  patientName: string;
  document: string;
  bedCode: string;
  room: string;
  dischargeType: DischargeType;
  dischargeDate: string;
  dischargeTime: string;
  diagnosis?: string;
  recommendations?: string;
  dischargeBy?: string;
}
