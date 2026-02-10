import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { GeoLocation } from '../types';

interface GeoreferencingProps {
  locations: GeoLocation[];
}

const RISK_COLORS: Record<string, 'success' | 'warning' | 'error'> = {
  Bajo: 'success',
  Medio: 'warning',
  Alto: 'error',
};

export default function Georeferencing({ locations }: GeoreferencingProps) {
  function getMapUrl(lat: number, lng: number) {
    return `https://www.google.com/maps?q=${lat},${lng}`;
  }

  const formatDate = (dateStr?: string) =>
    dateStr ? new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'short' }) : '—';

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Puntos georreferenciados de vigilancia ambiental. Coordenadas y enlaces a mapa.
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell>Coordenadas</TableCell>
            <TableCell>Nivel riesgo</TableCell>
            <TableCell>Última inspección</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locations.map((loc) => (
            <TableRow key={loc.id}>
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {loc.name}
                </Typography>
              </TableCell>
              <TableCell>{loc.type}</TableCell>
              <TableCell>{loc.address}</TableCell>
              <TableCell>
                <Link
                  href={getMapUrl(loc.lat, loc.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body2"
                >
                  {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
                </Link>
              </TableCell>
              <TableCell>
                {loc.riskLevel ? (
                  <Chip
                    label={loc.riskLevel}
                    size="small"
                    color={RISK_COLORS[loc.riskLevel] ?? 'default'}
                    variant="outlined"
                  />
                ) : (
                  '—'
                )}
              </TableCell>
              <TableCell>{formatDate(loc.lastInspection)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {locations.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay puntos georreferenciados.
        </Typography>
      )}
    </Box>
  );
}
