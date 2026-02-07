import { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import type { NursingNote } from '../types.js';

interface NursingNotesSectionProps {
  notes: NursingNote[];
  patientId: string | null;
  onAdd?: (n: Omit<NursingNote, 'id'>) => void;
}

const NOTE_TYPES: { value: NursingNote['type']; label: string }[] = [
  { value: 'general', label: 'General' },
  { value: 'evolutiva', label: 'Evolutiva' },
  { value: 'quirúrgica', label: 'Quirúrgica' },
  { value: 'alta', label: 'De alta' },
  { value: 'incidente', label: 'Incidente' },
];

export default function NursingNotesSection({ notes, patientId, onAdd }: NursingNotesSectionProps) {
  const [type, setType] = useState<NursingNote['type']>('general');
  const [content, setContent] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!onAdd || !patientId || !content.trim()) return;
    const now = new Date();
    onAdd({
      patientId,
      date: now.toISOString().slice(0, 10),
      time: now.toTimeString().slice(0, 5),
      type,
      content: content.trim(),
      author: 'Usuario actual',
    });
    setContent('');
  }

  return (
    <Box>
      {notes.map((n) => (
        <Paper key={n.id} variant="outlined" sx={{ p: 2, mb: 1.5 }}>
          <Typography variant="caption" color="text.secondary">
            {n.date} {n.time} · {NOTE_TYPES.find((t) => t.value === n.type)?.label ?? n.type} · {n.author}
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
            {n.content}
          </Typography>
        </Paper>
      ))}

      {patientId && onAdd && (
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Nueva nota de enfermería
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              select
              size="small"
              label="Tipo"
              value={type}
              onChange={(e) => setType(e.target.value as NursingNote['type'])}
              sx={{ minWidth: 180, mr: 2, mb: 2 }}
            >
              {NOTE_TYPES.map((t) => (
                <MenuItem key={t.value} value={t.value}>
                  {t.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Contenido"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              margin="normal"
              size="small"
            />
            <Button type="submit" variant="contained" sx={{ mt: 1 }}>
              Guardar nota
            </Button>
          </Box>
        </Paper>
      )}

      {notes.length === 0 && !patientId && (
        <Typography variant="body2" color="text.secondary">
          Seleccione un paciente para ver y registrar notas.
        </Typography>
      )}
    </Box>
  );
}
