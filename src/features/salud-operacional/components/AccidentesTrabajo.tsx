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
import type { AccidenteTrabajo } from '../types';

interface AccidentesTrabajoProps {
  accidentes: AccidenteTrabajo[];
}

const TYPE_LABELS: Record<string, string> = {
  traumatico: 'Traumático',
  enfermedad_laboral: 'Enfermedad laboral',
  ergonomico: 'Ergonómico',
  covid: 'COVID-19',
};

const STATUS_LABELS: Record<string, string> = {
  reportado: 'Reportado',
  en_gestion_arl: 'En gestión ARL',
  incapacidad: 'Incapacidad',
  cerrado: 'Cerrado',
};

const STATUS_COLORS: Record<string, 'default' | 'info' | 'warning' | 'success'> = {
  reportado: 'default',
  en_gestion_arl: 'info',
  incapacidad: 'warning',
  cerrado: 'success',
};

export default function AccidentesTrabajo({ accidentes }: AccidentesTrabajoProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [arlFilter, setArlFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const arlList = [...new Set(accidentes.map((a) => a.arl))];

  const filtered = accidentes.filter((a) => {
    const matchStatus = statusFilter === 'todos' || a.status === statusFilter;
    const matchArl = arlFilter === 'todos' || a.arl === arlFilter;
    const matchSearch =
      !search ||
      a.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      a.employeeDocument.includes(search) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchArl && matchSearch;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Accidentes de trabajo. Reporte y seguimiento con ARL.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Empleado o descripción"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 240 }}
        />
        <TextField
          select
          size="small"
          label="Estado"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {(Object.keys(STATUS_LABELS) as Array<keyof typeof STATUS_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {STATUS_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="ARL"
          value={arlFilter}
          onChange={(e) => setArlFilter(e.target.value)}
          sx={{ minWidth: 130 }}
        >
          <MenuItem value="todos">Todas</MenuItem>
          {arlList.map((arl) => (
            <MenuItem key={arl} value={arl}>
              {arl}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Empleado</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Área</TableCell>
            <TableCell>Cargo</TableCell>
            <TableCell>Días perdidos</TableCell>
            <TableCell>ARL</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.accidentDate}</TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {a.employeeName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {a.employeeDocument}
                </Typography>
              </TableCell>
              <TableCell>{TYPE_LABELS[a.accidentType] ?? a.accidentType}</TableCell>
              <TableCell sx={{ maxWidth: 200 }}>{a.description}</TableCell>
              <TableCell>{a.area}</TableCell>
              <TableCell>{a.position}</TableCell>
              <TableCell align="right">{a.daysLost ?? '—'}</TableCell>
              <TableCell>{a.arl}</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[a.status] ?? a.status}
                  size="small"
                  color={STATUS_COLORS[a.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay accidentes de trabajo registrados.
        </Typography>
      )}
    </Box>
  );
}
