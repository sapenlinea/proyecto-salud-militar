import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ROUTES } from '../router/routes';

const navItems = [
  { path: ROUTES.dashboard, label: 'Dashboard' },
  { path: ROUTES.hce, label: 'HCE' },
  { path: ROUTES.enfermeria, label: 'Enfermería' },
  { path: ROUTES.farmacia, label: 'Farmacia' },
  { path: ROUTES.admisiones, label: 'Admisiones' },
  { path: ROUTES.agendamiento, label: 'Agendamiento' },
  { path: ROUTES.reportes, label: 'Reportes' },
  { path: ROUTES.usuarios, label: 'Usuarios' },
  { path: ROUTES.roles, label: 'Roles' },
  { path: ROUTES.permisos, label: 'Permisos' },
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
