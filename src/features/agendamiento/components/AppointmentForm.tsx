import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import type { Appointment, Professional } from '../types.js';

interface AppointmentFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AppointmentFormData) => void;
  professionals: Professional[];
  existingAppointment?: Appointment | null;
  defaultDate?: string;
  defaultTime?: string;
}

export interface AppointmentFormData {
  patientId: string;
  patientName: string;
  document: string;
  documentType: string;
  professionalId: string;
  date: string;
  time: string;
  reason?: string;
  notes?: string;
}

export default function AppointmentForm({ open, onClose, onSubmit, professionals, existingAppointment, defaultDate, defaultTime }: AppointmentFormProps) {
  const [patientName, setPatientName] = useState(existingAppointment?.patientName ?? '');
  const [document, setDocument] = useState(existingAppointment?.document ?? '');
  const [documentType, setDocumentType] = useState(existingAppointment?.documentType ?? 'CC');
  const [professionalId, setProfessionalId] = useState(existingAppointment?.professionalId ?? professionals[0]?.id ?? '');
  const [date, setDate] = useState(existingAppointment?.date ?? defaultDate ?? new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(existingAppointment?.time ?? defaultTime ?? '08:00');
  const [reason, setReason] = useState(existingAppointment?.reason ?? '');
  const [notes, setNotes] = useState(existingAppointment?.notes ?? '');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      patientId: existingAppointment?.patientId ?? `p-${Date.now()}`,
      patientName: patientName.trim(),
      document: document.trim(),
      documentType,
      professionalId,
      date,
      time,
      reason: reason.trim() || undefined,
      notes: notes.trim() || undefined,
    });
    onClose();
  }

  const isEdit = Boolean(existingAppointment);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? 'Reprogramar cita' : 'Crear cita'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField size="small" label="Nombre paciente" value={patientName} onChange={(e) => setPatientName(e.target.value)} required fullWidth />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField select size="small" label="Tipo documento" value={documentType} onChange={(e) => setDocumentType(e.target.value)} sx={{ minWidth: 100 }}>
                <MenuItem value="CC">CC</MenuItem>
                <MenuItem value="TI">TI</MenuItem>
                <MenuItem value="CE">CE</MenuItem>
              </TextField>
              <TextField size="small" label="Número documento" value={document} onChange={(e) => setDocument(e.target.value)} required sx={{ flex: 1 }} />
            </Box>
            <TextField select size="small" label="Profesional" value={professionalId} onChange={(e) => setProfessionalId(e.target.value)} required fullWidth>
              {professionals.map((prof) => (
                <MenuItem key={prof.id} value={prof.id}>{prof.name} — {prof.specialtyName}</MenuItem>
              ))}
            </TextField>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField size="small" label="Fecha" type="date" value={date} onChange={(e) => setDate(e.target.value)} required InputLabelProps={{ shrink: true }} sx={{ flex: 1 }} />
              <TextField size="small" label="Hora" type="time" value={time} onChange={(e) => setTime(e.target.value)} required InputLabelProps={{ shrink: true }} sx={{ flex: 1 }} />
            </Box>
            <TextField size="small" label="Motivo / Consulta" value={reason} onChange={(e) => setReason(e.target.value)} fullWidth />
            <TextField size="small" label="Notas" value={notes} onChange={(e) => setNotes(e.target.value)} multiline minRows={2} fullWidth />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">{isEdit ? 'Reprogramar' : 'Crear cita'}</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
