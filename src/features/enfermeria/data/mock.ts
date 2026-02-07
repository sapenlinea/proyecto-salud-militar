import type {
  PatientAssignment,
  VitalSigns,
  NursingNote,
  MedicationAdministration,
  CarePlan,
  ClinicalScale,
} from '../types.js';

export const MOCK_ASSIGNMENTS: PatientAssignment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    patientName: 'Juan Carlos Pérez García',
    document: '1234567890',
    eps: 'Sanitas',
    room: '101',
    bed: 'A',
    admissionDate: '2024-06-01',
    assignedNurse: 'Enf. López',
    status: 'activo',
    priority: 'media',
  },
  {
    id: 'a2',
    patientId: 'p2',
    patientName: 'María Rodríguez',
    document: '9876543210',
    eps: 'Sura',
    room: '102',
    bed: 'B',
    admissionDate: '2024-06-02',
    assignedNurse: 'Enf. López',
    status: 'activo',
    priority: 'alta',
  },
];

export const MOCK_VITAL_SIGNS: VitalSigns[] = [
  {
    id: 'vs1',
    patientId: 'p1',
    date: '2024-06-01',
    time: '08:00',
    temperature: 36.5,
    heartRate: 72,
    respiratoryRate: 16,
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 80,
    oxygenSaturation: 98,
    weight: 78,
    height: 1.75,
    bmi: 25.5,
    painLevel: 2,
    recordedBy: 'Enf. López',
  },
  {
    id: 'vs2',
    patientId: 'p1',
    date: '2024-06-01',
    time: '14:00',
    temperature: 36.6,
    heartRate: 74,
    bloodPressureSystolic: 125,
    bloodPressureDiastolic: 82,
    oxygenSaturation: 97,
    recordedBy: 'Enf. López',
  },
];

export const MOCK_NURSING_NOTES: NursingNote[] = [
  {
    id: 'nn1',
    patientId: 'p1',
    date: '2024-06-01',
    time: '09:00',
    type: 'evolutiva',
    content: 'Paciente consciente, orientado. Refiere cefalea leve. TA en límites. Se recomienda continuar monitoreo.',
    author: 'Enf. López',
  },
  {
    id: 'nn2',
    patientId: 'p1',
    date: '2024-06-01',
    time: '15:30',
    type: 'general',
    content: 'Realizada higiene y cambio de ropa. Paciente colaborador. Sin novedades.',
    author: 'Enf. López',
  },
];

export const MOCK_MEDICATION_ADMINISTRATIONS: MedicationAdministration[] = [
  {
    id: 'ma1',
    patientId: 'p1',
    medicationName: 'Losartán 50 mg',
    dosage: '1 tableta',
    route: 'Oral',
    scheduledTime: '08:00',
    administeredTime: '08:05',
    status: 'administrado',
    administeredBy: 'Enf. López',
  },
  {
    id: 'ma2',
    patientId: 'p1',
    medicationName: 'Metformina 850 mg',
    dosage: '1 tableta',
    route: 'Oral',
    scheduledTime: '12:00',
    status: 'pendiente',
  },
  {
    id: 'ma3',
    patientId: 'p1',
    medicationName: 'Enoxaparina 40 mg',
    dosage: '1 jeringa',
    route: 'Subcutánea',
    scheduledTime: '20:00',
    status: 'pendiente',
  },
];

export const MOCK_CARE_PLANS: CarePlan[] = [
  {
    id: 'cp1',
    patientId: 'p1',
    diagnosis: 'Hipertensión esencial',
    nursingDiagnosis: 'Riesgo de déficit de volumen de líquidos relacionado con terapia antihipertensiva',
    expectedOutcome: 'Paciente mantendrá TA en rangos normales y balance hídrico adecuado',
    interventions: [
      'Monitorear signos vitales cada turno',
      'Registrar ingesta y egreso',
      'Educar sobre dieta hiposódica',
      'Evaluar efectos adversos de medicación antihipertensiva',
    ],
    evaluation: 'TA estable. Sin signos de deshidratación.',
    status: 'activo',
    startDate: '2024-06-01',
    author: 'Enf. López',
  },
];

export const MOCK_CLINICAL_SCALES: ClinicalScale[] = [
  {
    id: 'cs1',
    patientId: 'p1',
    type: 'braden',
    date: '2024-06-01',
    time: '08:00',
    totalScore: 18,
    scores: {
      sensoryPerception: 4,
      moisture: 4,
      activity: 3,
      mobility: 3,
      nutrition: 3,
      frictionShear: 2,
    },
    interpretation: 'Riesgo bajo de úlceras por presión',
    author: 'Enf. López',
  },
  {
    id: 'cs2',
    patientId: 'p1',
    type: 'glasgow',
    date: '2024-06-01',
    time: '08:00',
    totalScore: 15,
    scores: {
      eyeOpening: 4,
      verbalResponse: 5,
      motorResponse: 6,
    },
    interpretation: 'Escala de Glasgow normal (15/15)',
    author: 'Enf. López',
  },
];
