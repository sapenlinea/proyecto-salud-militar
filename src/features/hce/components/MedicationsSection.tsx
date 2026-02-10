import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { PrescribedMedication } from '../types.js';

interface MedicationsSectionProps {
  medications: PrescribedMedication[];
  onAdd?: (m: Omit<PrescribedMedication, 'id' | 'patientId'>) => void;
  onUpdate?: (id: string, updates: Partial<PrescribedMedication>) => void;
  onDelete?: (id: string) => void;
}

export default function MedicationsSection({
  medications,
  onAdd,
  onUpdate,
  onDelete,
}: MedicationsSectionProps) {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [route, setRoute] = useState('Oral');
  const [duration, setDuration] = useState('');
  const [instructions, setInstructions] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDosage, setEditDosage] = useState('');
  const [editFrequency, setEditFrequency] = useState('');
  const [editRoute, setEditRoute] = useState('');
  const [editDuration, setEditDuration] = useState('');
  const [editInstructions, setEditInstructions] = useState('');

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!onAdd) return;
    onAdd({
      name: name.trim(),
      dosage: dosage.trim(),
      frequency: frequency.trim(),
      route: route.trim(),
      duration: duration.trim(),
      date: new Date().toISOString().slice(0, 10),
      author: 'Usuario actual',
      instructions: instructions.trim() || undefined,
    });
    setName('');
    setDosage('');
    setFrequency('');
    setRoute('Oral');
    setDuration('');
    setInstructions('');
  }

  function startEdit(m: PrescribedMedication) {
    setEditingId(m.id);
    setEditName(m.name);
    setEditDosage(m.dosage);
    setEditFrequency(m.frequency);
    setEditRoute(m.route);
    setEditDuration(m.duration);
    setEditInstructions(m.instructions ?? '');
  }

  function saveEdit() {
    if (!editingId || !onUpdate) return;
    onUpdate(editingId, {
      name: editName.trim(),
      dosage: editDosage.trim(),
      frequency: editFrequency.trim(),
      route: editRoute.trim(),
      duration: editDuration.trim(),
      instructions: editInstructions.trim() || undefined,
    });
    setEditingId(null);
  }

  return (
    <Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Medicamento</TableCell>
            <TableCell>Dosis</TableCell>
            <TableCell>Frecuencia</TableCell>
            <TableCell>Vía</TableCell>
            <TableCell>Duración</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Indicaciones</TableCell>
            {(onAdd || onUpdate || onDelete) && <TableCell align="right">Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {medications.map((m) => (
            <TableRow key={m.id}>
              {editingId === m.id ? (
                <>
                  <TableCell><TextField size="small" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Medicamento" fullWidth /></TableCell>
                  <TableCell><TextField size="small" value={editDosage} onChange={(e) => setEditDosage(e.target.value)} placeholder="Dosis" /></TableCell>
                  <TableCell><TextField size="small" value={editFrequency} onChange={(e) => setEditFrequency(e.target.value)} placeholder="Frecuencia" /></TableCell>
                  <TableCell><TextField size="small" value={editRoute} onChange={(e) => setEditRoute(e.target.value)} placeholder="Vía" /></TableCell>
                  <TableCell><TextField size="small" value={editDuration} onChange={(e) => setEditDuration(e.target.value)} placeholder="Duración" /></TableCell>
                  <TableCell>{m.date}</TableCell>
                  <TableCell><TextField size="small" value={editInstructions} onChange={(e) => setEditInstructions(e.target.value)} placeholder="Indicaciones" /></TableCell>
                  {(onAdd || onUpdate || onDelete) && (
                    <TableCell align="right">
                      <Button size="small" variant="contained" onClick={saveEdit}>Guardar</Button>
                      <Button size="small" variant="outlined" onClick={() => setEditingId(null)} sx={{ ml: 0.5 }}>Cancelar</Button>
                    </TableCell>
                  )}
                </>
              ) : (
                <>
                  <TableCell>{m.name}</TableCell>
                  <TableCell>{m.dosage}</TableCell>
                  <TableCell>{m.frequency}</TableCell>
                  <TableCell>{m.route}</TableCell>
                  <TableCell>{m.duration}</TableCell>
                  <TableCell>{m.date}</TableCell>
                  <TableCell>{m.instructions ?? '—'}</TableCell>
                  {(onAdd || onUpdate || onDelete) && (
                    <TableCell align="right">
                      {onUpdate && <Button size="small" variant="outlined" onClick={() => startEdit(m)}>Editar</Button>}
                      {onDelete && <Button size="small" variant="outlined" color="error" onClick={() => onDelete(m.id)} sx={{ ml: 0.5 }}>Eliminar</Button>}
                    </TableCell>
                  )}
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {onAdd && (
        <Box component="form" onSubmit={handleAdd} sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-end' }}>
          <TextField size="small" label="Medicamento" value={name} onChange={(e) => setName(e.target.value)} required sx={{ minWidth: 160 }} />
          <TextField size="small" label="Dosis" value={dosage} onChange={(e) => setDosage(e.target.value)} required sx={{ minWidth: 100 }} />
          <TextField size="small" label="Frecuencia" value={frequency} onChange={(e) => setFrequency(e.target.value)} required sx={{ minWidth: 120 }} />
          <TextField size="small" label="Vía" value={route} onChange={(e) => setRoute(e.target.value)} sx={{ minWidth: 80 }} />
          <TextField size="small" label="Duración" value={duration} onChange={(e) => setDuration(e.target.value)} required sx={{ minWidth: 100 }} />
          <TextField size="small" label="Indicaciones" value={instructions} onChange={(e) => setInstructions(e.target.value)} sx={{ minWidth: 140 }} />
          <Button type="submit" variant="contained">Agregar medicamento</Button>
        </Box>
      )}
      {medications.length === 0 && !onAdd && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          No hay medicamentos formulados.
        </Typography>
      )}
    </Box>
  );
}
