import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import ServiceCatalog from '../components/ServiceCatalog';
import TariffsSection from '../components/TariffsSection';
import SpecialtiesSection from '../components/SpecialtiesSection';
import ProceduresSection from '../components/ProceduresSection';
import ServiceValiditySection from '../components/ServiceValiditySection';
import {
  MOCK_SPECIALTIES,
  MOCK_PROCEDURES,
  MOCK_TARIFFS,
  MOCK_SERVICES,
} from '../data/mock';

export default function PortafolioHome() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Portafolio de Servicios
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Administración de servicios habilitados. Catálogo de servicios, tarifas, especialidades, procedimientos y vigencia.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tab label="Catálogo de servicios" />
          <Tab label="Tarifas" />
          <Tab label="Especialidades" />
          <Tab label="Procedimientos" />
          <Tab label="Vigencia del servicio" />
        </Tabs>

        {tab === 0 && <ServiceCatalog services={MOCK_SERVICES} />}
        {tab === 1 && <TariffsSection tariffs={MOCK_TARIFFS} services={MOCK_SERVICES} />}
        {tab === 2 && <SpecialtiesSection specialties={MOCK_SPECIALTIES} />}
        {tab === 3 && <ProceduresSection procedures={MOCK_PROCEDURES} />}
        {tab === 4 && <ServiceValiditySection services={MOCK_SERVICES} />}
      </Paper>
    </Box>
  );
}
