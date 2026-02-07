import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Diagnosis, Cie10Item } from '../types.js';

interface DiagnosesSectionProps {
  diagnoses: Diagnosis[];
  cie10Options: Cie10Item[];
  onAdd?: (d: Omit<Diagnosis, 'id'>) => void;
  patientId?: string;
  readOnly?: boolean;
}

const TYPE_LABELS: Record<Diagnosis['type'], string> = {
  principal: 'Principal',
  relacionado: 'Relacionado',
  complicación: 'Complicación',
};

export default function DiagnosesSection({
  diagnoses,
  cie10Options,
  onAdd,
  patientId,
  readOnly = false,
}: DiagnosesSectionProps) {
  const [selectedCie, setSelectedCie] = useState<Cie10Item | null>(null);
  const [type, setType] = useState<Diagnosis['type']>('principal');
  const [notes, setNotes] = useState('');

  function handleAdd() {
    if (!onAdd || !patientId || !selectedCie) return;
    onAdd({
      patientId,
      cie10Code: selectedCie.code,
      cie10Description: selectedCie.description,
      type,
      date: new Date().toISOString().slice(0, 10),
      author: 'Usuario actual',
      notes: notes || undefined,
    });
    setSelectedCie(null);
    setNotes('');
  }

  return (
    <Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código CIE-10</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Notas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {diagnoses.map((d) => (
            <TableRow key={d.id}>
              <TableCell>
                <Chip label={d.cie10Code} size="small" variant="outlined" />
              </TableCell>
              <TableCell>{d.cie10Description}</TableCell>
              <TableCell>{TYPE_LABELS[d.type]}</TableCell>
              <TableCell>{d.date}</TableCell>
              <TableCell>{d.notes ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {!readOnly && onAdd && patientId && (
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-end' }}>
          <Autocomplete
            size="small"
            options={cie10Options}
            getOptionLabel={(opt) => `${opt.code} - ${opt.description}`}
            value={selectedCie}
            onChange={(_, v) => setSelectedCie(v)}
            sx={{ minWidth: 320 }}
            renderInput={(params) => <TextField {...params} label="Buscar CIE-10" />}
          />
          <TextField
            select
            size="small"
            label="Tipo"
            value={type}
            onChange={(e) => setType(e.target.value as Diagnosis['type'])}
            sx={{ minWidth: 140 }}
          >
            {(Object.keys(TYPE_LABELS) as Diagnosis['type'][]).map((t) => (
              <MenuItem key={t} value={t}>
                {TYPE_LABELS[t]}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            size="small"
            label="Notas"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ minWidth: 180 }}
          />
          <Button variant="contained" onClick={handleAdd} size="medium">
            Agregar diagnóstico
          </Button>
        </Box>
      )}

      {diagnoses.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          No hay diagnósticos registrados.
        </Typography>
      )}
    </Box>
  );
}
