import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { PaymentMethod } from '../types.js';

interface PaymentRegistrationProps {
  onSubmit?: (data: PaymentFormData) => void;
}

export interface PaymentFormData {
  affiliateId: string;
  affiliateName: string;
  document: string;
  amount: number;
  currency: string;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  reference?: string;
  concept: string;
}

const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: 'efectivo', label: 'Efectivo' },
  { value: 'transferencia', label: 'Transferencia' },
  { value: 'tarjeta_debito', label: 'Tarjeta débito' },
  { value: 'tarjeta_credito', label: 'Tarjeta crédito' },
  { value: 'cheque', label: 'Cheque' },
];

export default function PaymentRegistration({ onSubmit }: PaymentRegistrationProps) {
  const [affiliateName, setAffiliateName] = useState('');
  const [document, setDocument] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('efectivo');
  const [reference, setReference] = useState('');
  const [concept, setConcept] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;
    onSubmit?.({
      affiliateId: `aff-${Date.now()}`,
      affiliateName: affiliateName.trim(),
      document: document.trim(),
      amount: amt,
      currency: 'COP',
      paymentDate,
      paymentMethod,
      reference: reference.trim() || undefined,
      concept: concept.trim() || 'Pago de servicios',
    });
    setAffiliateName('');
    setDocument('');
    setAmount('');
    setReference('');
    setConcept('');
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Registro de pago
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Registrar nuevo pago de aportes o servicios.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField size="small" label="Nombre afiliado" value={affiliateName} onChange={(e) => setAffiliateName(e.target.value)} required sx={{ minWidth: 220 }} />
          <TextField size="small" label="Número documento" value={document} onChange={(e) => setDocument(e.target.value)} required sx={{ minWidth: 160 }} />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField size="small" label="Valor (COP)" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required inputProps={{ min: 0, step: 100 }} sx={{ minWidth: 140 }} />
          <TextField size="small" label="Fecha" type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} required InputLabelProps={{ shrink: true }} sx={{ minWidth: 150 }} />
          <TextField select size="small" label="Forma de pago" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)} sx={{ minWidth: 180 }}>
            {PAYMENT_METHODS.map((pm) => (
              <MenuItem key={pm.value} value={pm.value}>{pm.label}</MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField size="small" label="Referencia" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Número de transacción" sx={{ minWidth: 200 }} />
          <TextField size="small" label="Concepto" value={concept} onChange={(e) => setConcept(e.target.value)} placeholder="Descripción del pago" sx={{ minWidth: 260 }} />
        </Box>
        <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start' }}>
          Registrar pago
        </Button>
      </Box>
    </Paper>
  );
}
