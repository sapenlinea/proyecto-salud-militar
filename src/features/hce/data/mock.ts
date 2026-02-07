import type {
  Patient,
  ClinicalEvent,
  MedicalEvolution,
  Diagnosis,
  Procedure,
  PrescribedMedication,
  Attachment,
  Cie10Item,
} from '../types.js';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'p1',
    documentType: 'CC',
    documentNumber: '1234567890',
    firstName: 'Juan',
    secondName: 'Carlos',
    lastName: 'Pérez',
    secondLastName: 'García',
    birthDate: '1985-03-15',
    gender: 'Masculino',
    bloodType: 'O+',
    eps: 'Sanitas',
    epsCode: 'EPS001',
    affiliationType: 'Contributivo',
    phone: '3001234567',
    email: 'juan.perez@example.com',
    address: 'Calle 50 # 10-20',
    city: 'Bogotá',
    department: 'Cundinamarca',
    createdAt: '2024-01-10T08:00:00Z',
  },
  {
    id: 'p2',
    documentType: 'CC',
    documentNumber: '9876543210',
    firstName: 'María',
    lastName: 'Rodríguez',
    birthDate: '1990-07-22',
    gender: 'Femenino',
    eps: 'Sura',
    epsCode: 'EPS002',
    affiliationType: 'Subsidiado',
    phone: '3109876543',
    city: 'Medellín',
    department: 'Antioquia',
    createdAt: '2024-02-01T09:00:00Z',
  },
];

export const MOCK_CLINICAL_EVENTS: ClinicalEvent[] = [
  { id: 'e1', patientId: 'p1', type: 'evolution', date: '2024-06-01T10:00:00Z', title: 'Control general', author: 'Dr. García' },
  { id: 'e2', patientId: 'p1', type: 'diagnosis', date: '2024-06-01T10:05:00Z', title: 'Hipertensión esencial', author: 'Dr. García' },
  { id: 'e3', patientId: 'p1', type: 'medication', date: '2024-06-01T10:10:00Z', title: 'Losartán 50 mg', author: 'Dr. García' },
  { id: 'e4', patientId: 'p1', type: 'procedure', date: '2024-05-15T14:00:00Z', title: 'Electrocardiograma', author: 'Enf. López' },
  { id: 'e5', patientId: 'p1', type: 'attachment', date: '2024-05-15T15:00:00Z', title: 'Resultado laboratorio', author: 'Lab. Central' },
];

export const MOCK_EVOLUTIONS: MedicalEvolution[] = [
  {
    id: 'ev1',
    patientId: 'p1',
    date: '2024-06-01T10:00:00Z',
    reason: 'Control de hipertensión',
    subjective: 'Paciente refiere cefalea ocasional. Niega dolor torácico.',
    objective: 'TA 138/88 mmHg, FC 72, peso 78 kg. Resto sin hallazgos.',
    assessment: 'Hipertensión en control. Sin signos de alarma.',
    plan: 'Continuar losartán 50 mg. Control en 3 meses. Dieta hiposódica.',
    author: 'Dr. García',
  },
];

export const MOCK_DIAGNOSES: Diagnosis[] = [
  {
    id: 'd1',
    patientId: 'p1',
    cie10Code: 'I10',
    cie10Description: 'Hipertensión esencial (primaria)',
    type: 'principal',
    date: '2024-06-01',
    author: 'Dr. García',
  },
  {
    id: 'd2',
    patientId: 'p1',
    cie10Code: 'E11.9',
    cie10Description: 'Diabetes mellitus tipo 2 sin complicaciones',
    type: 'relacionado',
    date: '2024-06-01',
    author: 'Dr. García',
  },
];

export const MOCK_PROCEDURES: Procedure[] = [
  { id: 'pr1', patientId: 'p1', code: '93000', name: 'Electrocardiograma completo', date: '2024-05-15', author: 'Enf. López' },
  { id: 'pr2', patientId: 'p1', code: '80053', name: 'Panel metabólico básico', date: '2024-05-15', author: 'Dr. García' },
];

export const MOCK_MEDICATIONS: PrescribedMedication[] = [
  {
    id: 'm1',
    patientId: 'p1',
    name: 'Losartán',
    dosage: '50 mg',
    frequency: '1 vez al día',
    route: 'Oral',
    duration: 'Indefinido',
    date: '2024-06-01',
    author: 'Dr. García',
    instructions: 'En ayunas.',
  },
  {
    id: 'm2',
    patientId: 'p1',
    name: 'Metformina',
    dosage: '850 mg',
    frequency: '2 veces al día',
    route: 'Oral',
    duration: 'Indefinido',
    date: '2024-06-01',
    author: 'Dr. García',
  },
];

export const MOCK_ATTACHMENTS: Attachment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    name: 'Hemograma_2024-05-15.pdf',
    type: 'pdf',
    mimeType: 'application/pdf',
    url: '#',
    date: '2024-05-15',
    description: 'Resultado hemograma completo',
  },
  {
    id: 'a2',
    patientId: 'p1',
    name: 'Radiografía_tórax.png',
    type: 'image',
    mimeType: 'image/png',
    url: '#',
    date: '2024-05-10',
    description: 'Radiografía de tórax PA',
  },
];

export const MOCK_CIE10: Cie10Item[] = [
  { code: 'I10', description: 'Hipertensión esencial (primaria)' },
  { code: 'E11.9', description: 'Diabetes mellitus tipo 2 sin complicaciones' },
  { code: 'J00', description: 'Rinofaringitis aguda [resfriado común]' },
  { code: 'M54.5', description: 'Lumbago no especificado' },
  { code: 'F41.1', description: 'Trastorno de ansiedad generalizada' },
  { code: 'K21.9', description: 'Enfermedad del reflujo gastroesofágico sin esofagitis' },
  { code: 'R51', description: 'Cefalea' },
  { code: 'E66.9', description: 'Obesidad no especificada' },
];
