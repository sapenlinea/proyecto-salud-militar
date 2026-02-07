import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Affiliate, AffiliateStatus } from '../types.js';

interface AffiliateDetailProps {
  affiliate: Affiliate;
  onStatusChange?: (affiliateId: string, newStatus: AffiliateStatus) => void;
}

const STATUS_LABELS: Record<AffiliateStatus, string> = {
  activo: 'Activo',
  suspendido: 'Suspendido',
  retenido: 'Retenido',
  inactivo: 'Inactivo',
  cartera: 'Cartera',
};

export default function AffiliateDetail({ affiliate, onStatusChange }: AffiliateDetailProps) {
  const fullName = [affiliate.firstName, affiliate.secondName, affiliate.lastName, affiliate.secondLastName].filter(Boolean).join(' ');

  function handleStatusChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newStatus = e.target.value as AffiliateStatus;
    onStatusChange?.(affiliate.id, newStatus);
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Consulta de afiliado
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 2, mb: 2 }}>
        <Box>
          <Typography variant="caption" color="text.secondary">Identificación</Typography>
          <Typography variant="body2">{affiliate.documentType} {affiliate.documentNumber}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">Nombre completo</Typography>
          <Typography variant="body2">{fullName}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">Fecha nacimiento</Typography>
          <Typography variant="body2">{affiliate.birthDate}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">Género</Typography>
          <Typography variant="body2">{affiliate.gender}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">EPS</Typography>
          <Typography variant="body2">{affiliate.eps} ({affiliate.epsCode})</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">Tipo afiliación</Typography>
          <Typography variant="body2">{affiliate.affiliationType === 'contributivo' ? 'Contributivo' : affiliate.affiliationType === 'subsidiado' ? 'Subsidiado' : 'Especial'}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">Estado actual</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Chip label={STATUS_LABELS[affiliate.status]} size="small" color={affiliate.status === 'activo' ? 'success' : affiliate.status === 'suspendido' || affiliate.status === 'retenido' ? 'warning' : 'error'} variant="filled" />
            {onStatusChange && (
              <TextField select size="small" value={affiliate.status} onChange={handleStatusChange} sx={{ minWidth: 140 }}>
                {(Object.keys(STATUS_LABELS) as AffiliateStatus[]).map((s) => (
                  <MenuItem key={s} value={s}>{STATUS_LABELS[s]}</MenuItem>
                ))}
              </TextField>
            )}
          </Box>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">Vigencia</Typography>
          <Typography variant="body2">{affiliate.effectiveDate}{affiliate.terminationDate ? ` - ${affiliate.terminationDate}` : ' (vigente)'}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">Categoría beneficiario</Typography>
          <Typography variant="body2">{affiliate.beneficiaryCategory ?? '—'}</Typography>
        </Box>
        {affiliate.phone && (
          <Box>
            <Typography variant="caption" color="text.secondary">Teléfono</Typography>
            <Typography variant="body2">{affiliate.phone}</Typography>
          </Box>
        )}
        {affiliate.email && (
          <Box>
            <Typography variant="caption" color="text.secondary">Correo</Typography>
            <Typography variant="body2">{affiliate.email}</Typography>
          </Box>
        )}
        {affiliate.address && (
          <Box sx={{ gridColumn: { md: '1 / -1' } }}>
            <Typography variant="caption" color="text.secondary">Dirección</Typography>
            <Typography variant="body2">{affiliate.address}{affiliate.city ? `, ${affiliate.city}` : ''}</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
