import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { ExternalEntity, RegulatoryReport } from '../types';

interface ExternalSubmissionProps {
  entities: ExternalEntity[];
  reports: RegulatoryReport[];
}

export default function ExternalSubmission({ entities, reports }: ExternalSubmissionProps) {
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [selectedEntity, setSelectedEntity] = useState<string>('');

  const sendableReports = reports.filter(
    (r) => r.status === 'validado' || r.status === 'borrador'
  );

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Envío de reportes a entes externos (Ministerio, ADRES, Invima, etc.). Solo reportes validados pueden enviarse.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel>Reporte</InputLabel>
          <Select
            label="Reporte"
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
          >
            <MenuItem value="">Seleccione reporte</MenuItem>
            {sendableReports.map((r) => (
              <MenuItem key={r.id} value={r.id}>
                {r.name} ({r.period})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel>Ente receptor</InputLabel>
          <Select
            label="Ente receptor"
            value={selectedEntity}
            onChange={(e) => setSelectedEntity(e.target.value)}
          >
            <MenuItem value="">Seleccione ente</MenuItem>
            {entities.map((e) => (
              <MenuItem key={e.id} value={e.id}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          disabled={!selectedReport || !selectedEntity}
        >
          Enviar reporte
        </Button>
      </Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Entes configurados
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ente</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Endpoint</TableCell>
            <TableCell>Contacto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entities.map((e) => (
            <TableRow key={e.id}>
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {e.name}
                </Typography>
              </TableCell>
              <TableCell>{e.type}</TableCell>
              <TableCell>{e.endpoint ?? '—'}</TableCell>
              <TableCell>{e.contactEmail ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {entities.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay entes externos configurados.
        </Typography>
      )}
    </Box>
  );
}
