import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PaymentRegistration, { type PaymentFormData } from '../components/PaymentRegistration';
import CollectionInquiry from '../components/CollectionInquiry';
import ReconciliationsSection from '../components/ReconciliationsSection';
import AccountStatementsSection from '../components/AccountStatementsSection';
import FinancialReportsSection from '../components/FinancialReportsSection';
import {
  MOCK_PAYMENTS,
  MOCK_RECONCILIATIONS,
  MOCK_ACCOUNT_STATEMENTS,
  MOCK_FINANCIAL_REPORTS,
} from '../data/mock';
import type { Payment } from '../types';

export default function RecaudoHome() {
  const [tab, setTab] = useState(0);
  const [payments, setPayments] = useState(MOCK_PAYMENTS);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity?: 'success' | 'error' | 'info' }>({ open: false, message: '' });

  function handlePaymentSubmit(data: PaymentFormData) {
    const newPayment: Payment = {
      id: `p-${Date.now()}`,
      affiliateId: data.affiliateId,
      affiliateName: data.affiliateName,
      document: data.document,
      amount: data.amount,
      currency: data.currency,
      paymentDate: data.paymentDate,
      paymentMethod: data.paymentMethod,
      reference: data.reference,
      concept: data.concept,
      status: 'registrado',
      registeredBy: 'Usuario actual',
      registeredAt: new Date().toISOString(),
    };
    setPayments((prev) => [...prev, newPayment]);
    setSnackbar({ open: true, message: 'Pago registrado correctamente.', severity: 'success' });
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Recaudo
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Gestión financiera de aportes y pagos. Registro de pagos, consulta de recaudo, conciliaciones, estados de cuenta y reportes financieros.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tab label="Registro de pagos" />
          <Tab label="Consulta de recaudo" />
          <Tab label="Conciliaciones" />
          <Tab label="Estados de cuenta" />
          <Tab label="Reportes financieros" />
        </Tabs>

        {tab === 0 && <PaymentRegistration onSubmit={handlePaymentSubmit} />}
        {tab === 1 && <CollectionInquiry payments={payments} />}
        {tab === 2 && <ReconciliationsSection reconciliations={MOCK_RECONCILIATIONS} />}
        {tab === 3 && <AccountStatementsSection statements={MOCK_ACCOUNT_STATEMENTS} />}
        {tab === 4 && <FinancialReportsSection reports={MOCK_FINANCIAL_REPORTS} />}
      </Paper>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((p) => ({ ...p, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity ?? 'info'} onClose={() => setSnackbar((p) => ({ ...p, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
