import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { FinancialReport } from '../types.js';

interface FinancialReportsSectionProps {
  reports: FinancialReport[];
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency }).format(amount);
}

export default function FinancialReportsSection({ reports }: FinancialReportsSectionProps) {
  const [selectedReport, setSelectedReport] = useState<FinancialReport | null>(reports[0] ?? null);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
        <Typography variant="subtitle2">Seleccionar reporte:</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {reports.map((r) => (
            <Chip
              key={r.id}
              label={`${r.title} (${r.periodFrom} - ${r.periodTo})`}
              size="small"
              color={selectedReport?.id === r.id ? 'primary' : 'default'}
              variant={selectedReport?.id === r.id ? 'filled' : 'outlined'}
              onClick={() => setSelectedReport(r)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Box>
      {selectedReport && (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {selectedReport.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Período: {selectedReport.periodFrom} — {selectedReport.periodTo}
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">Total recaudado</Typography>
                <Typography variant="h6" color="primary">{formatCurrency(selectedReport.totalCollected, selectedReport.currency)}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Número de transacciones</Typography>
                <Typography variant="h6">{selectedReport.totalPayments}</Typography>
              </Box>
            </Box>
            {selectedReport.summary && Object.keys(selectedReport.summary).length > 0 && (
              <Table size="small" sx={{ maxWidth: 400 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Forma de pago</TableCell>
                    <TableCell align="right">Monto</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(selectedReport.summary).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell sx={{ textTransform: 'capitalize' }}>{key.replace(/_/g, ' ')}</TableCell>
                      <TableCell align="right">{formatCurrency(value, selectedReport.currency)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
