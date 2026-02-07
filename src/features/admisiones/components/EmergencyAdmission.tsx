import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface EmergencyAdmissionProps {
  onSubmit?: (data: EmergencyAdmissionData) => void;
}

interface EmergencyAdmissionData {
  documentType: string;
  documentNumber: string;
  patientName: string;
  triageLevel: string;
  priority: string;
  diagnosis: string;
}

const TRIAGE_LEVELS = [
  { value: 'Rojo', label: 'Rojo - Inmediato' },
  { value: 'Naranja', label: 'Naranja - Muy urgente' },
  { value: 'Amarillo', label: 'Amarillo - Urgente' },
  { value: 'Verde', label: 'Verde - Menor urgencia' },
  { value: 'Azul', label: 'Azul - Sin urgencia' },
];

const PRIORITIES = [
  { value: 'crítica', label: 'Crítica' },
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Media' },
  { value: 'baja', label: 'Baja' },
];

export default function EmergencyAdmission({ onSubmit }: EmergencyAdmissionProps) {
  const [documentType, setDocumentType] = useState('CC');
  const [documentNumber, setDocumentNumber] = useState('');
  const [patientName, setPatientName] = useState('');
  const [triageLevel, setTriageLevel] = useState('Amarillo');
  const [priority, setPriority] = useState('alta');
  const [diagnosis, setDiagnosis] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit?.({
      documentType,
      documentNumber: documentNumber.trim(),
      patientName: patientName.trim(),
      triageLevel,
      priority,
      diagnosis: diagnosis.trim(),
    });
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Admisión por urgencias
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Registro de ingreso hospitalario por servicio de urgencias.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField select size="small" label="Tipo documento" value={documentType} onChange={(e) => setDocumentType(e.target.value)} sx={{ minWidth: 120 }}>
            <MenuItem value="CC">CC</MenuItem>
            <MenuItem value="TI">TI</MenuItem>
            <MenuItem value="CE">CE</MenuItem>
          </TextField>
          <TextField size="small" label="Número documento" value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value)} required sx={{ minWidth: 180 }} />
          <TextField size="small" label="Nombre paciente" value={patientName} onChange={(e) => setPatientName(e.target.value)} required sx={{ minWidth: 220 }} />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField select size="small" label="Triage" value={triageLevel} onChange={(e) => setTriageLevel(e.target.value)} required sx={{ minWidth: 200 }}>
            {TRIAGE_LEVELS.map((t) => (
              <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
            ))}
          </TextField>
          <TextField select size="small" label="Prioridad" value={priority} onChange={(e) => setPriority(e.target.value)} sx={{ minWidth: 140 }}>
            {PRIORITIES.map((p) => (
              <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>
            ))}
          </TextField>
        </Box>
        <TextField size="small" label="Impresión diagnóstica / Motivo" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} multiline minRows={2} sx={{ maxWidth: 400 }} />
        <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start' }}>
          Registrar admisión urgencias
        </Button>
      </Box>
    </Paper>
  );
}
