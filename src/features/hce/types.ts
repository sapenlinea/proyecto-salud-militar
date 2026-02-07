export interface Patient {
  id: string;
  documentType: string;
  documentNumber: string;
  firstName: string;
  secondName?: string;
  lastName: string;
  secondLastName?: string;
  birthDate: string;
  gender: string;
  bloodType?: string;
  eps: string;
  epsCode?: string;
  affiliationType?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  department?: string;
  createdAt: string;
}

export interface ClinicalEvent {
  id: string;
  patientId: string;
  type: 'evolution' | 'diagnosis' | 'procedure' | 'medication' | 'attachment';
  date: string;
  title: string;
  description?: string;
  author?: string;
  metadata?: Record<string, unknown>;
}

export interface MedicalEvolution {
  id: string;
  patientId: string;
  date: string;
  reason: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  author: string;
  authorId?: string;
}

export interface Cie10Item {
  code: string;
  description: string;
}

export interface Diagnosis {
  id: string;
  patientId: string;
  cie10Code: string;
  cie10Description: string;
  type: 'principal' | 'relacionado' | 'complicación';
  date: string;
  author?: string;
  notes?: string;
}

export interface Procedure {
  id: string;
  patientId: string;
  code: string;
  name: string;
  date: string;
  author?: string;
  notes?: string;
}

export interface PrescribedMedication {
  id: string;
  patientId: string;
  name: string;
  dosage: string;
  frequency: string;
  route: string;
  duration: string;
  date: string;
  author?: string;
  instructions?: string;
}

export interface Attachment {
  id: string;
  patientId: string;
  name: string;
  type: 'pdf' | 'image' | 'other';
  mimeType: string;
  url: string;
  date: string;
  description?: string;
  size?: number;
}
