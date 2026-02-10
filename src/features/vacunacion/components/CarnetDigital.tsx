import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { CarnetVacunacion } from '../types';

interface CarnetDigitalProps {
  carnets: CarnetVacunacion[];
}

export default function CarnetDigital({ carnets }: CarnetDigitalProps) {
  const [search, setSearch] = useState('');

  const filtered = carnets.filter(
    (c) =>
      !search ||
      c.patientName.toLowerCase().includes(search.toLowerCase()) ||
      c.patientDocument.includes(search)
  );

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Carnet digital de vacunación por paciente. Historial de dosis aplicadas.
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          size="small"
          label="Buscar"
          placeholder="Paciente o documento"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 260 }}
        />
      </Box>
      {filtered.map((c) => (
        <Accordion key={c.id} variant="outlined" sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<Typography sx={{ fontSize: 18 }}>▼</Typography>}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Typography variant="subtitle2">
                {c.patientName} — {c.patientDocument}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Nacimiento: {c.birthDate} · Última actualización: {c.lastUpdate} · {c.vaccines.length} dosis
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Vacuna</TableCell>
                  <TableCell align="center">Dosis</TableCell>
                  <TableCell>Fecha aplicación</TableCell>
                  <TableCell>Lote</TableCell>
                  <TableCell>Institución</TableCell>
                  <TableCell>Aplicó</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {c.vaccines.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell>{v.vaccineName}</TableCell>
                    <TableCell align="center">{v.doseNumber}</TableCell>
                    <TableCell>{v.applicationDate}</TableCell>
                    <TableCell>{v.lot}</TableCell>
                    <TableCell>{v.institution}</TableCell>
                    <TableCell>{v.appliedBy ?? '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      ))}
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay carnets de vacunación.
        </Typography>
      )}
    </Box>
  );
}
