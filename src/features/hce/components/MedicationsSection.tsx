import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { PrescribedMedication } from '../types.js';

interface MedicationsSectionProps {
  medications: PrescribedMedication[];
}

export default function MedicationsSection({ medications }: MedicationsSectionProps) {
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
          </TableRow>
        </TableHead>
        <TableBody>
          {medications.map((m) => (
            <TableRow key={m.id}>
              <TableCell>{m.name}</TableCell>
              <TableCell>{m.dosage}</TableCell>
              <TableCell>{m.frequency}</TableCell>
              <TableCell>{m.route}</TableCell>
              <TableCell>{m.duration}</TableCell>
              <TableCell>{m.date}</TableCell>
              <TableCell>{m.instructions ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {medications.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          No hay medicamentos formulados.
        </Typography>
      )}
    </Box>
  );
}
