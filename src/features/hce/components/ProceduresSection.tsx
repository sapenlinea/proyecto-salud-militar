import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { Procedure } from '../types.js';

interface ProceduresSectionProps {
  procedures: Procedure[];
}

export default function ProceduresSection({ procedures }: ProceduresSectionProps) {
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
          </TableRow>
        </TableHead>
        <TableBody>
          {procedures.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.code}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.date}</TableCell>
              <TableCell>{p.author ?? '—'}</TableCell>
              <TableCell>{p.notes ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {procedures.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          No hay procedimientos registrados.
        </Typography>
      )}
    </Box>
  );
}
