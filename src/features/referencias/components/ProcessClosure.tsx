import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Referral } from '../types.js';

interface ProcessClosureProps {
  referrals: Referral[];
  onClose?: (referralId: string, notes: string, outcome: string) => void;
}

const OPEN_STATUSES: string[] = ['pendiente', 'enviada', 'en_seguimiento'];

export default function ProcessClosure({ referrals, onClose }: ProcessClosureProps) {
  const [selectedId, setSelectedId] = useState<string>('');
  const [closureNotes, setClosureNotes] = useState('');
  const [closureOutcome, setClosureOutcome] = useState('Completado');

  const openReferrals = referrals.filter((r) => OPEN_STATUSES.includes(r.status));

  function handleClose() {
    if (!selectedId) return;
    onClose?.(selectedId, closureNotes, closureOutcome);
    setSelectedId('');
    setClosureNotes('');
    setClosureOutcome('Completado');
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Casos abiertos
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Seleccione un caso para cerrar el proceso de referencia.
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Seleccionar</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Paciente</TableCell>
              <TableCell>Especialidad</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {openReferrals.map((r) => (
              <TableRow key={r.id} onClick={() => setSelectedId(r.id)} sx={{ cursor: 'pointer', bgcolor: selectedId === r.id ? 'action.selected' : undefined }}>
                <TableCell>{selectedId === r.id ? '✓' : ''}</TableCell>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.patientName}</TableCell>
                <TableCell>{r.specialty}</TableCell>
                <TableCell>{r.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {openReferrals.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            No hay casos abiertos para cerrar.
          </Typography>
        )}
      </Paper>

      {selectedId && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Cierre del proceso
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Registrar cierre de la referencia {selectedId}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField select size="small" label="Resultado" value={closureOutcome} onChange={(e) => setClosureOutcome(e.target.value)} sx={{ maxWidth: 280 }}>
              <MenuItem value="Completado">Completado</MenuItem>
              <MenuItem value="Contrarreferencia recibida">Contrarreferencia recibida</MenuItem>
              <MenuItem value="Paciente no asistió">Paciente no asistió</MenuItem>
              <MenuItem value="Cancelado">Cancelado</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </TextField>
            <TextField size="small" label="Notas de cierre" value={closureNotes} onChange={(e) => setClosureNotes(e.target.value)} multiline minRows={3} fullWidth placeholder="Descripción del resultado del proceso..." />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={handleClose}>
                Cerrar proceso
              </Button>
              <Button variant="outlined" onClick={() => { setSelectedId(''); setClosureNotes(''); }}>
                Cancelar
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
