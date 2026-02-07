import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AgendaByProfessional from '../components/AgendaByProfessional';
import AgendaBySpecialty from '../components/AgendaBySpecialty';
import CalendarView from '../components/CalendarView';
import AppointmentForm, { type AppointmentFormData } from '../components/AppointmentForm';
import { MOCK_SPECIALTIES, MOCK_PROFESSIONALS, MOCK_APPOINTMENTS } from '../data/mock';
import type { Appointment, AppointmentStatus } from '../types';

function updateAppointmentStatus(appointments: Appointment[], id: string, status: AppointmentStatus): Appointment[] {
  return appointments.map((item) => (item.id !== id ? item : { ...item, status }));
}

export default function AgendamientoHome() {
  const [tab, setTab] = useState(0);
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
  const [formOpen, setFormOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity?: 'success' | 'error' | 'info' }>({ open: false, message: '' });

  function handleCreateAppointment(data: AppointmentFormData) {
    const professional = MOCK_PROFESSIONALS.find((p) => p.id === data.professionalId);
    if (!professional) return;
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: data.patientId,
      patientName: data.patientName,
      document: data.document,
      documentType: data.documentType,
      professionalId: data.professionalId,
      professionalName: professional.name,
      specialtyId: professional.specialtyId,
      specialtyName: professional.specialtyName,
      date: data.date,
      time: data.time,
      status: 'programada',
      reason: data.reason,
      notes: data.notes,
      createdBy: 'Usuario actual',
    };
    setAppointments((prev) => [...prev, newApt]);
    setSnackbar({ open: true, message: 'Cita creada correctamente.', severity: 'success' });
  }

  function handleRescheduleAppointment(data: AppointmentFormData) {
    if (!editingAppointment) return;
    const professional = MOCK_PROFESSIONALS.find((p) => p.id === data.professionalId);
    if (!professional) return;
    const updated: Appointment = {
      ...editingAppointment,
      professionalId: data.professionalId,
      professionalName: professional.name,
      specialtyId: professional.specialtyId,
      specialtyName: professional.specialtyName,
      date: data.date,
      time: data.time,
      patientName: data.patientName,
      document: data.document,
      documentType: data.documentType,
      reason: data.reason,
      notes: data.notes,
    };
    setAppointments((prev) => prev.map((item) => (item.id !== editingAppointment.id ? item : updated)));
    setEditingAppointment(null);
    setSnackbar({ open: true, message: 'Cita reprogramada correctamente.', severity: 'success' });
  }

  function handleFormSubmit(data: AppointmentFormData) {
    if (editingAppointment) handleRescheduleAppointment(data);
    else handleCreateAppointment(data);
  }

  function handleConfirm(id: string) {
    setAppointments((prev) => updateAppointmentStatus(prev, id, 'confirmada'));
    setSnackbar({ open: true, message: 'Cita confirmada.', severity: 'success' });
  }

  function handleCancel(id: string) {
    setAppointments((prev) => updateAppointmentStatus(prev, id, 'cancelada'));
    setSnackbar({ open: true, message: 'Cita cancelada.', severity: 'info' });
  }

  function handleSelectAppointment(apt: Appointment) {
    setEditingAppointment(apt);
    setFormOpen(true);
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Agendamiento
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Gestión de citas médicas. Agenda por profesional, especialidad, calendario (día/semana/mes), creación y reprogramación, confirmación y cancelación.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 0 }}>
            <Tab label="Agenda por profesional" />
            <Tab label="Agenda por especialidad" />
            <Tab label="Calendario" />
          </Tabs>
          <Button variant="contained" size="small" onClick={() => { setEditingAppointment(null); setFormOpen(true); }}>
            Nueva cita
          </Button>
        </Box>

        {tab === 0 && (
          <AgendaByProfessional
            professionals={MOCK_PROFESSIONALS}
            appointments={appointments}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
        {tab === 1 && (
          <AgendaBySpecialty
            specialties={MOCK_SPECIALTIES}
            appointments={appointments}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
        {tab === 2 && (
          <CalendarView
            appointments={appointments}
            onSelectAppointment={handleSelectAppointment}
          />
        )}
      </Paper>

      <AppointmentForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingAppointment(null); }}
        onSubmit={handleFormSubmit}
        professionals={MOCK_PROFESSIONALS}
        existingAppointment={editingAppointment}
      />

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((p) => ({ ...p, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity ?? 'info'} onClose={() => setSnackbar((p) => ({ ...p, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
