import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FamilyNucleus from '../components/FamilyNucleus';
import FamilyRisks from '../components/FamilyRisks';
import HomeVisits from '../components/HomeVisits';
import Interventions from '../components/Interventions';
import FollowUpSection from '../components/FollowUp';
import { MOCK_FAMILY_FILE } from '../data/mock';

export default function FichaFamiliarHome() {
  const [tab, setTab] = useState(0);
  const [familyFile] = useState(MOCK_FAMILY_FILE);
  const [search, setSearch] = useState('');

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Ficha Familiar
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Atención con enfoque familiar. Núcleo familiar, riesgos, visitas domiciliarias, intervenciones y seguimiento.
      </Typography>

      <Box sx={{ mb: 2 }}>
        <TextField
          size="small"
          label="Buscar hogar"
          placeholder="ID hogar, documento o dirección"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 300 }}
        />
      </Box>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Box sx={{ mb: 2, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle2" color="text.secondary">
            Hogar seleccionado
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {familyFile.householdId} - {familyFile.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {familyFile.city} · {familyFile.members.length} miembros
          </Typography>
        </Box>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Núcleo familiar" />
          <Tab label="Riesgos familiares" />
          <Tab label="Visitas domiciliarias" />
          <Tab label="Intervenciones" />
          <Tab label="Seguimiento" />
        </Tabs>

        {tab === 0 && <FamilyNucleus familyFile={familyFile} />}

        {tab === 1 && <FamilyRisks risks={familyFile.risks} />}

        {tab === 2 && <HomeVisits visits={familyFile.visits} />}

        {tab === 3 && <Interventions interventions={familyFile.interventions} />}

        {tab === 4 && <FollowUpSection followUps={familyFile.followUps} />}
      </Paper>
    </Box>
  );
}
