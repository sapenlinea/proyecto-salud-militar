import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ReferralRequest, { type ReferralFormData } from '../components/ReferralRequest';
import CaseInbox from '../components/CaseInbox';
import PatientFollowUp from '../components/PatientFollowUp';
import AttachedDocuments from '../components/AttachedDocuments';
import ProcessClosure from '../components/ProcessClosure';
import {
  MOCK_REFERRALS,
  MOCK_FOLLOW_UPS,
  MOCK_DOCUMENTS,
} from '../data/mock';
import type { Referral } from '../types';

export default function ReferenciasHome() {
  const [tab, setTab] = useState(0);
  const [referrals, setReferrals] = useState(MOCK_REFERRALS);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity?: 'success' | 'error' | 'info' }>({ open: false, message: '' });

  function handleReferralSubmit(data: ReferralFormData) {
    const newReferral: Referral = {
      id: `ref-${Date.now()}`,
      patientId: data.patientId,
      patientName: data.patientName,
      document: data.document,
      documentType: data.documentType,
      specialty: data.specialty,
      reason: data.reason,
      urgency: data.urgency,
      referringProfessional: data.referringProfessional,
      referringInstitution: data.referringInstitution,
      referredToInstitution: data.referredToInstitution,
      status: 'pendiente',
      createdAt: new Date().toISOString(),
    };
    setReferrals((prev) => [...prev, newReferral]);
    setSnackbar({ open: true, message: 'Solicitud de referencia creada correctamente.', severity: 'success' });
  }

  function handleClosure(referralId: string, notes: string, outcome: string) {
    setReferrals((prev) =>
      prev.map((r) =>
        r.id !== referralId
          ? r
          : {
              ...r,
              status: 'cerrada' as const,
              closedAt: new Date().toISOString(),
              closureNotes: notes,
              closureOutcome: outcome,
            }
      )
    );
    setSnackbar({ open: true, message: 'Proceso cerrado correctamente.', severity: 'success' });
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Referencia y Contrarreferencia
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Gestión de remisiones de pacientes. Solicitud de referencia, bandeja de casos, seguimiento, documentos adjuntos y cierre del proceso.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tab label="Solicitud de referencia" />
          <Tab label="Bandeja de casos" />
          <Tab label="Seguimiento del paciente" />
          <Tab label="Documentos adjuntos" />
          <Tab label="Cierre del proceso" />
        </Tabs>

        {tab === 0 && <ReferralRequest onSubmit={handleReferralSubmit} />}
        {tab === 1 && <CaseInbox referrals={referrals} />}
        {tab === 2 && <PatientFollowUp followUps={MOCK_FOLLOW_UPS} referrals={referrals} />}
        {tab === 3 && <AttachedDocuments documents={MOCK_DOCUMENTS} referrals={referrals} />}
        {tab === 4 && <ProcessClosure referrals={referrals} onClose={handleClosure} />}
      </Paper>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((p) => ({ ...p, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity ?? 'info'} onClose={() => setSnackbar((p) => ({ ...p, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
