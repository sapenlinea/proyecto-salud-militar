import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { FamilyMember, FamilyFile } from '../types';

interface FamilyNucleusProps {
  familyFile: FamilyFile;
}

export default function FamilyNucleus({ familyFile }: FamilyNucleusProps) {
  const members = familyFile.members;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CO', { dateStyle: 'medium' });

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">Hogar</Typography>
        <Typography variant="body1">{familyFile.householdId} - {familyFile.address}</Typography>
        <Typography variant="body2" color="text.secondary">{familyFile.city}</Typography>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Documento</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Parentesco</TableCell>
            <TableCell>Fecha nacimiento</TableCell>
            <TableCell>Género</TableCell>
            <TableCell>Estado de salud</TableCell>
            <TableCell>Jefe hogar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((m) => (
            <TableRow key={m.id}>
              <TableCell>{m.documentNumber}</TableCell>
              <TableCell>{m.fullName}</TableCell>
              <TableCell>{m.relationship}</TableCell>
              <TableCell>{formatDate(m.birthDate)}</TableCell>
              <TableCell>{m.gender}</TableCell>
              <TableCell>{m.healthStatus ?? '—'}</TableCell>
              <TableCell>
                {m.isHeadOfHousehold ? (
                  <Chip label="Sí" size="small" color="primary" variant="outlined" />
                ) : (
                  '—'
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {members.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay miembros registrados en el núcleo familiar.
        </Typography>
      )}
    </Box>
  );
}
