import React, { useState, useEffect } from 'react';
import { NotificationChannelsConfig } from '../components/NotificationChannelsConfig';
import { MessageTemplates } from '../components/MessageTemplates';
import { Button } from '../../../shared/components/buttons/Button';
import { SuccessMessage } from '../../../shared/components/feedback/SuccessMessage';
import { useSettings } from '../hooks/useSettings';
import { useConfigUpdate } from '../hooks/useConfigUpdate';

// Tipos locales - deben coincidir EXACTAMENTE con los de los componentes
type NotificationType = 'route_start' | 'route_end' | 'safety_alert' | 'support_message' | 'emergency';
type NotificationChannel = 'push' | 'email' | 'sms';

interface ChannelConfig {
  channel: NotificationChannel;
  enabled: boolean;
  types: Record<NotificationType, boolean>;
}

interface MessageTemplate {
  type: NotificationType;
  subject: string;
  body: string;
  variables: string[];
}

export const NotificationsConfigScreen: React.FC = () => {
  const { notificationsConfig, loading, error } = useSettings();
  const { updateNotifications, saving, error: saveError, success } = useConfigUpdate();

  const [channels, setChannels] = useState<ChannelConfig[]>([]);
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [legalText, setLegalText] = useState('');

  useEffect(() => {
    if (notificationsConfig) {
      setChannels(notificationsConfig.channels as ChannelConfig[]);
      setTemplates(notificationsConfig.templates as MessageTemplate[]);
      setLegalText(notificationsConfig.legalText);
    }
  }, [notificationsConfig]);

  const handleSave = async () => {
    await updateNotifications({ channels, templates, legalText });
  };

  const handleReset = () => {
    if (notificationsConfig) {
      setChannels(notificationsConfig.channels as ChannelConfig[]);
      setTemplates(notificationsConfig.templates as MessageTemplate[]);
      setLegalText(notificationsConfig.legalText);
    }
  };

  const handleTemplateChange = (newTemplates: MessageTemplate[], newLegalText: string) => {
    setTemplates(newTemplates);
    setLegalText(newLegalText);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-900 font-semibold mb-2">Error al cargar</h3>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔔 Configuración de Notificaciones
          </h1>
          <p className="text-gray-600">
            Gestiona los canales de comunicación y personaliza los mensajes que recibirán los usuarios.
          </p>
        </div>

        {/* Success Message */}
        <SuccessMessage
          message="✅ Configuración guardada exitosamente"
          show={success}
          onClose={() => {}}
        />

        {/* Error Message */}
        {saveError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{saveError}</p>
          </div>
        )}

        {/* Configuración de Canales */}
        <div className="mb-6">
          <NotificationChannelsConfig channels={channels} onChange={setChannels} />
        </div>

        {/* Plantillas de Mensajes */}
        <div className="mb-8">
          <MessageTemplates
            templates={templates}
            legalText={legalText}
            onChange={handleTemplateChange}
          />
        </div>

        {/* Estadísticas (Info adicional) */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {channels.filter(c => c.enabled).length}/{channels.length}
                </p>
                <p className="text-sm text-gray-600">Canales activos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
                <p className="text-sm text-gray-600">Plantillas configuradas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {templates.reduce((acc, t) => acc + (t.body ? 1 : 0), 0)}
                </p>
                <p className="text-sm text-gray-600">Plantillas completas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nota de prueba */}
        <div className="mb-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex gap-3">
            <span className="text-xl">🧪</span>
            <div>
              <h5 className="font-medium text-purple-900 text-sm mb-1">
                Modo de Prueba
              </h5>
              <p className="text-xs text-purple-700">
                Las notificaciones se pueden probar enviando un mensaje de prueba a tu cuenta.
                Esto no afecta a los usuarios reales.
              </p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-3 sticky bottom-6 bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
          <Button variant="secondary" onClick={handleReset} disabled={saving}>
            🔄 Restablecer
          </Button>
          <Button variant="primary" onClick={handleSave} loading={saving}>
            💾 Guardar Configuración
          </Button>
        </div>
      </div>
    </div>
  );
};