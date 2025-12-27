import { useState, useEffect } from 'react';
import { settingsService } from '../services/settingsService'; // Esta línea está bien ahora
import { IDCardConfig, NotificationsConfig } from '../types/settings.types';

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