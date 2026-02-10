import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { PlanIntervencion } from '../types';

interface PlanesIntervencionProps {
  planes: PlanIntervencion[];
}

const STATUS_LABELS: Record<string, string> = {
  vigente: 'Vigente',
  en_progreso: 'En progreso',
  completado: 'Completado',
  suspendido: 'Suspendido',
};

const STATUS_COLORS: Record<string, 'info' | 'warning' | 'success' | 'default'> = {
  vigente: 'info',
  en_progreso: 'warning',
  completado: 'success',
  suspendido: 'default',
};

export default function PlanesIntervencion({ planes }: PlanesIntervencionProps) {
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const filtered = planes.filter((p) => {
    const matchStatus = statusFilter === 'todos' || p.status === statusFilter;
    const matchSearch =
      !search ||
      p.patientName.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.patientDocument.includes(search);
    return matchStatus && matchSearch;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Planes de intervención por paciente. Objetivos, actividades y seguimiento.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Paciente o plan"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 220 }}
        />
        <TextField
          select
          size="small"
          label="Estado"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {(Object.keys(STATUS_LABELS) as Array<keyof typeof STATUS_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {STATUS_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {filtered.map((p) => (
        <Accordion key={p.id} variant="outlined" sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<Typography sx={{ fontSize: 18 }}>▼</Typography>}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Typography variant="subtitle2">{p.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {p.patientName} — {p.patientDocument}
              </Typography>
              <Chip
                label={STATUS_LABELS[p.status] ?? p.status}
                size="small"
                color={STATUS_COLORS[p.status] ?? 'default'}
                variant="outlined"
              />
              <Typography variant="caption" color="text.secondary">
                {p.startDate} a {p.endDate} · {p.responsible}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Objetivos:
            </Typography>
            <List dense disablePadding sx={{ mb: 2 }}>
              {p.objectives.map((obj, idx) => (
                <ListItem key={idx} disablePadding>
                  <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                  <ListItemText primary={obj} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Actividades:
            </Typography>
            <List dense disablePadding>
              {p.activities.map((act) => (
                <ListItem key={act.id} disablePadding>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    {act.completed ? '✓' : '○'}
                  </ListItemIcon>
                  <ListItemText
                    primary={act.description}
                    secondary={act.completed ? `Completada ${act.completedDate}` : `Vence ${act.dueDate}`}
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay planes de intervención.
        </Typography>
      )}
    </Box>
  );
}
