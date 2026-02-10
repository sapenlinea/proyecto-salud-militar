import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { AplicacionVacuna } from '../types';

interface AplicacionVacunasProps {
  aplicaciones: AplicacionVacuna[];
}

export default function AplicacionVacunas({ aplicaciones }: AplicacionVacunasProps) {
  const [dateFilter, setDateFilter] = useState('');
  const [vaccineFilter, setVaccineFilter] = useState('');

  const vaccines = [...new Set(aplicaciones.map((a) => a.vaccineName))];

  const filtered = aplicaciones.filter((a) => {
    const matchDate = !dateFilter || a.applicationDate === dateFilter;
    const matchVaccine = !vaccineFilter || a.vaccineName === vaccineFilter;
    return matchDate && matchVaccine;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Registro de aplicación de vacunas. Lote, fecha y responsable.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Fecha"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 150 }}
        />
        <TextField
          select
          size="small"
          label="Vacuna"
          value={vaccineFilter}
          onChange={(e) => setVaccineFilter(e.target.value)}
          SelectProps={{ native: true }}
          sx={{ minWidth: 180 }}
        >
          <option value="">Todas</option>
          {vaccines.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Vacuna</TableCell>
            <TableCell align="center">Dosis</TableCell>
            <TableCell>Lote</TableCell>
            <TableCell>Aplicó</TableCell>
            <TableCell>Próxima dosis</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.applicationDate}</TableCell>
              <TableCell>
                <Typography variant="body2">{a.patientName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {a.patientDocument}
                </Typography>
              </TableCell>
              <TableCell>{a.vaccineName}</TableCell>
              <TableCell align="center">{a.doseNumber}</TableCell>
              <TableCell>{a.lot}</TableCell>
              <TableCell>{a.appliedBy}</TableCell>
              <TableCell>{a.nextDoseDate ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay aplicaciones registradas.
        </Typography>
      )}
    </Box>
  );
}
