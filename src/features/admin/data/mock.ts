import type { AdminUser, Role, Permission, SystemParameter, AuditEntry, MasterCatalog } from '../types';

export const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: 'u1',
    username: 'admin',
    email: 'admin@saludmilitar.gov.co',
    displayName: 'Administrador del Sistema',
    roles: ['administrador'],
    active: true,
    lastLogin: '2025-02-07T08:30:00',
    createdAt: '2024-01-15T10:00:00',
  },
  {
    id: 'u2',
    username: 'medico.hce',
    email: 'medico@saludmilitar.gov.co',
    displayName: 'Dr. Juan Pérez',
    roles: ['medico'],
    active: true,
    lastLogin: '2025-02-07T07:45:00',
    createdAt: '2024-03-20T09:00:00',
  },
  {
    id: 'u3',
    username: 'enf.triage',
    email: 'enfermera@saludmilitar.gov.co',
    displayName: 'María López',
    roles: ['enfermera'],
    active: true,
    createdAt: '2024-05-10T14:00:00',
  },
  {
    id: 'u4',
    username: 'farm.sistema',
    email: 'farmacia@saludmilitar.gov.co',
    displayName: 'Carlos Gómez',
    roles: ['farmacia'],
    active: false,
    lastLogin: '2025-01-20T16:00:00',
    createdAt: '2024-02-01T11:00:00',
  },
];

export const MOCK_ROLES: Role[] = [
  {
    id: 'r1',
    name: 'administrador',
    description: 'Acceso total al sistema',
    permissions: ['*'],
  },
  {
    id: 'r2',
    name: 'medico',
    description: 'Médico tratante - HCE, consultas, evoluciones',
    permissions: ['hce:read', 'hce:write', 'agendamiento:read', 'referencias:read', 'referencias:write'],
  },
  {
    id: 'r3',
    name: 'enfermera',
    description: 'Enfermería - signos vitales, notas, planes de cuidado',
    permissions: ['hce:read', 'enfermeria:read', 'enfermeria:write', 'agendamiento:read'],
  },
  {
    id: 'r4',
    name: 'farmacia',
    description: 'Gestión de farmacia e inventario',
    permissions: ['farmacia:read', 'farmacia:write', 'hce:read'],
  },
];

export const MOCK_PERMISSIONS: Permission[] = [
  { id: 'p1', code: 'hce:read', name: 'Leer HCE', module: 'HCE' },
  { id: 'p2', code: 'hce:write', name: 'Escribir HCE', module: 'HCE' },
  { id: 'p3', code: 'enfermeria:read', name: 'Leer Enfermería', module: 'Enfermería' },
  { id: 'p4', code: 'enfermeria:write', name: 'Escribir Enfermería', module: 'Enfermería' },
  { id: 'p5', code: 'farmacia:read', name: 'Leer Farmacia', module: 'Farmacia' },
  { id: 'p6', code: 'farmacia:write', name: 'Escribir Farmacia', module: 'Farmacia' },
  { id: 'p7', code: 'agendamiento:read', name: 'Leer Agendamiento', module: 'Agendamiento' },
  { id: 'p8', code: 'agendamiento:write', name: 'Escribir Agendamiento', module: 'Agendamiento' },
  { id: 'p9', code: 'referencias:read', name: 'Leer Referencias', module: 'Referencias' },
  { id: 'p10', code: 'referencias:write', name: 'Escribir Referencias', module: 'Referencias' },
];

export const MOCK_SYSTEM_PARAMETERS: SystemParameter[] = [
  { id: 'sp1', key: 'nombre_institucion', value: 'IPS Salud Militar', description: 'Nombre de la institución', category: 'General' },
  { id: 'sp2', key: 'nit', value: '900123456-7', description: 'NIT de la institución', category: 'General' },
  { id: 'sp3', key: 'dias_vencimiento_farmacia', value: '90', description: 'Días para alerta de vencimiento de medicamentos', category: 'Farmacia' },
  { id: 'sp4', key: 'max_citas_por_dia', value: '20', description: 'Máximo de citas por profesional por día', category: 'Agendamiento' },
];

export const MOCK_AUDIT_ENTRIES: AuditEntry[] = [
  { id: 'a1', action: 'LOGIN', entity: 'auth', userId: 'u2', userName: 'Dr. Juan Pérez', timestamp: '2025-02-07T08:30:15', details: 'Inicio de sesión exitoso' },
  { id: 'a2', action: 'UPDATE', entity: 'usuario', entityId: 'u3', userId: 'u1', userName: 'Administrador', timestamp: '2025-02-07T08:15:00', details: 'Activar usuario María López' },
  { id: 'a3', action: 'CREATE', entity: 'afiliado', entityId: 'aff-001', userId: 'u2', userName: 'Dr. Juan Pérez', timestamp: '2025-02-07T07:50:22', details: 'Registro de afiliación' },
  { id: 'a4', action: 'UPDATE', entity: 'parametro', entityId: 'sp3', userId: 'u1', userName: 'Administrador', timestamp: '2025-02-06T16:00:00', details: 'dias_vencimiento_farmacia: 60 -> 90' },
];

export const MOCK_MASTER_CATALOGS: MasterCatalog[] = [
  {
    id: 'c1',
    name: 'Tipos de documento',
    description: 'CC, CE, TI, Pasaporte, etc.',
    items: [
      { id: 'c1-i1', code: 'CC', name: 'Cédula de ciudadanía', active: true },
      { id: 'c1-i2', code: 'CE', name: 'Cédula de extranjería', active: true },
      { id: 'c1-i3', code: 'TI', name: 'Tarjeta de identidad', active: true },
      { id: 'c1-i4', code: 'PA', name: 'Pasaporte', active: true },
    ],
  },
  {
    id: 'c2',
    name: 'Regímenes',
    description: 'Contributivo, subsidiado, especial',
    items: [
      { id: 'c2-i1', code: 'CONT', name: 'Contributivo', active: true },
      { id: 'c2-i2', code: 'SUBS', name: 'Subsidiado', active: true },
      { id: 'c2-i3', code: 'ESP', name: 'Especial', active: true },
    ],
  },
];
