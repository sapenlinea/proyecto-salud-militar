import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import StaffRegistry from '../components/StaffRegistry';
import ProfessionsSpecialties from '../components/ProfessionsSpecialties';
import Shifts from '../components/Shifts';
import Contracts from '../components/Contracts';
import Licenses from '../components/Licenses';
import {
  MOCK_STAFF,
  MOCK_PROFESSIONS,
  MOCK_SPECIALTIES,
  MOCK_SHIFTS,
  MOCK_CONTRACTS,
  MOCK_LICENSES,
} from '../data/mock';

export default function PersonalHome() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Administración del Personal de Salud
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Gestión del talento humano. Registro del personal, profesiones, especialidades, turnos, contratos y habilitaciones.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Registro del personal" />
          <Tab label="Profesiones y especialidades" />
          <Tab label="Turnos" />
          <Tab label="Contratos" />
          <Tab label="Habilitaciones" />
        </Tabs>

        {tab === 0 && <StaffRegistry staff={MOCK_STAFF} />}

        {tab === 1 && (
          <ProfessionsSpecialties
            professions={MOCK_PROFESSIONS}
            specialties={MOCK_SPECIALTIES}
          />
        )}

        {tab === 2 && <Shifts shifts={MOCK_SHIFTS} />}

        {tab === 3 && <Contracts contracts={MOCK_CONTRACTS} />}

        {tab === 4 && <Licenses licenses={MOCK_LICENSES} />}
      </Paper>
    </Box>
  );
}
