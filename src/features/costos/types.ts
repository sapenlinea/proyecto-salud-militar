export interface EstadoCuenta {
  id: string;
  patientId: string;
  patientDocument: string;
  patientName: string;
  periodFrom: string;
  periodTo: string;
  openingBalance: number;
  totalDebits: number;
  totalCredits: number;
  closingBalance: number;
  transactions: EstadoCuentaTransaction[];
}

export interface EstadoCuentaTransaction {
  id: string;
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface CostoPorServicio {
  id: string;
  serviceCode: string;
  serviceName: string;
  category: string;
  unitCost: number;
  totalExecuted: number;
  totalCost: number;
  period: string;
}

export interface Glosa {
  id: string;
  invoiceNumber: string;
  patientDocument: string;
  patientName: string;
  eps: string;
  glosaType: 'técnica' | 'administrativa' | 'facturación';
  amount: number;
  date: string;
  status: 'pendiente' | 'en_gestion' | 'aceptada' | 'rechazada';
  observations?: string;
}

export interface Facturacion {
  id: string;
  invoiceNumber: string;
  patientDocument: string;
  patientName: string;
  eps: string;
  period: string;
  subtotal: number;
  iva: number;
  total: number;
  status: 'borrador' | 'enviada' | 'pagada' | 'cartera';
  emissionDate: string;
}

export interface DetalleContable {
  id: string;
  date: string;
  accountCode: string;
  accountName: string;
  documentRef: string;
  description: string;
  debit: number;
  credit: number;
  patientId?: string;
}
