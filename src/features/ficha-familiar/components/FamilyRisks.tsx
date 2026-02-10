import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { FamilyRisk } from '../types';

interface FamilyRisksProps {
  risks: FamilyRisk[];
}

const LEVEL_LABELS: Record<string, string> = {
  bajo: 'Bajo',
  medio: 'Medio',
  alto: 'Alto',
};

const LEVEL_COLORS: Record<string, 'success' | 'warning' | 'error'> = {
  bajo: 'success',
  medio: 'warning',
  alto: 'error',
};

const STATUS_LABELS: Record<string, string> = {
  activo: 'Activo',
  en_seguimiento: 'En seguimiento',
  resuelto: 'Resuelto',
};

export default function FamilyRisks({ risks }: FamilyRisksProps) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'short' });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Riesgos identificados en el hogar y su nivel de severidad.
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Categoría</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Nivel</TableCell>
            <TableCell>Fecha detección</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {risks.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.category}</TableCell>
              <TableCell>{r.description}</TableCell>
              <TableCell>
                <Chip
                  label={LEVEL_LABELS[r.level] ?? r.level}
                  size="small"
                  color={LEVEL_COLORS[r.level] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{formatDate(r.detectedAt)}</TableCell>
              <TableCell>{STATUS_LABELS[r.status] ?? r.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {risks.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay riesgos familiares registrados.
        </Typography>
      )}
    </Box>
  );
}
