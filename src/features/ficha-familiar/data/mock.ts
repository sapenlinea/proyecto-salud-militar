import type {
  FamilyMember,
  FamilyRisk,
  HomeVisit,
  Intervention,
  FollowUp,
  FamilyFile,
} from '../types';

export const MOCK_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'm1',
    documentNumber: '12345678',
    fullName: 'Carlos Rodríguez Pérez',
    relationship: 'Jefe de hogar',
    birthDate: '1980-05-15',
    gender: 'Masculino',
    healthStatus: 'Sano',
    isHeadOfHousehold: true,
  },
  {
    id: 'm2',
    documentNumber: '87654321',
    fullName: 'María López Rodríguez',
    relationship: 'Cónyuge',
    birthDate: '1985-08-22',
    gender: 'Femenino',
    healthStatus: 'Sana',
  },
  {
    id: 'm3',
    documentNumber: '11223344',
    fullName: 'Ana Rodríguez López',
    relationship: 'Hija',
    birthDate: '2010-03-10',
    gender: 'Femenino',
    healthStatus: 'Asma controlada',
  },
];

export const MOCK_FAMILY_RISKS: FamilyRisk[] = [
  {
    id: 'r1',
    category: 'Salud',
    description: 'Padre con hipertensión no controlada',
    level: 'medio',
    detectedAt: '2025-01-15',
    status: 'en_seguimiento',
  },
  {
    id: 'r2',
    category: 'Vivienda',
    description: 'Hacinamiento: 5 personas en 2 habitaciones',
    level: 'alto',
    detectedAt: '2025-02-01',
    status: 'activo',
  },
];

export const MOCK_HOME_VISITS: HomeVisit[] = [
  {
    id: 'v1',
    date: '2025-02-01',
    reason: 'Seguimiento hipertensión',
    findings: 'Paciente con TA 140/90. Refiere adherencia parcial al tratamiento.',
    professional: 'Dra. Sandra Mora',
    nextVisit: '2025-02-15',
  },
  {
    id: 'v2',
    date: '2025-01-15',
    reason: 'Valoración familiar inicial',
    findings: 'Familia nuclear. Condiciones de vivienda regulares.',
    professional: 'Enf. Juan García',
    nextVisit: '2025-02-01',
  },
];

export const MOCK_INTERVENTIONS: Intervention[] = [
  {
    id: 'i1',
    date: '2025-02-05',
    type: 'Educación en salud',
    description: 'Charla sobre alimentación baja en sodio y control de TA.',
    responsible: 'Enf. Juan García',
    outcome: 'Familia comprometida con cambios dietarios',
  },
  {
    id: 'i2',
    date: '2025-01-20',
    type: 'Referencia',
    description: 'Derivación a cardiología por hipertensión refractaria.',
    responsible: 'Dra. Sandra Mora',
    outcome: 'Cita programada',
  },
];

export const MOCK_FOLLOW_UPS: FollowUp[] = [
  {
    id: 'f1',
    date: '2025-02-07',
    type: 'Control',
    notes: 'Verificar resultados de laboratorio de función renal.',
    professional: 'Dra. Sandra Mora',
    nextAction: 'Valorar ajuste de medicación',
  },
  {
    id: 'f2',
    date: '2025-02-05',
    type: 'Llamada',
    notes: 'Confirmada asistencia a cita de cardiología.',
    professional: 'Enf. Juan García',
  },
];

export const MOCK_FAMILY_FILE: FamilyFile = {
  id: 'ff1',
  householdId: 'HH-001',
  address: 'Calle 15 # 12-34, Apto 101',
  city: 'Ipiales',
  members: MOCK_FAMILY_MEMBERS,
  risks: MOCK_FAMILY_RISKS,
  visits: MOCK_HOME_VISITS,
  interventions: MOCK_INTERVENTIONS,
  followUps: MOCK_FOLLOW_UPS,
};
