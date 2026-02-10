import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import EstratificacionRiesgoSection from '../components/EstratificacionRiesgo';
import PacientesPriorizados from '../components/PacientesPriorizados';
import AlertasSection from '../components/AlertasSection';
import PlanesIntervencion from '../components/PlanesIntervencion';
import {
  MOCK_ESTRATIFICACION,
  MOCK_PACIENTES_PRIORIZADOS,
  MOCK_ALERTAS,
  MOCK_PLANES_INTERVENCION,
} from '../data/mock';

export default function RiesgoHome() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Gestión del Riesgo en Salud
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Identificación y control de riesgos. Estratificación, pacientes priorizados, alertas y planes de intervención.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Estratificación de riesgo" />
          <Tab label="Pacientes priorizados" />
          <Tab label="Alertas" />
          <Tab label="Planes de intervención" />
        </Tabs>

        {tab === 0 && <EstratificacionRiesgoSection items={MOCK_ESTRATIFICACION} />}
        {tab === 1 && <PacientesPriorizados patients={MOCK_PACIENTES_PRIORIZADOS} />}
        {tab === 2 && <AlertasSection alertas={MOCK_ALERTAS} />}
        {tab === 3 && <PlanesIntervencion planes={MOCK_PLANES_INTERVENCION} />}
      </Paper>
    </Box>
  );
}
