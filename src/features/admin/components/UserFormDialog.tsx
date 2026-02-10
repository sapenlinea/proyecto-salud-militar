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
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import type { AdminUser } from '../types';

interface UserFormDialogProps {
  open: boolean;
  mode: 'create' | 'edit';
  user?: AdminUser;
  roles: { id: string; name: string }[];
  validationError?: string | null;
  onClose: () => void;
  onSubmit: (data: { username: string; email: string; displayName: string; roles: string[]; active?: boolean }) => void;
}

export default function UserFormDialog({
  open,
  mode,
  user,
  roles,
  validationError,
  onClose,
  onSubmit,
}: UserFormDialogProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && user) {
        setUsername(user.username);
        setEmail(user.email);
        setDisplayName(user.displayName);
        setSelectedRoles([...user.roles]);
        setActive(user.active);
      } else {
        setUsername('');
        setEmail('');
        setDisplayName('');
        setSelectedRoles([]);
        setActive(true);
      }
    }
  }, [open, mode, user]);

  function handleRoleToggle(roleName: string) {
    setSelectedRoles((prev) =>
      prev.includes(roleName) ? prev.filter((r) => r !== roleName) : [...prev, roleName]
    );
  }

  function handleSubmit() {
    onSubmit({
      username: username.trim(),
      email: email.trim(),
      displayName: displayName.trim(),
      roles: selectedRoles,
      ...(mode === 'edit' && { active }),
    });
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{mode === 'create' ? 'Nuevo usuario' : 'Editar usuario'}</DialogTitle>
      <DialogContent>
        {validationError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {validationError}
          </Alert>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
            disabled={mode === 'edit'}
            helperText={mode === 'edit' ? 'El usuario no puede modificarse' : undefined}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Nombre de pantalla"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            fullWidth
          />
          <Box>
            <Box sx={{ mb: 1, fontWeight: 500, fontSize: '0.875rem' }}>Roles</Box>
            <FormGroup>
              {roles.map((r) => (
                <FormControlLabel
                  key={r.id}
                  control={
                    <Checkbox
                      checked={selectedRoles.includes(r.name)}
                      onChange={() => handleRoleToggle(r.name)}
                    />
                  }
                  label={r.name}
                />
              ))}
            </FormGroup>
          </Box>
          {mode === 'edit' && (
            <FormControlLabel
              control={<Checkbox checked={active} onChange={(e) => setActive(e.target.checked)} />}
              label="Usuario activo"
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          {mode === 'create' ? 'Crear' : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
