import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { ReferralUrgency } from '../types.js';

interface ReferralRequestProps {
  onSubmit?: (data: ReferralFormData) => void;
}

export interface ReferralFormData {
  patientId: string;
  patientName: string;
  document: string;
  documentType: string;
  specialty: string;
  reason: string;
  urgency: ReferralUrgency;
  referringProfessional: string;
  referringInstitution: string;
  referredToInstitution: string;
}

const SPECIALTIES = [
  'Cardiología',
  'Traumatología',
  'Oftalmología',
  'Dermatología',
  'Laboratorio',
  'Psiquiatría',
  'Pediatría',
  'Ginecología',
];

const URGENCY_OPTIONS: { value: ReferralUrgency; label: string }[] = [
  { value: 'rutina', label: 'Rutina' },
  { value: 'urgencia', label: 'Urgencia' },
  { value: 'emergencia', label: 'Emergencia' },
];

export default function ReferralRequest({ onSubmit }: ReferralRequestProps) {
  const [patientName, setPatientName] = useState('');
  const [document, setDocument] = useState('');
  const [documentType, setDocumentType] = useState('CC');
  const [specialty, setSpecialty] = useState(SPECIALTIES[0] ?? '');
  const [reason, setReason] = useState('');
  const [urgency, setUrgency] = useState<ReferralUrgency>('rutina');
  const [referringProfessional, setReferringProfessional] = useState('');
  const [referringInstitution, setReferringInstitution] = useState('Centro de Salud Militar');
  const [referredToInstitution, setReferredToInstitution] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit?.({
      patientId: `p-${Date.now()}`,
      patientName: patientName.trim(),
      document: document.trim(),
      documentType,
      specialty,
      reason: reason.trim(),
      urgency,
      referringProfessional: referringProfessional.trim(),
      referringInstitution: referringInstitution.trim(),
      referredToInstitution: referredToInstitution.trim(),
    });
    setPatientName('');
    setDocument('');
    setReason('');
    setReferringProfessional('');
    setReferredToInstitution('');
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Solicitud de referencia
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Crear nueva solicitud de referencia para remisión del paciente a especialista u otra institución.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField size="small" label="Nombre paciente" value={patientName} onChange={(e) => setPatientName(e.target.value)} required sx={{ minWidth: 220 }} />
          <TextField select size="small" label="Tipo documento" value={documentType} onChange={(e) => setDocumentType(e.target.value)} sx={{ minWidth: 100 }}>
            <MenuItem value="CC">CC</MenuItem>
            <MenuItem value="TI">TI</MenuItem>
            <MenuItem value="CE">CE</MenuItem>
          </TextField>
          <TextField size="small" label="Número documento" value={document} onChange={(e) => setDocument(e.target.value)} required sx={{ minWidth: 160 }} />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField select size="small" label="Especialidad" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required sx={{ minWidth: 180 }}>
            {SPECIALTIES.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>
          <TextField select size="small" label="Urgencia" value={urgency} onChange={(e) => setUrgency(e.target.value as ReferralUrgency)} sx={{ minWidth: 140 }}>
            {URGENCY_OPTIONS.map((u) => (
              <MenuItem key={u.value} value={u.value}>{u.label}</MenuItem>
            ))}
          </TextField>
        </Box>
        <TextField size="small" label="Motivo de referencia" value={reason} onChange={(e) => setReason(e.target.value)} required multiline minRows={2} fullWidth />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField size="small" label="Profesional remitente" value={referringProfessional} onChange={(e) => setReferringProfessional(e.target.value)} required sx={{ minWidth: 220 }} />
          <TextField size="small" label="Institución remitente" value={referringInstitution} onChange={(e) => setReferringInstitution(e.target.value)} required sx={{ minWidth: 220 }} />
        </Box>
        <TextField size="small" label="Institución destino" value={referredToInstitution} onChange={(e) => setReferredToInstitution(e.target.value)} required placeholder="Ej: Hospital Militar Central" sx={{ maxWidth: 400 }} />
        <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start' }}>
          Enviar solicitud de referencia
        </Button>
      </Box>
    </Paper>
  );
}
