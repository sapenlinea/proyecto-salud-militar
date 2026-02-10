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
import type { DiagnosticoCAC } from '../types';

interface DiagnosticosCACProps {
  diagnosticos: DiagnosticoCAC[];
}

const CATEGORY_LABELS: Record<string, string> = {
  oncologico: 'Oncológico',
  renal: 'Renal',
  hematologico: 'Hematológico',
  trasplante: 'Trasplante',
  otro: 'Otro',
};

export default function DiagnosticosCAC({ diagnosticos }: DiagnosticosCACProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const filtered = diagnosticos.filter((d) => {
    const matchCategory = categoryFilter === 'todos' || d.category === categoryFilter;
    const matchSearch =
      !search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.code.includes(search) ||
      d.treatmentType.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPatients = filtered.reduce((sum, d) => sum + d.patientCount, 0);

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Diagnósticos de alto costo. Categorías y tratamiento.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Diagnóstico, código o tratamiento"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 260 }}
        />
        <TextField
          select
          size="small"
          label="Categoría"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="todos">Todas</MenuItem>
          {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {CATEGORY_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Diagnóstico</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>Tipo de tratamiento</TableCell>
            <TableCell align="right">Pacientes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((d) => (
            <TableRow key={d.id}>
              <TableCell>{d.code}</TableCell>
              <TableCell>{d.name}</TableCell>
              <TableCell>{CATEGORY_LABELS[d.category] ?? d.category}</TableCell>
              <TableCell>{d.treatmentType}</TableCell>
              <TableCell align="right">{d.patientCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length > 0 && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="subtitle2">
            Total pacientes: {totalPatients}
          </Typography>
        </Box>
      )}
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay diagnósticos CAC.
        </Typography>
      )}
    </Box>
  );
}
