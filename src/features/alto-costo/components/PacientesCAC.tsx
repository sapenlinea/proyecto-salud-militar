import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { PacienteCAC } from '../types';

interface PacientesCACProps {
  patients: PacienteCAC[];
}

const STATUS_LABELS: Record<string, string> = {
  activo: 'Activo',
  inactivo: 'Inactivo',
  fallecido: 'Fallecido',
  trasladado: 'Trasladado',
};

const STATUS_COLORS: Record<string, 'success' | 'default' | 'error' | 'warning'> = {
  activo: 'success',
  inactivo: 'default',
  fallecido: 'error',
  trasladado: 'warning',
};

export default function PacientesCAC({ patients }: PacientesCACProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [epsFilter, setEpsFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const epsList = [...new Set(patients.map((p) => p.eps))];

  const filtered = patients.filter((p) => {
    const matchStatus = statusFilter === 'todos' || p.status === statusFilter;
    const matchEps = epsFilter === 'todos' || p.eps === epsFilter;
    const matchSearch =
      !search ||
      p.patientName.toLowerCase().includes(search.toLowerCase()) ||
      p.patientDocument.includes(search) ||
      p.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
      p.diagnosisCode.includes(search);
    return matchStatus && matchEps && matchSearch;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Pacientes en Cuentas de Alto Costo. Seguimiento de patologías de alto costo.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Paciente, documento o diagnóstico"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 240 }}
        />
        <TextField
          select
          size="small"
          label="EPS"
          value={epsFilter}
          onChange={(e) => setEpsFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="todos">Todas</MenuItem>
          {epsList.map((eps) => (
            <MenuItem key={eps} value={eps}>
              {eps}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Estado"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 130 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {(Object.keys(STATUS_LABELS) as Array<keyof typeof STATUS_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {STATUS_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Paciente</TableCell>
            <TableCell>EPS</TableCell>
            <TableCell>Diagnóstico</TableCell>
            <TableCell>Código</TableCell>
            <TableCell>Fecha registro</TableCell>
            <TableCell>Último control</TableCell>
            <TableCell>Médico responsable</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {p.patientName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {p.patientDocument}
                </Typography>
              </TableCell>
              <TableCell>{p.eps}</TableCell>
              <TableCell>{p.diagnosis}</TableCell>
              <TableCell>{p.diagnosisCode}</TableCell>
              <TableCell>{p.registrationDate}</TableCell>
              <TableCell>{p.lastControl ?? '—'}</TableCell>
              <TableCell>{p.responsiblePhysician ?? '—'}</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[p.status] ?? p.status}
                  size="small"
                  color={STATUS_COLORS[p.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay pacientes CAC registrados.
        </Typography>
      )}
    </Box>
  );
}
