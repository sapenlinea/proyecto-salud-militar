import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { validateCatalogItem } from '../utils/catalogValidation';
import type { CatalogItem, MasterCatalog } from '../types';

interface MasterCatalogsProps {
  catalogs: MasterCatalog[];
  onItemCreate?: (catalogId: string, code: string, name: string) => void;
  onItemUpdate?: (
    catalogId: string,
    itemId: string,
    updates: { code?: string; name?: string; active?: boolean }
  ) => void;
}

export default function MasterCatalogs({
  catalogs,
  onItemCreate,
  onItemUpdate,
}: MasterCatalogsProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<{
    catalogId: string;
    item: CatalogItem;
    code: string;
    name: string;
  } | null>(null);
  const [newItem, setNewItem] = useState<{
    catalogId: string;
    code: string;
    name: string;
  } | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  function toggleExpand(id: string) {
    setExpanded((p) => (p === id ? null : id));
    setEditItem(null);
    setNewItem(null);
    setValidationError(null);
  }

  function handleStartEdit(catalogId: string, item: CatalogItem) {
    setEditItem({ catalogId, item, code: item.code, name: item.name });
    setNewItem(null);
    setValidationError(null);
  }

  function handleStartAdd(catalogId: string) {
    setNewItem({ catalogId, code: '', name: '' });
    setEditItem(null);
    setValidationError(null);
  }

  function handleCancelEdit() {
    setEditItem(null);
    setNewItem(null);
    setValidationError(null);
  }

  function handleSaveEdit() {
    if (!editItem || !onItemUpdate) return;
    const catalog = catalogs.find((c) => c.id === editItem.catalogId);
    if (!catalog) return;
    const existingCodes = catalog.items.map((i) => i.code);
    const code = editItem.code.trim().toUpperCase();
    const name = editItem.name.trim();
    const result = validateCatalogItem(
      code,
      name,
      existingCodes,
      editItem.item.code
    );
    if (!result.valid) {
      setValidationError(result.error ?? 'Error de validación.');
      return;
    }
    const updates: { code?: string; name?: string } = {};
    if (code !== editItem.item.code) updates.code = code;
    if (name !== editItem.item.name) updates.name = name;
    if (Object.keys(updates).length > 0) {
      onItemUpdate(editItem.catalogId, editItem.item.id, updates);
    }
    handleCancelEdit();
  }

  function handleSaveNew() {
    if (!newItem || !onItemCreate) return;
    const catalog = catalogs.find((c) => c.id === newItem.catalogId);
    if (!catalog) return;
    const existingCodes = catalog.items.map((i) => i.code);
    const code = newItem.code.trim().toUpperCase();
    const name = newItem.name.trim();
    const result = validateCatalogItem(code, name, existingCodes);
    if (!result.valid) {
      setValidationError(result.error ?? 'Error de validación.');
      return;
    }
    onItemCreate(newItem.catalogId, code, name);
    handleCancelEdit();
  }

  function handleToggleActive(catalogId: string, item: CatalogItem) {
    onItemUpdate?.(catalogId, item.id, { active: !item.active });
  }

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Catálogos maestros del sistema. Agregar, editar o activar/desactivar ítems. El código debe ser único dentro de cada catálogo.
      </Typography>
      {validationError && (
        <Alert severity="error" onClose={() => setValidationError(null)} sx={{ mb: 2 }}>
          {validationError}
        </Alert>
      )}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width={48} />
            <TableCell>Catálogo</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Cantidad ítems</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {catalogs.map((c) => {
            const isExpanded = expanded === c.id;
            const activeCount = c.items.filter((i) => i.active).length;
            return (
              <Fragment key={c.id}>
                <TableRow hover sx={{ cursor: 'pointer' }} onClick={() => toggleExpand(c.id)}>
                  <TableCell>{isExpanded ? '▲' : '▼'}</TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.description}</TableCell>
                  <TableCell>
                    {activeCount} / {c.items.length} activos
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} sx={{ py: 0, borderBottom: 0 }}>
                    <Collapse in={isExpanded} unmountOnExit>
                      <Box sx={{ py: 2, pl: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartAdd(c.id);
                            }}
                            disabled={Boolean(newItem?.catalogId === c.id)}
                          >
                            Agregar ítem
                          </Button>
                        </Box>
                        {newItem?.catalogId === c.id && (
                          <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                            <TextField
                              size="small"
                              label="Código"
                              value={newItem.code}
                              onChange={(e) =>
                                setNewItem((p) => (p ? { ...p, code: e.target.value } : null))
                              }
                              sx={{ minWidth: 120 }}
                            />
                            <TextField
                              size="small"
                              label="Nombre"
                              value={newItem.name}
                              onChange={(e) =>
                                setNewItem((p) => (p ? { ...p, name: e.target.value } : null))
                              }
                              sx={{ minWidth: 200 }}
                            />
                            <Button size="small" onClick={handleSaveNew}>
                              Guardar
                            </Button>
                            <Button size="small" onClick={handleCancelEdit}>
                              Cancelar
                            </Button>
                          </Box>
                        )}
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Código</TableCell>
                              <TableCell>Nombre</TableCell>
                              <TableCell>Estado</TableCell>
                              <TableCell>Acciones</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {c.items.map((item) => {
                              const isEditing = editItem?.catalogId === c.id && editItem?.item.id === item.id;
                              return (
                                <TableRow key={item.id}>
                                  <TableCell>
                                    {isEditing && editItem ? (
                                      <TextField
                                        size="small"
                                        value={editItem.code}
                                        onChange={(e) =>
                                          setEditItem((p) => (p ? { ...p, code: e.target.value } : null))
                                        }
                                        sx={{ minWidth: 100 }}
                                      />
                                    ) : (
                                      item.code
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {isEditing && editItem ? (
                                      <TextField
                                        size="small"
                                        value={editItem.name}
                                        onChange={(e) =>
                                          setEditItem((p) => (p ? { ...p, name: e.target.value } : null))
                                        }
                                        sx={{ minWidth: 180 }}
                                      />
                                    ) : (
                                      item.name
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      label={item.active ? 'Activo' : 'Inactivo'}
                                      size="small"
                                      color={item.active ? 'success' : 'default'}
                                      variant="outlined"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    {isEditing ? (
                                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                                        <Button size="small" onClick={handleSaveEdit}>
                                          Guardar
                                        </Button>
                                        <Button size="small" onClick={handleCancelEdit}>
                                          Cancelar
                                        </Button>
                                      </Box>
                                    ) : (
                                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                                        <Button
                                          size="small"
                                          onClick={() => handleStartEdit(c.id, item)}
                                        >
                                          Editar
                                        </Button>
                                        <Button
                                          size="small"
                                          onClick={() => handleToggleActive(c.id, item)}
                                        >
                                          {item.active ? 'Desactivar' : 'Activar'}
                                        </Button>
                                      </Box>
                                    )}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
      {catalogs.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No hay catálogos maestros configurados.
        </Typography>
      )}
    </Box>
  );
}
