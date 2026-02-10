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
import type { SeguimientoSaludOperacional } from '../types';

interface SeguimientoSaludOperacionalProps {
  seguimientos: SeguimientoSaludOperacional[];
}

const REF_TYPE_LABELS: Record<string, string> = {
  evaluacion: 'Evaluación',
  accidente: 'Accidente',
  riesgo: 'Riesgo',
};

const TYPE_LABELS: Record<string, string> = {
  control: 'Control',
  reincorporacion: 'Reincorporación',
  revaluacion: 'Revaluación',
  cierre: 'Cierre',
};

export default function SeguimientoSaludOperacionalSection({ seguimientos }: SeguimientoSaludOperacionalProps) {
  const [typeFilter, setTypeFilter] = useState<string>('todos');
  const [refFilter, setRefFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const filtered = seguimientos.filter((s) => {
    const matchType = typeFilter === 'todos' || s.type === typeFilter;
    const matchRef = refFilter === 'todos' || s.referenceType === refFilter;
    const matchSearch =
      !search ||
      s.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      s.employeeDocument.includes(search) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchType && matchRef && matchSearch;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Seguimiento de salud operacional. Controles, reincorporación, revaluación.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Empleado o descripción"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 240 }}
        />
        <TextField
          select
          size="small"
          label="Tipo seguimiento"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          sx={{ minWidth: 170 }}
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
          label="Referencia"
          value={refFilter}
          onChange={(e) => setRefFilter(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="todos">Todas</MenuItem>
          {(Object.keys(REF_TYPE_LABELS) as Array<keyof typeof REF_TYPE_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {REF_TYPE_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Empleado</TableCell>
            <TableCell>Referencia</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Responsable</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.followUpDate}</TableCell>
              <TableCell>
                <Typography variant="body2">{s.employeeName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {s.employeeDocument}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={`${REF_TYPE_LABELS[s.referenceType] ?? s.referenceType} #${s.referenceId}`}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{TYPE_LABELS[s.type] ?? s.type}</TableCell>
              <TableCell sx={{ maxWidth: 260 }}>{s.description}</TableCell>
              <TableCell>{s.responsible}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay seguimientos registrados.
        </Typography>
      )}
    </Box>
  );
}
