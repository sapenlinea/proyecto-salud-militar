import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { KardexEntry, Medication } from '../types.js';

interface MedicationKardexProps {
  kardexEntries: KardexEntry[];
  medications: Medication[];
}

const TYPE_LABELS: Record<KardexEntry['type'], string> = {
  entrada: 'Entrada',
  salida: 'Salida',
  ajuste: 'Ajuste',
};

export default function MedicationKardex({ kardexEntries, medications }: MedicationKardexProps) {
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  const filtered = selectedMedication
    ? kardexEntries.filter((e) => e.medicationId === selectedMedication.id)
    : kardexEntries;

  const sorted = [...filtered].sort(
    (a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime()
  );

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Kardex por medicamento
        </Typography>
        <Autocomplete
          size="small"
          options={medications}
          getOptionLabel={(m) => `${m.code} - ${m.name}`}
          value={selectedMedication}
          onChange={(_, v) => setSelectedMedication(v)}
          sx={{ maxWidth: 400 }}
          renderInput={(params) => <TextField {...params} label="Buscar medicamento" />}
        />
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Lote</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Saldo</TableCell>
            <TableCell>Referencia / Paciente</TableCell>
            <TableCell>Autor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{e.date}</TableCell>
              <TableCell>{e.time}</TableCell>
              <TableCell>
                <Chip
                  label={TYPE_LABELS[e.type]}
                  size="small"
                  color={e.type === 'entrada' ? 'success' : e.type === 'salida' ? 'error' : 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{e.lotNumber ?? '—'}</TableCell>
              <TableCell sx={{ color: e.quantity >= 0 ? 'success.main' : 'error.main' }}>
                {e.quantity >= 0 ? '+' : ''}{e.quantity}
              </TableCell>
              <TableCell>{e.balance}</TableCell>
              <TableCell>{e.patientName ?? e.reference ?? '—'}</TableCell>
              <TableCell>{e.author ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {sorted.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay movimientos en el kardex.
        </Typography>
      )}
    </Box>
  );
}
