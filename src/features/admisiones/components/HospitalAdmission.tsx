import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Bed } from '../types.js';

interface HospitalAdmissionProps {
  availableBeds: Bed[];
  onSubmit?: (data: HospitalAdmissionData) => void;
}

interface HospitalAdmissionData {
  documentType: string;
  documentNumber: string;
  patientName: string;
  eps: string;
  diagnosis: string;
  bedId: string;
}

export default function HospitalAdmission({ availableBeds, onSubmit }: HospitalAdmissionProps) {
  const [documentType, setDocumentType] = useState('CC');
  const [documentNumber, setDocumentNumber] = useState('');
  const [patientName, setPatientName] = useState('');
  const [eps, setEps] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);

  const bedOptions = availableBeds.filter((b) => b.status === 'disponible');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedBed) return;
    onSubmit?.({
      documentType,
      documentNumber: documentNumber.trim(),
      patientName: patientName.trim(),
      eps,
      diagnosis: diagnosis.trim(),
      bedId: selectedBed.id,
    });
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Admisión hospitalaria
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Registro de ingreso hospitalario programado o desde urgencias.
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
          <TextField size="small" label="EPS" value={eps} onChange={(e) => setEps(e.target.value)} sx={{ minWidth: 160 }} />
        </Box>
        <TextField size="small" label="Impresión diagnóstica" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} multiline minRows={1} sx={{ maxWidth: 400 }} />
        <Autocomplete
          size="small"
          options={bedOptions}
          getOptionLabel={(b) => `${b.code} - ${b.room} (${b.unit})`}
          value={selectedBed}
          onChange={(_, v) => setSelectedBed(v)}
          sx={{ maxWidth: 360 }}
          renderInput={(params) => <TextField {...params} label="Cama asignada (disponibles)" required />}
        />
        <Button type="submit" variant="contained" disabled={!selectedBed} sx={{ alignSelf: 'flex-start' }}>
          Registrar admisión hospitalaria
        </Button>
      </Box>
    </Paper>
  );
}
