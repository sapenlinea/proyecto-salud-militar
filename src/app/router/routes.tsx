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
import FichaFamiliarHome from '../../features/ficha-familiar/pages/FichaFamiliarHome.tsx';
import PersonalHome from '../../features/personal/pages/PersonalHome.tsx';
import SaludAmbientalHome from '../../features/salud-ambiental/pages/SaludAmbientalHome.tsx';
import ReporterSisHome from '../../features/reporter-sis/pages/ReporterSisHome.tsx';
import PypHome from '../../features/pyp/pages/PypHome.tsx';
import VigilanciaHome from '../../features/vigilancia/pages/VigilanciaHome.tsx';
import CirugiasHome from '../../features/cirugias/pages/CirugiasHome.tsx';
import CostosHome from '../../features/costos/pages/CostosHome.tsx';
import RiesgoHome from '../../features/riesgo/pages/RiesgoHome.tsx';
import VacunacionHome from '../../features/vacunacion/pages/VacunacionHome.tsx';
import RedExternaHome from '../../features/red-externa/pages/RedExternaHome.tsx';
import AltoCostoHome from '../../features/alto-costo/pages/AltoCostoHome.tsx';
import AuditoriaCuentasHome from '../../features/auditoria-cuentas/pages/AuditoriaCuentasHome.tsx';
import ServiciosApoyoHome from '../../features/servicios-apoyo/pages/ServiciosApoyoHome.tsx';
import SaludOperacionalHome from '../../features/salud-operacional/pages/SaludOperacionalHome.tsx';
import AdminHome from '../../features/admin/pages/AdminHome.tsx';
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
        <Route path={ROUTES.fichaFamiliar.replace(/^\//, '')} element={<FichaFamiliarHome />} />
        <Route path={ROUTES.personal.replace(/^\//, '')} element={<PersonalHome />} />
        <Route path={ROUTES.saludAmbiental.replace(/^\//, '')} element={<SaludAmbientalHome />} />
        <Route path={ROUTES.reporterSis.replace(/^\//, '')} element={<ReporterSisHome />} />
        <Route path={ROUTES.pyp.replace(/^\//, '')} element={<PypHome />} />
        <Route path={ROUTES.vigilancia.replace(/^\//, '')} element={<VigilanciaHome />} />
        <Route path={ROUTES.cirugias.replace(/^\//, '')} element={<CirugiasHome />} />
        <Route path={ROUTES.costos.replace(/^\//, '')} element={<CostosHome />} />
        <Route path={ROUTES.riesgo.replace(/^\//, '')} element={<RiesgoHome />} />
        <Route path={ROUTES.vacunacion.replace(/^\//, '')} element={<VacunacionHome />} />
        <Route path={ROUTES.redExterna.replace(/^\//, '')} element={<RedExternaHome />} />
        <Route path={ROUTES.altoCosto.replace(/^\//, '')} element={<AltoCostoHome />} />
        <Route path={ROUTES.auditoriaCuentas.replace(/^\//, '')} element={<AuditoriaCuentasHome />} />
        <Route path={ROUTES.serviciosApoyo.replace(/^\//, '')} element={<ServiciosApoyoHome />} />
        <Route path={ROUTES.saludOperacional.replace(/^\//, '')} element={<SaludOperacionalHome />} />
        <Route path={ROUTES.admin.replace(/^\//, '')} element={<AdminHome />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
