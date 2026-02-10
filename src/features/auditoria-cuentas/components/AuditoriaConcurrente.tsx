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
import type { AuditoriaConcurrente } from '../types';

interface AuditoriaConcurrenteProps {
  auditorias: AuditoriaConcurrente[];
}

const RESULT_LABELS: Record<string, string> = {
  aprobado: 'Aprobado',
  observado: 'Observado',
  rechazado: 'Rechazado',
};

const RESULT_COLORS: Record<string, 'success' | 'warning' | 'error'> = {
  aprobado: 'success',
  observado: 'warning',
  rechazado: 'error',
};

export default function AuditoriaConcurrenteSection({ auditorias }: AuditoriaConcurrenteProps) {
  const [resultFilter, setResultFilter] = useState<string>('todos');
  const [dateFilter, setDateFilter] = useState('');
  const [search, setSearch] = useState('');

  const filtered = auditorias.filter((a) => {
    const matchResult = resultFilter === 'todos' || a.result === resultFilter;
    const matchDate = !dateFilter || a.auditDate === dateFilter;
    const matchSearch =
      !search ||
      a.invoiceNumber.includes(search) ||
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.patientDocument.includes(search) ||
      a.serviceName.toLowerCase().includes(search.toLowerCase());
    return matchResult && matchDate && matchSearch;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Auditoría concurrente. Validación previa a facturación.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Factura, paciente o servicio"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 240 }}
        />
        <TextField
          size="small"
          label="Fecha"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 150 }}
        />
        <TextField
          select
          size="small"
          label="Resultado"
          value={resultFilter}
          onChange={(e) => setResultFilter(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {(Object.keys(RESULT_LABELS) as Array<keyof typeof RESULT_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {RESULT_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Factura</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Código</TableCell>
            <TableCell>Servicio</TableCell>
            <TableCell>Fecha auditoría</TableCell>
            <TableCell>Auditor</TableCell>
            <TableCell>Resultado</TableCell>
            <TableCell>Observaciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.invoiceNumber}</TableCell>
              <TableCell>
                <Typography variant="body2">{a.patientName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {a.patientDocument}
                </Typography>
              </TableCell>
              <TableCell>{a.serviceCode}</TableCell>
              <TableCell>{a.serviceName}</TableCell>
              <TableCell>{a.auditDate}</TableCell>
              <TableCell>{a.auditor}</TableCell>
              <TableCell>
                <Chip
                  label={RESULT_LABELS[a.result] ?? a.result}
                  size="small"
                  color={RESULT_COLORS[a.result] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell sx={{ maxWidth: 200 }}>{a.observations ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay auditorías concurrentes.
        </Typography>
      )}
    </Box>
  );
}
