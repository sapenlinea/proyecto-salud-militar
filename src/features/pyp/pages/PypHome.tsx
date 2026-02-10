import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import ActivePrograms from '../components/ActivePrograms';
import TargetPopulationSection from '../components/TargetPopulation';
import Activities from '../components/Activities';
import CoverageIndicators from '../components/CoverageIndicators';
import FollowUp from '../components/FollowUp';
import {
  MOCK_PYP_PROGRAMS,
  MOCK_TARGET_POPULATION,
  MOCK_PYP_ACTIVITIES,
  MOCK_COVERAGE_INDICATORS,
  MOCK_PYP_FOLLOW_UPS,
} from '../data/mock';

export default function PypHome() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Promoción y Prevención
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Programas de PYP. Programas activos, población objetivo, actividades, indicadores de cobertura y seguimiento.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Programas activos" />
          <Tab label="Población objetivo" />
          <Tab label="Actividades" />
          <Tab label="Indicadores de cobertura" />
          <Tab label="Seguimiento" />
        </Tabs>

        {tab === 0 && <ActivePrograms programs={MOCK_PYP_PROGRAMS} />}

        {tab === 1 && <TargetPopulationSection populations={MOCK_TARGET_POPULATION} />}

        {tab === 2 && <Activities activities={MOCK_PYP_ACTIVITIES} />}

        {tab === 3 && <CoverageIndicators indicators={MOCK_COVERAGE_INDICATORS} />}

        {tab === 4 && <FollowUp followUps={MOCK_PYP_FOLLOW_UPS} />}
      </Paper>
    </Box>
  );
}
