import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PatientCard from '../components/PatientCard';
import PatientSearch from '../components/PatientSearch';
import ClinicalTabs from '../components/ClinicalTabs';
import {
  MOCK_PATIENTS,
  MOCK_CLINICAL_EVENTS,
  MOCK_EVOLUTIONS,
  MOCK_DIAGNOSES,
  MOCK_PROCEDURES,
  MOCK_MEDICATIONS,
  MOCK_ATTACHMENTS,
  MOCK_CIE10,
} from '../data/mock';
import type { Patient, MedicalEvolution, Diagnosis } from '../types';

export default function HceHome() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [evolutions, setEvolutions] = useState(MOCK_EVOLUTIONS);
  const [diagnoses, setDiagnoses] = useState(MOCK_DIAGNOSES);

  const events = useMemo(() => {
    if (!selectedPatient) return [];
    return MOCK_CLINICAL_EVENTS.filter((e) => e.patientId === selectedPatient.id);
  }, [selectedPatient]);

  const patientEvolutions = useMemo(() => {
    if (!selectedPatient) return [];
    return evolutions.filter((e) => e.patientId === selectedPatient.id);
  }, [selectedPatient, evolutions]);

  const patientDiagnoses = useMemo(() => {
    if (!selectedPatient) return [];
    return diagnoses.filter((d) => d.patientId === selectedPatient.id);
  }, [selectedPatient, diagnoses]);

  const patientProcedures = useMemo(() => {
    if (!selectedPatient) return [];
    return MOCK_PROCEDURES.filter((p) => p.patientId === selectedPatient.id);
  }, [selectedPatient]);

  const patientMedications = useMemo(() => {
    if (!selectedPatient) return [];
    return MOCK_MEDICATIONS.filter((m) => m.patientId === selectedPatient.id);
  }, [selectedPatient]);

  const patientAttachments = useMemo(() => {
    if (!selectedPatient) return [];
    return MOCK_ATTACHMENTS.filter((a) => a.patientId === selectedPatient.id);
  }, [selectedPatient]);

  function handleAddEvolution(evolution: Omit<MedicalEvolution, 'id' | 'patientId'>) {
    if (!selectedPatient) return;
    setEvolutions((prev) => [
      ...prev,
      {
        ...evolution,
        id: `ev-${Date.now()}`,
        patientId: selectedPatient.id,
      },
    ]);
  }

  function handleAddDiagnosis(d: Omit<Diagnosis, 'id'>) {
    setDiagnoses((prev) => [...prev, { ...d, id: `d-${Date.now()}` }]);
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Historia Clínica Electrónica (HCE)
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Búsqueda por documento, nombre o EPS. Seleccione un paciente para ver la ficha y la línea de tiempo clínica.
      </Typography>

      <PatientSearch patients={MOCK_PATIENTS} onSelectPatient={setSelectedPatient} />

      {selectedPatient ? (
        <>
          <PatientCard patient={selectedPatient} />
          <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Contenido clínico
            </Typography>
            <ClinicalTabs
              patient={selectedPatient}
              events={events}
              evolutions={patientEvolutions}
              diagnoses={patientDiagnoses}
              procedures={patientProcedures}
              medications={patientMedications}
              attachments={patientAttachments}
              cie10Options={MOCK_CIE10}
              onAddEvolution={handleAddEvolution}
              onAddDiagnosis={handleAddDiagnosis}
            />
          </Paper>
        </>
      ) : (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">
            Use el formulario de búsqueda para localizar un paciente por documento, nombre o EPS.
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
