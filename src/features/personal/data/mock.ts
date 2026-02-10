import type { StaffMember, Profession, Specialty, Shift, Contract, License } from '../types';

export const MOCK_STAFF: StaffMember[] = [
  {
    id: 's1',
    documentNumber: '52345678',
    fullName: 'Dr. Juan Pérez García',
    profession: 'Médico',
    specialty: 'Medicina general',
    email: 'juan.perez@ips.gov.co',
    phone: '3001234567',
    active: true,
    hireDate: '2020-03-15',
  },
  {
    id: 's2',
    documentNumber: '87654321',
    fullName: 'María López Sánchez',
    profession: 'Enfermera',
    specialty: 'Enfermería general',
    email: 'maria.lopez@ips.gov.co',
    phone: '3102345678',
    active: true,
    hireDate: '2019-06-01',
  },
  {
    id: 's3',
    documentNumber: '11223344',
    fullName: 'Carlos Gómez Torres',
    profession: 'Químico farmacéutico',
    email: 'carlos.gomez@ips.gov.co',
    phone: '3203456789',
    active: true,
    hireDate: '2021-01-10',
  },
];

export const MOCK_PROFESSIONS: Profession[] = [
  { id: 'p1', code: 'MED', name: 'Médico', active: true },
  { id: 'p2', code: 'ENF', name: 'Enfermera', active: true },
  { id: 'p3', code: 'QF', name: 'Químico farmacéutico', active: true },
  { id: 'p4', code: 'BIO', name: 'Bacteriólogo', active: true },
];

export const MOCK_SPECIALTIES: Specialty[] = [
  { id: 'sp1', professionId: 'p1', code: 'MG', name: 'Medicina general', active: true },
  { id: 'sp2', professionId: 'p1', code: 'PED', name: 'Pediatría', active: true },
  { id: 'sp3', professionId: 'p2', code: 'EG', name: 'Enfermería general', active: true },
  { id: 'sp4', professionId: 'p2', code: 'URG', name: 'Enfermería en urgencias', active: true },
];

export const MOCK_SHIFTS: Shift[] = [
  {
    id: 'sh1',
    staffId: 's1',
    staffName: 'Dr. Juan Pérez García',
    date: '2025-02-07',
    startTime: '07:00',
    endTime: '15:00',
    type: 'mañana',
    area: 'Consultorio 1',
  },
  {
    id: 'sh2',
    staffId: 's2',
    staffName: 'María López Sánchez',
    date: '2025-02-07',
    startTime: '07:00',
    endTime: '15:00',
    type: 'mañana',
    area: 'Triage',
  },
  {
    id: 'sh3',
    staffId: 's3',
    staffName: 'Carlos Gómez Torres',
    date: '2025-02-07',
    startTime: '08:00',
    endTime: '16:00',
    type: 'mañana',
    area: 'Farmacia',
  },
];

export const MOCK_CONTRACTS: Contract[] = [
  {
    id: 'c1',
    staffId: 's1',
    staffName: 'Dr. Juan Pérez García',
    type: 'indefinido',
    startDate: '2020-03-15',
    status: 'vigente',
    salary: 8500000,
  },
  {
    id: 'c2',
    staffId: 's2',
    staffName: 'María López Sánchez',
    type: 'indefinido',
    startDate: '2019-06-01',
    status: 'vigente',
    salary: 4500000,
  },
  {
    id: 'c3',
    staffId: 's3',
    staffName: 'Carlos Gómez Torres',
    type: 'término_fijo',
    startDate: '2021-01-10',
    endDate: '2025-12-31',
    status: 'vigente',
    salary: 5200000,
  },
];

export const MOCK_LICENSES: License[] = [
  {
    id: 'l1',
    staffId: 's1',
    staffName: 'Dr. Juan Pérez García',
    type: 'Registro médico',
    issuingEntity: 'Universidad Nacional',
    number: 'RM-12345',
    issueDate: '2018-01-15',
    expiryDate: '2026-01-15',
    status: 'vigente',
  },
  {
    id: 'l2',
    staffId: 's2',
    staffName: 'María López Sánchez',
    type: 'Tarjeta profesional',
    issuingEntity: 'Universidad del Valle',
    number: 'TP-67890',
    issueDate: '2017-06-01',
    expiryDate: '2025-06-01',
    status: 'próximo_vencer',
  },
  {
    id: 'l3',
    staffId: 's3',
    staffName: 'Carlos Gómez Torres',
    type: 'Registro QF',
    issuingEntity: 'Universidad de Antioquia',
    number: 'QF-11111',
    issueDate: '2019-12-10',
    expiryDate: '2027-12-10',
    status: 'vigente',
  },
];
