import { 
  SettingsResponse, 
  NotificationChannel, 
  NotificationType 
} from '../features/settings/types/settings.types';

export const mockSettings: SettingsResponse = {
  idCard: {
    fields: [
      {
        id: '1',
        name: 'fullName',
        label: 'Nombre Completo',
        required: true,
        visible: true,
        order: 1
      },
      {
        id: '2',
        name: 'emergencyContact',
        label: 'Contacto de Emergencia Principal',
        required: true,
        visible: true,
        order: 2
      },
      {
        id: '3',
        name: 'phone',
        label: 'Teléfono',
        required: true,
        visible: true,
        order: 3
      },
      {
        id: '4',
        name: 'email',
        label: 'Email',
        required: false,
        visible: true,
        order: 4
      },
      {
        id: '5',
        name: 'bloodType',
        label: 'Tipo de Sangre',
        required: false,
        visible: true,
        order: 5
      },
      {
        id: '6',
        name: 'medicalConditions',
        label: 'Condiciones Médicas',
        required: false,
        visible: true,
        order: 6
      },
      {
        id: '7',
        name: 'allergies',
        label: 'Alergias',
        required: false,
        visible: true,
        order: 7
      },
      {
        id: '8',
        name: 'medications',
        label: 'Medicamentos',
        required: false,
        visible: false,
        order: 8
      },
      {
        id: '9',
        name: 'address',
        label: 'Dirección',
        required: false,
        visible: false,
        order: 9
      }
    ],
    qrConfig: {
      includePhoto: false,
      includeEmergencyContacts: true,
      includeMedicalInfo: true,
      includeBloodType: true,
      includeAllergies: true,
      expirationDays: 30
    }
  },
  notifications: {
    channels: [
      {
        channel: NotificationChannel.PUSH,
        enabled: true,
        types: {
          [NotificationType.ROUTE_START]: true,
          [NotificationType.ROUTE_END]: true,
          [NotificationType.SAFETY_ALERT]: true,
          [NotificationType.SUPPORT_MESSAGE]: true,
          [NotificationType.EMERGENCY]: true
        }
      },
      {
        channel: NotificationChannel.EMAIL,
        enabled: true,
        types: {
          [NotificationType.ROUTE_START]: false,
          [NotificationType.ROUTE_END]: false,
          [NotificationType.SAFETY_ALERT]: true,
          [NotificationType.SUPPORT_MESSAGE]: true,
          [NotificationType.EMERGENCY]: true
        }
      },
      {
        channel: NotificationChannel.SMS,
        enabled: false,
        types: {
          [NotificationType.ROUTE_START]: false,
          [NotificationType.ROUTE_END]: false,
          [NotificationType.SAFETY_ALERT]: false,
          [NotificationType.SUPPORT_MESSAGE]: false,
          [NotificationType.EMERGENCY]: true
        }
      }
    ],
    templates: [
      {
        type: NotificationType.ROUTE_START,
        subject: 'Ruta iniciada - OpenBlind',
        body: 'Hola {{userName}}, has iniciado tu ruta hacia {{destination}}. Tu contacto de emergencia {{emergencyContact}} ha sido notificado. ¡Ten un viaje seguro!',
        variables: ['userName', 'destination', 'emergencyContact', 'startTime']
      },
      {
        type: NotificationType.ROUTE_END,
        subject: 'Ruta completada - OpenBlind',
        body: 'Felicitaciones {{userName}}, has llegado a {{destination}} de forma segura. Duración del viaje: {{duration}}.',
        variables: ['userName', 'destination', 'duration', 'endTime']
      },
      {
        type: NotificationType.SAFETY_ALERT,
        subject: '⚠️ Alerta de Seguridad - OpenBlind',
        body: 'ATENCIÓN {{userName}}: Se ha detectado una zona de riesgo en {{location}}. Tipo de incidencia: {{incidentType}}. Te recomendamos tomar precauciones o considerar una ruta alternativa.',
        variables: ['userName', 'location', 'incidentType', 'severity', 'timestamp']
      },
      {
        type: NotificationType.SUPPORT_MESSAGE,
        subject: 'Respuesta a tu consulta - OpenBlind',
        body: 'Hola {{userName}}, hemos recibido tu mensaje y queremos ayudarte. {{supportMessage}}. Si necesitas más ayuda, responde a este mensaje.',
        variables: ['userName', 'supportMessage', 'ticketId', 'agentName']
      },
      {
        type: NotificationType.EMERGENCY,
        subject: '🚨 ALERTA DE EMERGENCIA - OpenBlind',
        body: 'EMERGENCIA: {{userName}} ha activado una alerta de emergencia. Ubicación: {{location}}. Hora: {{timestamp}}. Contacto de emergencia: {{emergencyContact}}. Por favor, verifica su estado inmediatamente.',
        variables: ['userName', 'location', 'timestamp', 'emergencyContact', 'emergencyType']
      }
    ],
    legalText: 'Este mensaje fue enviado por OpenBlind - Sistema de Navegación Asistida para Personas con Discapacidad Visual. Para actualizar tus preferencias de notificaciones, ingresa a la aplicación y ve a Configuración > Notificaciones. Si deseas dejar de recibir estos mensajes, contacta a soporte@openblind.com. Protegemos tu privacidad de acuerdo con nuestra Política de Privacidad disponible en www.openblind.com/privacy.'
  }
};

// Función para simular delay de red
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));