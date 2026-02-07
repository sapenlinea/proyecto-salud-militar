export interface PatientAssignment {
  id: string;
  patientId: string;
  patientName: string;
  document: string;
  eps: string;
  room?: string;
  bed?: string;
  admissionDate: string;
  assignedNurse?: string;
  status: 'activo' | 'alta' | 'transferido';
  priority?: 'baja' | 'media' | 'alta' | 'crítico';
}

export interface VitalSigns {
  id: string;
  patientId: string;
  date: string;
  time: string;
  temperature?: number;
  heartRate?: number;
  respiratoryRate?: number;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  oxygenSaturation?: number;
  weight?: number;
  height?: number;
  bmi?: number;
  painLevel?: number;
  notes?: string;
  recordedBy?: string;
}

export interface NursingNote {
  id: string;
  patientId: string;
  date: string;
  time: string;
  type: 'general' | 'evolutiva' | 'quirúrgica' | 'alta' | 'incidente';
  content: string;
  author?: string;
  signature?: string;
}

export interface MedicationAdministration {
  id: string;
  patientId: string;
  medicationName: string;
  dosage: string;
  route: string;
  scheduledTime: string;
  administeredTime?: string;
  status: 'pendiente' | 'administrado' | 'omitido' | 'retrasado';
  administeredBy?: string;
  notes?: string;
  reasonOmitted?: string;
}

export interface CarePlan {
  id: string;
  patientId: string;
  diagnosis: string;
  nursingDiagnosis: string;
  expectedOutcome: string;
  interventions: string[];
  evaluation?: string;
  status: 'activo' | 'cumplido' | 'suspendido';
  startDate: string;
  endDate?: string;
  author?: string;
}

export interface ClinicalScale {
  id: string;
  patientId: string;
  type: 'braden' | 'glasgow' | 'norton' | 'barthel';
  date: string;
  time: string;
  totalScore: number;
  scores: Record<string, number>;
  interpretation?: string;
  author?: string;
}

export const SCALE_LABELS: Record<string, Record<string, string>> = {
  braden: {
    sensoryPerception: 'Percepción sensorial',
    moisture: 'Humedad',
    activity: 'Actividad',
    mobility: 'Movilidad',
    nutrition: 'Nutrición',
    frictionShear: 'Fricción y cizallamiento',
  },
  glasgow: {
    eyeOpening: 'Apertura ocular',
    verbalResponse: 'Respuesta verbal',
    motorResponse: 'Respuesta motora',
  },
  norton: {
    physicalCondition: 'Estado físico',
    mentalState: 'Estado mental',
    activity: 'Actividad',
    mobility: 'Movilidad',
    incontinence: 'Incontinencia',
  },
  barthel: {
    feeding: 'Alimentación',
    bathing: 'Baño',
    grooming: 'Aseo personal',
    dressing: 'Vestido',
    bowelControl: 'Control intestinal',
    bladderControl: 'Control vesical',
    toiletUse: 'Uso del inodoro',
    transfers: 'Transferencias',
    mobility: 'Movilidad',
    stairs: 'Escaleras',
  },
};
