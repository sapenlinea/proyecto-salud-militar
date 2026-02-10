import type {
  SurgicalSchedule,
  Preoperative,
  Postoperative,
  SurgicalSupply,
  SurgicalReport,
} from '../types';

export const MOCK_SURGICAL_SCHEDULE: SurgicalSchedule[] = [
  {
    id: 's1',
    patientDocument: '12345678',
    patientName: 'Juan García López',
    procedure: 'Catarata',
    surgeon: 'Dr. Carlos Mendoza',
    date: '2025-02-10',
    time: '08:00',
    room: 'Quirófano 1',
    status: 'programada',
  },
  {
    id: 's2',
    patientDocument: '87654321',
    patientName: 'María López Sánchez',
    procedure: 'Hemiorrafia inguinal',
    surgeon: 'Dr. Pedro Sánchez',
    date: '2025-02-09',
    time: '10:30',
    room: 'Quirófano 2',
    status: 'completada',
  },
  {
    id: 's3',
    patientDocument: '11223344',
    patientName: 'Carlos Rodríguez Pérez',
    procedure: 'Colecistectomía laparoscópica',
    surgeon: 'Dr. Pedro Sánchez',
    date: '2025-02-11',
    time: '07:00',
    room: 'Quirófano 1',
    status: 'programada',
  },
];

export const MOCK_PREOPERATIVE: Preoperative[] = [
  {
    id: 'p1',
    scheduleId: 's1',
    patientName: 'Juan García López',
    procedure: 'Catarata',
    date: '2025-02-08',
    labResults: 'Hemoglobina 14.2, Creatinina 0.9',
    anesthesiologist: 'Dr. Ana Torres',
    clearance: 'apto',
    notes: 'Paciente con diabetes tipo 2 controlada',
  },
  {
    id: 'p2',
    scheduleId: 's3',
    patientName: 'Carlos Rodríguez Pérez',
    procedure: 'Colecistectomía laparoscópica',
    date: '2025-02-09',
    labResults: 'Hemoglobina 13.8, Plaquetas 245000',
    anesthesiologist: 'Dr. Ana Torres',
    clearance: 'apto',
  },
];

export const MOCK_POSTOPERATIVE: Postoperative[] = [
  {
    id: 'po1',
    scheduleId: 's2',
    patientName: 'María López Sánchez',
    procedure: 'Hemiorrafia inguinal',
    surgeryDate: '2025-02-09',
    followUpDate: '2025-02-16',
    status: 'Evolución favorable',
    responsible: 'Dr. Pedro Sánchez',
  },
  {
    id: 'po2',
    scheduleId: 's2',
    patientName: 'María López Sánchez',
    procedure: 'Hemiorrafia inguinal',
    surgeryDate: '2025-02-09',
    followUpDate: '2025-02-23',
    status: 'Control postoperatorio',
    responsible: 'Dr. Pedro Sánchez',
  },
];

export const MOCK_SURGICAL_SUPPLIES: SurgicalSupply[] = [
  {
    id: 'sp1',
    scheduleId: 's1',
    patientName: 'Juan García López',
    procedure: 'Catarata',
    item: 'Lente intraocular',
    quantity: 1,
    unit: 'unidad',
    date: '2025-02-08',
  },
  {
    id: 'sp2',
    scheduleId: 's2',
    patientName: 'María López Sánchez',
    procedure: 'Hemiorrafia inguinal',
    item: 'Malla hernia',
    quantity: 1,
    unit: 'unidad',
    date: '2025-02-09',
  },
  {
    id: 'sp3',
    scheduleId: 's2',
    patientName: 'María López Sánchez',
    procedure: 'Hemiorrafia inguinal',
    item: 'Sutura absorbible',
    quantity: 2,
    unit: 'unidades',
    date: '2025-02-09',
  },
  {
    id: 'sp4',
    scheduleId: 's3',
    patientName: 'Carlos Rodríguez Pérez',
    procedure: 'Colecistectomía laparoscópica',
    item: 'Clip hemostático',
    quantity: 4,
    unit: 'unidades',
    date: '2025-02-10',
  },
];

export const MOCK_SURGICAL_REPORTS: SurgicalReport[] = [
  {
    id: 'r1',
    period: '2025-01',
    totalSurgeries: 28,
    byProcedure: [
      { procedure: 'Catarata', count: 12 },
      { procedure: 'Hemiorrafia inguinal', count: 8 },
      { procedure: 'Colecistectomía laparoscópica', count: 5 },
      { procedure: 'Otras', count: 3 },
    ],
    cancelledCount: 2,
    complicationsCount: 0,
  },
  {
    id: 'r2',
    period: '2024-12',
    totalSurgeries: 32,
    byProcedure: [
      { procedure: 'Catarata', count: 15 },
      { procedure: 'Hemiorrafia inguinal', count: 10 },
      { procedure: 'Colecistectomía laparoscópica', count: 4 },
      { procedure: 'Otras', count: 3 },
    ],
    cancelledCount: 1,
    complicationsCount: 1,
  },
];
