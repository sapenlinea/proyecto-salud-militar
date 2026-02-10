export interface CarnetVacunacion {
  id: string;
  patientId: string;
  patientDocument: string;
  patientName: string;
  birthDate: string;
  vaccines: DosisVacuna[];
  lastUpdate: string;
}

export interface DosisVacuna {
  id: string;
  vaccineName: string;
  doseNumber: number;
  applicationDate: string;
  lot: string;
  institution: string;
  appliedBy?: string;
}

export interface AplicacionVacuna {
  id: string;
  patientDocument: string;
  patientName: string;
  vaccineName: string;
  doseNumber: number;
  applicationDate: string;
  lot: string;
  appliedBy: string;
  institution: string;
  nextDoseDate?: string;
}

export interface EsquemaPorEdad {
  id: string;
  ageGroup: string;
  vaccineName: string;
  doseNumber: number;
  minAgeDays: number;
  maxAgeDays?: number;
  description?: string;
}

export interface CoberturaVacunacion {
  id: string;
  vaccineName: string;
  ageGroup: string;
  period: string;
  populationTarget: number;
  vaccinated: number;
  coveragePercent: number;
}

export interface ReportePAI {
  id: string;
  period: string;
  reportType: 'mensual' | 'trimestral' | 'anual';
  vaccinesIncluded: string[];
  totalDosesApplied: number;
  status: 'borrador' | 'enviado' | 'validado';
  sentDate?: string;
}
