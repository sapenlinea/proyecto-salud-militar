import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Admission, Discharge, DischargeType } from '../types.js';

interface DischargesProps {
  discharges: Discharge[];
  admissions: Admission[];
  onSubmit?: (data: { admissionId: string; dischargeType: DischargeType; recommendations?: string }) => void;
}

const DISCHARGE_TYPES: { value: DischargeType; label: string }[] = [
  { value: 'alta_medica', label: 'Alta médica' },
  { value: 'alta_voluntaria', label: 'Alta voluntaria' },
  { value: 'traslado', label: 'Traslado' },
  { value: 'fallecimiento', label: 'Fallecimiento' },
  { value: 'fuga', label: 'Fuga' },
];

export default function DischargesComponent({ discharges, admissions, onSubmit }: DischargesProps) {
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
  const [dischargeType, setDischargeType] = useState<DischargeType>('alta_medica');
  const [recommendations, setRecommendations] = useState('');

  const activeAdmissions = admissions.filter((a) => a.status === 'activo');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedAdmission) return;
    onSubmit?.({ admissionId: selectedAdmission.id, dischargeType, recommendations: recommendations.trim() || undefined });
  }

  return (
    <Box>
      <Table size="small" sx={{ mb: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Paciente</TableCell>
            <TableCell>Documento</TableCell>
            <TableCell>Cama</TableCell>
            <TableCell>Tipo egreso</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Diagnóstico</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {discharges.map((d) => (
            <TableRow key={d.id}>
              <TableCell>{d.patientName}</TableCell>
              <TableCell>{d.document}</TableCell>
              <TableCell>{d.bedCode} - {d.room}</TableCell>
              <TableCell>{DISCHARGE_TYPES.find((t) => t.value === d.dischargeType)?.label ?? d.dischargeType}</TableCell>
              <TableCell>{d.dischargeDate} {d.dischargeTime}</TableCell>
              <TableCell>{d.diagnosis ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {onSubmit && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Registrar egreso
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Autocomplete
              size="small"
              options={activeAdmissions}
              getOptionLabel={(a) => `${a.patientName} - ${a.bedCode} (${a.unit})`}
              value={selectedAdmission}
              onChange={(_, v) => setSelectedAdmission(v)}
              sx={{ maxWidth: 360 }}
              renderInput={(params) => <TextField {...params} label="Admisión (paciente a egresar)" required />}
            />
            <TextField select size="small" label="Tipo de egreso" value={dischargeType} onChange={(e) => setDischargeType(e.target.value as DischargeType)} sx={{ minWidth: 220 }}>
              {DISCHARGE_TYPES.map((t) => (
                <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
              ))}
            </TextField>
            <TextField size="small" label="Recomendaciones" value={recommendations} onChange={(e) => setRecommendations(e.target.value)} multiline minRows={2} sx={{ maxWidth: 400 }} />
            <Button type="submit" variant="contained" disabled={!selectedAdmission} sx={{ alignSelf: 'flex-start' }}>
              Registrar egreso
            </Button>
          </Box>
        </Paper>
      )}

      {discharges.length === 0 && !onSubmit && (
        <Typography variant="body2" color="text.secondary">
          No hay egresos registrados.
        </Typography>
      )}
    </Box>
  );
}
