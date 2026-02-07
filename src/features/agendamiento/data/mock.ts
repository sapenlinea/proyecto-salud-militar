import type { Specialty, Professional, Appointment } from '../types.js';

export const MOCK_SPECIALTIES: Specialty[] = [
  { id: 'esp1', name: 'Medicina General', code: 'MG' },
  { id: 'esp2', name: 'Cardiología', code: 'CAR' },
  { id: 'esp3', name: 'Traumatología', code: 'TRA' },
  { id: 'esp4', name: 'Pediatría', code: 'PED' },
  { id: 'esp5', name: 'Ginecología', code: 'GIN' },
  { id: 'esp6', name: 'Psicología', code: 'PSI' },
];

export const MOCK_PROFESSIONALS: Professional[] = [
  { id: 'prof1', name: 'Dr. Carlos García', document: '12345678', specialtyId: 'esp1', specialtyName: 'Medicina General', scheduleStart: '08:00', scheduleEnd: '12:00', slotMinutes: 15 },
  { id: 'prof2', name: 'Dra. Ana Martínez', document: '87654321', specialtyId: 'esp2', specialtyName: 'Cardiología', scheduleStart: '07:00', scheduleEnd: '11:00', slotMinutes: 20 },
  { id: 'prof3', name: 'Dr. Luis Rodríguez', document: '11223344', specialtyId: 'esp3', specialtyName: 'Traumatología', scheduleStart: '08:30', scheduleEnd: '13:00', slotMinutes: 15 },
  { id: 'prof4', name: 'Dra. Sandra López', document: '55667788', specialtyId: 'esp4', specialtyName: 'Pediatría', scheduleStart: '09:00', scheduleEnd: '14:00', slotMinutes: 20 },
  { id: 'prof5', name: 'Dr. Miguel Pérez', document: '99887766', specialtyId: 'esp1', specialtyName: 'Medicina General', scheduleStart: '14:00', scheduleEnd: '18:00', slotMinutes: 15 },
];

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}
function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
const base = todayISO();
export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'apt1', patientId: 'p1', patientName: 'Juan Pérez', document: '1234567890', documentType: 'CC', professionalId: 'prof1', professionalName: 'Dr. Carlos García', specialtyId: 'esp1', specialtyName: 'Medicina General', date: base, time: '08:00', status: 'confirmada', reason: 'Control' },
  { id: 'apt2', patientId: 'p2', patientName: 'María Rodríguez', document: '9876543210', documentType: 'CC', professionalId: 'prof1', professionalName: 'Dr. Carlos García', specialtyId: 'esp1', specialtyName: 'Medicina General', date: base, time: '08:30', status: 'programada', reason: 'Consulta' },
  { id: 'apt3', patientId: 'p3', patientName: 'Pedro Martínez', document: '5555555555', documentType: 'CC', professionalId: 'prof2', professionalName: 'Dra. Ana Martínez', specialtyId: 'esp2', specialtyName: 'Cardiología', date: base, time: '07:20', status: 'confirmada', reason: 'ECG' },
  { id: 'apt4', patientId: 'p1', patientName: 'Juan Pérez', document: '1234567890', documentType: 'CC', professionalId: 'prof3', professionalName: 'Dr. Luis Rodríguez', specialtyId: 'esp3', specialtyName: 'Traumatología', date: addDays(base, 1), time: '09:00', status: 'programada', reason: 'Dolor lumbar' },
  { id: 'apt5', patientId: 'p4', patientName: 'Laura Gómez', document: '1111222233', documentType: 'CC', professionalId: 'prof4', professionalName: 'Dra. Sandra López', specialtyId: 'esp4', specialtyName: 'Pediatría', date: addDays(base, 1), time: '10:00', status: 'confirmada', reason: 'Vacunación' },
  { id: 'apt6', patientId: 'p2', patientName: 'María Rodríguez', document: '9876543210', documentType: 'CC', professionalId: 'prof5', professionalName: 'Dr. Miguel Pérez', specialtyId: 'esp1', specialtyName: 'Medicina General', date: addDays(base, 2), time: '14:30', status: 'cancelada', reason: 'Control' },
];
