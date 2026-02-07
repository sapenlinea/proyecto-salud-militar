export interface Medication {
  id: string;
  code: string;
  name: string;
  genericName?: string;
  presentation: string;
  unit: string;
  concentration?: string;
  pharmaceuticalForm: string;
  therapeuticGroup?: string;
  requiresPrescription: boolean;
}

export interface Lot {
  id: string;
  medicationId: string;
  lotNumber: string;
  expirationDate: string;
  manufacturingDate?: string;
  quantity: number;
  supplierId?: string;
  location?: string;
}

export interface InventoryItem {
  id: string;
  medicationId: string;
  medication: Medication;
  totalQuantity: number;
  lots: Lot[];
  minStock: number;
  maxStock?: number;
  lastUpdate: string;
  location?: string;
}

export interface KardexEntry {
  id: string;
  medicationId: string;
  date: string;
  time: string;
  type: 'entrada' | 'salida' | 'ajuste';
  lotNumber?: string;
  quantity: number;
  balance: number;
  reference?: string;
  patientId?: string;
  patientName?: string;
  dispensationId?: string;
  author?: string;
}

export interface Dispensation {
  id: string;
  patientId: string;
  patientName: string;
  document: string;
  date: string;
  time: string;
  items: DispensationItem[];
  prescriptionId?: string;
  status: 'pendiente' | 'parcial' | 'completada' | 'cancelada';
  dispensedBy?: string;
}

export interface DispensationItem {
  id: string;
  medicationId: string;
  medicationName: string;
  lotNumber: string;
  quantity: number;
  dosage?: string;
  instructions?: string;
}

export interface Supplier {
  id: string;
  code: string;
  name: string;
  nit?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  contactPerson?: string;
  isActive: boolean;
}

export interface ExpirationAlert {
  id: string;
  medicationId: string;
  medicationName: string;
  lotNumber: string;
  quantity: number;
  expirationDate: string;
  daysToExpire: number;
  severity: 'crítico' | 'alerta' | 'próximo';
}
