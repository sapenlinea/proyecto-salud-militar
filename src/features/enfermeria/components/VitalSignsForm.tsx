import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { VitalSigns } from '../types.js';

interface VitalSignsFormProps {
  vitalSigns: VitalSigns[];
  patientId: string | null;
  onAdd?: (v: Omit<VitalSigns, 'id'>) => void;
}

export default function VitalSignsForm({ vitalSigns, patientId, onAdd }: VitalSignsFormProps) {
  const [temp, setTemp] = useState('');
  const [hr, setHr] = useState('');
  const [rr, setRr] = useState('');
  const [bps, setBps] = useState('');
  const [bpd, setBpd] = useState('');
  const [spo2, setSpo2] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [pain, setPain] = useState('');
  const [notes, setNotes] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!onAdd || !patientId) return;
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.toTimeString().slice(0, 5);
    const w = weight ? parseFloat(weight) : undefined;
    const h = height ? parseFloat(height) : undefined;
    let bmi: number | undefined;
    if (w && h && h > 0) {
      bmi = Math.round((w / (h * h)) * 10) / 10;
    }
    onAdd({
      patientId,
      date,
      time,
      temperature: temp ? parseFloat(temp) : undefined,
      heartRate: hr ? parseInt(hr, 10) : undefined,
      respiratoryRate: rr ? parseInt(rr, 10) : undefined,
      bloodPressureSystolic: bps ? parseInt(bps, 10) : undefined,
      bloodPressureDiastolic: bpd ? parseInt(bpd, 10) : undefined,
      oxygenSaturation: spo2 ? parseInt(spo2, 10) : undefined,
      weight: w,
      height: h,
      bmi,
      painLevel: pain ? parseInt(pain, 10) : undefined,
      notes: notes || undefined,
      recordedBy: 'Usuario actual',
    });
    setTemp('');
    setHr('');
    setRr('');
    setBps('');
    setBpd('');
    setSpo2('');
    setWeight('');
    setHeight('');
    setPain('');
    setNotes('');
  }

  return (
    <Box>
      <Table size="small" sx={{ mb: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Temp (°C)</TableCell>
            <TableCell>FC</TableCell>
            <TableCell>FR</TableCell>
            <TableCell>TA (mmHg)</TableCell>
            <TableCell>SpO₂</TableCell>
            <TableCell>Peso</TableCell>
            <TableCell>Dolor (0-10)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vitalSigns.map((v) => (
            <TableRow key={v.id}>
              <TableCell>{v.date}</TableCell>
              <TableCell>{v.time}</TableCell>
              <TableCell>{v.temperature ?? '—'}</TableCell>
              <TableCell>{v.heartRate ?? '—'}</TableCell>
              <TableCell>{v.respiratoryRate ?? '—'}</TableCell>
              <TableCell>
                {v.bloodPressureSystolic != null && v.bloodPressureDiastolic != null
                  ? `${v.bloodPressureSystolic}/${v.bloodPressureDiastolic}`
                  : '—'}
              </TableCell>
              <TableCell>{v.oxygenSaturation != null ? `${v.oxygenSaturation}%` : '—'}</TableCell>
              <TableCell>{v.weight ?? '—'}</TableCell>
              <TableCell>{v.painLevel ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {patientId && onAdd && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Registrar signos vitales
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <TextField size="small" label="Temp (°C)" type="number" value={temp} onChange={(e) => setTemp(e.target.value)} sx={{ width: 90 }} />
            <TextField size="small" label="FC" type="number" value={hr} onChange={(e) => setHr(e.target.value)} sx={{ width: 80 }} />
            <TextField size="small" label="FR" type="number" value={rr} onChange={(e) => setRr(e.target.value)} sx={{ width: 80 }} />
            <TextField size="small" label="TAS" type="number" value={bps} onChange={(e) => setBps(e.target.value)} sx={{ width: 80 }} placeholder="Sistólica" />
            <TextField size="small" label="TAD" type="number" value={bpd} onChange={(e) => setBpd(e.target.value)} sx={{ width: 80 }} placeholder="Diastólica" />
            <TextField size="small" label="SpO₂ (%)" type="number" value={spo2} onChange={(e) => setSpo2(e.target.value)} sx={{ width: 90 }} />
            <TextField size="small" label="Peso (kg)" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} sx={{ width: 100 }} />
            <TextField size="small" label="Talla (m)" type="number" value={height} onChange={(e) => setHeight(e.target.value)} sx={{ width: 90 }} />
            <TextField size="small" label="Dolor (0-10)" type="number" value={pain} onChange={(e) => setPain(e.target.value)} sx={{ width: 100 }} inputProps={{ min: 0, max: 10 }} />
            <TextField size="small" label="Notas" value={notes} onChange={(e) => setNotes(e.target.value)} sx={{ minWidth: 200, flex: 1 }} />
            <Button type="submit" variant="contained">
              Registrar
            </Button>
          </Box>
        </Paper>
      )}

      {vitalSigns.length === 0 && !patientId && (
        <Typography variant="body2" color="text.secondary">
          Seleccione un paciente para ver y registrar signos vitales.
        </Typography>
      )}
    </Box>
  );
}
