import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import EmergencyAdmission from '../components/EmergencyAdmission';
import HospitalAdmission from '../components/HospitalAdmission';
import AvailableBeds from '../components/AvailableBeds';
import InternalTransfers from '../components/InternalTransfers';
import DischargesComponent from '../components/Discharges';
import { MOCK_BEDS, MOCK_ADMISSIONS, MOCK_TRANSFERS, MOCK_DISCHARGES } from '../data/mock';
import type { Admission, Bed, InternalTransfer, Discharge, DischargeType } from '../types';

function occupyBed(beds: Bed[], bedId: string, patientId: string, patientName: string, admissionId: string, admissionDate: string): Bed[] {
  return beds.map((item) =>
    item.id !== bedId ? item : { ...item, status: 'ocupada' as const, patientId, patientName, admissionId, admissionDate }
  );
}

function clearBed(beds: Bed[], bedId: string): Bed[] {
  return beds.map((item) =>
    item.id !== bedId ? item : { ...item, status: 'disponible' as const, patientId: undefined, patientName: undefined, admissionId: undefined, admissionDate: undefined }
  );
}

export default function AdmisionesHome() {
  const [tab, setTab] = useState(0);
  const [beds, setBeds] = useState(MOCK_BEDS);
  const [admissions, setAdmissions] = useState(MOCK_ADMISSIONS);
  const [transfers, setTransfers] = useState(MOCK_TRANSFERS);
  const [discharges, setDischarges] = useState(MOCK_DISCHARGES);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity?: 'success' | 'error' | 'info' }>({ open: false, message: '' });

  const availableBeds = useMemo(() => beds.filter((b) => b.status === 'disponible'), [beds]);

  function handleEmergencyAdmission(data: { documentType: string; documentNumber: string; patientName: string; triageLevel: string; priority: string; diagnosis: string }) {
    const urgentBed = beds.find((b) => b.unit === 'Urgencias' && b.status === 'disponible');
    if (!urgentBed) {
      setSnackbar({ open: true, message: 'No hay camas disponibles en Urgencias.', severity: 'error' });
      return;
    }
    const newAdmission: Admission = {
      id: `adm-${Date.now()}`,
      patientId: `p-${Date.now()}`,
      patientName: data.patientName,
      document: data.documentNumber,
      documentType: data.documentType,
      eps: '',
      admissionType: 'urgencias',
      admissionDate: new Date().toISOString().slice(0, 10),
      admissionTime: new Date().toTimeString().slice(0, 5),
      bedId: urgentBed.id,
      bedCode: urgentBed.code,
      room: urgentBed.room,
      unit: urgentBed.unit,
      triageLevel: data.triageLevel,
      priority: data.priority as Admission['priority'],
      diagnosis: data.diagnosis || undefined,
      status: 'activo',
      admittedBy: 'Usuario actual',
    };
    setAdmissions((prev) => [...prev, newAdmission]);
    setBeds((prev) => occupyBed(prev, urgentBed.id, newAdmission.patientId, data.patientName, newAdmission.id, newAdmission.admissionDate));
    setSnackbar({ open: true, message: 'Admisión por urgencias registrada.', severity: 'success' });
  }

  function handleHospitalAdmission(data: { documentType: string; documentNumber: string; patientName: string; eps: string; diagnosis: string; bedId: string }) {
    const bed = beds.find((b) => b.id === data.bedId);
    if (!bed || bed.status !== 'disponible') {
      setSnackbar({ open: true, message: 'Cama no disponible.', severity: 'error' });
      return;
    }
    const newAdmission: Admission = {
      id: `adm-${Date.now()}`,
      patientId: `p-${Date.now()}`,
      patientName: data.patientName,
      document: data.documentNumber,
      documentType: data.documentType,
      eps: data.eps,
      admissionType: 'hospitalaria',
      admissionDate: new Date().toISOString().slice(0, 10),
      admissionTime: new Date().toTimeString().slice(0, 5),
      bedId: bed.id,
      bedCode: bed.code,
      room: bed.room,
      unit: bed.unit,
      diagnosis: data.diagnosis || undefined,
      status: 'activo',
      admittedBy: 'Usuario actual',
    };
    setAdmissions((prev) => [...prev, newAdmission]);
    setBeds((prev) => occupyBed(prev, bed.id, newAdmission.patientId, data.patientName, newAdmission.id, newAdmission.admissionDate));
    setSnackbar({ open: true, message: 'Admisión hospitalaria registrada.', severity: 'success' });
  }

  function handleTransfer(data: { admissionId: string; toBedId: string; reason?: string }) {
    const admission = admissions.find((a) => a.id === data.admissionId);
    const toBed = beds.find((b) => b.id === data.toBedId);
    if (!admission || !toBed || toBed.status !== 'disponible') return;
    const fromBed = beds.find((b) => b.id === admission.bedId)!;
    const newTransfer: InternalTransfer = {
      id: `t-${Date.now()}`,
      admissionId: admission.id,
      patientId: admission.patientId,
      patientName: admission.patientName,
      fromBedId: fromBed.id,
      fromBedCode: fromBed.code,
      fromRoom: fromBed.room,
      fromUnit: fromBed.unit,
      toBedId: toBed.id,
      toBedCode: toBed.code,
      toRoom: toBed.room,
      toUnit: toBed.unit,
      transferDate: new Date().toISOString().slice(0, 10),
      transferTime: new Date().toTimeString().slice(0, 5),
      reason: data.reason,
      transferredBy: 'Usuario actual',
    };
    setTransfers((prev) => [...prev, newTransfer]);
    setBeds((prev) => occupyBed(clearBed(prev, fromBed.id), toBed.id, admission.patientId, admission.patientName, admission.id, admission.admissionDate));
    setAdmissions((prev) => prev.map((adm) => (adm.id === admission.id ? { ...adm, bedId: toBed.id, bedCode: toBed.code, room: toBed.room, unit: toBed.unit } : adm)));
    setSnackbar({ open: true, message: 'Traslado registrado.', severity: 'success' });
  }

  function handleDischarge(data: { admissionId: string; dischargeType: DischargeType; recommendations?: string }) {
    const admission = admissions.find((a) => a.id === data.admissionId);
    const bed = beds.find((b) => b.id === admission?.bedId);
    if (!admission || !bed) return;
    const newDischarge: Discharge = {
      id: `d-${Date.now()}`,
      admissionId: admission.id,
      patientId: admission.patientId,
      patientName: admission.patientName,
      document: admission.document,
      bedCode: bed.code,
      room: bed.room,
      dischargeType: data.dischargeType,
      dischargeDate: new Date().toISOString().slice(0, 10),
      dischargeTime: new Date().toTimeString().slice(0, 5),
      diagnosis: admission.diagnosis,
      recommendations: data.recommendations,
      dischargeBy: 'Usuario actual',
    };
    setDischarges((prev) => [...prev, newDischarge]);
    setBeds((prev) => clearBed(prev, bed.id));
    setAdmissions((prev) => prev.map((adm) => (adm.id === admission.id ? { ...adm, status: 'egresado' } : adm)));
    setSnackbar({ open: true, message: 'Egreso registrado.', severity: 'success' });
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Admisiones
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Registro de ingreso hospitalario. Admisión por urgencias, hospitalaria, camas disponibles, traslados internos y egresos.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tab label="Urgencias" />
          <Tab label="Admisión hospitalaria" />
          <Tab label="Camas disponibles" />
          <Tab label="Traslados internos" />
          <Tab label="Egresos" />
        </Tabs>

        {tab === 0 && <EmergencyAdmission onSubmit={handleEmergencyAdmission} />}
        {tab === 1 && <HospitalAdmission availableBeds={availableBeds} onSubmit={handleHospitalAdmission} />}
        {tab === 2 && <AvailableBeds beds={beds} />}
        {tab === 3 && <InternalTransfers transfers={transfers} admissions={admissions} beds={beds} onSubmit={handleTransfer} />}
        {tab === 4 && <DischargesComponent discharges={discharges} admissions={admissions} onSubmit={handleDischarge} />}
      </Paper>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((p) => ({ ...p, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity ?? 'info'} onClose={() => setSnackbar((p) => ({ ...p, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
