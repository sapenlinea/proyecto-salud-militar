import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Affiliate, AffiliateStatus } from '../types.js';

interface AffiliateSearchProps {
  affiliates: Affiliate[];
  onSelect?: (affiliate: Affiliate) => void;
}

const STATUS_LABELS: Record<AffiliateStatus, string> = {
  activo: 'Activo',
  suspendido: 'Suspendido',
  retenido: 'Retenido',
  inactivo: 'Inactivo',
  cartera: 'Cartera',
};

const STATUS_COLORS: Record<AffiliateStatus, 'success' | 'error' | 'warning' | 'default'> = {
  activo: 'success',
  suspendido: 'warning',
  retenido: 'warning',
  inactivo: 'error',
  cartera: 'default',
};

export default function AffiliateSearch({ affiliates, onSelect }: AffiliateSearchProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<AffiliateStatus | 'todos'>('todos');

  const filtered = affiliates.filter((a) => {
    const fullName = [a.firstName, a.secondName, a.lastName, a.secondLastName].filter(Boolean).join(' ').toLowerCase();
    const matchSearch =
      !search ||
      a.documentNumber.includes(search) ||
      fullName.includes(search.toLowerCase()) ||
      a.eps.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'todos' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar afiliado"
          placeholder="Documento, nombre o EPS"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 260 }}
        />
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Chip label="Todos" size="small" color={statusFilter === 'todos' ? 'primary' : 'default'} variant={statusFilter === 'todos' ? 'filled' : 'outlined'} onClick={() => setStatusFilter('todos')} sx={{ cursor: 'pointer' }} />
          {(Object.keys(STATUS_LABELS) as AffiliateStatus[]).map((s) => (
            <Chip key={s} label={STATUS_LABELS[s]} size="small" color={statusFilter === s ? 'primary' : 'default'} variant={statusFilter === s ? 'filled' : 'outlined'} onClick={() => setStatusFilter(s)} sx={{ cursor: 'pointer' }} />
          ))}
        </Box>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Documento</TableCell>
            <TableCell>Nombre completo</TableCell>
            <TableCell>EPS</TableCell>
            <TableCell>Tipo afiliación</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Vigencia</TableCell>
            <TableCell>Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((a) => {
            const fullName = [a.firstName, a.secondName, a.lastName, a.secondLastName].filter(Boolean).join(' ');
            return (
              <TableRow key={a.id} hover={Boolean(onSelect)} sx={{ cursor: onSelect ? 'pointer' : undefined }} onClick={() => onSelect?.(a)}>
                <TableCell>{a.documentType} {a.documentNumber}</TableCell>
                <TableCell>{fullName}</TableCell>
                <TableCell>{a.eps}</TableCell>
                <TableCell>{a.affiliationType === 'contributivo' ? 'Contributivo' : a.affiliationType === 'subsidiado' ? 'Subsidiado' : 'Especial'}</TableCell>
                <TableCell>
                  <Chip label={STATUS_LABELS[a.status]} size="small" color={STATUS_COLORS[a.status]} variant="outlined" />
                </TableCell>
                <TableCell>{a.effectiveDate}{a.terminationDate ? ` - ${a.terminationDate}` : ''}</TableCell>
                <TableCell>{onSelect && <Typography variant="caption" color="primary">Ver detalle</Typography>}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No se encontraron afiliados.
        </Typography>
      )}
    </Box>
  );
}
