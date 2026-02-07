import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { MedicalEvolution } from '../types.js';

interface EvolutionFormProps {
  evolutions: MedicalEvolution[];
  onAdd?: (evolution: Omit<MedicalEvolution, 'id' | 'patientId'>) => void;
  patientId?: string;
  readOnly?: boolean;
}

const FIELDS = [
  { key: 'reason', label: 'Motivo de consulta', minRows: 1 },
  { key: 'subjective', label: 'Subjetivo', minRows: 2 },
  { key: 'objective', label: 'Objetivo', minRows: 2 },
  { key: 'assessment', label: 'Análisis / Impresión diagnóstica', minRows: 2 },
  { key: 'plan', label: 'Plan', minRows: 2 },
] as const;

export default function EvolutionForm({
  evolutions,
  onAdd,
  patientId,
  readOnly = false,
}: EvolutionFormProps) {
  const [reason, setReason] = useState('');
  const [subjective, setSubjective] = useState('');
  const [objective, setObjective] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!onAdd || !patientId) return;
    onAdd({
      date: new Date().toISOString(),
      reason,
      subjective,
      objective,
      assessment,
      plan,
      author: 'Usuario actual',
    });
    setReason('');
    setSubjective('');
    setObjective('');
    setAssessment('');
    setPlan('');
  }

  function formatDate(iso: string) {
    try {
      return new Date(iso).toLocaleString('es-CO', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      return iso;
    }
  }

  return (
    <Box>
      {evolutions.map((ev) => (
        <Box
          key={ev.id}
          sx={{
            mb: 2,
            p: 2,
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            bgcolor: 'background.default',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {formatDate(ev.date)} · {ev.author}
          </Typography>
          {FIELDS.map(({ key, label }) => (
            <Box key={key} sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                {label}
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {(ev as unknown as Record<string, string>)[key] ?? '—'}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}

      {!readOnly && onAdd && patientId && (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Nueva evolución
          </Typography>
          <TextField
            fullWidth
            label="Motivo de consulta"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            multiline
            minRows={1}
            margin="normal"
            size="small"
          />
          <TextField
            fullWidth
            label="Subjetivo"
            value={subjective}
            onChange={(e) => setSubjective(e.target.value)}
            multiline
            minRows={2}
            margin="normal"
            size="small"
          />
          <TextField
            fullWidth
            label="Objetivo"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            multiline
            minRows={2}
            margin="normal"
            size="small"
          />
          <TextField
            fullWidth
            label="Análisis / Impresión diagnóstica"
            value={assessment}
            onChange={(e) => setAssessment(e.target.value)}
            multiline
            minRows={2}
            margin="normal"
            size="small"
          />
          <TextField
            fullWidth
            label="Plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            multiline
            minRows={2}
            margin="normal"
            size="small"
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Guardar evolución
          </Button>
        </Box>
      )}

      {evolutions.length === 0 && readOnly && (
        <Typography variant="body2" color="text.secondary">
          No hay evoluciones registradas.
        </Typography>
      )}
    </Box>
  );
}
