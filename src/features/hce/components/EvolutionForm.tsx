import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { MedicalEvolution } from '../types.js';

interface EvolutionFormProps {
  evolutions: MedicalEvolution[];
  onAdd?: (evolution: Omit<MedicalEvolution, 'id' | 'patientId'>) => void;
  onUpdate?: (id: string, updates: Partial<MedicalEvolution>) => void;
  onDelete?: (id: string) => void;
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
  onUpdate,
  onDelete,
  patientId,
  readOnly = false,
}: EvolutionFormProps) {
  const [reason, setReason] = useState('');
  const [subjective, setSubjective] = useState('');
  const [objective, setObjective] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editReason, setEditReason] = useState('');
  const [editSubjective, setEditSubjective] = useState('');
  const [editObjective, setEditObjective] = useState('');
  const [editAssessment, setEditAssessment] = useState('');
  const [editPlan, setEditPlan] = useState('');

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

  function startEdit(ev: MedicalEvolution) {
    setEditingId(ev.id);
    setEditReason(ev.reason);
    setEditSubjective(ev.subjective);
    setEditObjective(ev.objective);
    setEditAssessment(ev.assessment);
    setEditPlan(ev.plan);
  }

  function saveEdit() {
    if (!editingId || !onUpdate) return;
    onUpdate(editingId, {
      reason: editReason,
      subjective: editSubjective,
      objective: editObjective,
      assessment: editAssessment,
      plan: editPlan,
    });
    setEditingId(null);
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {formatDate(ev.date)} · {ev.author}
            </Typography>
            {!readOnly && (onUpdate || onDelete) && (
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {onUpdate && editingId !== ev.id && (
                  <Button size="small" variant="outlined" onClick={() => startEdit(ev)}>Editar</Button>
                )}
                {onDelete && (
                  <Button size="small" variant="outlined" color="error" onClick={() => onDelete(ev.id)}>Eliminar</Button>
                )}
              </Box>
            )}
          </Box>
          {editingId === ev.id ? (
            <Box sx={{ mt: 2 }}>
              <TextField fullWidth label="Motivo de consulta" value={editReason} onChange={(e) => setEditReason(e.target.value)} multiline minRows={1} margin="normal" size="small" />
              <TextField fullWidth label="Subjetivo" value={editSubjective} onChange={(e) => setEditSubjective(e.target.value)} multiline minRows={2} margin="normal" size="small" />
              <TextField fullWidth label="Objetivo" value={editObjective} onChange={(e) => setEditObjective(e.target.value)} multiline minRows={2} margin="normal" size="small" />
              <TextField fullWidth label="Análisis / Impresión diagnóstica" value={editAssessment} onChange={(e) => setEditAssessment(e.target.value)} multiline minRows={2} margin="normal" size="small" />
              <TextField fullWidth label="Plan" value={editPlan} onChange={(e) => setEditPlan(e.target.value)} multiline minRows={2} margin="normal" size="small" />
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Button size="small" variant="contained" onClick={saveEdit}>Guardar</Button>
                <Button size="small" variant="outlined" onClick={() => setEditingId(null)}>Cancelar</Button>
              </Box>
            </Box>
          ) : (
            FIELDS.map(({ key, label }) => (
              <Box key={key} sx={{ mt: 1 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  {label}
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {(ev as unknown as Record<string, string>)[key] ?? '—'}
                </Typography>
              </Box>
            ))
          )}
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
