export interface FamilyMember {
  id: string;
  documentNumber: string;
  fullName: string;
  relationship: string;
  birthDate: string;
  gender: string;
  healthStatus?: string;
  isHeadOfHousehold?: boolean;
}

export interface FamilyRisk {
  id: string;
  category: string;
  description: string;
  level: 'bajo' | 'medio' | 'alto';
  detectedAt: string;
  status: 'activo' | 'en_seguimiento' | 'resuelto';
}

export interface HomeVisit {
  id: string;
  date: string;
  reason: string;
  findings: string;
  professional: string;
  nextVisit?: string;
}

export interface Intervention {
  id: string;
  date: string;
  type: string;
  description: string;
  responsible: string;
  outcome?: string;
}

export interface FollowUp {
  id: string;
  date: string;
  type: string;
  notes: string;
  professional: string;
  nextAction?: string;
}

export interface FamilyFile {
  id: string;
  householdId: string;
  address: string;
  city: string;
  members: FamilyMember[];
  risks: FamilyRisk[];
  visits: HomeVisit[];
  interventions: Intervention[];
  followUps: FollowUp[];
}
