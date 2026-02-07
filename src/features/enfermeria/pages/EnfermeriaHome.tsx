import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PatientAgenda from '../components/PatientAgenda';
import VitalSignsForm from '../components/VitalSignsForm';
import NursingNotesSection from '../components/NursingNotesSection';
import MedicationAdministrationSection from '../components/MedicationAdministrationSection';
import CarePlansSection from '../components/CarePlansSection';
import ClinicalScalesSection from '../components/ClinicalScalesSection';
import {
  MOCK_ASSIGNMENTS,
  MOCK_VITAL_SIGNS,
  MOCK_NURSING_NOTES,
  MOCK_MEDICATION_ADMINISTRATIONS,
  MOCK_CARE_PLANS,
  MOCK_CLINICAL_SCALES,
} from '../data/mock';
import type { PatientAssignment, VitalSigns, NursingNote, ClinicalScale } from '../types';

export default function EnfermeriaHome() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [tab, setTab] = useState(0);
  const [vitalSigns, setVitalSigns] = useState(MOCK_VITAL_SIGNS);
  const [nursingNotes, setNursingNotes] = useState(MOCK_NURSING_NOTES);
  const [medications, setMedications] = useState(MOCK_MEDICATION_ADMINISTRATIONS);
  const [scales, setScales] = useState(MOCK_CLINICAL_SCALES);

  function handleSelectPatient(assignment: PatientAssignment) {
    setSelectedPatientId(assignment.patientId);
  }

  const patientVitalSigns = useMemo(() => {
    if (!selectedPatientId) return [];
    return vitalSigns.filter((v) => v.patientId === selectedPatientId);
  }, [selectedPatientId, vitalSigns]);

  const patientNotes = useMemo(() => {
    if (!selectedPatientId) return [];
    return nursingNotes.filter((n) => n.patientId === selectedPatientId);
  }, [selectedPatientId, nursingNotes]);

  const patientMedications = useMemo(() => {
    if (!selectedPatientId) return [];
    return medications.filter((m) => m.patientId === selectedPatientId);
  }, [selectedPatientId, medications]);

  const patientCarePlans = useMemo(() => {
    if (!selectedPatientId) return [];
    return MOCK_CARE_PLANS.filter((c) => c.patientId === selectedPatientId);
  }, [selectedPatientId]);

  const patientScales = useMemo(() => {
    if (!selectedPatientId) return [];
    return scales.filter((s) => s.patientId === selectedPatientId);
  }, [selectedPatientId, scales]);

  function handleAddVitalSigns(v: Omit<VitalSigns, 'id'>) {
    setVitalSigns((prev) => [...prev, { ...v, id: `vs-${Date.now()}` }]);
  }

  function handleAddNursingNote(n: Omit<NursingNote, 'id'>) {
    setNursingNotes((prev) => [...prev, { ...n, id: `nn-${Date.now()}` }]);
  }

  function handleAdministerMedication(id: string) {
    const now = new Date().toTimeString().slice(0, 5);
    setMedications((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status: 'administrado' as const,
              administeredTime: now,
              administeredBy: 'Usuario actual',
            }
          : m
      )
    );
  }

  function handleAddScale(s: Omit<ClinicalScale, 'id'>) {
    setScales((prev) => [...prev, { ...s, id: `cs-${Date.now()}` }]);
  }

  return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', lg: 'row' } }}>
      <Box sx={{ flex: { lg: '0 0 320px' } }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Enfermería
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Registro de atención y cuidados de enfermería. Seleccione un paciente para ver su agenda y registrar atención.
        </Typography>
        <PatientAgenda
          assignments={MOCK_ASSIGNMENTS}
          selectedId={selectedPatientId}
          onSelect={handleSelectPatient}
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        {selectedPatientId ? (
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Atención de enfermería
            </Typography>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tab label="Signos vitales" />
              <Tab label="Notas de enfermería" />
              <Tab label="Administración medicamentos" />
              <Tab label="Planes de cuidado" />
              <Tab label="Escalas clínicas" />
            </Tabs>

            {tab === 0 && (
              <VitalSignsForm
                vitalSigns={patientVitalSigns}
                patientId={selectedPatientId}
                onAdd={handleAddVitalSigns}
              />
            )}
            {tab === 1 && (
              <NursingNotesSection
                notes={patientNotes}
                patientId={selectedPatientId}
                onAdd={handleAddNursingNote}
              />
            )}
            {tab === 2 && (
              <MedicationAdministrationSection
                administrations={patientMedications}
                patientId={selectedPatientId}
                onAdminister={handleAdministerMedication}
              />
            )}
            {tab === 3 && <CarePlansSection carePlans={patientCarePlans} />}
            {tab === 4 && (
              <ClinicalScalesSection
                scales={patientScales}
                patientId={selectedPatientId}
                onAdd={handleAddScale}
              />
            )}
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">
              Seleccione un paciente de la agenda para registrar atención y cuidados de enfermería.
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
}
