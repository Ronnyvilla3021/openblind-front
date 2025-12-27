import { useState, useEffect } from 'react';
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

export const useSettings = () => {
  const [idCardConfig, setIdCardConfig] = useState<IDCardConfig | null>(null);
  const [notificationsConfig, setNotificationsConfig] = useState<NotificationsConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await settingsService.getSettings();
      setIdCardConfig(data.idCard);
      setNotificationsConfig(data.notifications);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al cargar configuraciones');
    } finally {
      setLoading(false);
    }
  };

  return {
    idCardConfig,
    notificationsConfig,
    loading,
    error,
    reload: loadSettings
  };
};