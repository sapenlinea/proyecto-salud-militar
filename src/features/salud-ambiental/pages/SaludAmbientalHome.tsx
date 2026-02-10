import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import SanitaryInspections from '../components/SanitaryInspections';
import EnvironmentalRiskFactors from '../components/EnvironmentalRiskFactors';
import EventReports from '../components/EventReports';
import Georeferencing from '../components/Georeferencing';
import ImprovementPlans from '../components/ImprovementPlans';
import {
  MOCK_INSPECTIONS,
  MOCK_RISK_FACTORS,
  MOCK_EVENT_REPORTS,
  MOCK_GEO_LOCATIONS,
  MOCK_IMPROVEMENT_PLANS,
} from '../data/mock';

export default function SaludAmbientalHome() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Salud Ambiental
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Vigilancia del entorno. Inspecciones sanitarias, factores de riesgo ambiental, reportes de eventos, georreferenciación y planes de mejora.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Inspecciones sanitarias" />
          <Tab label="Factores de riesgo ambiental" />
          <Tab label="Reportes de eventos" />
          <Tab label="Georreferenciación" />
          <Tab label="Planes de mejora" />
        </Tabs>

        {tab === 0 && <SanitaryInspections inspections={MOCK_INSPECTIONS} />}

        {tab === 1 && <EnvironmentalRiskFactors riskFactors={MOCK_RISK_FACTORS} />}

        {tab === 2 && <EventReports reports={MOCK_EVENT_REPORTS} />}

        {tab === 3 && <Georeferencing locations={MOCK_GEO_LOCATIONS} />}

        {tab === 4 && <ImprovementPlans plans={MOCK_IMPROVEMENT_PLANS} />}
      </Paper>
    </Box>
  );
}
