import type { Payment, CollectionSummary, Reconciliation, AccountStatement, FinancialReport } from '../types.js';

export const MOCK_PAYMENTS: Payment[] = [
  { id: 'p1', affiliateId: 'aff1', affiliateName: 'Juan Pérez', document: '1234567890', amount: 45000, currency: 'COP', paymentDate: '2024-06-15', paymentMethod: 'transferencia', reference: 'TRF-001', concept: 'Consulta Medicina General', status: 'conciliado', registeredBy: 'Usuario', registeredAt: '2024-06-15T10:30:00' },
  { id: 'p2', affiliateId: 'aff2', affiliateName: 'María Rodríguez', document: '9876543210', amount: 35000, currency: 'COP', paymentDate: '2024-06-15', paymentMethod: 'efectivo', concept: 'Electrocardiograma', status: 'conciliado', registeredBy: 'Usuario', registeredAt: '2024-06-15T11:00:00' },
  { id: 'p3', affiliateId: 'aff1', affiliateName: 'Juan Pérez', document: '1234567890', amount: 12000, currency: 'COP', paymentDate: '2024-06-16', paymentMethod: 'tarjeta_debito', reference: 'TAR-456', concept: 'Hemograma', status: 'registrado', registeredBy: 'Usuario', registeredAt: '2024-06-16T09:15:00' },
  { id: 'p4', affiliateId: 'aff3', affiliateName: 'Pedro Martínez', document: '5555555555', amount: 48000, currency: 'COP', paymentDate: '2024-06-16', paymentMethod: 'efectivo', concept: 'Consulta Pediatría', status: 'registrado', registeredBy: 'Usuario', registeredAt: '2024-06-16T14:20:00' },
  { id: 'p5', affiliateId: 'aff2', affiliateName: 'María Rodríguez', document: '9876543210', amount: 55000, currency: 'COP', paymentDate: '2024-06-17', paymentMethod: 'transferencia', reference: 'TRF-002', concept: 'Radiografía', status: 'registrado', registeredBy: 'Usuario', registeredAt: '2024-06-17T08:00:00' },
];

export const MOCK_COLLECTION_SUMMARIES: CollectionSummary[] = [
  { id: 'c1', date: '2024-06-15', totalAmount: 80000, paymentCount: 2, currency: 'COP', payments: ['p1', 'p2'] },
  { id: 'c2', date: '2024-06-16', totalAmount: 60000, paymentCount: 2, currency: 'COP', payments: ['p3', 'p4'] },
  { id: 'c3', date: '2024-06-17', totalAmount: 55000, paymentCount: 1, currency: 'COP', payments: ['p5'] },
];

export const MOCK_RECONCILIATIONS: Reconciliation[] = [
  { id: 'r1', periodFrom: '2024-06-01', periodTo: '2024-06-15', expectedAmount: 80000, receivedAmount: 80000, difference: 0, status: 'conciliado', reconciledAt: '2024-06-16T09:00:00' },
  { id: 'r2', periodFrom: '2024-06-16', periodTo: '2024-06-30', expectedAmount: 150000, receivedAmount: 115000, difference: 35000, status: 'con_diferencias', notes: 'Pendiente cierre bancario' },
];

export const MOCK_ACCOUNT_STATEMENTS: AccountStatement[] = [
  {
    id: 'as1',
    affiliateId: 'aff1',
    affiliateName: 'Juan Pérez',
    document: '1234567890',
    periodFrom: '2024-06-01',
    periodTo: '2024-06-30',
    openingBalance: 0,
    closingBalance: -57000,
    totalCredits: 0,
    totalDebits: 57000,
    transactions: [
      { id: 't1', date: '2024-06-15', description: 'Consulta Medicina General', debit: 45000, credit: 0, balance: -45000 },
      { id: 't2', date: '2024-06-16', description: 'Hemograma', debit: 12000, credit: 0, balance: -57000 },
    ],
  },
  {
    id: 'as2',
    affiliateId: 'aff2',
    affiliateName: 'María Rodríguez',
    document: '9876543210',
    periodFrom: '2024-06-01',
    periodTo: '2024-06-30',
    openingBalance: 0,
    closingBalance: -90000,
    totalCredits: 0,
    totalDebits: 90000,
    transactions: [
      { id: 't3', date: '2024-06-15', description: 'Electrocardiograma', debit: 35000, credit: 0, balance: -35000 },
      { id: 't4', date: '2024-06-17', description: 'Radiografía', debit: 55000, credit: 0, balance: -90000 },
    ],
  },
];

export const MOCK_FINANCIAL_REPORTS: FinancialReport[] = [
  { id: 'fr1', type: 'recaudo_diario', title: 'Recaudo diario', periodFrom: '2024-06-15', periodTo: '2024-06-15', totalCollected: 80000, totalPayments: 2, currency: 'COP', summary: { efectivo: 35000, transferencia: 45000 } },
  { id: 'fr2', type: 'recaudo_mensual', title: 'Recaudo mensual', periodFrom: '2024-06-01', periodTo: '2024-06-30', totalCollected: 195000, totalPayments: 5, currency: 'COP', summary: { efectivo: 83000, transferencia: 100000, tarjeta_debito: 12000 } },
];
