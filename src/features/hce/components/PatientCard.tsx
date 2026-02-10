import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import type { Patient } from '../types.js';

interface PatientCardProps {
  patient: Patient;
  onEdit?: (patient: Patient) => void;
  onDelete?: (patient: Patient) => void;
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography variant="caption" color="text.secondary" display="block">
        {label}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );
}

export default function PatientCard({ patient, onEdit, onDelete }: PatientCardProps) {
  const fullName = [patient.firstName, patient.secondName, patient.lastName, patient.secondLastName]
    .filter(Boolean)
    .join(' ');

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6">Ficha del paciente</Typography>
          <Chip label={patient.eps} size="small" color="primary" variant="outlined" />
          {(onEdit || onDelete) && (
            <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
              {onEdit && (
                <Button size="small" variant="outlined" onClick={() => onEdit(patient)}>
                  Editar
                </Button>
              )}
              {onDelete && (
                <Button size="small" variant="outlined" color="error" onClick={() => onDelete(patient)}>
                  Eliminar
                </Button>
              )}
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
          }}
        >
          <Field label="Identificación" value={`${patient.documentType} ${patient.documentNumber}`} />
          <Field label="Nombre completo" value={fullName} />
          <Field label="Fecha nacimiento" value={formatDate(patient.birthDate)} />
          <Field label="Género" value={patient.gender} />
          <Field label="Grupo sanguíneo" value={patient.bloodType ?? '—'} />
          <Field label="Afiliación" value={patient.affiliationType ?? '—'} />
          {patient.phone && <Field label="Teléfono" value={patient.phone} />}
          {patient.email && <Field label="Correo" value={patient.email} />}
          {patient.address && (
            <Box sx={{ gridColumn: { md: '1 / -1' } }}>
              <Field
                label="Dirección"
                value={patient.address + (patient.city ? `, ${patient.city}` : '')}
              />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
