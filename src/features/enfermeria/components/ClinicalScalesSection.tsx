import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { ClinicalScale } from '../types.js';
import { SCALE_LABELS } from '../types.js';

interface ClinicalScalesSectionProps {
  scales: ClinicalScale[];
  patientId: string | null;
  onAdd?: (s: Omit<ClinicalScale, 'id'>) => void;
}

const SCALE_TYPES: { value: ClinicalScale['type']; label: string }[] = [
  { value: 'braden', label: 'Escala de Braden' },
  { value: 'glasgow', label: 'Escala de Glasgow' },
  { value: 'norton', label: 'Escala de Norton' },
  { value: 'barthel', label: 'Índice de Barthel' },
];

function getInterpretation(type: ClinicalScale['type'], score: number): string {
  switch (type) {
    case 'braden':
      if (score <= 9) return 'Riesgo muy alto';
      if (score <= 12) return 'Riesgo alto';
      if (score <= 14) return 'Riesgo moderado';
      return 'Riesgo bajo';
    case 'glasgow':
      if (score <= 8) return 'Coma';
      if (score <= 12) return 'Alteración grave';
      return 'Normal (15/15)';
    case 'norton':
      if (score <= 14) return 'Riesgo alto';
      if (score <= 18) return 'Riesgo moderado';
      return 'Riesgo bajo';
    case 'barthel':
      if (score <= 20) return 'Dependencia total';
      if (score <= 60) return 'Dependencia moderada';
      if (score < 100) return 'Dependencia leve';
      return 'Independencia total';
    default:
      return '';
  }
}

export default function ClinicalScalesSection({ scales, patientId, onAdd }: ClinicalScalesSectionProps) {
  const [type, setType] = useState<ClinicalScale['type']>('braden');
  const [scores, setScores] = useState<Record<string, string>>({});

  const labels = SCALE_LABELS[type] ?? {};

  function handleScoreChange(key: string, value: string) {
    setScores((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!onAdd || !patientId) return;
    const scoreEntries: Record<string, number> = {};
    let total = 0;
    for (const [k, v] of Object.entries(scores)) {
      const n = parseInt(v, 10);
      if (!Number.isNaN(n)) {
        scoreEntries[k] = n;
        total += n;
      }
    }
    const now = new Date();
    const interpretation = getInterpretation(type, total);
    onAdd({
      patientId,
      type,
      date: now.toISOString().slice(0, 10),
      time: now.toTimeString().slice(0, 5),
      totalScore: total,
      scores: scoreEntries,
      interpretation,
      author: 'Usuario actual',
    });
    setScores({});
  }

  return (
    <Box>
      {scales.map((s) => (
        <Paper key={s.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="subtitle2">{SCALE_TYPES.find((t) => t.value === s.type)?.label ?? s.type}</Typography>
            <Chip label={`${s.totalScore} puntos`} size="small" color="primary" variant="outlined" />
          </Box>
          <Typography variant="caption" color="text.secondary">
            {s.date} {s.time} · {s.author}
          </Typography>
          <Table size="small" sx={{ mt: 1, mb: 1 }}>
            <TableHead>
              <TableRow>
                <TableCell>Criterio</TableCell>
                <TableCell>Puntuación</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(s.scores).map(([key, val]) => (
                <TableRow key={key}>
                  <TableCell>{(SCALE_LABELS[s.type] ?? {})[key] ?? key}</TableCell>
                  <TableCell>{val}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {s.interpretation && (
            <Typography variant="body2" color="text.secondary">
              {s.interpretation}
            </Typography>
          )}
        </Paper>
      ))}

      {patientId && onAdd && (
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Registrar escala clínica
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              select
              size="small"
              label="Escala"
              value={type}
              onChange={(e) => {
                setType(e.target.value as ClinicalScale['type']);
                setScores({});
              }}
              sx={{ minWidth: 200, mb: 2 }}
            >
              {SCALE_TYPES.map((t) => (
                <MenuItem key={t.value} value={t.value}>
                  {t.label}
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 2, mb: 2 }}>
              {Object.entries(labels).map(([key, label]) => (
                <TextField
                  key={key}
                  size="small"
                  label={label}
                  type="number"
                  value={scores[key] ?? ''}
                  onChange={(e) => handleScoreChange(key, e.target.value)}
                  inputProps={{ min: 0, max: 100 }}
                />
              ))}
            </Box>
            <Button type="submit" variant="contained">
              Registrar escala
            </Button>
          </Box>
        </Paper>
      )}

      {scales.length === 0 && !patientId && (
        <Typography variant="body2" color="text.secondary">
          Seleccione un paciente para ver y registrar escalas clínicas.
        </Typography>
      )}
    </Box>
  );
}
