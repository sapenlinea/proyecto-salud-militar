import { Navigate, Route, Routes } from 'react-router-dom';
import RequireAuth from './guards/RequireAuth';
import AppShell from '../layout/AppShell';
import LoginPage from '../../features/auth/pages/LoginPage.tsx';
import DashboardPage from '../../features/dashboard/pages/DashboardPage.tsx';
import HceHome from '../../features/hce/pages/HceHome.tsx';
import EnfermeriaHome from '../../features/enfermeria/pages/EnfermeriaHome.tsx';
import FarmaciaHome from '../../features/farmacia/pages/FarmaciaHome.tsx';
import AfiliacionesHome from '../../features/afiliaciones/pages/AfiliacionesHome.tsx';
import AdmisionesHome from '../../features/admisiones/pages/AdmisionesHome.tsx';
import AgendamientoHome from '../../features/agendamiento/pages/AgendamientoHome.tsx';
import PortafolioHome from '../../features/portafolio/pages/PortafolioHome.tsx';
import RecaudoHome from '../../features/recaudo/pages/RecaudoHome.tsx';
import ReferenciasHome from '../../features/referencias/pages/ReferenciasHome.tsx';
import ReportesHome from '../../features/reportes/pages/ReportesHome.tsx';
import UsuariosPage from '../../features/admin/pages/UsuariosPage.tsx';
import RolesPage from '../../features/admin/pages/RolesPage.tsx';
import PermisosPage from '../../features/admin/pages/PermisosPage.tsx';
import { ROUTES } from './routes.constants';

export { ROUTES } from './routes.constants';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to={ROUTES.dashboard} replace />} />
        <Route path={ROUTES.dashboard.replace(/^\//, '')} element={<DashboardPage />} />
        <Route path={ROUTES.hce.replace(/^\//, '')} element={<HceHome />} />
        <Route path={ROUTES.enfermeria.replace(/^\//, '')} element={<EnfermeriaHome />} />
        <Route path={ROUTES.farmacia.replace(/^\//, '')} element={<FarmaciaHome />} />
        <Route path={ROUTES.afiliaciones.replace(/^\//, '')} element={<AfiliacionesHome />} />
        <Route path={ROUTES.admisiones.replace(/^\//, '')} element={<AdmisionesHome />} />
        <Route path={ROUTES.agendamiento.replace(/^\//, '')} element={<AgendamientoHome />} />
        <Route path={ROUTES.portafolio.replace(/^\//, '')} element={<PortafolioHome />} />
        <Route path={ROUTES.recaudo.replace(/^\//, '')} element={<RecaudoHome />} />
        <Route path={ROUTES.referencias.replace(/^\//, '')} element={<ReferenciasHome />} />
        <Route path={ROUTES.reportes.replace(/^\//, '')} element={<ReportesHome />} />
        <Route path="admin">
          <Route path="usuarios" element={<UsuariosPage />} />
          <Route path="roles" element={<RolesPage />} />
          <Route path="permisos" element={<PermisosPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
