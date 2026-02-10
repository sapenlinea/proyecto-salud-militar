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
import LinearProgress from '@mui/material/LinearProgress';
import type { SurgicalReport } from '../types';

interface SurgicalReportsProps {
  reports: SurgicalReport[];
}

export default function SurgicalReports({ reports }: SurgicalReportsProps) {
  const [periodFilter, setPeriodFilter] = useState<string>(reports[0]?.period ?? '');

  const report = reports.find((r) => r.period === periodFilter) ?? reports[0];
  const maxProcedureCount = report?.byProcedure?.reduce((max, p) => Math.max(max, p.count), 0) ?? 1;

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Reportes estadísticos de cirugías ambulatorias por período.
      </Typography>
      <Box sx={{ mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Período</InputLabel>
          <Select
            label="Período"
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
          >
            {reports.map((r) => (
              <MenuItem key={r.id} value={r.period}>
                {r.period}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {report && (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Chip
              label={`Total cirugías: ${report.totalSurgeries}`}
              size="medium"
              color="primary"
              variant="outlined"
            />
            <Chip
              label={`Canceladas: ${report.cancelledCount}`}
              size="medium"
              variant="outlined"
            />
            <Chip
              label={`Complicaciones: ${report.complicationsCount}`}
              size="medium"
              color={report.complicationsCount > 0 ? 'error' : 'success'}
              variant="outlined"
            />
          </Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Cirugías por procedimiento
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Procedimiento</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>% del total</TableCell>
                <TableCell>Proporción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report.byProcedure.map((p) => {
                const pct = report.totalSurgeries > 0 ? (p.count / report.totalSurgeries) * 100 : 0;
                return (
                  <TableRow key={p.procedure}>
                    <TableCell>{p.procedure}</TableCell>
                    <TableCell>{p.count}</TableCell>
                    <TableCell>{pct.toFixed(1)}%</TableCell>
                    <TableCell sx={{ minWidth: 150 }}>
                      <LinearProgress
                        variant="determinate"
                        value={(p.count / maxProcedureCount) * 100}
                        sx={{ height: 8, borderRadius: 1 }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      )}
      {(!report || reports.length === 0) && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay reportes quirúrgicos.
        </Typography>
      )}
    </Box>
  );
}
