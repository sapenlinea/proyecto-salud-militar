import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MedicationFormDialog from './MedicationFormDialog';
import type { Medication } from '../types';

interface MedicationCrudProps {
  medications: Medication[];
  onMedicationCreate?: (data: Medication) => void;
  onMedicationUpdate?: (id: string, data: Partial<Medication>) => void;
  onMedicationDelete?: (id: string) => void;
}

function generateId(): string {
  return `med-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function MedicationCrud({
  medications,
  onMedicationCreate,
  onMedicationUpdate,
  onMedicationDelete,
}: MedicationCrudProps) {
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Medication | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const filtered = medications.filter(
    (m) =>
      !search ||
      m.code.toLowerCase().includes(search.toLowerCase()) ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      (m.genericName && m.genericName.toLowerCase().includes(search.toLowerCase()))
  );

  function handleOpenCreate() {
    setFormMode('create');
    setEditingMedication(null);
    setValidationError(null);
    setFormOpen(true);
  }

  function handleOpenEdit(med: Medication) {
    setFormMode('edit');
    setEditingMedication(med);
    setValidationError(null);
    setFormOpen(true);
  }

  function handleFormSubmit(data: Omit<Medication, 'id'>) {
    setValidationError(null);
    const existingCodes = medications.map((m) => m.code.toUpperCase());
    const codeUpper = data.code.trim().toUpperCase();
    if (existingCodes.includes(codeUpper) && (formMode !== 'edit' || editingMedication?.code.toUpperCase() !== codeUpper)) {
      setValidationError('Ya existe un medicamento con ese código.');
      return;
    }
    if (formMode === 'create') {
      onMedicationCreate?.({ ...data, id: generateId() });
      setFormOpen(false);
    } else if (editingMedication) {
      onMedicationUpdate?.(editingMedication.id, data);
      setFormOpen(false);
    }
  }

  function handleDeleteConfirm(med: Medication) {
    onMedicationDelete?.(med.id);
    setDeleteConfirm(null);
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar medicamento"
          placeholder="Código o nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 220 }}
        />
        <Button variant="contained" onClick={handleOpenCreate}>
          Nuevo medicamento
        </Button>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Presentación</TableCell>
            <TableCell>Unidad</TableCell>
            <TableCell>Grupo terapéutico</TableCell>
            <TableCell>Fórmula</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((m) => (
            <TableRow key={m.id}>
              <TableCell>{m.code}</TableCell>
              <TableCell>{m.name}</TableCell>
              <TableCell>{m.presentation}</TableCell>
              <TableCell>{m.unit}</TableCell>
              <TableCell>{m.therapeuticGroup ?? '—'}</TableCell>
              <TableCell>{m.requiresPrescription ? 'Sí' : 'No'}</TableCell>
              <TableCell align="right">
                <Button size="small" variant="outlined" onClick={() => handleOpenEdit(m)} sx={{ mr: 0.5 }}>
                  Editar
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => setDeleteConfirm(m)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay medicamentos registrados.
        </Typography>
      )}

      <MedicationFormDialog
        open={formOpen}
        mode={formMode}
        medication={editingMedication ?? undefined}
        validationError={validationError}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Eliminar el medicamento &quot;{deleteConfirm?.name}&quot; ({deleteConfirm?.code})? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={() => deleteConfirm && handleDeleteConfirm(deleteConfirm)}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
