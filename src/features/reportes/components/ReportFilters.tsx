import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import type { ReportFilters as ReportFiltersType } from '../types';

interface ReportFiltersProps {
  filters: ReportFiltersType;
  onFiltersChange: (filters: ReportFiltersType) => void;
  onApply?: () => void;
}

const EPS_OPTIONS = ['Todos', 'Compensar', 'Sura', 'Colsanitas', 'Salud Total'];
const ESPECIALIDAD_OPTIONS = ['Todos', 'Medicina general', 'Pediatría', 'Ginecología', 'Traumatología'];
const TIPO_SERVICIO_OPTIONS = ['Todos', 'Consulta', 'Urgencia', 'Hospitalización'];

export default function ReportFilters({ filters, onFiltersChange, onApply }: ReportFiltersProps) {
  const [localFilters, setLocalFilters] = useState<ReportFiltersType>(filters);

  function handleChange(field: keyof ReportFiltersType, value: string) {
    const next = { ...localFilters, [field]: value === 'Todos' ? undefined : value };
    setLocalFilters(next);
    onFiltersChange(next);
  }

  function handleClear() {
    const cleared = {};
    setLocalFilters(cleared);
    onFiltersChange(cleared);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        p: 2,
        borderRadius: 1,
        bgcolor: 'action.hover',
        alignItems: 'flex-end',
      }}
    >
      <TextField
        size="small"
        label="Desde"
        type="date"
        value={localFilters.fechaDesde ?? ''}
        onChange={(e) => handleChange('fechaDesde', e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ minWidth: 140 }}
      />
      <TextField
        size="small"
        label="Hasta"
        type="date"
        value={localFilters.fechaHasta ?? ''}
        onChange={(e) => handleChange('fechaHasta', e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ minWidth: 140 }}
      />
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>EPS</InputLabel>
        <Select
          label="EPS"
          value={localFilters.eps ?? 'Todos'}
          onChange={(e) => handleChange('eps', e.target.value)}
        >
          {EPS_OPTIONS.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel>Especialidad</InputLabel>
        <Select
          label="Especialidad"
          value={localFilters.especialidad ?? 'Todos'}
          onChange={(e) => handleChange('especialidad', e.target.value)}
        >
          {ESPECIALIDAD_OPTIONS.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Tipo servicio</InputLabel>
        <Select
          label="Tipo servicio"
          value={localFilters.tipoServicio ?? 'Todos'}
          onChange={(e) => handleChange('tipoServicio', e.target.value)}
        >
          {TIPO_SERVICIO_OPTIONS.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="outlined" onClick={handleClear}>
        Limpiar
      </Button>
      {onApply && (
        <Button variant="contained" onClick={onApply}>
          Aplicar
        </Button>
      )}
    </Box>
  );
}
