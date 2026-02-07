import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Tariff, Service } from '../types.js';

interface TariffsSectionProps {
  tariffs: Tariff[];
  services: Service[];
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency }).format(amount);
}

export default function TariffsSection({ tariffs, services }: TariffsSectionProps) {
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('todas');

  const serviceMap = useMemo(() => new Map(services.map((s) => [s.id, s])), [services]);

  const tariffsWithService = useMemo(
    () =>
      tariffs
        .map((tar) => {
          const srv = serviceMap.get(tar.serviceId);
          return { ...tar, serviceName: srv?.name ?? '—', specialtyName: srv?.specialtyName ?? '—' };
        })
        .filter((t) => specialtyFilter === 'todas' || t.specialtyName === specialtyFilter),
    [tariffs, serviceMap, specialtyFilter]
  );

  const specialties = useMemo(() => Array.from(new Set(services.map((s) => s.specialtyName))).sort(), [services]);

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField select size="small" label="Especialidad" value={specialtyFilter} onChange={(e) => setSpecialtyFilter(e.target.value)} sx={{ minWidth: 180 }}>
          <MenuItem value="todas">Todas</MenuItem>
          {specialties.map((s) => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código tarifa</TableCell>
            <TableCell>Servicio</TableCell>
            <TableCell>Especialidad</TableCell>
            <TableCell align="right">Valor</TableCell>
            <TableCell>Vigencia desde</TableCell>
            <TableCell>Vigencia hasta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tariffsWithService.map((tar) => (
            <TableRow key={tar.id}>
              <TableCell>{tar.id}</TableCell>
              <TableCell>{tar.serviceName}</TableCell>
              <TableCell>{tar.specialtyName}</TableCell>
              <TableCell align="right">{formatCurrency(tar.amount, tar.currency)}</TableCell>
              <TableCell>{tar.effectiveFrom}</TableCell>
              <TableCell>{tar.effectiveTo ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {tariffsWithService.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay tarifas registradas.
        </Typography>
      )}
    </Box>
  );
}
