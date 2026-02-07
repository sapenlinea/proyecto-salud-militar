import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Referral, ReferralStatus } from '../types.js';

interface CaseInboxProps {
  referrals: Referral[];
}

const STATUS_LABELS: Record<ReferralStatus, string> = {
  pendiente: 'Pendiente',
  enviada: 'Enviada',
  en_seguimiento: 'En seguimiento',
  cerrada: 'Cerrada',
  rechazada: 'Rechazada',
};

const STATUS_COLORS: Record<ReferralStatus, 'success' | 'error' | 'warning' | 'default' | 'info'> = {
  pendiente: 'warning',
  enviada: 'info',
  en_seguimiento: 'info',
  cerrada: 'success',
  rechazada: 'error',
};

const URGENCY_LABELS: Record<string, string> = {
  rutina: 'Rutina',
  urgencia: 'Urgencia',
  emergencia: 'Emergencia',
};

export default function CaseInbox({ referrals }: CaseInboxProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ReferralStatus | 'todos'>('todos');

  const filtered = useMemo(() => {
    return referrals.filter((r) => {
      const matchSearch =
        !search.trim() ||
        r.patientName.toLowerCase().includes(search.toLowerCase()) ||
        r.document.includes(search) ||
        r.specialty.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'todos' || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [referrals, search, statusFilter]);

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField size="small" label="Buscar" placeholder="Paciente, documento, especialidad" value={search} onChange={(e) => setSearch(e.target.value)} sx={{ minWidth: 260 }} />
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
          <Chip label="Todos" size="small" color={statusFilter === 'todos' ? 'primary' : 'default'} variant={statusFilter === 'todos' ? 'filled' : 'outlined'} onClick={() => setStatusFilter('todos')} sx={{ cursor: 'pointer' }} />
          {(Object.keys(STATUS_LABELS) as ReferralStatus[]).map((s) => (
            <Chip key={s} label={STATUS_LABELS[s]} size="small" color={statusFilter === s ? 'primary' : 'default'} variant={statusFilter === s ? 'filled' : 'outlined'} onClick={() => setStatusFilter(s)} sx={{ cursor: 'pointer' }} />
          ))}
        </Box>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Documento</TableCell>
            <TableCell>Especialidad</TableCell>
            <TableCell>Urgencia</TableCell>
            <TableCell>Motivo</TableCell>
            <TableCell>Institución destino</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.id}</TableCell>
              <TableCell>{r.patientName}</TableCell>
              <TableCell>{r.document}</TableCell>
              <TableCell>{r.specialty}</TableCell>
              <TableCell>{URGENCY_LABELS[r.urgency] ?? r.urgency}</TableCell>
              <TableCell sx={{ maxWidth: 180 }}>{r.reason}</TableCell>
              <TableCell>{r.referredToInstitution}</TableCell>
              <TableCell>{r.createdAt.slice(0, 10)}</TableCell>
              <TableCell>
                <Chip label={STATUS_LABELS[r.status]} size="small" color={STATUS_COLORS[r.status]} variant="outlined" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay casos que coincidan con los filtros.
        </Typography>
      )}
    </Box>
  );
}
