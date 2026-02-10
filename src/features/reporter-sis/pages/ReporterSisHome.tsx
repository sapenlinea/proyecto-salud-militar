import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import ReportGeneration from '../components/ReportGeneration';
import DataValidation from '../components/DataValidation';
import ExternalSubmission from '../components/ExternalSubmission';
import ReportHistory from '../components/ReportHistory';
import {
  MOCK_REGULATORY_REPORTS,
  MOCK_VALIDATION_RESULTS,
  MOCK_EXTERNAL_ENTITIES,
  MOCK_REPORT_HISTORY,
} from '../data/mock';

const REPORT_NAMES: Record<string, string> = {
  r1: 'Reporte de atenciones SISPRO',
  r2: 'Cuenta de alto costo',
  r3: 'Reporte inspección vigilancia',
};

export default function ReporterSisHome() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Sistema ReporterSis
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Reportes regulatorios. Generación de reportes normativos, validación de datos, envío a entes externos e histórico.
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Generación de reportes" />
          <Tab label="Validación de datos" />
          <Tab label="Envío a entes externos" />
          <Tab label="Histórico de reportes" />
        </Tabs>

        {tab === 0 && <ReportGeneration reports={MOCK_REGULATORY_REPORTS} />}

        {tab === 1 && (
          <DataValidation
            validations={MOCK_VALIDATION_RESULTS}
            reportNames={REPORT_NAMES}
          />
        )}

        {tab === 2 && (
          <ExternalSubmission
            entities={MOCK_EXTERNAL_ENTITIES}
            reports={MOCK_REGULATORY_REPORTS}
          />
        )}

        {tab === 3 && <ReportHistory submissions={MOCK_REPORT_HISTORY} />}
      </Paper>
    </Box>
  );
}
