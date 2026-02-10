import type {
  EstadoCuenta,
  CostoPorServicio,
  Glosa,
  Facturacion,
  DetalleContable,
} from '../types';

export const MOCK_ESTADO_CUENTA: EstadoCuenta[] = [
  {
    id: 'ec1',
    patientId: 'p1',
    patientDocument: '52345678',
    patientName: 'Juan Pérez García',
    periodFrom: '2025-01-01',
    periodTo: '2025-01-31',
    openingBalance: 0,
    totalDebits: 450000,
    totalCredits: 150000,
    closingBalance: 300000,
    transactions: [
      { id: 't1', date: '2025-01-05', description: 'Consulta medicina general', debit: 45000, credit: 0, balance: 45000 },
      { id: 't2', date: '2025-01-12', description: 'Laboratorio hemograma', debit: 85000, credit: 0, balance: 130000 },
      { id: 't3', date: '2025-01-15', description: 'Medicamentos', debit: 120000, credit: 0, balance: 250000 },
      { id: 't4', date: '2025-01-18', description: 'Procedimiento menor', debit: 200000, credit: 0, balance: 450000 },
      { id: 't5', date: '2025-01-20', description: 'Abono', debit: 0, credit: 150000, balance: 300000 },
    ],
  },
  {
    id: 'ec2',
    patientId: 'p2',
    patientDocument: '80123456',
    patientName: 'María López Martínez',
    periodFrom: '2025-01-01',
    periodTo: '2025-01-31',
    openingBalance: 80000,
    totalDebits: 320000,
    totalCredits: 200000,
    closingBalance: 200000,
    transactions: [
      { id: 't6', date: '2025-01-03', description: 'Consulta especialista', debit: 75000, credit: 0, balance: 155000 },
      { id: 't7', date: '2025-01-10', description: 'Imagenología RX', debit: 95000, credit: 0, balance: 250000 },
      { id: 't8', date: '2025-01-15', description: 'Farmacia', debit: 150000, credit: 0, balance: 400000 },
      { id: 't9', date: '2025-01-22', description: 'Abono parcial', debit: 0, credit: 200000, balance: 200000 },
    ],
  },
];

export const MOCK_COSTOS_POR_SERVICIO: CostoPorServicio[] = [
  { id: 'c1', serviceCode: '890201', serviceName: 'Consulta medicina general', category: 'Consulta', unitCost: 45000, totalExecuted: 120, totalCost: 5400000, period: '2025-01' },
  { id: 'c2', serviceCode: '890202', serviceName: 'Consulta especialista', category: 'Consulta', unitCost: 75000, totalExecuted: 85, totalCost: 6375000, period: '2025-01' },
  { id: 'c3', serviceCode: '300101', serviceName: 'Hemograma', category: 'Laboratorio', unitCost: 25000, totalExecuted: 200, totalCost: 5000000, period: '2025-01' },
  { id: 'c4', serviceCode: '300201', serviceName: 'Glucosa', category: 'Laboratorio', unitCost: 12000, totalExecuted: 180, totalCost: 2160000, period: '2025-01' },
  { id: 'c5', serviceCode: '412001', serviceName: 'RX tórax', category: 'Imagenología', unitCost: 95000, totalExecuted: 45, totalCost: 4275000, period: '2025-01' },
  { id: 'c6', serviceCode: '510001', serviceName: 'Procedimiento menor', category: 'Procedimientos', unitCost: 200000, totalExecuted: 25, totalCost: 5000000, period: '2025-01' },
];

export const MOCK_GLOSAS: Glosa[] = [
  { id: 'g1', invoiceNumber: 'FAC-2025-00123', patientDocument: '52345678', patientName: 'Juan Pérez', eps: 'Sura', glosaType: 'técnica', amount: 45000, date: '2025-01-15', status: 'en_gestion', observations: 'Documentación incompleta' },
  { id: 'g2', invoiceNumber: 'FAC-2025-00145', patientDocument: '80123456', patientName: 'María López', eps: 'Nueva EPS', glosaType: 'administrativa', amount: 75000, date: '2025-01-18', status: 'pendiente', observations: 'Error en formato de factura' },
  { id: 'g3', invoiceNumber: 'FAC-2024-09876', patientDocument: '10987654', patientName: 'Carlos Rodríguez', eps: 'Sanitas', glosaType: 'facturación', amount: 120000, date: '2024-12-20', status: 'aceptada' },
  { id: 'g4', invoiceNumber: 'FAC-2024-09850', patientDocument: '52555123', patientName: 'Ana Martínez', eps: 'Compensar', glosaType: 'técnica', amount: 35000, date: '2024-12-15', status: 'rechazada', observations: 'No procede glosa' },
];

export const MOCK_FACTURACION: Facturacion[] = [
  { id: 'f1', invoiceNumber: 'FAC-2025-00200', patientDocument: '52345678', patientName: 'Juan Pérez', eps: 'Sura', period: '2025-01', subtotal: 450000, iva: 85500, total: 535500, status: 'enviada', emissionDate: '2025-02-01' },
  { id: 'f2', invoiceNumber: 'FAC-2025-00201', patientDocument: '80123456', patientName: 'María López', eps: 'Nueva EPS', period: '2025-01', subtotal: 320000, iva: 60800, total: 380800, status: 'pagada', emissionDate: '2025-02-01' },
  { id: 'f3', invoiceNumber: 'FAC-2025-00202', patientDocument: '10987654', patientName: 'Carlos Rodríguez', eps: 'Sanitas', period: '2025-01', subtotal: 280000, iva: 53200, total: 333200, status: 'cartera', emissionDate: '2025-02-02' },
  { id: 'f4', invoiceNumber: 'FAC-2025-00203', patientDocument: '52555123', patientName: 'Ana Martínez', eps: 'Compensar', period: '2025-01', subtotal: 195000, iva: 37050, total: 232050, status: 'borrador', emissionDate: '2025-02-03' },
];

export const MOCK_DETALLE_CONTABLE: DetalleContable[] = [
  { id: 'd1', date: '2025-01-05', accountCode: '1105', accountName: 'Caja', documentRef: 'REC-001', description: 'Ingreso consulta', debit: 45000, credit: 0, patientId: 'p1' },
  { id: 'd2', date: '2025-01-05', accountCode: '4105', accountName: 'Ingresos consultas', documentRef: 'REC-001', description: 'Consulta medicina general', debit: 0, credit: 45000 },
  { id: 'd3', date: '2025-01-12', accountCode: '1305', accountName: 'Cuentas por cobrar EPS', documentRef: 'FAC-00123', description: 'Facturación Sura', debit: 320000, credit: 0, patientId: 'p1' },
  { id: 'd4', date: '2025-01-12', accountCode: '4105', accountName: 'Ingresos consultas', documentRef: 'FAC-00123', description: 'Servicios facturados', debit: 0, credit: 320000 },
  { id: 'd5', date: '2025-01-20', accountCode: '1105', accountName: 'Caja', documentRef: 'REC-002', description: 'Abono paciente', debit: 150000, credit: 0, patientId: 'p1' },
  { id: 'd6', date: '2025-01-20', accountCode: '1305', accountName: 'Cuentas por cobrar', documentRef: 'REC-002', description: 'Abono cuenta paciente', debit: 0, credit: 150000, patientId: 'p1' },
];
