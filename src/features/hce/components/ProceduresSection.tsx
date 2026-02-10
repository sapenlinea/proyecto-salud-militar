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
import type { Procedure } from '../types.js';

interface ProceduresSectionProps {
  procedures: Procedure[];
  onAdd?: (p: Omit<Procedure, 'id' | 'patientId'>) => void;
  onUpdate?: (id: string, updates: Partial<Procedure>) => void;
  onDelete?: (id: string) => void;
}

export default function ProceduresSection({
  procedures,
  onAdd,
  onUpdate,
  onDelete,
}: ProceduresSectionProps) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [author, setAuthor] = useState('');
  const [notes, setNotes] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCode, setEditCode] = useState('');
  const [editName, setEditName] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editNotes, setEditNotes] = useState('');

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!onAdd) return;
    onAdd({ code: code.trim(), name: name.trim(), date: date.trim(), author: author.trim() || undefined, notes: notes.trim() || undefined });
    setCode('');
    setName('');
    setDate(new Date().toISOString().slice(0, 10));
    setAuthor('');
    setNotes('');
  }

  function startEdit(p: Procedure) {
    setEditingId(p.id);
    setEditCode(p.code);
    setEditName(p.name);
    setEditDate(p.date);
    setEditAuthor(p.author ?? '');
    setEditNotes(p.notes ?? '');
  }

  function saveEdit() {
    if (!editingId || !onUpdate) return;
    onUpdate(editingId, { code: editCode.trim(), name: editName.trim(), date: editDate.trim(), author: editAuthor.trim() || undefined, notes: editNotes.trim() || undefined });
    setEditingId(null);
  }

  return (
    <Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Profesional</TableCell>
            <TableCell>Notas</TableCell>
            {(onAdd || onUpdate || onDelete) && <TableCell align="right">Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {procedures.map((p) => (
            <TableRow key={p.id}>
              {editingId === p.id ? (
                <>
                  <TableCell><TextField size="small" value={editCode} onChange={(e) => setEditCode(e.target.value)} placeholder="Código" sx={{ width: 90 }} /></TableCell>
                  <TableCell><TextField size="small" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Nombre" fullWidth /></TableCell>
                  <TableCell><TextField size="small" type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} InputLabelProps={{ shrink: true }} /></TableCell>
                  <TableCell><TextField size="small" value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)} placeholder="Profesional" /></TableCell>
                  <TableCell><TextField size="small" value={editNotes} onChange={(e) => setEditNotes(e.target.value)} placeholder="Notas" /></TableCell>
                  {(onAdd || onUpdate || onDelete) && (
                    <TableCell align="right">
                      <Button size="small" variant="contained" onClick={saveEdit}>Guardar</Button>
                      <Button size="small" variant="outlined" onClick={() => setEditingId(null)} sx={{ ml: 0.5 }}>Cancelar</Button>
                    </TableCell>
                  )}
                </>
              ) : (
                <>
                  <TableCell>{p.code}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.date}</TableCell>
                  <TableCell>{p.author ?? '—'}</TableCell>
                  <TableCell>{p.notes ?? '—'}</TableCell>
                  {(onAdd || onUpdate || onDelete) && (
                    <TableCell align="right">
                      {onUpdate && <Button size="small" variant="outlined" onClick={() => startEdit(p)}>Editar</Button>}
                      {onDelete && <Button size="small" variant="outlined" color="error" onClick={() => onDelete(p.id)} sx={{ ml: 0.5 }}>Eliminar</Button>}
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
          <TextField size="small" label="Código" value={code} onChange={(e) => setCode(e.target.value)} required sx={{ minWidth: 90 }} />
          <TextField size="small" label="Nombre" value={name} onChange={(e) => setName(e.target.value)} required sx={{ minWidth: 200 }} />
          <TextField size="small" label="Fecha" type="date" value={date} onChange={(e) => setDate(e.target.value)} InputLabelProps={{ shrink: true }} />
          <TextField size="small" label="Profesional" value={author} onChange={(e) => setAuthor(e.target.value)} sx={{ minWidth: 140 }} />
          <TextField size="small" label="Notas" value={notes} onChange={(e) => setNotes(e.target.value)} sx={{ minWidth: 160 }} />
          <Button type="submit" variant="contained">Agregar procedimiento</Button>
        </Box>
      )}
      {procedures.length === 0 && !onAdd && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          No hay procedimientos registrados.
        </Typography>
      )}
    </Box>
  );
}
