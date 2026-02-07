import type { Bed, Admission, InternalTransfer, Discharge } from '../types.js';

export const MOCK_BEDS: Bed[] = [
  { id: 'b1', code: '101-A', room: '101', unit: 'Medicina', floor: '1', status: 'ocupada', patientId: 'p1', patientName: 'Juan Pérez', admissionId: 'adm1', admissionDate: '2024-06-01' },
  { id: 'b2', code: '101-B', room: '101', unit: 'Medicina', floor: '1', status: 'disponible' },
  { id: 'b3', code: '102-A', room: '102', unit: 'Medicina', floor: '1', status: 'disponible' },
  { id: 'b4', code: '102-B', room: '102', unit: 'Medicina', floor: '1', status: 'ocupada', patientId: 'p2', patientName: 'María Rodríguez', admissionId: 'adm2', admissionDate: '2024-06-02' },
  { id: 'b5', code: '201-A', room: '201', unit: 'Cirugía', floor: '2', status: 'disponible' },
  { id: 'b6', code: '201-B', room: '201', unit: 'Cirugía', floor: '2', status: 'mantenimiento' },
  { id: 'b7', code: 'U-01', room: 'Urgencias', unit: 'Urgencias', floor: '0', status: 'ocupada', patientId: 'p3', patientName: 'Pedro Martínez', admissionId: 'adm3', admissionDate: '2024-06-03' },
  { id: 'b8', code: 'U-02', room: 'Urgencias', unit: 'Urgencias', floor: '0', status: 'disponible' },
];

export const MOCK_ADMISSIONS: Admission[] = [
  { id: 'adm1', patientId: 'p1', patientName: 'Juan Pérez', document: '1234567890', documentType: 'CC', eps: 'Sanitas', admissionType: 'hospitalaria', admissionDate: '2024-06-01', admissionTime: '08:00', bedId: 'b1', bedCode: '101-A', room: '101', unit: 'Medicina', diagnosis: 'Hipertensión', status: 'activo', admittedBy: 'Enf. López' },
  { id: 'adm2', patientId: 'p2', patientName: 'María Rodríguez', document: '9876543210', documentType: 'CC', eps: 'Sura', admissionType: 'hospitalaria', admissionDate: '2024-06-02', admissionTime: '10:30', bedId: 'b4', bedCode: '102-B', room: '102', unit: 'Medicina', status: 'activo', admittedBy: 'Enf. López' },
  { id: 'adm3', patientId: 'p3', patientName: 'Pedro Martínez', document: '5555555555', documentType: 'CC', eps: 'Nueva EPS', admissionType: 'urgencias', admissionDate: '2024-06-03', admissionTime: '14:20', bedId: 'b7', bedCode: 'U-01', room: 'Urgencias', unit: 'Urgencias', triageLevel: 'Amarillo', priority: 'alta', diagnosis: 'Trauma', status: 'activo', admittedBy: 'Enf. Urgencias' },
];

export const MOCK_TRANSFERS: InternalTransfer[] = [
  { id: 't1', admissionId: 'adm1', patientId: 'p1', patientName: 'Juan Pérez', fromBedId: 'b7', fromBedCode: 'U-01', fromRoom: 'Urgencias', fromUnit: 'Urgencias', toBedId: 'b1', toBedCode: '101-A', toRoom: '101', toUnit: 'Medicina', transferDate: '2024-06-01', transferTime: '16:00', reason: 'Estabilización', transferredBy: 'Enf. López' },
];

export const MOCK_DISCHARGES: Discharge[] = [
  { id: 'd1', admissionId: 'adm0', patientId: 'p0', patientName: 'Carlos López', document: '1111111111', bedCode: '101-A', room: '101', dischargeType: 'alta_medica', dischargeDate: '2024-05-30', dischargeTime: '10:00', diagnosis: 'Neumonía', recommendations: 'Control en 7 días', dischargeBy: 'Dr. García' },
];
