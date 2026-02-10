import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import LaboratorioSection from '../components/LaboratorioSection';
import ImagenesDiagnosticas from '../components/ImagenesDiagnosticas';
import ResultadosSection from '../components/ResultadosSection';
import ValidacionMedicaSection from '../components/ValidacionMedica';
import EntregaResultados from '../components/EntregaResultados';
import {
  MOCK_LABORATORIO,
  MOCK_IMAGENES,
  MOCK_RESULTADOS,
  MOCK_VALIDACIONES,
  MOCK_ENTREGAS,
} from '../data/mock';

export default function ServiciosApoyoHome() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Servicios de Apoyo
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Gestión de apoyo diagnóstico. Laboratorio, imágenes diagnósticas, resultados, validación médica y entrega de resultados.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Laboratorio" />
          <Tab label="Imágenes diagnósticas" />
          <Tab label="Resultados" />
          <Tab label="Validación médica" />
          <Tab label="Entrega de resultados" />
        </Tabs>

        {tab === 0 && <LaboratorioSection solicitudes={MOCK_LABORATORIO} />}
        {tab === 1 && <ImagenesDiagnosticas solicitudes={MOCK_IMAGENES} />}
        {tab === 2 && <ResultadosSection resultados={MOCK_RESULTADOS} />}
        {tab === 3 && <ValidacionMedicaSection validaciones={MOCK_VALIDACIONES} />}
        {tab === 4 && <EntregaResultados entregas={MOCK_ENTREGAS} />}
      </Paper>
    </Box>
  );
}
