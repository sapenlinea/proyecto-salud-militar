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
import type { FollowUp, Referral } from '../types.js';

interface PatientFollowUpProps {
  followUps: FollowUp[];
  referrals: Referral[];
}

export default function PatientFollowUp({ followUps, referrals }: PatientFollowUpProps) {
  const [referralFilter, setReferralFilter] = useState<string>('todos');

  const referralMap = useMemo(() => new Map(referrals.map((r) => [r.id, r])), [referrals]);

  const filtered = useMemo(
    () =>
      referralFilter === 'todos'
        ? followUps
        : followUps.filter((f) => f.referralId === referralFilter),
    [followUps, referralFilter]
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
            <TableCell>Fecha</TableCell>
            <TableCell>Referencia</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Notas</TableCell>
            <TableCell>Registrado por</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((f) => (
            <TableRow key={f.id}>
              <TableCell>{f.date}</TableCell>
              <TableCell>{f.referralCode ?? f.referralId}</TableCell>
              <TableCell>{f.patientName ?? referralMap.get(f.referralId)?.patientName ?? '—'}</TableCell>
              <TableCell sx={{ maxWidth: 300 }}>{f.notes}</TableCell>
              <TableCell>{f.performedBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay registros de seguimiento.
        </Typography>
      )}
    </Box>
  );
}
