import { useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { validateParameter } from '../utils/parameterValidation';
import type { SystemParameter } from '../types';

interface SystemParametersProps {
  parameters: SystemParameter[];
  onParameterUpdate?: (id: string, value: string) => void;
}

export default function SystemParameters({ parameters, onParameterUpdate }: SystemParametersProps) {
  const [editId, setEditId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');

  const categories = ['todos', ...Array.from(new Set(parameters.map((p) => p.category)))];
  const filtered =
    categoryFilter === 'todos'
      ? parameters
      : parameters.filter((p) => p.category === categoryFilter);

  function handleStartEdit(p: SystemParameter) {
    setEditId(p.id);
    setEditValue(p.value);
    setValidationError(null);
  }

  function handleSave() {
    if (!editId) return;
    const param = parameters.find((p) => p.id === editId);
    if (!param) return;
    const result = validateParameter(param.key, editValue);
    if (!result.valid) {
      setValidationError(result.error ?? 'Error de validación.');
      return;
    }
    setValidationError(null);
    onParameterUpdate?.(editId, editValue.trim());
    setEditId(null);
  }

  function handleCancel() {
    setEditId(null);
    setValidationError(null);
  }

  return (
    <Box>
      {validationError && (
        <Alert severity="error" onClose={() => setValidationError(null)} sx={{ mb: 2 }}>
          {validationError}
        </Alert>
      )}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat === 'todos' ? 'Todos' : cat}
            size="small"
            color={categoryFilter === cat ? 'primary' : 'default'}
            variant={categoryFilter === cat ? 'filled' : 'outlined'}
            onClick={() => setCategoryFilter(cat)}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Categoría</TableCell>
            <TableCell>Clave</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.category}</TableCell>
              <TableCell>{p.key}</TableCell>
              <TableCell>
                {editId === p.id ? (
                  <TextField
                    size="small"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    sx={{ minWidth: 180 }}
                  />
                ) : (
                  p.value
                )}
              </TableCell>
              <TableCell>{p.description}</TableCell>
              <TableCell>
                {editId === p.id ? (
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Button size="small" onClick={handleSave}>
                      Guardar
                    </Button>
                    <Button size="small" onClick={handleCancel}>
                      Cancelar
                    </Button>
                  </Box>
                ) : (
                  <Button size="small" onClick={() => handleStartEdit(p)}>
                    Editar
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filtered.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay parámetros en esta categoría.
        </Typography>
      )}
    </Box>
  );
}
