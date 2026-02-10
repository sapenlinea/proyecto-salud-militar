import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import CarnetDigital from '../components/CarnetDigital';
import AplicacionVacunas from '../components/AplicacionVacunas';
import EsquemasPorEdad from '../components/EsquemasPorEdad';
import CoberturasSection from '../components/CoberturasSection';
import ReportesPAI from '../components/ReportesPAI';
import {
  MOCK_CARNETES,
  MOCK_APLICACIONES,
  MOCK_ESQUEMAS_EDAD,
  MOCK_COBERTURAS,
  MOCK_REPORTES_PAI,
} from '../data/mock';

export default function VacunacionHome() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Vacunación
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Control del esquema de vacunación. Carnet digital, aplicación, esquemas por edad, coberturas y reportes PAI.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Carnet digital" />
          <Tab label="Aplicación de vacunas" />
          <Tab label="Esquemas por edad" />
          <Tab label="Coberturas" />
          <Tab label="Reportes PAI" />
        </Tabs>

        {tab === 0 && <CarnetDigital carnets={MOCK_CARNETES} />}
        {tab === 1 && <AplicacionVacunas aplicaciones={MOCK_APLICACIONES} />}
        {tab === 2 && <EsquemasPorEdad esquemas={MOCK_ESQUEMAS_EDAD} />}
        {tab === 3 && <CoberturasSection coberturas={MOCK_COBERTURAS} />}
        {tab === 4 && <ReportesPAI reportes={MOCK_REPORTES_PAI} />}
      </Paper>
    </Box>
  );
}
