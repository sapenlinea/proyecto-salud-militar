import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import type { Affiliate, RightsValidation } from '../types.js';

interface RightsValidationProps {
  affiliates: Affiliate[];
}

const STATUS_LABELS: Record<Affiliate['status'], string> = {
  activo: 'Activo',
  suspendido: 'Suspendido',
  retenido: 'Retenido',
  inactivo: 'Inactivo',
  cartera: 'Cartera',
};

export default function RightsValidationComponent({ affiliates }: RightsValidationProps) {
  const [documentNumber, setDocumentNumber] = useState('');
  const [result, setResult] = useState<RightsValidation | null>(null);

  function handleValidate() {
    const affiliate = affiliates.find((a) => a.documentNumber === documentNumber.trim());
    if (affiliate) {
      const isValid = affiliate.status === 'activo';
      setResult({
        affiliateId: affiliate.id,
        documentNumber: affiliate.documentNumber,
        isValid,
        eps: affiliate.eps,
        status: affiliate.status,
        effectiveDate: affiliate.effectiveDate,
        terminationDate: affiliate.terminationDate,
        message: isValid ? 'Afiliado vigente. Derechos activos.' : `Afiliado ${STATUS_LABELS[affiliate.status]}. Sin derechos activos.`,
        validatedAt: new Date().toISOString(),
      });
    } else {
      setResult({
        affiliateId: '',
        documentNumber: documentNumber.trim(),
        isValid: false,
        eps: '',
        status: 'inactivo',
        effectiveDate: '',
        message: 'Afiliado no encontrado en el sistema.',
        validatedAt: new Date().toISOString(),
      });
    }
  }

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Validación de derechos
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Ingrese el número de documento del afiliado para validar sus derechos al sistema de salud.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <TextField
            size="small"
            label="Número de documento"
            placeholder="Ej: 1234567890"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
            sx={{ minWidth: 220 }}
          />
          <Button variant="contained" onClick={handleValidate}>
            Validar
          </Button>
        </Box>
      </Paper>

      {result && (
        <Paper variant="outlined" sx={{ p: 2, mt: 2, bgcolor: result.isValid ? 'success.light' : 'error.light' }}>
          <Typography variant="subtitle2" gutterBottom>
            Resultado de validación
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Chip label={result.isValid ? 'Derechos activos' : 'Sin derechos activos'} size="small" color={result.isValid ? 'success' : 'error'} variant="filled" />
            <Typography variant="caption" color="text.secondary">
              Validado: {new Date(result.validatedAt).toLocaleString('es-CO')}
            </Typography>
          </Box>
          <Typography variant="body2">{result.message}</Typography>
          {result.eps && (
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              EPS: {result.eps} · Estado: {STATUS_LABELS[result.status]} · Vigencia: {result.effectiveDate}{result.terminationDate ? ` - ${result.terminationDate}` : ''}
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
}
