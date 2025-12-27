import React from 'react';

// Tipos locales
type NotificationChannel = 'push' | 'email' | 'sms';
type NotificationType = 'route_start' | 'route_end' | 'safety_alert' | 'support_message' | 'emergency';

interface ChannelConfig {
  channel: NotificationChannel;
  enabled: boolean;
  types: Record<NotificationType, boolean>;
}

interface NotificationChannelsConfigProps {
  channels: ChannelConfig[];
  onChange: (channels: ChannelConfig[]) => void;
}

const channelLabels: Record<NotificationChannel, { name: string; icon: string; description: string }> = {
  'push': {
    name: 'Push Notifications',
    icon: '📱',
    description: 'Notificaciones en tiempo real en la app'
  },
  'email': {
    name: 'Email',
    icon: '📧',
    description: 'Correo electrónico'
  },
  'sms': {
    name: 'SMS',
    icon: '💬',
    description: 'Mensajes de texto'
  }
};

const typeLabels: Record<NotificationType, string> = {
  'route_start': 'Inicio de Ruta',
  'route_end': 'Fin de Ruta',
  'safety_alert': 'Alerta de Seguridad',
  'support_message': 'Mensaje de Soporte',
  'emergency': 'Emergencia'
};

export const NotificationChannelsConfig: React.FC<NotificationChannelsConfigProps> = ({
  channels,
  onChange
}) => {
  const handleToggleChannel = (channel: NotificationChannel) => {
    const updated = channels.map(ch =>
      ch.channel === channel ? { ...ch, enabled: !ch.enabled } : ch
    );
    onChange(updated);
  };

  const handleToggleType = (channel: NotificationChannel, type: NotificationType) => {
    const updated = channels.map(ch =>
      ch.channel === channel
        ? {
            ...ch,
            types: {
              ...ch.types,
              [type]: !ch.types[type]
            }
          }
        : ch
    );
    onChange(updated);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Canales de Notificación
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Configura qué canales están activos y qué tipos de notificaciones se enviarán por cada canal.
      </p>

      <div className="space-y-6">
        {channels.map((channel) => {
          const channelInfo = channelLabels[channel.channel];
          
          return (
            <div
              key={channel.channel}
              className={`border-2 rounded-lg p-5 transition-all ${
                channel.enabled
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              {/* Header del Canal */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{channelInfo.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{channelInfo.name}</h4>
                    <p className="text-xs text-gray-600">{channelInfo.description}</p>
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-sm text-gray-700">Activo</span>
                  <input
                    type="checkbox"
                    checked={channel.enabled}
                    onChange={() => handleToggleChannel(channel.channel)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>

              {/* Tipos de Notificación */}
              {channel.enabled && (
                <div className="space-y-2 pl-11">
                  {Object.entries(channel.types).map(([type, enabled]) => (
                    <label
                      key={type}
                      className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <span className="text-sm text-gray-700">
                        {typeLabels[type as NotificationType]}
                      </span>
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() =>
                          handleToggleType(channel.channel, type as NotificationType)
                        }
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </label>
                  ))}
                </div>
              )}

              {/* Mensaje cuando está desactivado */}
              {!channel.enabled && (
                <p className="text-xs text-gray-500 italic pl-11">
                  Este canal está desactivado. Actívalo para configurar los tipos de notificación.
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Resumen rápido */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {channels.map((channel) => {
          const channelInfo = channelLabels[channel.channel];
          const activeTypes = Object.values(channel.types).filter(Boolean).length;
          const totalTypes = Object.keys(channel.types).length;

          return (
            <div
              key={channel.channel}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{channelInfo.icon}</span>
                <span className="font-medium text-gray-900">{channelInfo.name}</span>
              </div>
              <div className="text-sm text-gray-600">
                {channel.enabled ? (
                  <span className="text-green-600 font-medium">
                    ✓ Activo ({activeTypes}/{totalTypes} tipos)
                  </span>
                ) : (
                  <span className="text-gray-400">✗ Desactivado</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};