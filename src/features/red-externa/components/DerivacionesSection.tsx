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
import type { Derivacion } from '../types';

interface DerivacionesSectionProps {
  derivaciones: Derivacion[];
}

const STATUS_LABELS: Record<string, string> = {
  solicitada: 'Solicitada',
  confirmada: 'Confirmada',
  atendida: 'Atendida',
  cancelada: 'Cancelada',
};

const STATUS_COLORS: Record<string, 'warning' | 'info' | 'success' | 'default'> = {
  solicitada: 'warning',
  confirmada: 'info',
  atendida: 'success',
  cancelada: 'default',
};

export default function DerivacionesSection({ derivaciones }: DerivacionesSectionProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [ipsFilter, setIpsFilter] = useState<string>('todos');

  const ipsList = [...new Set(derivaciones.map((d) => d.ipsExternaName))];

  const filtered = derivaciones.filter((d) => {
    const matchStatus = statusFilter === 'todos' || d.status === statusFilter;
    const matchIps = ipsFilter === 'todos' || d.ipsExternaName === ipsFilter;
    return matchStatus && matchIps;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Derivaciones a prestadores externos. Solicitudes y estado de atención.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
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
        <TextField
          select
          size="small"
          label="IPS Externa"
          value={ipsFilter}
          onChange={(e) => setIpsFilter(e.target.value)}
          sx={{ minWidth: 260 }}
        >
          <MenuItem value="todos">Todas</MenuItem>
          {ipsList.map((ips) => (
            <MenuItem key={ips} value={ips}>
              {ips}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>IPS Externa</TableCell>
            <TableCell>Servicio</TableCell>
            <TableCell>Motivo</TableCell>
            <TableCell>Cita</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((d) => (
            <TableRow key={d.id}>
              <TableCell>{d.date}</TableCell>
              <TableCell>
                <Typography variant="body2">{d.patientName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {d.patientDocument}
                </Typography>
              </TableCell>
              <TableCell>{d.ipsExternaName}</TableCell>
              <TableCell>{d.service}</TableCell>
              <TableCell sx={{ maxWidth: 180 }}>{d.reason}</TableCell>
              <TableCell>{d.appointmentDate ?? '—'}</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[d.status] ?? d.status}
                  size="small"
                  color={STATUS_COLORS[d.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay derivaciones registradas.
        </Typography>
      )}
    </Box>
  );
}
