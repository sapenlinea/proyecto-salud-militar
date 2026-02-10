import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import AttachmentsViewer from './AttachmentsViewer';
import ClinicalTimeline from './ClinicalTimeline';
import DiagnosesSection from './DiagnosesSection';
import EvolutionForm from './EvolutionForm';
import MedicationsSection from './MedicationsSection';
import ProceduresSection from './ProceduresSection';
import type {
  Patient,
  ClinicalEvent,
  MedicalEvolution,
  Diagnosis,
  Procedure,
  PrescribedMedication,
  Attachment,
  Cie10Item,
} from '../types.js';

interface ClinicalTabsProps {
  patient: Patient;
  events: ClinicalEvent[];
  evolutions: MedicalEvolution[];
  diagnoses: Diagnosis[];
  procedures: Procedure[];
  medications: PrescribedMedication[];
  attachments: Attachment[];
  cie10Options: Cie10Item[];
  onAddEvolution?: (e: Omit<MedicalEvolution, 'id' | 'patientId'>) => void;
  onAddDiagnosis?: (d: Omit<Diagnosis, 'id'>) => void;
  onUpdateEvolution?: (id: string, updates: Partial<MedicalEvolution>) => void;
  onDeleteEvolution?: (id: string) => void;
  onUpdateDiagnosis?: (id: string, updates: Partial<Diagnosis>) => void;
  onDeleteDiagnosis?: (id: string) => void;
  onAddProcedure?: (p: Omit<Procedure, 'id' | 'patientId'>) => void;
  onUpdateProcedure?: (id: string, updates: Partial<Procedure>) => void;
  onDeleteProcedure?: (id: string) => void;
  onAddMedication?: (m: Omit<PrescribedMedication, 'id' | 'patientId'>) => void;
  onUpdateMedication?: (id: string, updates: Partial<PrescribedMedication>) => void;
  onDeleteMedication?: (id: string) => void;
}

export default function ClinicalTabs({
  patient,
  events,
  evolutions,
  diagnoses,
  procedures,
  medications,
  attachments,
  cie10Options,
  onAddEvolution,
  onAddDiagnosis,
  onUpdateEvolution,
  onDeleteEvolution,
  onUpdateDiagnosis,
  onDeleteDiagnosis,
  onAddProcedure,
  onUpdateProcedure,
  onDeleteProcedure,
  onAddMedication,
  onUpdateMedication,
  onDeleteMedication,
}: ClinicalTabsProps) {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tab label="Línea de tiempo" />
        <Tab label="Evolución médica" />
        <Tab label="Diagnósticos (CIE-10)" />
        <Tab label="Procedimientos" />
        <Tab label="Medicamentos" />
        <Tab label="Adjuntos" />
      </Tabs>

      {tab === 0 && (
        <Box sx={{ py: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Línea de tiempo clínica
          </Typography>
          <ClinicalTimeline events={events} />
        </Box>
      )}

      {tab === 1 && (
        <Box sx={{ py: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Evolución médica (SOAP)
          </Typography>
          <EvolutionForm
            evolutions={evolutions}
            patientId={patient.id}
            onAdd={onAddEvolution}
            onUpdate={onUpdateEvolution}
            onDelete={onDeleteEvolution}
            readOnly={!onAddEvolution}
          />
        </Box>
      )}

      {tab === 2 && (
        <Box sx={{ py: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Diagnósticos CIE-10
          </Typography>
          <DiagnosesSection
            diagnoses={diagnoses}
            cie10Options={cie10Options}
            patientId={patient.id}
            onAdd={onAddDiagnosis}
            onUpdate={onUpdateDiagnosis}
            onDelete={onDeleteDiagnosis}
            readOnly={!onAddDiagnosis}
          />
        </Box>
      )}

      {tab === 3 && (
        <Box sx={{ py: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Procedimientos
          </Typography>
          <ProceduresSection
            procedures={procedures}
            onAdd={onAddProcedure}
            onUpdate={onUpdateProcedure}
            onDelete={onDeleteProcedure}
          />
        </Box>
      )}

      {tab === 4 && (
        <Box sx={{ py: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Medicamentos formulados
          </Typography>
          <MedicationsSection
            medications={medications}
            onAdd={onAddMedication}
            onUpdate={onUpdateMedication}
            onDelete={onDeleteMedication}
          />
        </Box>
      )}

      {tab === 5 && (
        <Box sx={{ py: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Documentos y resultados (PDF, imágenes)
          </Typography>
          <AttachmentsViewer attachments={attachments} />
        </Box>
      )}
    </Box>
  );
}
