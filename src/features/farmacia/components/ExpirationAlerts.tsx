import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { ExpirationAlert } from '../types.js';

interface ExpirationAlertsProps {
  alerts: ExpirationAlert[];
}

const SEVERITY_COLORS: Record<ExpirationAlert['severity'], 'error' | 'warning' | 'info'> = {
  crítico: 'error',
  alerta: 'warning',
  próximo: 'info',
};

const SEVERITY_LABELS: Record<ExpirationAlert['severity'], string> = {
  crítico: 'Crítico',
  alerta: 'Alerta',
  próximo: 'Próximo',
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('es-CO', { dateStyle: 'medium' });
  } catch {
    return iso;
  }
}

export default function ExpirationAlerts({ alerts }: ExpirationAlertsProps) {
  const sorted = [...alerts].sort((a, b) => a.daysToExpire - b.daysToExpire);

  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Alertas de vencimiento de lotes
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Medicamento</TableCell>
            <TableCell>Lote</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Vencimiento</TableCell>
            <TableCell>Días restantes</TableCell>
            <TableCell>Severidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((a) => (
            <TableRow key={a.id} sx={{ bgcolor: a.severity === 'crítico' ? 'error.light' : undefined }}>
              <TableCell>{a.medicationName}</TableCell>
              <TableCell>{a.lotNumber}</TableCell>
              <TableCell>{a.quantity}</TableCell>
              <TableCell>{formatDate(a.expirationDate)}</TableCell>
              <TableCell>{a.daysToExpire} días</TableCell>
              <TableCell>
                <Chip label={SEVERITY_LABELS[a.severity]} size="small" color={SEVERITY_COLORS[a.severity]} variant="filled" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {sorted.length === 0 && (
        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No hay alertas de vencimiento activas.
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
