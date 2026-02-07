import type { Specialty, Procedure, Tariff, Service } from '../types.js';

export const MOCK_SPECIALTIES: Specialty[] = [
  { id: 'esp1', code: 'MG', name: 'Medicina General', description: 'Consulta médica general' },
  { id: 'esp2', code: 'CAR', name: 'Cardiología', description: 'Evaluación cardiovascular' },
  { id: 'esp3', code: 'TRA', name: 'Traumatología', description: 'Atención traumatológica' },
  { id: 'esp4', code: 'PED', name: 'Pediatría', description: 'Atención infantil' },
  { id: 'esp5', code: 'LAB', name: 'Laboratorio', description: 'Exámenes de laboratorio' },
];

export const MOCK_PROCEDURES: Procedure[] = [
  { id: 'proc1', code: 'CON-MG', name: 'Consulta Medicina General', specialtyId: 'esp1', specialtyName: 'Medicina General' },
  { id: 'proc2', code: 'ECG', name: 'Electrocardiograma', specialtyId: 'esp2', specialtyName: 'Cardiología' },
  { id: 'proc3', code: 'RX', name: 'Radiografía', specialtyId: 'esp3', specialtyName: 'Traumatología' },
  { id: 'proc4', code: 'CON-PED', name: 'Consulta Pediatría', specialtyId: 'esp4', specialtyName: 'Pediatría' },
  { id: 'proc5', code: 'HEM', name: 'Hemograma completo', specialtyId: 'esp5', specialtyName: 'Laboratorio' },
  { id: 'proc6', code: 'GLU', name: 'Glucemia', specialtyId: 'esp5', specialtyName: 'Laboratorio' },
];

export const MOCK_TARIFFS: Tariff[] = [
  { id: 'tar1', serviceId: 'srv1', amount: 45000, currency: 'COP', effectiveFrom: '2024-01-01' },
  { id: 'tar2', serviceId: 'srv2', amount: 35000, currency: 'COP', effectiveFrom: '2024-01-01' },
  { id: 'tar3', serviceId: 'srv3', amount: 55000, currency: 'COP', effectiveFrom: '2024-01-01' },
  { id: 'tar4', serviceId: 'srv4', amount: 48000, currency: 'COP', effectiveFrom: '2024-01-01' },
  { id: 'tar5', serviceId: 'srv5', amount: 12000, currency: 'COP', effectiveFrom: '2024-01-01' },
  { id: 'tar6', serviceId: 'srv6', amount: 8500, currency: 'COP', effectiveFrom: '2024-01-01' },
];

export const MOCK_SERVICES: Service[] = [
  { id: 'srv1', code: 'S-MG-001', name: 'Consulta Medicina General', description: 'Consulta médica general ambulatoria', specialtyId: 'esp1', specialtyName: 'Medicina General', procedureId: 'proc1', procedureName: 'Consulta Medicina General', tariffId: 'tar1', amount: 45000, currency: 'COP', validFrom: '2024-01-01', status: 'activo' },
  { id: 'srv2', code: 'S-CAR-001', name: 'Electrocardiograma', description: 'Estudio electrocardiográfico', specialtyId: 'esp2', specialtyName: 'Cardiología', procedureId: 'proc2', procedureName: 'Electrocardiograma', tariffId: 'tar2', amount: 35000, currency: 'COP', validFrom: '2024-01-01', status: 'activo' },
  { id: 'srv3', code: 'S-TRA-001', name: 'Radiografía simple', description: 'Radiografía en una proyección', specialtyId: 'esp3', specialtyName: 'Traumatología', procedureId: 'proc3', procedureName: 'Radiografía', tariffId: 'tar3', amount: 55000, currency: 'COP', validFrom: '2024-01-01', validTo: '2025-12-31', status: 'activo' },
  { id: 'srv4', code: 'S-PED-001', name: 'Consulta Pediatría', description: 'Consulta pediátrica ambulatoria', specialtyId: 'esp4', specialtyName: 'Pediatría', procedureId: 'proc4', procedureName: 'Consulta Pediatría', tariffId: 'tar4', amount: 48000, currency: 'COP', validFrom: '2024-01-01', status: 'activo' },
  { id: 'srv5', code: 'S-LAB-001', name: 'Hemograma', description: 'Hemograma completo', specialtyId: 'esp5', specialtyName: 'Laboratorio', procedureId: 'proc5', procedureName: 'Hemograma completo', tariffId: 'tar5', amount: 12000, currency: 'COP', validFrom: '2024-01-01', status: 'activo' },
  { id: 'srv6', code: 'S-LAB-002', name: 'Glucemia', description: 'Glucosa en sangre', specialtyId: 'esp5', specialtyName: 'Laboratorio', procedureId: 'proc6', procedureName: 'Glucemia', tariffId: 'tar6', amount: 8500, currency: 'COP', validFrom: '2024-01-01', status: 'inactivo' },
];
