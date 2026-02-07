export type AffiliateStatus = 'activo' | 'suspendido' | 'retenido' | 'inactivo' | 'cartera';

export interface Affiliate {
  id: string;
  documentType: string;
  documentNumber: string;
  firstName: string;
  secondName?: string;
  lastName: string;
  secondLastName?: string;
  birthDate: string;
  gender: string;
  eps: string;
  epsCode: string;
  affiliationType: 'contributivo' | 'subsidiado' | 'especial';
  status: AffiliateStatus;
  effectiveDate: string;
  terminationDate?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  department?: string;
  beneficiaryCategory?: 'titular' | 'conyuge' | 'hijo' | 'padre' | 'otro';
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

export interface AffiliationRegistration {
  documentType: string;
  documentNumber: string;
  firstName: string;
  secondName?: string;
  lastName: string;
  secondLastName?: string;
  birthDate: string;
  gender: string;
  eps: string;
  epsCode: string;
  affiliationType: Affiliate['affiliationType'];
  effectiveDate: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  department?: string;
  beneficiaryCategory?: Affiliate['beneficiaryCategory'];
}

export interface RightsValidation {
  affiliateId: string;
  documentNumber: string;
  isValid: boolean;
  eps: string;
  status: AffiliateStatus;
  effectiveDate: string;
  terminationDate?: string;
  message?: string;
  validatedAt: string;
}

export interface BulkUploadResult {
  total: number;
  success: number;
  errors: number;
  rows: { row: number; status: 'ok' | 'error'; message?: string }[];
}
