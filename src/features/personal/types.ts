export interface StaffMember {
  id: string;
  documentNumber: string;
  fullName: string;
  profession: string;
  specialty?: string;
  email: string;
  phone: string;
  active: boolean;
  hireDate: string;
}

export interface Profession {
  id: string;
  code: string;
  name: string;
  active: boolean;
}

export interface Specialty {
  id: string;
  professionId: string;
  code: string;
  name: string;
  active: boolean;
}

export interface Shift {
  id: string;
  staffId: string;
  staffName: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'mañana' | 'tarde' | 'noche' | '24h';
  area: string;
}

export interface Contract {
  id: string;
  staffId: string;
  staffName: string;
  type: 'indefinido' | 'término_fijo' | 'prestación_servicios';
  startDate: string;
  endDate?: string;
  salary?: number;
  status: 'vigente' | 'vencido' | 'terminado';
}

export interface License {
  id: string;
  staffId: string;
  staffName: string;
  type: string;
  issuingEntity: string;
  number: string;
  issueDate: string;
  expiryDate: string;
  status: 'vigente' | 'próximo_vencer' | 'vencido';
}
