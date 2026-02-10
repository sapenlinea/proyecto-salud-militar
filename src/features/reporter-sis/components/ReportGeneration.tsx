import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { RegulatoryReport } from '../types';

interface ReportGenerationProps {
  reports: RegulatoryReport[];
  onGenerate?: (reportId: string) => void;
}

const STATUS_LABELS: Record<string, string> = {
  borrador: 'Borrador',
  validado: 'Validado',
  enviado: 'Enviado',
  recibido: 'Recibido',
};

const STATUS_COLORS: Record<string, 'default' | 'info' | 'success'> = {
  borrador: 'default',
  validado: 'info',
  enviado: 'success',
  recibido: 'success',
};

export default function ReportGeneration({ reports }: ReportGenerationProps) {
  const [periodFilter, setPeriodFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');

  const periods = Array.from(new Set(reports.map((r) => r.period))).sort().reverse();
  const filtered = reports.filter((r) => {
    const matchPeriod = !periodFilter || r.period === periodFilter;
    const matchStatus = statusFilter === 'todos' || r.status === statusFilter;
    return matchPeriod && matchStatus;
  });

  const formatDate = (dateStr?: string) =>
    dateStr ? new Date(dateStr).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }) : '—';

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Generación de reportes normativos obligatorios. Seleccione período y genere los reportes requeridos.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Período</InputLabel>
          <Select
            label="Período"
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            {periods.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Chip
            label="Todos"
            size="small"
            color={statusFilter === 'todos' ? 'primary' : 'default'}
            variant={statusFilter === 'todos' ? 'filled' : 'outlined'}
            onClick={() => setStatusFilter('todos')}
            sx={{ cursor: 'pointer' }}
          />
          {(Object.keys(STATUS_LABELS) as Array<keyof typeof STATUS_LABELS>).map((s) => (
            <Chip
              key={s}
              label={STATUS_LABELS[s]}
              size="small"
              color={statusFilter === s ? 'primary' : 'default'}
              variant={statusFilter === s ? 'filled' : 'outlined'}
              onClick={() => setStatusFilter(s)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Reporte</TableCell>
            <TableCell>Período</TableCell>
            <TableCell>Ente</TableCell>
            <TableCell>Fecha límite</TableCell>
            <TableCell>Generado</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.code}</TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {r.name}
                </Typography>
              </TableCell>
              <TableCell>{r.period}</TableCell>
              <TableCell>{r.entity}</TableCell>
              <TableCell>{formatDate(r.dueDate)}</TableCell>
              <TableCell>{r.generatedAt ? formatDate(r.generatedAt) : '—'}</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[r.status] ?? r.status}
                  size="small"
                  color={STATUS_COLORS[r.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Button size="small" variant="outlined" disabled={r.status === 'enviado' || r.status === 'recibido'}>
                  Generar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay reportes para el filtro seleccionado.
        </Typography>
      )}
    </Box>
  );
}
