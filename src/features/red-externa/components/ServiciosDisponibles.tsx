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
import type { ServicioExterno } from '../types';

interface ServiciosDisponiblesProps {
  servicios: ServicioExterno[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
}

export default function ServiciosDisponibles({ servicios }: ServiciosDisponiblesProps) {
  const [ipsFilter, setIpsFilter] = useState<string>('todos');
  const [availableFilter, setAvailableFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const ipsList = [...new Set(servicios.map((s) => s.ipsExternaName))];

  const filtered = servicios.filter((s) => {
    const matchIps = ipsFilter === 'todos' || s.ipsExternaName === ipsFilter;
    const matchAvailable =
      availableFilter === 'todos' ||
      (availableFilter === 'si' && s.available) ||
      (availableFilter === 'no' && !s.available);
    const matchSearch =
      !search ||
      s.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      s.serviceCode.includes(search) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    return matchIps && matchAvailable && matchSearch;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Servicios disponibles por prestador externo. Precios y disponibilidad.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Servicio, código o categoría"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 220 }}
        />
        <TextField
          select
          size="small"
          label="IPS Externa"
          value={ipsFilter}
          onChange={(e) => setIpsFilter(e.target.value)}
          sx={{ minWidth: 240 }}
        >
          <MenuItem value="todos">Todas</MenuItem>
          {ipsList.map((ips) => (
            <MenuItem key={ips} value={ips}>
              {ips}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Disponible"
          value={availableFilter}
          onChange={(e) => setAvailableFilter(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          <MenuItem value="si">Sí</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Servicio</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>IPS Externa</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell>Disponible</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.serviceCode}</TableCell>
              <TableCell>{s.serviceName}</TableCell>
              <TableCell>{s.category}</TableCell>
              <TableCell>{s.ipsExternaName}</TableCell>
              <TableCell align="right">{formatCurrency(s.unitPrice)}</TableCell>
              <TableCell>
                <Chip
                  label={s.available ? 'Sí' : 'No'}
                  size="small"
                  color={s.available ? 'success' : 'default'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay servicios externos.
        </Typography>
      )}
    </Box>
  );
}
