// Configuración de Tarjeta ID
export interface IDCardField {
  id: string;
  name: string;
  label: string;
  required: boolean;
  visible: boolean;
  order: number;
}

export interface QRConfig {
  includePhoto: boolean;
  includeEmergencyContacts: boolean;
  includeMedicalInfo: boolean;
  includeBloodType: boolean;
  includeAllergies: boolean;
  expirationDays: number;
}

export interface IDCardConfig {
  fields: IDCardField[];
  qrConfig: QRConfig;
}

// Configuración de Notificaciones
export enum NotificationChannel {
  PUSH = 'push',
  EMAIL = 'email',
  SMS = 'sms'
}

export enum NotificationType {
  ROUTE_START = 'route_start',
  ROUTE_END = 'route_end',
  SAFETY_ALERT = 'safety_alert',
  SUPPORT_MESSAGE = 'support_message',
  EMERGENCY = 'emergency'
}

export interface ChannelConfig {
  channel: NotificationChannel;
  enabled: boolean;
  types: Record<NotificationType, boolean>;
}

export interface MessageTemplate {
  type: NotificationType;
  subject: string;
  body: string;
  variables: string[];
}

export interface NotificationsConfig {
  channels: ChannelConfig[];
  templates: MessageTemplate[];
  legalText: string;
}

// Respuesta de la API
export interface SettingsResponse {
  idCard: IDCardConfig;
  notifications: NotificationsConfig;
}