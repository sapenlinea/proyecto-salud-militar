import type {
  SolicitudLaboratorio,
  SolicitudImagen,
  ResultadoEstudio,
  ValidacionMedica,
  EntregaResultado,
} from '../types';

export const MOCK_LABORATORIO: SolicitudLaboratorio[] = [
  { id: 'l1', patientDocument: '52345678', patientName: 'Juan Pérez', studyCode: '300101', studyName: 'Hemograma', orderDate: '2025-02-05', status: 'resultado_listo', orderedBy: 'Dr. Martínez', priority: 'rutina' },
  { id: 'l2', patientDocument: '80123456', patientName: 'María López', studyCode: '300201', studyName: 'Glucosa', orderDate: '2025-02-05', status: 'validado', orderedBy: 'Dr. Rodríguez' },
  { id: 'l3', patientDocument: '10987654', patientName: 'Carlos Rodríguez', studyCode: '300301', studyName: 'Perfil lipídico', orderDate: '2025-02-06', status: 'en_proceso', orderedBy: 'Dr. Pérez', priority: 'rutina' },
  { id: 'l4', patientDocument: '52555123', patientName: 'Ana Martínez', studyCode: '300401', studyName: 'Creatinina', orderDate: '2025-02-06', status: 'solicitado', orderedBy: 'Dr. Martínez', priority: 'urgente' },
];

export const MOCK_IMAGENES: SolicitudImagen[] = [
  { id: 'i1', patientDocument: '52345678', patientName: 'Juan Pérez', studyCode: '412001', studyName: 'RX tórax', modality: 'rx', orderDate: '2025-02-05', appointmentDate: '2025-02-05', status: 'informado', orderedBy: 'Dr. Martínez' },
  { id: 'i2', patientDocument: '80123456', patientName: 'María López', studyCode: '413001', studyName: 'Ecografía abdominal', modality: 'ecografia', orderDate: '2025-02-04', appointmentDate: '2025-02-08', status: 'agendado', orderedBy: 'Dr. Rodríguez' },
  { id: 'i3', patientDocument: '10987654', patientName: 'Carlos Rodríguez', studyCode: '414001', studyName: 'TAC cráneo', modality: 'tomografia', orderDate: '2025-02-06', status: 'solicitado', orderedBy: 'Dr. Pérez' },
  { id: 'i4', patientDocument: '52555123', patientName: 'Ana Martínez', studyCode: '412002', studyName: 'RX columna lumbar', modality: 'rx', orderDate: '2025-02-03', appointmentDate: '2025-02-03', status: 'validado', orderedBy: 'Dr. Martínez' },
];

export const MOCK_RESULTADOS: ResultadoEstudio[] = [
  {
    id: 'r1',
    requestId: 'l1',
    patientDocument: '52345678',
    patientName: 'Juan Pérez',
    studyType: 'laboratorio',
    studyName: 'Hemograma',
    resultDate: '2025-02-05',
    status: 'definitivo',
    values: [
      { parameter: 'Hemoglobina', value: '14.2', unit: 'g/dL', referenceRange: '13-17', flag: 'normal' },
      { parameter: 'Hematocrito', value: '42', unit: '%', referenceRange: '40-50', flag: 'normal' },
      { parameter: 'Leucocitos', value: '8.5', unit: '/µL', referenceRange: '4.5-11', flag: 'normal' },
    ],
  },
  {
    id: 'r2',
    requestId: 'l2',
    patientDocument: '80123456',
    patientName: 'María López',
    studyType: 'laboratorio',
    studyName: 'Glucosa',
    resultDate: '2025-02-05',
    status: 'validado',
    values: [
      { parameter: 'Glucosa', value: '105', unit: 'mg/dL', referenceRange: '70-100', flag: 'alto' },
    ],
  },
  {
    id: 'r3',
    requestId: 'i1',
    patientDocument: '52345678',
    patientName: 'Juan Pérez',
    studyType: 'imagen',
    studyName: 'RX tórax',
    resultDate: '2025-02-05',
    status: 'definitivo',
    report: 'Campos pulmonares libres. Silueta cardíaca conservada. Sin hallazgos patológicos.',
  },
];

export const MOCK_VALIDACIONES: ValidacionMedica[] = [
  { id: 'v1', resultId: 'r1', patientDocument: '52345678', patientName: 'Juan Pérez', studyName: 'Hemograma', validationDate: '2025-02-05', validatedBy: 'Dr. Martínez', status: 'validado' },
  { id: 'v2', resultId: 'r2', patientDocument: '80123456', patientName: 'María López', studyName: 'Glucosa', validationDate: '2025-02-06', validatedBy: 'Dr. Rodríguez', status: 'validado', observations: 'Valor alto, sugerir control y HbA1c' },
  { id: 'v3', resultId: 'r3', patientDocument: '52345678', patientName: 'Juan Pérez', studyName: 'RX tórax', validationDate: '2025-02-05', validatedBy: 'Dr. Martínez', status: 'validado' },
  { id: 'v4', resultId: 'r4', patientDocument: '10987654', patientName: 'Carlos Rodríguez', studyName: 'Perfil lipídico', validationDate: '', validatedBy: '', status: 'pendiente' },
];

export const MOCK_ENTREGAS: EntregaResultado[] = [
  { id: 'e1', resultId: 'r1', patientDocument: '52345678', patientName: 'Juan Pérez', studyName: 'Hemograma', deliveryDate: '2025-02-05', deliveryMethod: 'presencial', deliveredBy: 'Enf. López', recipient: 'Paciente' },
  { id: 'e2', resultId: 'r2', patientDocument: '80123456', patientName: 'María López', studyName: 'Glucosa', deliveryDate: '2025-02-06', deliveryMethod: 'portal', deliveredBy: 'Sistema' },
  { id: 'e3', resultId: 'r3', patientDocument: '52345678', patientName: 'Juan Pérez', studyName: 'RX tórax', deliveryDate: '2025-02-06', deliveryMethod: 'presencial', deliveredBy: 'Enf. Martínez', recipient: 'Paciente' },
];
