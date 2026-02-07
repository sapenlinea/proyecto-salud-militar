import type {
  Medication,
  Lot,
  InventoryItem,
  KardexEntry,
  Dispensation,
  Supplier,
  ExpirationAlert,
} from '../types.js';

export const MOCK_MEDICATIONS: Medication[] = [
  {
    id: 'med1',
    code: 'LOS-50',
    name: 'Losartán',
    genericName: 'Losartán potásico',
    presentation: 'Tabletas 50 mg x 30',
    unit: 'tableta',
    concentration: '50 mg',
    pharmaceuticalForm: 'Tableta',
    therapeuticGroup: 'Antihipertensivos',
    requiresPrescription: true,
  },
  {
    id: 'med2',
    code: 'MET-850',
    name: 'Metformina',
    genericName: 'Clorhidrato de metformina',
    presentation: 'Tabletas 850 mg x 60',
    unit: 'tableta',
    concentration: '850 mg',
    pharmaceuticalForm: 'Tableta',
    therapeuticGroup: 'Antidiabéticos',
    requiresPrescription: true,
  },
  {
    id: 'med3',
    code: 'ACET-500',
    name: 'Acetaminofén',
    presentation: 'Tabletas 500 mg x 10',
    unit: 'tableta',
    concentration: '500 mg',
    pharmaceuticalForm: 'Tableta',
    requiresPrescription: false,
  },
];

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: 'sup1',
    code: 'SUP001',
    name: 'Laboratorios Genéricos S.A.',
    nit: '900123456-1',
    phone: '6012345678',
    email: 'ventas@labgenericos.com',
    address: 'Calle 100 # 15-20',
    city: 'Bogotá',
    contactPerson: 'Juan Pérez',
    isActive: true,
  },
  {
    id: 'sup2',
    code: 'SUP002',
    name: 'Distribuidora Farmacéutica Norte',
    nit: '900654321-2',
    phone: '6045678901',
    city: 'Medellín',
    isActive: true,
  },
];

export const MOCK_LOTS: Lot[] = [
  { id: 'lot1', medicationId: 'med1', lotNumber: 'L2024-001', expirationDate: '2025-03-15', manufacturingDate: '2024-03-15', quantity: 500, supplierId: 'sup1', location: 'ANA-A1' },
  { id: 'lot2', medicationId: 'med1', lotNumber: 'L2024-002', expirationDate: '2025-06-20', manufacturingDate: '2024-06-20', quantity: 300, supplierId: 'sup1', location: 'ANA-A1' },
  { id: 'lot3', medicationId: 'med2', lotNumber: 'M2024-001', expirationDate: '2025-01-10', manufacturingDate: '2024-01-10', quantity: 200, supplierId: 'sup1', location: 'ANA-A2' },
  { id: 'lot4', medicationId: 'med2', lotNumber: 'M2024-002', expirationDate: '2025-08-30', quantity: 400, supplierId: 'sup2', location: 'ANA-A2' },
  { id: 'lot5', medicationId: 'med3', lotNumber: 'A2024-001', expirationDate: '2024-11-30', manufacturingDate: '2024-02-01', quantity: 1000, supplierId: 'sup2', location: 'ANA-B1' },
];

export const MOCK_INVENTORY: InventoryItem[] = MOCK_MEDICATIONS.map((med) => {
  const medLots = MOCK_LOTS.filter((l) => l.medicationId === med.id);
  const total = medLots.reduce((s, l) => s + l.quantity, 0);
  return {
    id: `inv-${med.id}`,
    medicationId: med.id,
    medication: med,
    totalQuantity: total,
    lots: medLots,
    minStock: med.id === 'med3' ? 500 : 100,
    lastUpdate: '2024-06-01T14:00:00Z',
    location: 'Anaquel principal',
  };
});

export const MOCK_KARDEX: KardexEntry[] = [
  { id: 'k1', medicationId: 'med1', date: '2024-06-01', time: '08:00', type: 'entrada', lotNumber: 'L2024-001', quantity: 100, balance: 600, reference: 'Compra #123', author: 'Farm. García' },
  { id: 'k2', medicationId: 'med1', date: '2024-06-01', time: '10:30', type: 'salida', lotNumber: 'L2024-001', quantity: -30, balance: 570, patientId: 'p1', patientName: 'Juan Pérez', dispensationId: 'd1', author: 'Farm. García' },
  { id: 'k3', medicationId: 'med1', date: '2024-05-30', time: '14:00', type: 'ajuste', quantity: 5, balance: 500, reference: 'Inventario físico', author: 'Farm. López' },
];

export const MOCK_DISPENSATIONS: Dispensation[] = [
  {
    id: 'd1',
    patientId: 'p1',
    patientName: 'Juan Carlos Pérez García',
    document: '1234567890',
    date: '2024-06-01',
    time: '10:30',
    items: [
      { id: 'di1', medicationId: 'med1', medicationName: 'Losartán 50 mg', lotNumber: 'L2024-001', quantity: 30, dosage: '1 tableta/día', instructions: 'En ayunas' },
      { id: 'di2', medicationId: 'med2', medicationName: 'Metformina 850 mg', lotNumber: 'M2024-001', quantity: 60, dosage: '2 tabletas/día', instructions: 'Con alimentos' },
    ],
    status: 'completada',
    dispensedBy: 'Farm. García',
  },
  {
    id: 'd2',
    patientId: 'p2',
    patientName: 'María Rodríguez',
    document: '9876543210',
    date: '2024-06-02',
    time: '09:00',
    items: [
      { id: 'di3', medicationId: 'med3', medicationName: 'Acetaminofén 500 mg', lotNumber: 'A2024-001', quantity: 10 },
    ],
    status: 'pendiente',
  },
];

export const MOCK_EXPIRATION_ALERTS: ExpirationAlert[] = [
  { id: 'ea1', medicationId: 'med3', medicationName: 'Acetaminofén 500 mg', lotNumber: 'A2024-001', quantity: 1000, expirationDate: '2024-11-30', daysToExpire: 180, severity: 'próximo' },
  { id: 'ea2', medicationId: 'med2', medicationName: 'Metformina 850 mg', lotNumber: 'M2024-001', quantity: 200, expirationDate: '2025-01-10', daysToExpire: 220, severity: 'alerta' },
];
