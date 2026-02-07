import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { Service } from '../types.js';

interface ServiceValiditySectionProps {
  services: Service[];
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function getValidityStatus(service: Service): 'vigente' | 'por_vencer' | 'vencido' | 'indefinida' {
  const today = todayISO();
  if (!service.validTo) return 'indefinida';
  if (service.validTo < today) return 'vencido';
  const validToDate = new Date(service.validTo);
  const todayDate = new Date(today);
  const daysDiff = Math.ceil((validToDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
  return daysDiff <= 90 ? 'por_vencer' : 'vigente';
}

const STATUS_LABELS: Record<string, string> = {
  vigente: 'Vigente',
  por_vencer: 'Por vencer',
  vencido: 'Vencido',
  indefinida: 'Vigencia indefinida',
};

const STATUS_COLORS: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
  vigente: 'success',
  por_vencer: 'warning',
  vencido: 'error',
  indefinida: 'default',
};

export default function ServiceValiditySection({ services }: ServiceValiditySectionProps) {
  const [validityFilter, setValidityFilter] = useState<string>('todos');

  const servicesWithValidity = useMemo(
    () =>
      services.map((srv) => ({
        ...srv,
        validityStatus: getValidityStatus(srv),
      })),
    [services]
  );

  const filtered = useMemo(
    () =>
      validityFilter === 'todos' ? servicesWithValidity : servicesWithValidity.filter((s) => s.validityStatus === validityFilter),
    [servicesWithValidity, validityFilter]
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <Typography variant="subtitle2">Filtrar por vigencia:</Typography>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Chip label="Todos" size="small" color={validityFilter === 'todos' ? 'primary' : 'default'} variant={validityFilter === 'todos' ? 'filled' : 'outlined'} onClick={() => setValidityFilter('todos')} sx={{ cursor: 'pointer' }} />
          {(['vigente', 'por_vencer', 'vencido', 'indefinida'] as const).map((s) => (
            <Chip key={s} label={STATUS_LABELS[s]} size="small" color={validityFilter === s ? 'primary' : 'default'} variant={validityFilter === s ? 'filled' : 'outlined'} onClick={() => setValidityFilter(s)} sx={{ cursor: 'pointer' }} />
          ))}
        </Box>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Especialidad</TableCell>
            <TableCell>Vigencia desde</TableCell>
            <TableCell>Vigencia hasta</TableCell>
            <TableCell>Estado vigencia</TableCell>
            <TableCell>Estado servicio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((srv) => (
            <TableRow key={srv.id}>
              <TableCell>{srv.code}</TableCell>
              <TableCell>{srv.name}</TableCell>
              <TableCell>{srv.specialtyName}</TableCell>
              <TableCell>{srv.validFrom}</TableCell>
              <TableCell>{srv.validTo ?? 'Indefinida'}</TableCell>
              <TableCell>
                <Chip label={STATUS_LABELS[srv.validityStatus]} size="small" color={STATUS_COLORS[srv.validityStatus]} variant="outlined" />
              </TableCell>
              <TableCell>
                <Chip label={srv.status === 'activo' ? 'Activo' : srv.status === 'inactivo' ? 'Inactivo' : 'Suspendido'} size="small" variant="outlined" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay servicios que coincidan con el filtro.
        </Typography>
      )}
    </Box>
  );
}
