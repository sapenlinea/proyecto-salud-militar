import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { PatientAssignment } from '../types.js';

interface PatientAgendaProps {
  assignments: PatientAssignment[];
  selectedId: string | null;
  onSelect: (assignment: PatientAssignment) => void;
}

const PRIORITY_COLORS: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  baja: 'success',
  media: 'default',
  alta: 'warning',
  crítico: 'error',
};

export default function PatientAgenda({ assignments, selectedId, onSelect }: PatientAgendaProps) {
  const [filter, setFilter] = useState<'activos' | 'todos'>('activos');

  const filtered = filter === 'activos'
    ? assignments.filter((a) => a.status === 'activo')
    : assignments;

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Agenda de pacientes asignados
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {(['activos', 'todos'] as const).map((f) => (
            <Chip
              key={f}
              label={f === 'activos' ? 'Activos' : 'Todos'}
              size="small"
              color={filter === f ? 'primary' : 'default'}
              variant={filter === f ? 'filled' : 'outlined'}
              onClick={() => setFilter(f)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Box>
      <List dense disablePadding>
        {filtered.map((a) => (
          <ListItemButton
            key={a.id}
            selected={selectedId === a.patientId}
            onClick={() => onSelect(a)}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Typography variant="body2" fontWeight={500}>
                    {a.patientName}
                  </Typography>
                  {a.priority && (
                    <Chip
                      label={a.priority}
                      size="small"
                      color={PRIORITY_COLORS[a.priority] ?? 'default'}
                      variant="outlined"
                    />
                  )}
                </Box>
              }
              secondary={
                <>
                  {a.room && a.bed && `${a.room}-${a.bed}`} · {a.eps} · Admisión: {a.admissionDate}
                </>
              }
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </ListItemButton>
        ))}
      </List>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
          No hay pacientes asignados.
        </Typography>
      )}
    </Paper>
  );
}
