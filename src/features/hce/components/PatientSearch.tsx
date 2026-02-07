import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import type { Patient } from '../types.js';

interface PatientSearchProps {
  onSelectPatient: (patient: Patient | null) => void;
  patients: Patient[];
}

const EPS_OPTIONS = ['Todas', 'Sanitas', 'Sura', 'Nueva EPS', 'Salud Total', 'Famisanar'];

export default function PatientSearch({ onSelectPatient, patients }: PatientSearchProps) {
  const [document, setDocument] = useState('');
  const [name, setName] = useState('');
  const [eps, setEps] = useState('Todas');

  function handleSearch() {
    const doc = document.trim();
    const nameLower = name.trim().toLowerCase();
    const filtered = patients.filter((p) => {
      const matchDoc = !doc || p.documentNumber.includes(doc);
      const fullName = `${p.firstName} ${p.secondName ?? ''} ${p.lastName} ${p.secondLastName ?? ''}`.trim().toLowerCase();
      const matchName = !nameLower || fullName.includes(nameLower);
      const matchEps = eps === 'Todas' || p.eps === eps;
      return matchDoc && matchName && matchEps;
    });
    onSelectPatient(filtered[0] ?? null);
  }

  function handleClear() {
    setDocument('');
    setName('');
    setEps('Todas');
    onSelectPatient(null);
  }

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-start', mb: 2 }}
    >
      <TextField
        size="small"
        label="Documento"
        placeholder="Número de documento"
        value={document}
        onChange={(e) => setDocument(e.target.value)}
        sx={{ minWidth: 180 }}
      />
      <TextField
        size="small"
        label="Nombre del paciente"
        placeholder="Nombre o apellido"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ minWidth: 220 }}
      />
      <TextField
        select
        size="small"
        label="EPS"
        value={eps}
        onChange={(e) => setEps(e.target.value)}
        sx={{ minWidth: 160 }}
      >
        {EPS_OPTIONS.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained">
        Buscar
      </Button>
      <Button type="button" variant="outlined" onClick={handleClear}>
        Limpiar
      </Button>
    </Box>
  );
}
