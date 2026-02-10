import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { InformeAuditoria } from '../types';

interface InformesAuditoriaProps {
  informes: InformeAuditoria[];
}

const TYPE_LABELS: Record<string, string> = {
  concurrente: 'Concurrente',
  posterior: 'Posterior',
  glosas: 'Glosas',
  consolidado: 'Consolidado',
};

export default function InformesAuditoriaSection({ informes }: InformesAuditoriaProps) {
  const [typeFilter, setTypeFilter] = useState<string>('todos');
  const [periodFilter, setPeriodFilter] = useState('');

  const periods = [...new Set(informes.map((i) => i.period))];

  const filtered = informes.filter((i) => {
    const matchType = typeFilter === 'todos' || i.reportType === typeFilter;
    const matchPeriod = !periodFilter || i.period === periodFilter;
    return matchType && matchPeriod;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Informes de auditoría. Concurrente, posterior, glosas y consolidado.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
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
          label="Período"
          value={periodFilter}
          onChange={(e) => setPeriodFilter(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">Todos</MenuItem>
          {periods.map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell>Período</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Generado</TableCell>
            <TableCell align="right">Auditados</TableCell>
            <TableCell align="right">Aprobados</TableCell>
            <TableCell align="right">Observados</TableCell>
            <TableCell align="right">Rechazados</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((i) => (
            <TableRow key={i.id}>
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {i.title}
                </Typography>
              </TableCell>
              <TableCell>{i.period}</TableCell>
              <TableCell>{TYPE_LABELS[i.reportType] ?? i.reportType}</TableCell>
              <TableCell>{i.generatedDate}</TableCell>
              <TableCell align="right">{i.totalAudited}</TableCell>
              <TableCell align="right">{i.totalApproved}</TableCell>
              <TableCell align="right">{i.totalObserved}</TableCell>
              <TableCell align="right">{i.totalRejected}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length > 0 && (
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {filtered.map((i) => (
            <Card key={i.id} variant="outlined" sx={{ minWidth: 200, maxWidth: 280 }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  {i.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {i.totalAudited} auditados · {i.totalApproved} aprobados · {i.totalObserved} observados · {i.totalRejected} rechazados
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay informes de auditoría.
        </Typography>
      )}
    </Box>
  );
}
