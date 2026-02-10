import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import type { Patient } from '../types';

interface PatientFormDialogProps {
  open: boolean;
  mode: 'create' | 'edit';
  patient?: Patient;
  validationError?: string | null;
  onClose: () => void;
  onSubmit: (data: Omit<Patient, 'id' | 'createdAt'>) => void;
}

const DOC_TYPES = ['CC', 'CE', 'TI', 'RC', 'PA'];
const GENDERS = ['Masculino', 'Femenino', 'Otro'];
const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const EPS_OPTIONS = ['Sanitas', 'Sura', 'Nueva EPS', 'Salud Total', 'Famisanar', 'Comfenalco'];
const AFFILIATION_TYPES = ['Contributivo', 'Subsidiado', 'Especial'];

export default function PatientFormDialog({
  open,
  mode,
  patient,
  validationError,
  onClose,
  onSubmit,
}: PatientFormDialogProps) {
  const [documentType, setDocumentType] = useState('CC');
  const [documentNumber, setDocumentNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [lastName, setLastName] = useState('');
  const [secondLastName, setSecondLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('Masculino');
  const [bloodType, setBloodType] = useState('');
  const [eps, setEps] = useState('Sanitas');
  const [epsCode, setEpsCode] = useState('');
  const [affiliationType, setAffiliationType] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    if (open && patient) {
      setDocumentType(patient.documentType);
      setDocumentNumber(patient.documentNumber);
      setFirstName(patient.firstName);
      setSecondName(patient.secondName ?? '');
      setLastName(patient.lastName);
      setSecondLastName(patient.secondLastName ?? '');
      setBirthDate(patient.birthDate);
      setGender(patient.gender);
      setBloodType(patient.bloodType ?? '');
      setEps(patient.eps);
      setEpsCode(patient.epsCode ?? '');
      setAffiliationType(patient.affiliationType ?? '');
      setPhone(patient.phone ?? '');
      setEmail(patient.email ?? '');
      setAddress(patient.address ?? '');
      setCity(patient.city ?? '');
      setDepartment(patient.department ?? '');
    } else if (open && mode === 'create') {
      setDocumentType('CC');
      setDocumentNumber('');
      setFirstName('');
      setSecondName('');
      setLastName('');
      setSecondLastName('');
      setBirthDate('');
      setGender('Masculino');
      setBloodType('');
      setEps('Sanitas');
      setEpsCode('');
      setAffiliationType('');
      setPhone('');
      setEmail('');
      setAddress('');
      setCity('');
      setDepartment('');
    }
  }, [open, mode, patient]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      documentType,
      documentNumber: documentNumber.trim(),
      firstName: firstName.trim(),
      secondName: secondName.trim() || undefined,
      lastName: lastName.trim(),
      secondLastName: secondLastName.trim() || undefined,
      birthDate: birthDate.trim(),
      gender,
      bloodType: bloodType.trim() || undefined,
      eps,
      epsCode: epsCode.trim() || undefined,
      affiliationType: affiliationType.trim() || undefined,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      address: address.trim() || undefined,
      city: city.trim() || undefined,
      department: department.trim() || undefined,
    });
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{mode === 'create' ? 'Nueva ficha de paciente' : 'Editar ficha de paciente'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {validationError && (
            <TextField
              fullWidth
              error
              helperText={validationError}
              variant="outlined"
              size="small"
              sx={{ mb: 0 }}
            />
          )}
          <TextField
            select
            size="small"
            label="Tipo documento"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            fullWidth
          >
            {DOC_TYPES.map((t) => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </TextField>
          <TextField
            size="small"
            label="Número documento"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            required
            fullWidth
            disabled={mode === 'edit'}
          />
          <TextField size="small" label="Primer nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)} required fullWidth />
          <TextField size="small" label="Segundo nombre" value={secondName} onChange={(e) => setSecondName(e.target.value)} fullWidth />
          <TextField size="small" label="Primer apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} required fullWidth />
          <TextField size="small" label="Segundo apellido" value={secondLastName} onChange={(e) => setSecondLastName(e.target.value)} fullWidth />
          <TextField size="small" label="Fecha nacimiento" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required fullWidth InputLabelProps={{ shrink: true }} />
          <TextField select size="small" label="Género" value={gender} onChange={(e) => setGender(e.target.value)} fullWidth>
            {GENDERS.map((g) => (
              <MenuItem key={g} value={g}>{g}</MenuItem>
            ))}
          </TextField>
          <TextField select size="small" label="Grupo sanguíneo" value={bloodType} onChange={(e) => setBloodType(e.target.value)} fullWidth>
            <MenuItem value="">—</MenuItem>
            {BLOOD_TYPES.map((b) => (
              <MenuItem key={b} value={b}>{b}</MenuItem>
            ))}
          </TextField>
          <TextField select size="small" label="EPS" value={eps} onChange={(e) => setEps(e.target.value)} fullWidth>
            {EPS_OPTIONS.map((e) => (
              <MenuItem key={e} value={e}>{e}</MenuItem>
            ))}
          </TextField>
          <TextField size="small" label="Código EPS" value={epsCode} onChange={(e) => setEpsCode(e.target.value)} fullWidth />
          <TextField select size="small" label="Tipo afiliación" value={affiliationType} onChange={(e) => setAffiliationType(e.target.value)} fullWidth>
            <MenuItem value="">—</MenuItem>
            {AFFILIATION_TYPES.map((a) => (
              <MenuItem key={a} value={a}>{a}</MenuItem>
            ))}
          </TextField>
          <TextField size="small" label="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
          <TextField size="small" label="Correo" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
          <TextField size="small" label="Dirección" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth />
          <TextField size="small" label="Ciudad" value={city} onChange={(e) => setCity(e.target.value)} fullWidth />
          <TextField size="small" label="Departamento" value={department} onChange={(e) => setDepartment(e.target.value)} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            {mode === 'create' ? 'Crear' : 'Guardar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
