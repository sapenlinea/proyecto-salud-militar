export interface PypProgram {
  id: string;
  code: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  status: 'activo' | 'suspendido' | 'finalizado';
  responsible: string;
}

export interface TargetPopulation {
  id: string;
  programId: string;
  programName: string;
  group: string;
  description: string;
  estimatedSize: number;
  registeredSize: number;
  coverage?: number;
}

export interface PypActivity {
  id: string;
  programId: string;
  programName: string;
  name: string;
  type: string;
  date: string;
  participants: number;
  responsible: string;
}

export interface CoverageIndicator {
  id: string;
  programId: string;
  programName: string;
  indicator: string;
  target: number;
  achieved: number;
  unit: string;
  percentage: number;
}

export interface PypFollowUp {
  id: string;
  programId: string;
  programName: string;
  date: string;
  type: string;
  notes: string;
  responsible: string;
  nextAction?: string;
}
