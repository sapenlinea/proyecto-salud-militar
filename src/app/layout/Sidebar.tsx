import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ROUTES } from '../router/routes.constants';

const navItems = [
  { path: ROUTES.dashboard, label: 'Dashboard' },
  { path: ROUTES.hce, label: 'HCE' },
  { path: ROUTES.enfermeria, label: 'Enfermería' },
  { path: ROUTES.farmacia, label: 'Farmacia' },
  { path: ROUTES.afiliaciones, label: 'Afiliaciones' },
  { path: ROUTES.admisiones, label: 'Admisiones' },
  { path: ROUTES.agendamiento, label: 'Agendamiento' },
  { path: ROUTES.portafolio, label: 'Portafolio de Servicios' },
  { path: ROUTES.recaudo, label: 'Recaudo' },
  { path: ROUTES.referencias, label: 'Referencia y Contrarreferencia' },
  { path: ROUTES.reportes, label: 'Reportes' },
  { path: ROUTES.fichaFamiliar, label: 'Ficha Familiar' },
  { path: ROUTES.personal, label: 'Personal de Salud' },
  { path: ROUTES.saludAmbiental, label: 'Salud Ambiental' },
  { path: ROUTES.reporterSis, label: 'ReporterSis' },
  { path: ROUTES.pyp, label: 'Promoción y Prevención' },
  { path: ROUTES.vigilancia, label: 'Vigilancia en Salud Pública' },
  { path: ROUTES.cirugias, label: 'Cirugías Ambulatorias' },
  { path: ROUTES.costos, label: 'Costos y Estado de Cuenta' },
  { path: ROUTES.riesgo, label: 'Gestión del Riesgo en Salud' },
  { path: ROUTES.vacunacion, label: 'Vacunación' },
  { path: ROUTES.redExterna, label: 'Red Externa' },
  { path: ROUTES.altoCosto, label: 'Cuentas de Alto Costo' },
  { path: ROUTES.auditoriaCuentas, label: 'Auditoría de Cuentas Médicas' },
  { path: ROUTES.serviciosApoyo, label: 'Servicios de Apoyo' },
  { path: ROUTES.saludOperacional, label: 'Salud Operacional' },
  { path: ROUTES.admin, label: 'Administración' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 260,
        flexShrink: 0,
        borderRight: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight={600} color="primary">
          Salud Militar
        </Typography>
      </Box>
      <List component="nav" dense>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
