import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import InventorySection from '../components/InventorySection';
import MedicationKardex from '../components/MedicationKardex';
import DispensationSection from '../components/DispensationSection';
import ExpirationAlerts from '../components/ExpirationAlerts';
import SuppliersSection from '../components/SuppliersSection';
import LotsTraceability from '../components/LotsTraceability';
import {
  MOCK_INVENTORY,
  MOCK_KARDEX,
  MOCK_MEDICATIONS,
  MOCK_DISPENSATIONS,
  MOCK_EXPIRATION_ALERTS,
  MOCK_SUPPLIERS,
  MOCK_LOTS,
} from '../data/mock';

export default function FarmaciaHome() {
  const [tab, setTab] = useState(0);

  const medicationNameMap = useMemo(() => {
    const m = new Map<string, string>();
    MOCK_MEDICATIONS.forEach((med) => m.set(med.id, med.name));
    return m;
  }, []);

  const medicationName = (id: string) => medicationNameMap.get(id) ?? id;

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Gestión Farmacéutica
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Control de medicamentos, inventario, dispensación, alertas de vencimiento, proveedores y trazabilidad de lotes.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tab label="Inventario" />
          <Tab label="Kardex" />
          <Tab label="Dispensación" />
          <Tab label="Alertas vencimiento" />
          <Tab label="Proveedores" />
          <Tab label="Lotes y trazabilidad" />
        </Tabs>

        {tab === 0 && (
          <InventorySection items={MOCK_INVENTORY} />
        )}

        {tab === 1 && (
          <MedicationKardex kardexEntries={MOCK_KARDEX} medications={MOCK_MEDICATIONS} />
        )}

        {tab === 2 && (
          <DispensationSection dispensations={MOCK_DISPENSATIONS} />
        )}

        {tab === 3 && (
          <ExpirationAlerts alerts={MOCK_EXPIRATION_ALERTS} />
        )}

        {tab === 4 && (
          <SuppliersSection suppliers={MOCK_SUPPLIERS} />
        )}

        {tab === 5 && (
          <LotsTraceability lots={MOCK_LOTS} medicationName={medicationName} />
        )}
      </Paper>
    </Box>
  );
}
