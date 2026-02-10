import { useMemo, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { EstadoCuenta } from '../types';

interface EstadoCuentaSectionProps {
  statements: EstadoCuenta[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
}

export default function EstadoCuentaSection({ statements }: EstadoCuentaSectionProps) {
  const [patientFilter, setPatientFilter] = useState<string>('todos');

  const filtered = useMemo(
    () => (patientFilter === 'todos' ? statements : statements.filter((s) => s.patientId === patientFilter)),
    [statements, patientFilter]
  );

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Estado de cuenta por paciente. Cargos, abonos y saldo.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          select
          size="small"
          label="Paciente"
          value={patientFilter}
          onChange={(e) => setPatientFilter(e.target.value)}
          sx={{ minWidth: 280 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {statements.map((s) => (
            <MenuItem key={s.id} value={s.patientId}>
              {s.patientName} — {s.patientDocument}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {filtered.map((stmt) => (
        <Accordion key={stmt.id} variant="outlined" sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<Typography sx={{ fontSize: 18 }}>▼</Typography>}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', pr: 2 }}>
              <Typography variant="subtitle2">
                {stmt.patientName} — {stmt.patientDocument}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Período: {stmt.periodFrom} a {stmt.periodTo} | Saldo: {formatCurrency(stmt.closingBalance)}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Saldo inicial: {formatCurrency(stmt.openingBalance)} | Cargos: {formatCurrency(stmt.totalDebits)} |
                Abonos: {formatCurrency(stmt.totalCredits)} | Saldo final: {formatCurrency(stmt.closingBalance)}
              </Typography>
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell align="right">Débito</TableCell>
                  <TableCell align="right">Crédito</TableCell>
                  <TableCell align="right">Saldo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stmt.transactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.date}</TableCell>
                    <TableCell>{t.description}</TableCell>
                    <TableCell align="right">{t.debit > 0 ? formatCurrency(t.debit) : '—'}</TableCell>
                    <TableCell align="right">{t.credit > 0 ? formatCurrency(t.credit) : '—'}</TableCell>
                    <TableCell align="right" sx={{ color: t.balance < 0 ? 'error.main' : undefined }}>
                      {formatCurrency(t.balance)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      ))}
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay estados de cuenta.
        </Typography>
      )}
    </Box>
  );
}
