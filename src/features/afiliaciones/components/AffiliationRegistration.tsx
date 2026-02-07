import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { EPS_OPTIONS } from '../data/mock';
import type { AffiliationRegistration, Affiliate } from '../types.js';

interface AffiliationRegistrationFormProps {
  onSubmit?: (data: AffiliationRegistration) => void;
}

const AFFILIATION_TYPES = [
  { value: 'contributivo', label: 'Contributivo' },
  { value: 'subsidiado', label: 'Subsidiado' },
  { value: 'especial', label: 'Especial' },
] as const;

const BENEFICIARY_CATEGORIES = [
  { value: 'titular', label: 'Titular' },
  { value: 'conyuge', label: 'Cónyuge' },
  { value: 'hijo', label: 'Hijo/a' },
  { value: 'padre', label: 'Padre/Madre' },
  { value: 'otro', label: 'Otro' },
] as const;

export default function AffiliationRegistrationForm({ onSubmit }: AffiliationRegistrationFormProps) {
  const [documentType, setDocumentType] = useState('CC');
  const [documentNumber, setDocumentNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [lastName, setLastName] = useState('');
  const [secondLastName, setSecondLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [eps, setEps] = useState('');
  const [epsCode, setEpsCode] = useState('');
  const [affiliationType, setAffiliationType] = useState<AffiliationRegistration['affiliationType']>('contributivo');
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().slice(0, 10));
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [department, setDepartment] = useState('');
  const [beneficiaryCategory, setBeneficiaryCategory] = useState<Affiliate['beneficiaryCategory']>('titular');

  function handleEpsChange(code: string) {
    const epsOption = EPS_OPTIONS.find((e) => e.code === code);
    setEpsCode(code);
    setEps(epsOption?.name ?? code);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data: AffiliationRegistration = {
      documentType,
      documentNumber: documentNumber.trim(),
      firstName: firstName.trim(),
      secondName: secondName.trim() || undefined,
      lastName: lastName.trim(),
      secondLastName: secondLastName.trim() || undefined,
      birthDate,
      gender,
      eps,
      epsCode,
      affiliationType,
      effectiveDate,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      address: address.trim() || undefined,
      city: city.trim() || undefined,
      department: department.trim() || undefined,
      beneficiaryCategory,
    };
    onSubmit?.(data);
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Registro de afiliación
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField select size="small" label="Tipo documento" value={documentType} onChange={(e) => setDocumentType(e.target.value)} sx={{ minWidth: 120 }}>
            <MenuItem value="CC">CC</MenuItem>
            <MenuItem value="TI">TI</MenuItem>
            <MenuItem value="CE">CE</MenuItem>
            <MenuItem value="PA">PA</MenuItem>
          </TextField>
          <TextField size="small" label="Número documento" value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value)} required sx={{ minWidth: 180 }} />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField size="small" label="Primer nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)} required sx={{ minWidth: 140 }} />
          <TextField size="small" label="Segundo nombre" value={secondName} onChange={(e) => setSecondName(e.target.value)} sx={{ minWidth: 140 }} />
          <TextField size="small" label="Primer apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} required sx={{ minWidth: 140 }} />
          <TextField size="small" label="Segundo apellido" value={secondLastName} onChange={(e) => setSecondLastName(e.target.value)} sx={{ minWidth: 140 }} />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField size="small" label="Fecha nacimiento" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required InputLabelProps={{ shrink: true }} sx={{ minWidth: 160 }} />
          <TextField size="small" label="Género" value={gender} onChange={(e) => setGender(e.target.value)} sx={{ minWidth: 120 }} />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField select size="small" label="EPS" value={epsCode} onChange={(e) => handleEpsChange(e.target.value)} required sx={{ minWidth: 200 }}>
            {EPS_OPTIONS.map((opt) => (
              <MenuItem key={opt.code} value={opt.code}>{opt.name}</MenuItem>
            ))}
          </TextField>
          <TextField select size="small" label="Tipo afiliación" value={affiliationType} onChange={(e) => setAffiliationType(e.target.value as AffiliationRegistration['affiliationType'])} sx={{ minWidth: 160 }}>
            {AFFILIATION_TYPES.map((t) => (
              <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
            ))}
          </TextField>
          <TextField size="small" label="Fecha vigencia" type="date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} required InputLabelProps={{ shrink: true }} sx={{ minWidth: 160 }} />
          <TextField select size="small" label="Categoría beneficiario" value={beneficiaryCategory} onChange={(e) => setBeneficiaryCategory(e.target.value as Affiliate['beneficiaryCategory'])} sx={{ minWidth: 180 }}>
            {BENEFICIARY_CATEGORIES.map((c) => (
              <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField size="small" label="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ minWidth: 140 }} />
          <TextField size="small" label="Correo" type="email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ minWidth: 220 }} />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField size="small" label="Dirección" value={address} onChange={(e) => setAddress(e.target.value)} sx={{ minWidth: 280, flex: 1 }} />
          <TextField size="small" label="Ciudad" value={city} onChange={(e) => setCity(e.target.value)} sx={{ minWidth: 140 }} />
          <TextField size="small" label="Departamento" value={department} onChange={(e) => setDepartment(e.target.value)} sx={{ minWidth: 160 }} />
        </Box>
        <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start' }}>
          Registrar afiliación
        </Button>
      </Box>
    </Paper>
  );
}
