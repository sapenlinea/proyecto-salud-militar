import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import NotificationEvents from '../components/NotificationEvents';
import Sivigila from '../components/Sivigila';
import EarlyAlerts from '../components/EarlyAlerts';
import EpidemiologicalMaps from '../components/EpidemiologicalMaps';
import ActiveCases from '../components/ActiveCases';
import {
  MOCK_NOTIFICATION_EVENTS,
  MOCK_SIVIGILA_CASES,
  MOCK_EARLY_ALERTS,
  MOCK_EPIDEMIOLOGICAL_POINTS,
  MOCK_ACTIVE_CASES,
} from '../data/mock';

export default function VigilanciaHome() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Vigilancia en Salud Pública
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Control epidemiológico. Eventos de notificación, SIVIGILA, alertas tempranas, mapas epidemiológicos y casos activos.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Eventos de notificación" />
          <Tab label="SIVIGILA" />
          <Tab label="Alertas tempranas" />
          <Tab label="Mapas epidemiológicos" />
          <Tab label="Casos activos" />
        </Tabs>

        {tab === 0 && <NotificationEvents events={MOCK_NOTIFICATION_EVENTS} />}

        {tab === 1 && <Sivigila cases={MOCK_SIVIGILA_CASES} />}

        {tab === 2 && <EarlyAlerts alerts={MOCK_EARLY_ALERTS} />}

        {tab === 3 && <EpidemiologicalMaps points={MOCK_EPIDEMIOLOGICAL_POINTS} />}

        {tab === 4 && <ActiveCases cases={MOCK_ACTIVE_CASES} />}
      </Paper>
    </Box>
  );
}
