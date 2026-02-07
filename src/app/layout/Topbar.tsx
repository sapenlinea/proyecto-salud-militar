import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../core/auth/auth.store.tsx';
import { ROUTES } from '../router/routes';

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate(ROUTES.login, { replace: true });
  }

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
          Proyecto Salud Militar
        </Typography>
        {user && (
          <Typography variant="body2" sx={{ mr: 2 }} color="inherit">
            {user.displayName ?? user.username}
          </Typography>
        )}
        <Button color="inherit" onClick={handleLogout}>
          Salir
        </Button>
      </Toolbar>
    </AppBar>
  );
}
