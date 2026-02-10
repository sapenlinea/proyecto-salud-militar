import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import SurgicalSchedule from '../components/SurgicalSchedule';
import Preoperative from '../components/Preoperative';
import Postoperative from '../components/Postoperative';
import SurgicalSupplies from '../components/SurgicalSupplies';
import SurgicalReports from '../components/SurgicalReports';
import {
  MOCK_SURGICAL_SCHEDULE,
  MOCK_PREOPERATIVE,
  MOCK_POSTOPERATIVE,
  MOCK_SURGICAL_SUPPLIES,
  MOCK_SURGICAL_REPORTS,
} from '../data/mock';

export default function CirugiasHome() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Cirugías Ambulatorias
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Gestión quirúrgica ambulatoria. Programación, preoperatorio, postoperatorio, insumos y reportes quirúrgicos.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Programación quirúrgica" />
          <Tab label="Preoperatorio" />
          <Tab label="Postoperatorio" />
          <Tab label="Insumos" />
          <Tab label="Reportes quirúrgicos" />
        </Tabs>

        {tab === 0 && <SurgicalSchedule schedules={MOCK_SURGICAL_SCHEDULE} />}

        {tab === 1 && <Preoperative preoperatives={MOCK_PREOPERATIVE} />}

        {tab === 2 && <Postoperative postoperatives={MOCK_POSTOPERATIVE} />}

        {tab === 3 && <SurgicalSupplies supplies={MOCK_SURGICAL_SUPPLIES} />}

        {tab === 4 && <SurgicalReports reports={MOCK_SURGICAL_REPORTS} />}
      </Paper>
    </Box>
  );
}
