import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { PacientePriorizado } from '../types';

interface PacientesPriorizadosProps {
  patients: PacientePriorizado[];
}

const RISK_LABELS: Record<string, string> = {
  bajo: 'Bajo',
  medio: 'Medio',
  alto: 'Alto',
  muy_alto: 'Muy alto',
};

const RISK_COLORS: Record<string, 'success' | 'info' | 'warning' | 'error'> = {
  bajo: 'success',
  medio: 'info',
  alto: 'warning',
  muy_alto: 'error',
};

export default function PacientesPriorizados({ patients }: PacientesPriorizadosProps) {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('todos');

  const filtered = patients.filter((p) => {
    const matchSearch =
      !search ||
      p.patientName.toLowerCase().includes(search.toLowerCase()) ||
      p.patientDocument.includes(search);
    const matchLevel = levelFilter === 'todos' || p.riskLevel === levelFilter;
    return matchSearch && matchLevel;
  });

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Pacientes priorizados según nivel de riesgo. Acciones pendientes.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Paciente o documento"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 220 }}
        />
        <TextField
          select
          size="small"
          label="Nivel"
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          sx={{ minWidth: 130 }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {(Object.keys(RISK_LABELS) as Array<keyof typeof RISK_LABELS>).map((k) => (
            <MenuItem key={k} value={k}>
              {RISK_LABELS[k]}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {filtered.map((p) => (
        <Accordion key={p.id} variant="outlined" sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<Typography sx={{ fontSize: 18 }}>▼</Typography>}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Chip label={`#${p.priority}`} size="small" color="primary" variant="filled" />
              <Typography variant="subtitle2">
                {p.patientName} — {p.patientDocument}
              </Typography>
              <Chip
                label={RISK_LABELS[p.riskLevel] ?? p.riskLevel}
                size="small"
                color={RISK_COLORS[p.riskLevel] ?? 'default'}
                variant="outlined"
              />
              {p.lastIntervention && (
                <Typography variant="caption" color="text.secondary">
                  Última intervención: {p.lastIntervention}
                </Typography>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {p.reason}
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Acciones pendientes:
            </Typography>
            <List dense disablePadding>
              {p.pendingActions.map((a, idx) => (
                <ListItem key={idx} disablePadding>
                  <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                  <ListItemText primary={a} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay pacientes priorizados.
        </Typography>
      )}
    </Box>
  );
}
