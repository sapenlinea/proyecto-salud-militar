import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { ClinicalEvent } from '../types.js';

interface ClinicalTimelineProps {
  events: ClinicalEvent[];
}

const TYPE_LABELS: Record<ClinicalEvent['type'], string> = {
  evolution: 'Evolución',
  diagnosis: 'Diagnóstico',
  procedure: 'Procedimiento',
  medication: 'Medicamento',
  attachment: 'Adjunto',
};

function formatDateTime(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export default function ClinicalTimeline({ events }: ClinicalTimelineProps) {
  const sorted = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Box sx={{ position: 'relative', pl: 2, borderLeft: 2, borderColor: 'divider' }}>
      {sorted.map((event) => (
        <Box
          key={event.id}
          sx={{
            position: 'relative',
            mb: 2,
            '&::before': {
              content: '""',
              position: 'absolute',
              left: -2 - 6,
              top: 8,
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: 'primary.main',
            },
          }}
        >
          <Paper variant="outlined" sx={{ p: 1.5, ml: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {formatDateTime(event.date)} · {TYPE_LABELS[event.type]}
              {event.author ? ` · ${event.author}` : ''}
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {event.title}
            </Typography>
            {event.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {event.description}
              </Typography>
            )}
          </Paper>
        </Box>
      ))}
      {sorted.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No hay eventos clínicos registrados.
        </Typography>
      )}
    </Box>
  );
}
