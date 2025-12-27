import { useState } from 'react';
import { settingsService } from '../services/settingsService';
import { IDCardConfig, NotificationsConfig } from '../types/settings.types';

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