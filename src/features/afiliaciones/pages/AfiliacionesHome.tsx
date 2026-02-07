import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AffiliationRegistrationForm from '../components/AffiliationRegistration';
import AffiliateSearch from '../components/AffiliateSearch';
import AffiliateDetail from '../components/AffiliateDetail';
import RightsValidationComponent from '../components/RightsValidation';
import BulkUpload from '../components/BulkUpload';
import { MOCK_AFFILIATES } from '../data/mock';
import type { Affiliate, AffiliateStatus, AffiliationRegistration } from '../types';

export default function AfiliacionesHome() {
  const [tab, setTab] = useState(0);
  const [affiliates, setAffiliates] = useState(MOCK_AFFILIATES);
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity?: 'success' | 'error' | 'info' }>({ open: false, message: '' });

  function handleRegisterAffiliation(data: AffiliationRegistration) {
    const newAffiliate: Affiliate = {
      ...data,
      id: `aff-${Date.now()}`,
      status: 'activo',
      terminationDate: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Usuario actual',
    };
    setAffiliates((prev) => [...prev, newAffiliate]);
    setSnackbar({ open: true, message: 'Afiliación registrada correctamente.', severity: 'success' });
  }

  function handleStatusChange(affiliateId: string, newStatus: AffiliateStatus) {
    setAffiliates((prev) =>
      prev.map((a) => (a.id === affiliateId ? { ...a, status: newStatus, updatedAt: new Date().toISOString() } : a))
    );
    setSelectedAffiliate((prev) => (prev?.id === affiliateId ? { ...prev, status: newStatus } : prev));
    setSnackbar({ open: true, message: `Estado actualizado a ${newStatus}.`, severity: 'success' });
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Afiliaciones
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Gestión de afiliados al sistema de salud. Registro, consulta, cambios de estado, validación de derechos y carga masiva.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tab label="Registro" />
          <Tab label="Consulta" />
          <Tab label="Validación de derechos" />
          <Tab label="Carga masiva" />
        </Tabs>

        {tab === 0 && (
          <AffiliationRegistrationForm onSubmit={handleRegisterAffiliation} />
        )}

        {tab === 1 && (
          <Box>
            <AffiliateSearch affiliates={affiliates} onSelect={setSelectedAffiliate} />
            {selectedAffiliate && (
              <Box sx={{ mt: 2 }}>
                <AffiliateDetail affiliate={selectedAffiliate} onStatusChange={handleStatusChange} />
              </Box>
            )}
          </Box>
        )}

        {tab === 2 && (
          <RightsValidationComponent affiliates={affiliates} />
        )}

        {tab === 3 && (
          <BulkUpload />
        )}
      </Paper>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((p) => ({ ...p, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity ?? 'info'} onClose={() => setSnackbar((p) => ({ ...p, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
