export type ReferralStatus = 'pendiente' | 'enviada' | 'en_seguimiento' | 'cerrada' | 'rechazada';

export type ReferralUrgency = 'rutina' | 'urgencia' | 'emergencia';

export interface Referral {
  id: string;
  patientId: string;
  patientName: string;
  document: string;
  documentType: string;
  specialty: string;
  reason: string;
  urgency: ReferralUrgency;
  referringProfessional: string;
  referringInstitution: string;
  referredToInstitution: string;
  status: ReferralStatus;
  createdAt: string;
  closedAt?: string;
  closureNotes?: string;
  closureOutcome?: string;
}

export interface FollowUp {
  id: string;
  referralId: string;
  referralCode?: string;
  patientName?: string;
  date: string;
  notes: string;
  performedBy: string;
}

export interface AttachedDocument {
  id: string;
  referralId: string;
  name: string;
  type: string;
  size?: number;
  uploadedAt: string;
  uploadedBy: string;
}
