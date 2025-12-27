import { useState } from 'react';
import { settingsService } from '../services/settingsService';

// Definimos los tipos localmente - NO IMPORTAR
interface IDCardField {
  id: string;
  name: string;
  label: string;
  required: boolean;
  visible: boolean;
  order: number;
}

interface QRConfigData {
  includePhoto: boolean;
  includeEmergencyContacts: boolean;
  includeMedicalInfo: boolean;
  includeBloodType: boolean;
  includeAllergies: boolean;
  expirationDays: number;
}

interface IDCardConfig {
  fields: IDCardField[];
  qrConfig: QRConfigData;
}

interface ChannelConfig {
  channel: 'push' | 'email' | 'sms';
  enabled: boolean;
  types: {
    route_start: boolean;
    route_end: boolean;
    safety_alert: boolean;
    support_message: boolean;
    emergency: boolean;
  };
}

interface MessageTemplate {
  type: 'route_start' | 'route_end' | 'safety_alert' | 'support_message' | 'emergency';
  subject: string;
  body: string;
  variables: string[];
}

interface NotificationsConfig {
  channels: ChannelConfig[];
  templates: MessageTemplate[];
  legalText: string;
}

export const useConfigUpdate = () => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateIDCard = async (config: IDCardConfig) => {
    try {
      setSaving(true);
      setError(null);
      await settingsService.updateIDCardConfig(config);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Error al guardar configuración');
    } finally {
      setSaving(false);
    }
  };

  const updateNotifications = async (config: NotificationsConfig) => {
    try {
      setSaving(true);
      setError(null);
      await settingsService.updateNotificationsConfig(config);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Error al guardar configuración');
    } finally {
      setSaving(false);
    }
  };

  return {
    updateIDCard,
    updateNotifications,
    saving,
    error,
    success
  };
};