import { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { TrazabilidadAuditoria } from '../types';

interface TrazabilidadAuditoriaProps {
  items: TrazabilidadAuditoria[];
}

const ACTION_LABELS: Record<string, string> = {
  creacion: 'Creación',
  auditoria: 'Auditoría',
  glosa: 'Glosa',
  respuesta: 'Respuesta',
  cierre: 'Cierre',
};

export default function TrazabilidadAuditoriaSection({ items }: TrazabilidadAuditoriaProps) {
  const [docFilter, setDocFilter] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('todos');

  const filtered = items.filter((i) => {
    const matchDoc = !docFilter || i.documentRef.toLowerCase().includes(docFilter.toLowerCase());
    const matchAction = actionFilter === 'todos' || i.action === actionFilter;
    return matchDoc && matchAction;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Trazabilidad de auditoría. Historial de acciones por documento.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Documento"
          placeholder="Ref. factura"
          value={docFilter}
          onChange={(e) => setDocFilter(e.target.value)}
          sx={{ minWidth: 180 }}
        />
        <TextField
          select
          size="small"
          label="Acción"
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="todos">Todas</MenuItem>
          {(Object.keys(ACTION_LABELS) as Array<keyof typeof ACTION_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {ACTION_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Documento</TableCell>
            <TableCell>Acción</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Detalles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((i) => (
            <TableRow key={i.id}>
              <TableCell>{i.date}</TableCell>
              <TableCell>{i.documentRef}</TableCell>
              <TableCell>{ACTION_LABELS[i.action] ?? i.action}</TableCell>
              <TableCell>{i.user}</TableCell>
              <TableCell>{i.description}</TableCell>
              <TableCell sx={{ maxWidth: 220 }}>{i.details ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay trazabilidad.
        </Typography>
      )}
    </Box>
  );
}
