import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import IpsExternas from '../components/IpsExternas';
import Convenios from '../components/Convenios';
import ServiciosDisponibles from '../components/ServiciosDisponibles';
import DerivacionesSection from '../components/DerivacionesSection';
import {
  MOCK_IPS_EXTERNAS,
  MOCK_CONVENIOS,
  MOCK_SERVICIOS_EXTERNOS,
  MOCK_DERIVACIONES,
} from '../data/mock';

export default function RedExternaHome() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Red Externa
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Gestión de prestadores externos. IPS externas, convenios, servicios disponibles y derivaciones.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="IPS externas" />
          <Tab label="Convenios" />
          <Tab label="Servicios disponibles" />
          <Tab label="Derivaciones" />
        </Tabs>

        {tab === 0 && <IpsExternas ips={MOCK_IPS_EXTERNAS} />}
        {tab === 1 && <Convenios convenios={MOCK_CONVENIOS} />}
        {tab === 2 && <ServiciosDisponibles servicios={MOCK_SERVICIOS_EXTERNOS} />}
        {tab === 3 && <DerivacionesSection derivaciones={MOCK_DERIVACIONES} />}
      </Paper>
    </Box>
  );
}
