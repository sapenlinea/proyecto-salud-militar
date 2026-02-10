import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PacientesCAC from '../components/PacientesCAC';
import DiagnosticosCAC from '../components/DiagnosticosCAC';
import CostosAcumulados from '../components/CostosAcumulados';
import IndicadoresCAC from '../components/IndicadoresCAC';
import ReportesRegulatorios from '../components/ReportesRegulatorios';
import {
  MOCK_PACIENTES_CAC,
  MOCK_DIAGNOSTICOS_CAC,
  MOCK_COSTOS_ACUMULADOS,
  MOCK_INDICADORES_CAC,
  MOCK_REPORTES_REGULATORIOS,
} from '../data/mock';

export default function AltoCostoHome() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Cuentas de Alto Costo
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Seguimiento de patologías de alto costo. Pacientes CAC, diagnósticos, costos acumulados, indicadores y reportes regulatorios.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Pacientes CAC" />
          <Tab label="Diagnósticos" />
          <Tab label="Costos acumulados" />
          <Tab label="Indicadores" />
          <Tab label="Reportes regulatorios" />
        </Tabs>

        {tab === 0 && <PacientesCAC patients={MOCK_PACIENTES_CAC} />}
        {tab === 1 && <DiagnosticosCAC diagnosticos={MOCK_DIAGNOSTICOS_CAC} />}
        {tab === 2 && <CostosAcumulados costos={MOCK_COSTOS_ACUMULADOS} />}
        {tab === 3 && <IndicadoresCAC indicadores={MOCK_INDICADORES_CAC} />}
        {tab === 4 && <ReportesRegulatorios reportes={MOCK_REPORTES_REGULATORIOS} />}
      </Paper>
    </Box>
  );
}
