import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
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
import SupplierFormDialog from './SupplierFormDialog';
import type { Supplier } from '../types';

interface SupplierCrudProps {
  suppliers: Supplier[];
  onSupplierCreate?: (data: Supplier) => void;
  onSupplierUpdate?: (id: string, data: Partial<Supplier>) => void;
  onSupplierDelete?: (id: string) => void;
}

function generateId(): string {
  return `sup-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function SupplierCrud({
  suppliers,
  onSupplierCreate,
  onSupplierUpdate,
  onSupplierDelete,
}: SupplierCrudProps) {
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Supplier | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const filtered = suppliers.filter(
    (s) =>
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      (s.nit && s.nit.includes(search)) ||
      (s.contactPerson && s.contactPerson.toLowerCase().includes(search.toLowerCase()))
  );

  function handleOpenCreate() {
    setFormMode('create');
    setEditingSupplier(null);
    setValidationError(null);
    setFormOpen(true);
  }

  function handleOpenEdit(sup: Supplier) {
    setFormMode('edit');
    setEditingSupplier(sup);
    setValidationError(null);
    setFormOpen(true);
  }

  function handleFormSubmit(data: Omit<Supplier, 'id'>) {
    setValidationError(null);
    const existingCodes = suppliers.map((s) => s.code.toUpperCase());
    const codeUpper = data.code.trim().toUpperCase();
    if (existingCodes.includes(codeUpper) && (formMode !== 'edit' || editingSupplier?.code.toUpperCase() !== codeUpper)) {
      setValidationError('Ya existe un proveedor con ese código.');
      return;
    }
    if (formMode === 'create') {
      onSupplierCreate?.({ ...data, id: generateId() });
      setFormOpen(false);
    } else if (editingSupplier) {
      onSupplierUpdate?.(editingSupplier.id, data);
      setFormOpen(false);
    }
  }

  function handleDeleteConfirm(sup: Supplier) {
    onSupplierDelete?.(sup.id);
    setDeleteConfirm(null);
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar proveedor"
          placeholder="Código, nombre, NIT o contacto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 280 }}
        />
        <Button variant="contained" onClick={handleOpenCreate}>
          Nuevo proveedor
        </Button>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>NIT</TableCell>
            <TableCell>Contacto</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Ciudad</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.code}</TableCell>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.nit ?? '—'}</TableCell>
              <TableCell>{s.contactPerson ?? '—'}</TableCell>
              <TableCell>{s.phone ?? '—'}</TableCell>
              <TableCell>{s.city ?? '—'}</TableCell>
              <TableCell>
                <Chip
                  label={s.isActive ? 'Activo' : 'Inactivo'}
                  size="small"
                  color={s.isActive ? 'success' : 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">
                <Button size="small" variant="outlined" onClick={() => handleOpenEdit(s)} sx={{ mr: 0.5 }}>
                  Editar
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => setDeleteConfirm(s)}
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
          No hay proveedores registrados.
        </Typography>
      )}

      <SupplierFormDialog
        open={formOpen}
        mode={formMode}
        supplier={editingSupplier ?? undefined}
        validationError={validationError}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Eliminar el proveedor &quot;{deleteConfirm?.name}&quot; ({deleteConfirm?.code})? Esta acción no se puede deshacer.
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
