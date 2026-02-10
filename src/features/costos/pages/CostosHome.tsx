import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import EstadoCuentaSection from '../components/EstadoCuentaSection';
import CostosPorServicio from '../components/CostosPorServicio';
import GlosasSection from '../components/GlosasSection';
import FacturacionSection from '../components/FacturacionSection';
import DetalleContableSection from '../components/DetalleContableSection';
import {
  MOCK_ESTADO_CUENTA,
  MOCK_COSTOS_POR_SERVICIO,
  MOCK_GLOSAS,
  MOCK_FACTURACION,
  MOCK_DETALLE_CONTABLE,
} from '../data/mock';

export default function CostosHome() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Costos y Estado de Cuenta
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Control financiero por paciente. Estado de cuenta, costos por servicio, glosas, facturación y detalle contable.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Estado de cuenta" />
          <Tab label="Costos por servicio" />
          <Tab label="Glosas" />
          <Tab label="Facturación" />
          <Tab label="Detalle contable" />
        </Tabs>

        {tab === 0 && <EstadoCuentaSection statements={MOCK_ESTADO_CUENTA} />}
        {tab === 1 && <CostosPorServicio costs={MOCK_COSTOS_POR_SERVICIO} />}
        {tab === 2 && <GlosasSection glosas={MOCK_GLOSAS} />}
        {tab === 3 && <FacturacionSection facturas={MOCK_FACTURACION} />}
        {tab === 4 && <DetalleContableSection items={MOCK_DETALLE_CONTABLE} />}
      </Paper>
    </Box>
  );
}
