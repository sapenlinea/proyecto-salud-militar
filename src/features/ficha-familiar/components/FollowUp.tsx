import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { FollowUp } from '../types';

interface FollowUpSectionProps {
  followUps: FollowUp[];
}

export default function FollowUpSection({ followUps }: FollowUpSectionProps) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  const sorted = [...followUps].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Seguimiento de acciones y próximos pasos con la familia.
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Notas</TableCell>
            <TableCell>Profesional</TableCell>
            <TableCell>Próxima acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((f) => (
            <TableRow key={f.id}>
              <TableCell>{formatDate(f.date)}</TableCell>
              <TableCell>{f.type}</TableCell>
              <TableCell sx={{ maxWidth: 300 }}>{f.notes}</TableCell>
              <TableCell>{f.professional}</TableCell>
              <TableCell>{f.nextAction ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {followUps.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay seguimientos registrados.
        </Typography>
      )}
    </Box>
  );
}
