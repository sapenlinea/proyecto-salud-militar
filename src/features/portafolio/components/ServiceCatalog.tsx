import { useMemo, useState } from 'react';
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
import type { Service, ServiceStatus } from '../types.js';

interface ServiceCatalogProps {
  services: Service[];
}

const STATUS_LABELS: Record<ServiceStatus, string> = {
  activo: 'Activo',
  inactivo: 'Inactivo',
  suspendido: 'Suspendido',
};

const STATUS_COLORS: Record<ServiceStatus, 'success' | 'error' | 'warning' | 'default'> = {
  activo: 'success',
  inactivo: 'error',
  suspendido: 'warning',
};

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency }).format(amount);
}

export default function ServiceCatalog({ services }: ServiceCatalogProps) {
  const [search, setSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('todas');
  const [statusFilter, setStatusFilter] = useState<ServiceStatus | 'todos'>('todos');

  const specialties = useMemo(() => Array.from(new Set(services.map((s) => s.specialtyName))).sort(), [services]);

  const filtered = useMemo(
    () =>
      services.filter((srv) => {
        const matchSearch =
          !search.trim() ||
          srv.code.toLowerCase().includes(search.toLowerCase()) ||
          srv.name.toLowerCase().includes(search.toLowerCase());
        const matchSpecialty = specialtyFilter === 'todas' || srv.specialtyName === specialtyFilter;
        const matchStatus = statusFilter === 'todos' || srv.status === statusFilter;
        return matchSearch && matchSpecialty && matchStatus;
      }),
    [services, search, specialtyFilter, statusFilter]
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField size="small" label="Buscar" placeholder="Código o nombre" value={search} onChange={(e) => setSearch(e.target.value)} sx={{ minWidth: 200 }} />
        <TextField select size="small" label="Especialidad" value={specialtyFilter} onChange={(e) => setSpecialtyFilter(e.target.value)} sx={{ minWidth: 180 }}>
          <MenuItem value="todas">Todas</MenuItem>
          {specialties.map((s) => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Chip label="Todos" size="small" color={statusFilter === 'todos' ? 'primary' : 'default'} variant={statusFilter === 'todos' ? 'filled' : 'outlined'} onClick={() => setStatusFilter('todos')} sx={{ cursor: 'pointer' }} />
          {(Object.keys(STATUS_LABELS) as ServiceStatus[]).map((s) => (
            <Chip key={s} label={STATUS_LABELS[s]} size="small" color={statusFilter === s ? 'primary' : 'default'} variant={statusFilter === s ? 'filled' : 'outlined'} onClick={() => setStatusFilter(s)} sx={{ cursor: 'pointer' }} />
          ))}
        </Box>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Especialidad</TableCell>
            <TableCell>Procedimiento</TableCell>
            <TableCell>Tarifa</TableCell>
            <TableCell>Vigencia</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((srv) => (
            <TableRow key={srv.id}>
              <TableCell>{srv.code}</TableCell>
              <TableCell>{srv.name}</TableCell>
              <TableCell>{srv.specialtyName}</TableCell>
              <TableCell>{srv.procedureName ?? '—'}</TableCell>
              <TableCell>{formatCurrency(srv.amount, srv.currency)}</TableCell>
              <TableCell>
                {srv.validFrom} {srv.validTo ? `— ${srv.validTo}` : '(indefinida)'}
              </TableCell>
              <TableCell>
                <Chip label={STATUS_LABELS[srv.status]} size="small" color={STATUS_COLORS[srv.status]} variant="outlined" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay servicios que coincidan con los filtros.
        </Typography>
      )}
    </Box>
  );
}
