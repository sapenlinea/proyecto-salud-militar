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
import type { CostoAcumulado } from '../types';

interface CostosAcumuladosProps {
  costos: CostoAcumulado[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
}

export default function CostosAcumulados({ costos }: CostosAcumuladosProps) {
  const [periodFilter, setPeriodFilter] = useState('');
  const [diagnosisFilter, setDiagnosisFilter] = useState<string>('todos');

  const periods = [...new Set(costos.map((c) => c.period))];
  const diagnoses = [...new Set(costos.map((c) => c.diagnosis))];

  const filtered = costos.filter((c) => {
    const matchPeriod = !periodFilter || c.period === periodFilter;
    const matchDiagnosis = diagnosisFilter === 'todos' || c.diagnosis === diagnosisFilter;
    return matchPeriod && matchDiagnosis;
  });

  const totalCost = filtered.reduce((sum, c) => sum + c.totalCost, 0);

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Costos acumulados por paciente CAC. Desglose por concepto.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          select
          size="small"
          label="Período"
          value={periodFilter}
          onChange={(e) => setPeriodFilter(e.target.value)}
          sx={{ minWidth: 130 }}
        >
          <MenuItem value="">Todos</MenuItem>
          {periods.map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Diagnóstico"
          value={diagnosisFilter}
          onChange={(e) => setDiagnosisFilter(e.target.value)}
          sx={{ minWidth: 260 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {diagnoses.map((d) => (
            <MenuItem key={d} value={d}>
              {d}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Paciente</TableCell>
            <TableCell>Diagnóstico</TableCell>
            <TableCell>Período</TableCell>
            <TableCell align="right">Medicamentos</TableCell>
            <TableCell align="right">Procedimientos</TableCell>
            <TableCell align="right">Hospitalización</TableCell>
            <TableCell align="right">Otros</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((c) => (
            <TableRow key={c.id}>
              <TableCell>
                <Typography variant="body2">{c.patientName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {c.patientDocument}
                </Typography>
              </TableCell>
              <TableCell>{c.diagnosis}</TableCell>
              <TableCell>{c.period}</TableCell>
              <TableCell align="right">{formatCurrency(c.medications)}</TableCell>
              <TableCell align="right">{formatCurrency(c.procedures)}</TableCell>
              <TableCell align="right">{formatCurrency(c.hospitalization)}</TableCell>
              <TableCell align="right">{formatCurrency(c.others)}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                {formatCurrency(c.totalCost)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length > 0 && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="subtitle2">
            Total acumulado: {formatCurrency(totalCost)}
          </Typography>
        </Box>
      )}
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay costos acumulados.
        </Typography>
      )}
    </Box>
  );
}
