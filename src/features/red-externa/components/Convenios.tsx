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
import type { Convenio } from '../types';

interface ConveniosProps {
  convenios: Convenio[];
}

const TYPE_LABELS: Record<string, string> = {
  servicios_generales: 'Servicios generales',
  laboratorio: 'Laboratorio',
  imagenologia: 'Imagenología',
  urgencias: 'Urgencias',
  hospitalizacion: 'Hospitalización',
};

const STATUS_LABELS: Record<string, string> = {
  vigente: 'Vigente',
  vencido: 'Vencido',
  renovacion_pendiente: 'Renovación pendiente',
};

const STATUS_COLORS: Record<string, 'success' | 'error' | 'warning'> = {
  vigente: 'success',
  vencido: 'error',
  renovacion_pendiente: 'warning',
};

export default function Convenios({ convenios }: ConveniosProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [typeFilter, setTypeFilter] = useState<string>('todos');

  const filtered = convenios.filter((c) => {
    const matchStatus = statusFilter === 'todos' || c.status === statusFilter;
    const matchType = typeFilter === 'todos' || c.type === typeFilter;
    return matchStatus && matchType;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Convenios con prestadores externos. Vigencia y tipo de servicios.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          select
          size="small"
          label="Tipo"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {(Object.keys(TYPE_LABELS) as Array<keyof typeof TYPE_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {TYPE_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
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
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nº Convenio</TableCell>
            <TableCell>IPS Externa</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Inicio</TableCell>
            <TableCell>Fin</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.agreementNumber}</TableCell>
              <TableCell>{c.ipsExternaName}</TableCell>
              <TableCell>{TYPE_LABELS[c.type] ?? c.type}</TableCell>
              <TableCell>{c.startDate}</TableCell>
              <TableCell>{c.endDate}</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[c.status] ?? c.status}
                  size="small"
                  color={STATUS_COLORS[c.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay convenios registrados.
        </Typography>
      )}
    </Box>
  );
}
