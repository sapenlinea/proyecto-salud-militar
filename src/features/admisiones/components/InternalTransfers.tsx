import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Admission, Bed, InternalTransfer } from '../types.js';

interface InternalTransfersProps {
  transfers: InternalTransfer[];
  admissions: Admission[];
  beds: Bed[];
  onSubmit?: (data: { admissionId: string; toBedId: string; reason?: string }) => void;
}

export default function InternalTransfers({ transfers, admissions, beds, onSubmit }: InternalTransfersProps) {
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [reason, setReason] = useState('');

  const activeAdmissions = admissions.filter((a) => a.status === 'activo');
  const availableBeds = beds.filter((b) => b.status === 'disponible');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedAdmission || !selectedBed) return;
    onSubmit?.({ admissionId: selectedAdmission.id, toBedId: selectedBed.id, reason: reason.trim() || undefined });
  }

  return (
    <Box>
      <Table size="small" sx={{ mb: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Paciente</TableCell>
            <TableCell>Desde</TableCell>
            <TableCell>Hacia</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Motivo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transfers.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{t.patientName}</TableCell>
              <TableCell>{t.fromBedCode} - {t.fromUnit}</TableCell>
              <TableCell>{t.toBedCode} - {t.toUnit}</TableCell>
              <TableCell>{t.transferDate} {t.transferTime}</TableCell>
              <TableCell>{t.reason ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {onSubmit && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Registrar traslado interno
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Autocomplete
              size="small"
              options={activeAdmissions}
              getOptionLabel={(a) => `${a.patientName} - ${a.bedCode} (${a.unit})`}
              value={selectedAdmission}
              onChange={(_, v) => setSelectedAdmission(v)}
              sx={{ maxWidth: 360 }}
              renderInput={(params) => <TextField {...params} label="Admisión (paciente actual)" required />}
            />
            <Autocomplete
              size="small"
              options={availableBeds}
              getOptionLabel={(b) => `${b.code} - ${b.room} (${b.unit})`}
              value={selectedBed}
              onChange={(_, v) => setSelectedBed(v)}
              sx={{ maxWidth: 360 }}
              renderInput={(params) => <TextField {...params} label="Cama destino" required />}
            />
            <TextField size="small" label="Motivo del traslado" value={reason} onChange={(e) => setReason(e.target.value)} sx={{ maxWidth: 360 }} />
            <Button type="submit" variant="contained" disabled={!selectedAdmission || !selectedBed} sx={{ alignSelf: 'flex-start' }}>
              Registrar traslado
            </Button>
          </Box>
        </Paper>
      )}

      {transfers.length === 0 && !onSubmit && (
        <Typography variant="body2" color="text.secondary">
          No hay traslados registrados.
        </Typography>
      )}
    </Box>
  );
}
