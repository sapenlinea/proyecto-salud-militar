import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { EpidemiologicalPoint } from '../types';

interface EpidemiologicalMapsProps {
  points: EpidemiologicalPoint[];
}

export default function EpidemiologicalMaps({ points }: EpidemiologicalMapsProps) {
  function getMapUrl(lat: number, lng: number) {
    return `https://www.google.com/maps?q=${lat},${lng}`;
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Puntos epidemiológicos georreferenciados. Coordenadas y enlaces a mapa para visualización espacial.
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Evento</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell>Casos</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Coordenadas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {points.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.eventCode}</TableCell>
              <TableCell>{p.eventName}</TableCell>
              <TableCell sx={{ maxWidth: 250 }}>{p.address}</TableCell>
              <TableCell>
                <Chip label={p.cases} size="small" variant="outlined" color="primary" />
              </TableCell>
              <TableCell>{formatDate(p.date)}</TableCell>
              <TableCell>
                <Link
                  href={getMapUrl(p.lat, p.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body2"
                >
                  {p.lat.toFixed(4)}, {p.lng.toFixed(4)}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {points.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay puntos epidemiológicos georreferenciados.
        </Typography>
      )}
    </Box>
  );
}
