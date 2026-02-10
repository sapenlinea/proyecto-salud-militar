import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import MedicationCrud from '../components/MedicationCrud';
import SupplierCrud from '../components/SupplierCrud';
import InventorySection from '../components/InventorySection';
import MedicationKardex from '../components/MedicationKardex';
import DispensationSection from '../components/DispensationSection';
import ExpirationAlerts from '../components/ExpirationAlerts';
import LotsTraceability from '../components/LotsTraceability';
import {
  MOCK_MEDICATIONS,
  MOCK_LOTS,
  MOCK_KARDEX,
  MOCK_DISPENSATIONS,
  MOCK_EXPIRATION_ALERTS,
  MOCK_SUPPLIERS,
} from '../data/mock';
import type { Medication, Supplier, InventoryItem } from '../types';

function buildInventory(medications: Medication[], lots: typeof MOCK_LOTS): InventoryItem[] {
  return medications.map((med) => {
    const medLots = lots.filter((l) => l.medicationId === med.id);
    const total = medLots.reduce((s, l) => s + l.quantity, 0);
    return {
      id: `inv-${med.id}`,
      medicationId: med.id,
      medication: med,
      totalQuantity: total,
      lots: medLots,
      minStock: 100,
      lastUpdate: new Date().toISOString(),
      location: 'Anaquel principal',
    };
  });
}

export default function FarmaciaHome() {
  const [tab, setTab] = useState(0);
  const [medications, setMedications] = useState<Medication[]>(MOCK_MEDICATIONS);
  const [suppliers, setSuppliers] = useState<Supplier[]>(MOCK_SUPPLIERS);

  const medicationNameMap = useMemo(() => {
    const m = new Map<string, string>();
    medications.forEach((med) => m.set(med.id, med.name));
    return m;
  }, [medications]);

  const medicationName = (id: string) => medicationNameMap.get(id) ?? id;

  const inventory = useMemo(() => buildInventory(medications, MOCK_LOTS), [medications]);

  const kardexMedications = medications;

  function handleMedicationCreate(data: Medication) {
    setMedications((prev) => [...prev, data]);
  }

  function handleMedicationUpdate(id: string, updates: Partial<Medication>) {
    setMedications((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  }

  function handleMedicationDelete(id: string) {
    setMedications((prev) => prev.filter((m) => m.id !== id));
  }

  function handleSupplierCreate(data: Supplier) {
    setSuppliers((prev) => [...prev, data]);
  }

  function handleSupplierUpdate(id: string, updates: Partial<Supplier>) {
    setSuppliers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  }

  function handleSupplierDelete(id: string) {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
  }

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
          <Tab label="Medicamentos" />
          <Tab label="Proveedores" />
          <Tab label="Inventario" />
          <Tab label="Kardex" />
          <Tab label="Dispensación" />
          <Tab label="Alertas vencimiento" />
          <Tab label="Lotes y trazabilidad" />
        </Tabs>

        {tab === 0 && (
          <MedicationCrud
            medications={medications}
            onMedicationCreate={handleMedicationCreate}
            onMedicationUpdate={handleMedicationUpdate}
            onMedicationDelete={handleMedicationDelete}
          />
        )}

        {tab === 1 && (
          <SupplierCrud
            suppliers={suppliers}
            onSupplierCreate={handleSupplierCreate}
            onSupplierUpdate={handleSupplierUpdate}
            onSupplierDelete={handleSupplierDelete}
          />
        )}

        {tab === 2 && (
          <InventorySection items={inventory} />
        )}

        {tab === 3 && (
          <MedicationKardex kardexEntries={MOCK_KARDEX} medications={kardexMedications} />
        )}

        {tab === 4 && (
          <DispensationSection dispensations={MOCK_DISPENSATIONS} />
        )}

        {tab === 5 && (
          <ExpirationAlerts alerts={MOCK_EXPIRATION_ALERTS} />
        )}

        {tab === 6 && (
          <LotsTraceability lots={MOCK_LOTS} medicationName={medicationName} />
        )}
      </Paper>
    </Box>
  );
}
