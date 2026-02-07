import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { AttachedDocument, Referral } from '../types.js';

interface AttachedDocumentsProps {
  documents: AttachedDocument[];
  referrals: Referral[];
}

function formatSize(bytes?: number): string {
  if (bytes == null) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AttachedDocuments({ documents, referrals }: AttachedDocumentsProps) {
  const [referralFilter, setReferralFilter] = useState<string>('todos');

  const referralMap = useMemo(() => new Map(referrals.map((r) => [r.id, r])), [referrals]);

  const filtered = useMemo(
    () =>
      referralFilter === 'todos'
        ? documents
        : documents.filter((d) => d.referralId === referralFilter),
    [documents, referralFilter]
  );

  const referralOptions = useMemo(
    () => referrals.map((r) => ({ id: r.id, label: `${r.id} - ${r.patientName} (${r.specialty})` })),
    [referrals]
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField select size="small" label="Referencia" value={referralFilter} onChange={(e) => setReferralFilter(e.target.value)} sx={{ minWidth: 280 }}>
          <MenuItem value="todos">Todas</MenuItem>
          {referralOptions.map((opt) => (
            <MenuItem key={opt.id} value={opt.id}>{opt.label}</MenuItem>
          ))}
        </TextField>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Referencia</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Tamaño</TableCell>
            <TableCell>Fecha carga</TableCell>
            <TableCell>Cargado por</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((d) => (
            <TableRow key={d.id}>
              <TableCell>{d.name}</TableCell>
              <TableCell>{d.referralId}</TableCell>
              <TableCell>{referralMap.get(d.referralId)?.patientName ?? '—'}</TableCell>
              <TableCell>{d.type}</TableCell>
              <TableCell>{formatSize(d.size)}</TableCell>
              <TableCell>{d.uploadedAt.slice(0, 10)}</TableCell>
              <TableCell>{d.uploadedBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay documentos adjuntos.
        </Typography>
      )}
    </Box>
  );
}
