import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import AuditoriaConcurrenteSection from '../components/AuditoriaConcurrente';
import AuditoriaPosteriorSection from '../components/AuditoriaPosterior';
import GlosasAuditoriaSection from '../components/GlosasAuditoria';
import TrazabilidadAuditoriaSection from '../components/TrazabilidadAuditoria';
import InformesAuditoriaSection from '../components/InformesAuditoria';
import {
  MOCK_AUDITORIA_CONCURRENTE,
  MOCK_AUDITORIA_POSTERIOR,
  MOCK_GLOSAS_AUDITORIA,
  MOCK_TRAZABILIDAD,
  MOCK_INFORMES_AUDITORIA,
} from '../data/mock';

export default function AuditoriaCuentasHome() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Auditoría de Cuentas Médicas
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Control y validación de facturación. Auditoría concurrente, posterior, glosas, trazabilidad e informes.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Auditoría concurrente" />
          <Tab label="Auditoría posterior" />
          <Tab label="Glosas" />
          <Tab label="Trazabilidad" />
          <Tab label="Informes" />
        </Tabs>

        {tab === 0 && <AuditoriaConcurrenteSection auditorias={MOCK_AUDITORIA_CONCURRENTE} />}
        {tab === 1 && <AuditoriaPosteriorSection auditorias={MOCK_AUDITORIA_POSTERIOR} />}
        {tab === 2 && <GlosasAuditoriaSection glosas={MOCK_GLOSAS_AUDITORIA} />}
        {tab === 3 && <TrazabilidadAuditoriaSection items={MOCK_TRAZABILIDAD} />}
        {tab === 4 && <InformesAuditoriaSection informes={MOCK_INFORMES_AUDITORIA} />}
      </Paper>
    </Box>
  );
}
