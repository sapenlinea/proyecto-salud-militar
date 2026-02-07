export type ServiceStatus = 'activo' | 'inactivo' | 'suspendido';

export interface Specialty {
  id: string;
  code: string;
  name: string;
  description?: string;
}

export interface Procedure {
  id: string;
  code: string;
  name: string;
  description?: string;
  specialtyId: string;
  specialtyName?: string;
}

export interface Tariff {
  id: string;
  serviceId: string;
  amount: number;
  currency: string;
  effectiveFrom: string;
  effectiveTo?: string;
}

export interface Service {
  id: string;
  code: string;
  name: string;
  description?: string;
  specialtyId: string;
  specialtyName: string;
  procedureId?: string;
  procedureName?: string;
  tariffId: string;
  amount: number;
  currency: string;
  validFrom: string;
  validTo?: string;
  status: ServiceStatus;
}
