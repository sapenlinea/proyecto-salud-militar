import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { CarePlan } from '../types.js';

interface CarePlansSectionProps {
  carePlans: CarePlan[];
}

const STATUS_LABELS: Record<CarePlan['status'], string> = {
  activo: 'Activo',
  cumplido: 'Cumplido',
  suspendido: 'Suspendido',
};

export default function CarePlansSection({ carePlans }: CarePlansSectionProps) {
  return (
    <Box>
      {carePlans.map((cp) => (
        <Paper key={cp.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="subtitle2">Diagnóstico médico: {cp.diagnosis}</Typography>
            <Chip label={STATUS_LABELS[cp.status]} size="small" color={cp.status === 'activo' ? 'primary' : 'default'} variant="outlined" />
          </Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Diagnóstico de enfermería: {cp.nursingDiagnosis}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
            Resultado esperado:
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>{cp.expectedOutcome}</Typography>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
            Intervenciones:
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {cp.interventions.map((i, idx) => (
              <li key={idx}>
                <Typography variant="body2">{i}</Typography>
              </li>
            ))}
          </Box>
          {cp.evaluation && (
            <>
              <Typography variant="body2" sx={{ fontWeight: 500, mt: 1, mb: 0.5 }}>
                Evaluación:
              </Typography>
              <Typography variant="body2">{cp.evaluation}</Typography>
            </>
          )}
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
            Inicio: {cp.startDate} · {cp.author}
          </Typography>
        </Paper>
      ))}
      {carePlans.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No hay planes de cuidado registrados.
        </Typography>
      )}
    </Box>
  );
}
