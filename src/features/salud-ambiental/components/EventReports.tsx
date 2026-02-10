import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { EventReport } from '../types';

interface EventReportsProps {
  reports: EventReport[];
}

const STATUS_LABELS: Record<string, string> = {
  reportado: 'Reportado',
  en_curso: 'En curso',
  atendido: 'Atendido',
  cerrado: 'Cerrado',
};

const STATUS_COLORS: Record<string, 'info' | 'warning' | 'success' | 'default'> = {
  reportado: 'info',
  en_curso: 'warning',
  atendido: 'success',
  cerrado: 'default',
};

export default function EventReports({ reports }: EventReportsProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');

  const filtered =
    statusFilter === 'todos'
      ? reports
      : reports.filter((r) => r.status === statusFilter);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  function getMapUrl(lat?: number, lng?: number) {
    if (lat == null || lng == null) return null;
    return `https://www.google.com/maps?q=${lat},${lng}`;
  }

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Reportes de eventos ambientales. Los puntos con coordenadas pueden visualizarse en el mapa.
      </Typography>
      <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
        <Chip
          label="Todos"
          size="small"
          color={statusFilter === 'todos' ? 'primary' : 'default'}
          variant={statusFilter === 'todos' ? 'filled' : 'outlined'}
          onClick={() => setStatusFilter('todos')}
          sx={{ cursor: 'pointer' }}
        />
        {(Object.keys(STATUS_LABELS) as Array<keyof typeof STATUS_LABELS>).map((s) => (
          <Chip
            key={s}
            label={STATUS_LABELS[s]}
            size="small"
            color={statusFilter === s ? 'primary' : 'default'}
            variant={statusFilter === s ? 'filled' : 'outlined'}
            onClick={() => setStatusFilter(s)}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Ubicación</TableCell>
            <TableCell>Coordenadas</TableCell>
            <TableCell>Reportó</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((r) => {
            const mapUrl = getMapUrl(r.lat, r.lng);
            return (
              <TableRow key={r.id}>
                <TableCell>{formatDate(r.date)}</TableCell>
                <TableCell>{r.type}</TableCell>
                <TableCell sx={{ maxWidth: 200 }}>{r.description}</TableCell>
                <TableCell>{r.location}</TableCell>
                <TableCell>
                  {r.lat != null && r.lng != null ? (
                    <Link
                      href={mapUrl ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="body2"
                    >
                      {r.lat.toFixed(4)}, {r.lng.toFixed(4)}
                    </Link>
                  ) : (
                    '—'
                  )}
                </TableCell>
                <TableCell>{r.reportedBy}</TableCell>
                <TableCell>
                  <Chip
                    label={STATUS_LABELS[r.status] ?? r.status}
                    size="small"
                    color={STATUS_COLORS[r.status] ?? 'default'}
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay reportes de eventos.
        </Typography>
      )}
    </Box>
  );
}
