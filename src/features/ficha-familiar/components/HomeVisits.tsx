import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { HomeVisit } from '../types';

interface HomeVisitsProps {
  visits: HomeVisit[];
}

export default function HomeVisits({ visits }: HomeVisitsProps) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  const sorted = [...visits].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Registro de visitas domiciliarias realizadas al hogar.
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Motivo</TableCell>
            <TableCell>Hallazgos</TableCell>
            <TableCell>Profesional</TableCell>
            <TableCell>Próxima visita</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((v) => (
            <TableRow key={v.id}>
              <TableCell>{formatDate(v.date)}</TableCell>
              <TableCell>{v.reason}</TableCell>
              <TableCell sx={{ maxWidth: 300 }}>{v.findings}</TableCell>
              <TableCell>{v.professional}</TableCell>
              <TableCell>{v.nextVisit ? formatDate(v.nextVisit) : '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {visits.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay visitas domiciliarias registradas.
        </Typography>
      )}
    </Box>
  );
}
