import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import type { Supplier } from '../types';

interface SupplierFormDialogProps {
  open: boolean;
  mode: 'create' | 'edit';
  supplier?: Supplier;
  validationError?: string | null;
  onClose: () => void;
  onSubmit: (data: Omit<Supplier, 'id'>) => void;
}

export default function SupplierFormDialog({
  open,
  mode,
  supplier,
  validationError,
  onClose,
  onSubmit,
}: SupplierFormDialogProps) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [nit, setNit] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && supplier) {
        setCode(supplier.code);
        setName(supplier.name);
        setNit(supplier.nit ?? '');
        setPhone(supplier.phone ?? '');
        setEmail(supplier.email ?? '');
        setAddress(supplier.address ?? '');
        setCity(supplier.city ?? '');
        setContactPerson(supplier.contactPerson ?? '');
        setIsActive(supplier.isActive);
      } else {
        setCode('');
        setName('');
        setNit('');
        setPhone('');
        setEmail('');
        setAddress('');
        setCity('');
        setContactPerson('');
        setIsActive(true);
      }
    }
  }, [open, mode, supplier]);

  function handleSubmit() {
    onSubmit({
      code: code.trim(),
      name: name.trim(),
      nit: nit.trim() || undefined,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      address: address.trim() || undefined,
      city: city.trim() || undefined,
      contactPerson: contactPerson.trim() || undefined,
      isActive,
    });
  }

  const valid = code.trim() && name.trim();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{mode === 'create' ? 'Nuevo proveedor' : 'Editar proveedor'}</DialogTitle>
      <DialogContent>
        {validationError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {validationError}
          </Alert>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label="Código"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            fullWidth
            disabled={mode === 'edit'}
            helperText={mode === 'edit' ? 'El código no puede modificarse' : undefined}
          />
          <TextField
            label="Nombre o razón social"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="NIT"
            value={nit}
            onChange={(e) => setNit(e.target.value)}
            fullWidth
            placeholder="900123456-1"
          />
          <TextField
            label="Persona de contacto"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            fullWidth
          />
          <TextField
            label="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            multiline
          />
          <TextField
            label="Ciudad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
          />
          <FormControlLabel
            control={<Checkbox checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />}
            label="Activo"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!valid}>
          {mode === 'create' ? 'Crear' : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
