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
import type { EntregaResultado } from '../types';

interface EntregaResultadosProps {
  entregas: EntregaResultado[];
}

const METHOD_LABELS: Record<string, string> = {
  presencial: 'Presencial',
  portal: 'Portal paciente',
  correo: 'Correo electrónico',
};

export default function EntregaResultados({ entregas }: EntregaResultadosProps) {
  const [methodFilter, setMethodFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const filtered = entregas.filter((e) => {
    const matchMethod = methodFilter === 'todos' || e.deliveryMethod === methodFilter;
    const matchSearch =
      !search ||
      e.patientName.toLowerCase().includes(search.toLowerCase()) ||
      e.patientDocument.includes(search) ||
      e.studyName.toLowerCase().includes(search.toLowerCase());
    return matchMethod && matchSearch;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Entrega de resultados. Presencial, portal o correo.
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
          label="Método entrega"
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
          sx={{ minWidth: 170 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {(Object.keys(METHOD_LABELS) as Array<keyof typeof METHOD_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {METHOD_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha entrega</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Estudio</TableCell>
            <TableCell>Método</TableCell>
            <TableCell>Entregó</TableCell>
            <TableCell>Destinatario</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{e.deliveryDate}</TableCell>
              <TableCell>
                <Typography variant="body2">{e.patientName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {e.patientDocument}
                </Typography>
              </TableCell>
              <TableCell>{e.studyName}</TableCell>
              <TableCell>{METHOD_LABELS[e.deliveryMethod] ?? e.deliveryMethod}</TableCell>
              <TableCell>{e.deliveredBy}</TableCell>
              <TableCell>{e.recipient ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay entregas registradas.
        </Typography>
      )}
    </Box>
  );
}
