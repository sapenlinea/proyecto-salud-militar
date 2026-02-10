import type {
  CarnetVacunacion,
  AplicacionVacuna,
  EsquemaPorEdad,
  CoberturaVacunacion,
  ReportePAI,
} from '../types';

export const MOCK_CARNETES: CarnetVacunacion[] = [
  {
    id: 'c1',
    patientId: 'p1',
    patientDocument: '52345678',
    patientName: 'Juan Pérez García',
    birthDate: '2020-03-15',
    lastUpdate: '2025-01-20',
    vaccines: [
      { id: 'd1', vaccineName: 'BCG', doseNumber: 1, applicationDate: '2020-04-10', lot: 'BCG-2020-01', institution: 'IPS Centro', appliedBy: 'Enf. López' },
      { id: 'd2', vaccineName: 'Polio', doseNumber: 1, applicationDate: '2020-05-15', lot: 'POL-2020-02', institution: 'IPS Centro', appliedBy: 'Enf. Martínez' },
      { id: 'd3', vaccineName: 'Pentavalente', doseNumber: 1, applicationDate: '2020-05-15', lot: 'PEN-2020-03', institution: 'IPS Centro', appliedBy: 'Enf. Martínez' },
      { id: 'd4', vaccineName: 'COVID-19', doseNumber: 1, applicationDate: '2021-08-20', lot: 'PFZ-2021-05', institution: 'IPS Centro', appliedBy: 'Enf. López' },
      { id: 'd5', vaccineName: 'COVID-19', doseNumber: 2, applicationDate: '2021-10-15', lot: 'PFZ-2021-08', institution: 'IPS Centro', appliedBy: 'Enf. López' },
    ],
  },
  {
    id: 'c2',
    patientId: 'p2',
    patientDocument: '80123456',
    patientName: 'María López Martínez',
    birthDate: '2018-07-22',
    lastUpdate: '2025-02-01',
    vaccines: [
      { id: 'd6', vaccineName: 'BCG', doseNumber: 1, applicationDate: '2018-08-15', lot: 'BCG-2018-04', institution: 'IPS Centro', appliedBy: 'Enf. Martínez' },
      { id: 'd7', vaccineName: 'Polio', doseNumber: 1, applicationDate: '2018-09-20', lot: 'POL-2018-05', institution: 'IPS Centro', appliedBy: 'Enf. López' },
      { id: 'd8', vaccineName: 'SRP', doseNumber: 1, applicationDate: '2019-08-10', lot: 'SRP-2019-02', institution: 'IPS Centro', appliedBy: 'Enf. Martínez' },
      { id: 'd9', vaccineName: 'COVID-19', doseNumber: 1, applicationDate: '2022-03-15', lot: 'MOD-2022-01', institution: 'IPS Centro', appliedBy: 'Enf. López' },
    ],
  },
];

export const MOCK_APLICACIONES: AplicacionVacuna[] = [
  { id: 'a1', patientDocument: '52345678', patientName: 'Juan Pérez', vaccineName: 'Pentavalente', doseNumber: 2, applicationDate: '2025-02-05', lot: 'PEN-2025-01', appliedBy: 'Enf. López', institution: 'IPS Centro', nextDoseDate: '2025-03-05' },
  { id: 'a2', patientDocument: '80123456', patientName: 'María López', vaccineName: 'Influenza', doseNumber: 1, applicationDate: '2025-02-03', lot: 'FLU-2025-02', appliedBy: 'Enf. Martínez', institution: 'IPS Centro', nextDoseDate: '2026-02-03' },
  { id: 'a3', patientDocument: '10987654', patientName: 'Carlos Rodríguez', vaccineName: 'COVID-19 refuerzo', doseNumber: 1, applicationDate: '2025-02-01', lot: 'PFZ-2025-01', appliedBy: 'Enf. López', institution: 'IPS Centro' },
];

export const MOCK_ESQUEMAS_EDAD: EsquemaPorEdad[] = [
  { id: 'e1', ageGroup: 'Recién nacido', vaccineName: 'BCG', doseNumber: 1, minAgeDays: 0, maxAgeDays: 28, description: 'Al nacer o antes del mes' },
  { id: 'e2', ageGroup: '2 meses', vaccineName: 'Polio', doseNumber: 1, minAgeDays: 60, maxAgeDays: 89 },
  { id: 'e3', ageGroup: '2 meses', vaccineName: 'Pentavalente', doseNumber: 1, minAgeDays: 60, maxAgeDays: 89 },
  { id: 'e4', ageGroup: '4 meses', vaccineName: 'Polio', doseNumber: 2, minAgeDays: 120, maxAgeDays: 149 },
  { id: 'e5', ageGroup: '4 meses', vaccineName: 'Pentavalente', doseNumber: 2, minAgeDays: 120, maxAgeDays: 149 },
  { id: 'e6', ageGroup: '6 meses', vaccineName: 'Polio', doseNumber: 3, minAgeDays: 180, maxAgeDays: 209 },
  { id: 'e7', ageGroup: '6 meses', vaccineName: 'Pentavalente', doseNumber: 3, minAgeDays: 180, maxAgeDays: 209 },
  { id: 'e8', ageGroup: '12 meses', vaccineName: 'SRP', doseNumber: 1, minAgeDays: 365, maxAgeDays: 395 },
  { id: 'e9', ageGroup: '12 meses', vaccineName: 'Fiebre amarilla', doseNumber: 1, minAgeDays: 365, description: 'Endémicas' },
  { id: 'e10', ageGroup: '18 meses', vaccineName: 'Polio refuerzo', doseNumber: 1, minAgeDays: 540, maxAgeDays: 600 },
  { id: 'e11', ageGroup: '5 años', vaccineName: 'DPT refuerzo', doseNumber: 1, minAgeDays: 1825, maxAgeDays: 2190 },
  { id: 'e12', ageGroup: '5 años', vaccineName: 'SRP refuerzo', doseNumber: 1, minAgeDays: 1825, maxAgeDays: 2190 },
];

export const MOCK_COBERTURAS: CoberturaVacunacion[] = [
  { id: 'co1', vaccineName: 'BCG', ageGroup: '< 1 año', period: '2025-01', populationTarget: 45, vaccinated: 42, coveragePercent: 93.3 },
  { id: 'co2', vaccineName: 'Pentavalente (3 dosis)', ageGroup: '< 1 año', period: '2025-01', populationTarget: 45, vaccinated: 38, coveragePercent: 84.4 },
  { id: 'co3', vaccineName: 'SRP', ageGroup: '1 año', period: '2025-01', populationTarget: 52, vaccinated: 48, coveragePercent: 92.3 },
  { id: 'co4', vaccineName: 'DPT refuerzo', ageGroup: '5 años', period: '2025-01', populationTarget: 48, vaccinated: 44, coveragePercent: 91.7 },
  { id: 'co5', vaccineName: 'Influenza', ageGroup: '≥ 60 años', period: '2025-01', populationTarget: 320, vaccinated: 185, coveragePercent: 57.8 },
];

export const MOCK_REPORTES_PAI: ReportePAI[] = [
  { id: 'r1', period: '2025-01', reportType: 'mensual', vaccinesIncluded: ['BCG', 'Polio', 'Pentavalente', 'SRP', 'DPT', 'COVID-19', 'Influenza'], totalDosesApplied: 1245, status: 'enviado', sentDate: '2025-02-05' },
  { id: 'r2', period: '2024-Q4', reportType: 'trimestral', vaccinesIncluded: ['BCG', 'Polio', 'Pentavalente', 'SRP', 'DPT', 'COVID-19'], totalDosesApplied: 3850, status: 'validado', sentDate: '2025-01-15' },
  { id: 'r3', period: '2025-02', reportType: 'mensual', vaccinesIncluded: ['BCG', 'Polio', 'Pentavalente', 'SRP', 'DPT', 'COVID-19', 'Influenza'], totalDosesApplied: 0, status: 'borrador' },
];
