export interface IpsExterna {
  id: string;
  nit: string;
  name: string;
  type: 'hospital' | 'clinica' | 'laboratorio' | 'imagenologia' | 'otro';
  address: string;
  city: string;
  phone: string;
  email?: string;
  status: 'activo' | 'inactivo' | 'suspendido';
}

export interface Convenio {
  id: string;
  ipsExternaId: string;
  ipsExternaName: string;
  agreementNumber: string;
  startDate: string;
  endDate: string;
  type: 'servicios_generales' | 'laboratorio' | 'imagenologia' | 'urgencias' | 'hospitalizacion';
  status: 'vigente' | 'vencido' | 'renovacion_pendiente';
}

export interface ServicioExterno {
  id: string;
  ipsExternaId: string;
  ipsExternaName: string;
  serviceCode: string;
  serviceName: string;
  category: string;
  unitPrice: number;
  available: boolean;
}

export interface Derivacion {
  id: string;
  patientDocument: string;
  patientName: string;
  ipsExternaId: string;
  ipsExternaName: string;
  service: string;
  reason: string;
  date: string;
  status: 'solicitada' | 'confirmada' | 'atendida' | 'cancelada';
  appointmentDate?: string;
}
