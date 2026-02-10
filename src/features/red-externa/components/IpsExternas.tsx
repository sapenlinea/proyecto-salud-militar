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
import type { IpsExterna } from '../types';

interface IpsExternasProps {
  ips: IpsExterna[];
}

const TYPE_LABELS: Record<string, string> = {
  hospital: 'Hospital',
  clinica: 'Clínica',
  laboratorio: 'Laboratorio',
  imagenologia: 'Imagenología',
  otro: 'Otro',
};

const STATUS_LABELS: Record<string, string> = {
  activo: 'Activo',
  inactivo: 'Inactivo',
  suspendido: 'Suspendido',
};

const STATUS_COLORS: Record<string, 'success' | 'default' | 'error'> = {
  activo: 'success',
  inactivo: 'default',
  suspendido: 'error',
};

export default function IpsExternas({ ips }: IpsExternasProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [typeFilter, setTypeFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const filtered = ips.filter((i) => {
    const matchStatus = statusFilter === 'todos' || i.status === statusFilter;
    const matchType = typeFilter === 'todos' || i.type === typeFilter;
    const matchSearch =
      !search ||
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.nit.includes(search) ||
      i.city.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchType && matchSearch;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Prestadores externos. IPS, laboratorios, clínicas y centros de diagnóstico.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Nombre, NIT o ciudad"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 220 }}
        />
        <TextField
          select
          size="small"
          label="Tipo"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          sx={{ minWidth: 150 }}
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
          sx={{ minWidth: 120 }}
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
            <TableCell>NIT</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Ciudad</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((i) => (
            <TableRow key={i.id}>
              <TableCell>{i.nit}</TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {i.name}
                </Typography>
                {i.email && (
                  <Typography variant="caption" color="text.secondary">
                    {i.email}
                  </Typography>
                )}
              </TableCell>
              <TableCell>{TYPE_LABELS[i.type] ?? i.type}</TableCell>
              <TableCell>{i.city}</TableCell>
              <TableCell>{i.phone}</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[i.status] ?? i.status}
                  size="small"
                  color={STATUS_COLORS[i.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay IPS externas registradas.
        </Typography>
      )}
    </Box>
  );
}
