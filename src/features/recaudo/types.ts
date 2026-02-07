export type PaymentMethod = 'efectivo' | 'transferencia' | 'tarjeta_debito' | 'tarjeta_credito' | 'cheque';

export type PaymentStatus = 'registrado' | 'conciliado' | 'rechazado' | 'anulado';

export type ReconciliationStatus = 'pendiente' | 'conciliado' | 'con_diferencias';

export interface Payment {
  id: string;
  affiliateId: string;
  affiliateName: string;
  document: string;
  amount: number;
  currency: string;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  reference?: string;
  concept: string;
  status: PaymentStatus;
  registeredBy?: string;
  registeredAt?: string;
}

export interface CollectionSummary {
  id: string;
  date: string;
  totalAmount: number;
  paymentCount: number;
  currency: string;
  payments: string[];
}

export interface Reconciliation {
  id: string;
  periodFrom: string;
  periodTo: string;
  expectedAmount: number;
  receivedAmount: number;
  difference: number;
  status: ReconciliationStatus;
  notes?: string;
  reconciledAt?: string;
}

export interface AccountStatementTransaction {
  id: string;
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface AccountStatement {
  id: string;
  affiliateId: string;
  affiliateName: string;
  document: string;
  periodFrom: string;
  periodTo: string;
  openingBalance: number;
  closingBalance: number;
  totalCredits: number;
  totalDebits: number;
  transactions: AccountStatementTransaction[];
}

export interface FinancialReport {
  id: string;
  type: string;
  title: string;
  periodFrom: string;
  periodTo: string;
  totalCollected: number;
  totalPayments: number;
  currency: string;
  summary?: Record<string, number>;
}
