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
import type { Medication } from '../types';

interface MedicationFormDialogProps {
  open: boolean;
  mode: 'create' | 'edit';
  medication?: Medication;
  validationError?: string | null;
  onClose: () => void;
  onSubmit: (data: Omit<Medication, 'id'>) => void;
}

export default function MedicationFormDialog({
  open,
  mode,
  medication,
  validationError,
  onClose,
  onSubmit,
}: MedicationFormDialogProps) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [genericName, setGenericName] = useState('');
  const [presentation, setPresentation] = useState('');
  const [unit, setUnit] = useState('');
  const [concentration, setConcentration] = useState('');
  const [pharmaceuticalForm, setPharmaceuticalForm] = useState('');
  const [therapeuticGroup, setTherapeuticGroup] = useState('');
  const [requiresPrescription, setRequiresPrescription] = useState(false);

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && medication) {
        setCode(medication.code);
        setName(medication.name);
        setGenericName(medication.genericName ?? '');
        setPresentation(medication.presentation);
        setUnit(medication.unit);
        setConcentration(medication.concentration ?? '');
        setPharmaceuticalForm(medication.pharmaceuticalForm);
        setTherapeuticGroup(medication.therapeuticGroup ?? '');
        setRequiresPrescription(medication.requiresPrescription);
      } else {
        setCode('');
        setName('');
        setGenericName('');
        setPresentation('');
        setUnit('tableta');
        setConcentration('');
        setPharmaceuticalForm('Tableta');
        setTherapeuticGroup('');
        setRequiresPrescription(false);
      }
    }
  }, [open, mode, medication]);

  function handleSubmit() {
    onSubmit({
      code: code.trim(),
      name: name.trim(),
      genericName: genericName.trim() || undefined,
      presentation: presentation.trim(),
      unit: unit.trim(),
      concentration: concentration.trim() || undefined,
      pharmaceuticalForm: pharmaceuticalForm.trim(),
      therapeuticGroup: therapeuticGroup.trim() || undefined,
      requiresPrescription,
    });
  }

  const valid = code.trim() && name.trim() && presentation.trim() && unit.trim() && pharmaceuticalForm.trim();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{mode === 'create' ? 'Nuevo medicamento' : 'Editar medicamento'}</DialogTitle>
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
            label="Nombre comercial"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Nombre genérico"
            value={genericName}
            onChange={(e) => setGenericName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Presentación"
            value={presentation}
            onChange={(e) => setPresentation(e.target.value)}
            required
            fullWidth
            placeholder="Ej: Tabletas 50 mg x 30"
          />
          <TextField
            label="Unidad"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
            fullWidth
            placeholder="tableta, frasco, etc."
          />
          <TextField
            label="Concentración"
            value={concentration}
            onChange={(e) => setConcentration(e.target.value)}
            fullWidth
            placeholder="Ej: 50 mg"
          />
          <TextField
            label="Forma farmacéutica"
            value={pharmaceuticalForm}
            onChange={(e) => setPharmaceuticalForm(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Grupo terapéutico"
            value={therapeuticGroup}
            onChange={(e) => setTherapeuticGroup(e.target.value)}
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={requiresPrescription}
                onChange={(e) => setRequiresPrescription(e.target.checked)}
              />
            }
            label="Requiere fórmula médica"
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
