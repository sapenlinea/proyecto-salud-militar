import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import EvaluacionesMedicasLaborales from '../components/EvaluacionesMedicasLaborales';
import RiesgosLaborales from '../components/RiesgosLaborales';
import AccidentesTrabajo from '../components/AccidentesTrabajo';
import SeguimientoSaludOperacionalSection from '../components/SeguimientoSaludOperacional';
import ReportesARL from '../components/ReportesARL';
import {
  MOCK_EVALUACIONES,
  MOCK_RIESGOS,
  MOCK_ACCIDENTES,
  MOCK_SEGUIMIENTOS,
  MOCK_REPORTES_ARL,
} from '../data/mock';

export default function SaludOperacionalHome() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Salud Operacional
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Salud ocupacional. Evaluaciones médicas laborales, riesgos laborales, accidentes de trabajo, seguimiento y reportes ARL.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Evaluaciones médicas laborales" />
          <Tab label="Riesgos laborales" />
          <Tab label="Accidentes de trabajo" />
          <Tab label="Seguimiento" />
          <Tab label="Reportes ARL" />
        </Tabs>

        {tab === 0 && <EvaluacionesMedicasLaborales evaluaciones={MOCK_EVALUACIONES} />}
        {tab === 1 && <RiesgosLaborales riesgos={MOCK_RIESGOS} />}
        {tab === 2 && <AccidentesTrabajo accidentes={MOCK_ACCIDENTES} />}
        {tab === 3 && <SeguimientoSaludOperacionalSection seguimientos={MOCK_SEGUIMIENTOS} />}
        {tab === 4 && <ReportesARL reportes={MOCK_REPORTES_ARL} />}
      </Paper>
    </Box>
  );
}
