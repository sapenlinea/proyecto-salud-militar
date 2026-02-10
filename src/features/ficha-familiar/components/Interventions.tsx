import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { Intervention } from '../types';

interface InterventionsProps {
  interventions: Intervention[];
}

export default function Interventions({ interventions }: InterventionsProps) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  const sorted = [...interventions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Intervenciones realizadas con la familia (educación, referencias, etc.).
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Responsable</TableCell>
            <TableCell>Resultado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((i) => (
            <TableRow key={i.id}>
              <TableCell>{formatDate(i.date)}</TableCell>
              <TableCell>{i.type}</TableCell>
              <TableCell sx={{ maxWidth: 300 }}>{i.description}</TableCell>
              <TableCell>{i.responsible}</TableCell>
              <TableCell>{i.outcome ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {interventions.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay intervenciones registradas.
        </Typography>
      )}
    </Box>
  );
}
