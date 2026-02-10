import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { ImprovementPlan } from '../types';

interface ImprovementPlansProps {
  plans: ImprovementPlan[];
}

const STATUS_LABELS: Record<string, string> = {
  pendiente: 'Pendiente',
  en_ejecución: 'En ejecución',
  completado: 'Completado',
};

const STATUS_COLORS: Record<string, 'default' | 'info' | 'success'> = {
  pendiente: 'default',
  en_ejecución: 'info',
  completado: 'success',
};

export default function ImprovementPlans({ plans }: ImprovementPlansProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');

  const filtered =
    statusFilter === 'todos'
      ? plans
      : plans.filter((p) => p.status === statusFilter);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Planes de mejora para la vigilancia y control ambiental.
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
            <TableCell>Título</TableCell>
            <TableCell>Relacionado a</TableCell>
            <TableCell>Responsable</TableCell>
            <TableCell>Inicio</TableCell>
            <TableCell>Fin</TableCell>
            <TableCell>Avance</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {p.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  {p.description}
                </Typography>
              </TableCell>
              <TableCell>{p.relatedTo}</TableCell>
              <TableCell>{p.responsible}</TableCell>
              <TableCell>{formatDate(p.startDate)}</TableCell>
              <TableCell>{p.endDate ? formatDate(p.endDate) : '—'}</TableCell>
              <TableCell sx={{ minWidth: 100 }}>
                {p.progress != null ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={p.progress}
                      sx={{ flex: 1, height: 6, borderRadius: 1 }}
                    />
                    <Typography variant="caption">{p.progress}%</Typography>
                  </Box>
                ) : (
                  '—'
                )}
              </TableCell>
              <TableCell>
                <Chip
                  label={STATUS_LABELS[p.status] ?? p.status}
                  size="small"
                  color={STATUS_COLORS[p.status] ?? 'default'}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay planes de mejora.
        </Typography>
      )}
    </Box>
  );
}
