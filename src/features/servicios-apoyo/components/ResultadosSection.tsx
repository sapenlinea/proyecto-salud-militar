import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
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
import type { ResultadoEstudio } from '../types';

interface ResultadosSectionProps {
  resultados: ResultadoEstudio[];
}

const STATUS_LABELS: Record<string, string> = {
  pendiente: 'Pendiente',
  preliminar: 'Preliminar',
  definitivo: 'Definitivo',
  validado: 'Validado',
};

const STATUS_COLORS: Record<string, 'default' | 'warning' | 'info' | 'success'> = {
  pendiente: 'default',
  preliminar: 'warning',
  definitivo: 'info',
  validado: 'success',
};

const FLAG_COLORS: Record<string, 'success' | 'error' | 'warning'> = {
  normal: 'success',
  alto: 'error',
  bajo: 'warning',
};

export default function ResultadosSection({ resultados }: ResultadosSectionProps) {
  const [typeFilter, setTypeFilter] = useState<string>('todos');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const filtered = resultados.filter((r) => {
    const matchType = typeFilter === 'todos' || r.studyType === typeFilter;
    const matchStatus = statusFilter === 'todos' || r.status === statusFilter;
    const matchSearch =
      !search ||
      r.patientName.toLowerCase().includes(search.toLowerCase()) ||
      r.patientDocument.includes(search) ||
      r.studyName.toLowerCase().includes(search.toLowerCase());
    return matchType && matchStatus && matchSearch;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Resultados de estudios. Laboratorio e imágenes diagnósticas.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Paciente o estudio"
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
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          <MenuItem value="laboratorio">Laboratorio</MenuItem>
          <MenuItem value="imagen">Imagen</MenuItem>
        </TextField>
        <TextField
          select
          size="small"
          label="Estado"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 130 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {(Object.keys(STATUS_LABELS) as Array<keyof typeof STATUS_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {STATUS_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {filtered.map((r) => (
        <Accordion key={r.id} variant="outlined" sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<Typography sx={{ fontSize: 18 }}>▼</Typography>}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Typography variant="subtitle2">
                {r.studyName} — {r.patientName}
              </Typography>
              <Chip
                label={r.studyType === 'laboratorio' ? 'Lab' : 'Imagen'}
                size="small"
                variant="outlined"
              />
              <Chip
                label={STATUS_LABELS[r.status] ?? r.status}
                size="small"
                color={STATUS_COLORS[r.status] ?? 'default'}
                variant="outlined"
              />
              <Typography variant="caption" color="text.secondary">
                {r.resultDate} · {r.patientDocument}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {r.values && r.values.length > 0 ? (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Parámetro</TableCell>
                    <TableCell align="right">Valor</TableCell>
                    <TableCell>Unidad</TableCell>
                    <TableCell>Rango ref.</TableCell>
                    <TableCell>Flag</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {r.values.map((v, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{v.parameter}</TableCell>
                      <TableCell align="right">{v.value}</TableCell>
                      <TableCell>{v.unit ?? '—'}</TableCell>
                      <TableCell>{v.referenceRange ?? '—'}</TableCell>
                      <TableCell>
                        {v.flag ? (
                          <Chip
                            label={v.flag}
                            size="small"
                            color={FLAG_COLORS[v.flag] ?? 'default'}
                            variant="outlined"
                          />
                        ) : (
                          '—'
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : r.report ? (
              <Typography variant="body2">{r.report}</Typography>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Sin datos de resultado.
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay resultados.
        </Typography>
      )}
    </Box>
  );
}
