import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PatientCard from '../components/PatientCard';
import PatientFormDialog from '../components/PatientFormDialog';
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
import type {
  Patient,
  ClinicalEvent,
  MedicalEvolution,
  Diagnosis,
  Procedure,
  PrescribedMedication,
  Attachment,
} from '../types';

function generatePatientId(): string {
  return `p-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function HceHome() {
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [evolutions, setEvolutions] = useState(MOCK_EVOLUTIONS);
  const [diagnoses, setDiagnoses] = useState(MOCK_DIAGNOSES);
  const [procedures, setProcedures] = useState(MOCK_PROCEDURES);
  const [medications, setMedications] = useState(MOCK_MEDICATIONS);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Patient | null>(null);

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
    return procedures.filter((p) => p.patientId === selectedPatient.id);
  }, [selectedPatient, procedures]);

  const patientMedications = useMemo(() => {
    if (!selectedPatient) return [];
    return medications.filter((m) => m.patientId === selectedPatient.id);
  }, [selectedPatient, medications]);

  const patientAttachments = useMemo(() => {
    if (!selectedPatient) return [];
    return MOCK_ATTACHMENTS.filter((a) => a.patientId === selectedPatient.id);
  }, [selectedPatient]);

  function handlePatientSubmit(data: Omit<Patient, 'id' | 'createdAt'>) {
    setValidationError(null);
    const docTrim = data.documentNumber.trim();
    const exists = patients.some(
      (p) => p.documentNumber === docTrim && (formMode !== 'edit' || editingPatient?.id !== p.id)
    );
    if (exists) {
      setValidationError('Ya existe un paciente con ese número de documento.');
      return;
    }
    if (formMode === 'create') {
      const newPatient: Patient = {
        ...data,
        id: generatePatientId(),
        createdAt: new Date().toISOString(),
      };
      setPatients((prev) => [...prev, newPatient]);
      setFormOpen(false);
    } else if (editingPatient) {
      setPatients((prev) =>
        prev.map((p) => (p.id === editingPatient.id ? { ...p, ...data } : p))
      );
      if (selectedPatient?.id === editingPatient.id) {
        setSelectedPatient((prev) =>
          prev?.id === editingPatient.id ? { ...prev!, ...data } : prev
        );
      }
      setFormOpen(false);
    }
  }

  function handlePatientDelete(patient: Patient) {
    setPatients((prev) => prev.filter((p) => p.id !== patient.id));
    if (selectedPatient?.id === patient.id) setSelectedPatient(null);
    setDeleteConfirm(null);
  }

  function handleOpenCreate() {
    setFormMode('create');
    setEditingPatient(null);
    setValidationError(null);
    setFormOpen(true);
  }

  function handleOpenEdit(patient: Patient) {
    setFormMode('edit');
    setEditingPatient(patient);
    setValidationError(null);
    setFormOpen(true);
  }

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

  function handleUpdateEvolution(id: string, updates: Partial<MedicalEvolution>) {
    setEvolutions((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  }

  function handleDeleteEvolution(id: string) {
    setEvolutions((prev) => prev.filter((e) => e.id !== id));
  }

  function handleAddDiagnosis(d: Omit<Diagnosis, 'id'>) {
    setDiagnoses((prev) => [...prev, { ...d, id: `d-${Date.now()}` }]);
  }

  function handleUpdateDiagnosis(id: string, updates: Partial<Diagnosis>) {
    setDiagnoses((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
    );
  }

  function handleDeleteDiagnosis(id: string) {
    setDiagnoses((prev) => prev.filter((d) => d.id !== id));
  }

  function handleAddProcedure(proc: Omit<Procedure, 'id' | 'patientId'>) {
    if (!selectedPatient) return;
    setProcedures((prev) => [
      ...prev,
      { ...proc, id: `pr-${Date.now()}`, patientId: selectedPatient.id },
    ]);
  }

  function handleUpdateProcedure(id: string, updates: Partial<Procedure>) {
    setProcedures((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }

  function handleDeleteProcedure(id: string) {
    setProcedures((prev) => prev.filter((p) => p.id !== id));
  }

  function handleAddMedication(med: Omit<PrescribedMedication, 'id' | 'patientId'>) {
    if (!selectedPatient) return;
    setMedications((prev) => [
      ...prev,
      { ...med, id: `m-${Date.now()}`, patientId: selectedPatient.id },
    ]);
  }

  function handleUpdateMedication(id: string, updates: Partial<PrescribedMedication>) {
    setMedications((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  }

  function handleDeleteMedication(id: string) {
    setMedications((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Historia Clínica Electrónica (HCE)
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Búsqueda por documento, nombre o EPS. Gestión de fichas de paciente y contenido clínico.
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-start', mb: 2 }}>
        <PatientSearch patients={patients} onSelectPatient={setSelectedPatient} />
        <Button variant="contained" onClick={handleOpenCreate}>
          Nuevo paciente
        </Button>
      </Box>

      {selectedPatient ? (
        <>
          <PatientCard
            patient={selectedPatient}
            onEdit={handleOpenEdit}
            onDelete={(p) => setDeleteConfirm(p)}
          />
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
              onUpdateEvolution={handleUpdateEvolution}
              onDeleteEvolution={handleDeleteEvolution}
              onUpdateDiagnosis={handleUpdateDiagnosis}
              onDeleteDiagnosis={handleDeleteDiagnosis}
              onAddProcedure={handleAddProcedure}
              onUpdateProcedure={handleUpdateProcedure}
              onDeleteProcedure={handleDeleteProcedure}
              onAddMedication={handleAddMedication}
              onUpdateMedication={handleUpdateMedication}
              onDeleteMedication={handleDeleteMedication}
            />
          </Paper>
        </>
      ) : (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">
            Use el formulario de búsqueda para localizar un paciente por documento, nombre o EPS, o cree una nueva ficha con &quot;Nuevo paciente&quot;.
          </Typography>
        </Paper>
      )}

      <PatientFormDialog
        open={formOpen}
        mode={formMode}
        patient={editingPatient ?? undefined}
        validationError={validationError}
        onClose={() => setFormOpen(false)}
        onSubmit={handlePatientSubmit}
      />

      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Eliminar la ficha del paciente &quot;{deleteConfirm?.firstName} {deleteConfirm?.lastName}&quot; (documento {deleteConfirm?.documentNumber})? Esta acción no se puede deshacer y no elimina el contenido clínico asociado en memoria.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Cancelar</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteConfirm && handlePatientDelete(deleteConfirm)}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
