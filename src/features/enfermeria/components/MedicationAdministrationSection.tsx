import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { MedicationAdministration } from '../types.js';

interface MedicationAdministrationSectionProps {
  administrations: MedicationAdministration[];
  patientId: string | null;
  onAdminister?: (id: string) => void;
}

const STATUS_COLORS: Record<MedicationAdministration['status'], 'default' | 'success' | 'error' | 'warning'> = {
  pendiente: 'default',
  administrado: 'success',
  omitido: 'error',
  retrasado: 'warning',
};

export default function MedicationAdministrationSection({
  administrations,
  patientId,
  onAdminister,
}: MedicationAdministrationSectionProps) {
  const [filter, setFilter] = useState<'todos' | 'pendientes'>('pendientes');

  const filtered =
    filter === 'pendientes'
      ? administrations.filter((a) => a.status === 'pendiente')
      : administrations;

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
        {(['pendientes', 'todos'] as const).map((f) => (
          <Chip
            key={f}
            label={f === 'pendientes' ? 'Pendientes' : 'Todos'}
            size="small"
            color={filter === f ? 'primary' : 'default'}
            variant={filter === f ? 'filled' : 'outlined'}
            onClick={() => setFilter(f)}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Medicamento</TableCell>
            <TableCell>Dosis</TableCell>
            <TableCell>Vía</TableCell>
            <TableCell>Hora programada</TableCell>
            <TableCell>Hora administración</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.medicationName}</TableCell>
              <TableCell>{a.dosage}</TableCell>
              <TableCell>{a.route}</TableCell>
              <TableCell>{a.scheduledTime}</TableCell>
              <TableCell>{a.administeredTime ?? '—'}</TableCell>
              <TableCell>
                <Chip label={a.status} size="small" color={STATUS_COLORS[a.status]} variant="outlined" />
              </TableCell>
              <TableCell>
                {a.status === 'pendiente' && onAdminister && patientId && (
                  <Button size="small" variant="outlined" onClick={() => onAdminister(a.id)}>
                    Administrar
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          No hay medicamentos {filter === 'pendientes' ? 'pendientes' : 'registrados'}.
        </Typography>
      )}
    </Box>
  );
}
