import { useState } from 'react';
import Box from '@mui/material/Box';
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
import Typography from '@mui/material/Typography';
import type { ValidationResult } from '../types';

interface DataValidationProps {
  validations: ValidationResult[];
  reportNames: Record<string, string>;
}

const STATUS_LABELS: Record<string, string> = {
  ok: 'OK',
  error: 'Error',
  warning: 'Advertencia',
};

const STATUS_COLORS: Record<string, 'success' | 'error' | 'warning'> = {
  ok: 'success',
  error: 'error',
  warning: 'warning',
};

export default function DataValidation({ validations, reportNames }: DataValidationProps) {
  const [reportFilter, setReportFilter] = useState<string>('todos');
  const [statusFilter, setStatusFilter] = useState<string>('todos');

  const reportIds = Array.from(new Set(validations.map((v) => v.reportId)));
  const filtered = validations.filter((v) => {
    const matchReport = reportFilter === 'todos' || v.reportId === reportFilter;
    const matchStatus = statusFilter === 'todos' || v.status === statusFilter;
    return matchReport && matchStatus;
  });

  const errorCount = validations.filter((v) => v.status === 'error').length;
  const warningCount = validations.filter((v) => v.status === 'warning').length;

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Validación de datos antes del envío. Verifique que no existan errores para proceder.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        {errorCount > 0 && (
          <Chip label={`${errorCount} errores`} size="small" color="error" variant="outlined" />
        )}
        {warningCount > 0 && (
          <Chip label={`${warningCount} advertencias`} size="small" color="warning" variant="outlined" />
        )}
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Reporte</InputLabel>
          <Select
            label="Reporte"
            value={reportFilter}
            onChange={(e) => setReportFilter(e.target.value)}
          >
            <MenuItem value="todos">Todos</MenuItem>
            {reportIds.map((id) => (
              <MenuItem key={id} value={id}>
                {reportNames[id] ?? id}
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
            <TableCell>Reporte</TableCell>
            <TableCell>Campo</TableCell>
            <TableCell>Regla</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Mensaje</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((v) => (
            <TableRow key={v.id}>
              <TableCell>{reportNames[v.reportId] ?? v.reportId}</TableCell>
              <TableCell>{v.field}</TableCell>
              <TableCell>{v.rule}</TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[v.status] ?? v.status}
                  size="small"
                  color={STATUS_COLORS[v.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell sx={{ maxWidth: 300 }}>{v.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay resultados de validación.
        </Typography>
      )}
    </Box>
  );
}
