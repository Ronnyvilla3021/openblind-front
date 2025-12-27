import React, { useState } from 'react';

// Tipos locales - NO IMPORTAR NADA DE settings.types.ts
type NotificationType = 'route_start' | 'route_end' | 'safety_alert' | 'support_message' | 'emergency';

interface MessageTemplate {
  type: NotificationType;
  subject: string;
  body: string;
  variables: string[];
}

interface MessageTemplatesProps {
  templates: MessageTemplate[];
  legalText: string;
  onChange: (templates: MessageTemplate[], legalText: string) => void;
}

const templateLabels: Record<NotificationType, string> = {
  'route_start': '🚶 Inicio de Ruta',
  'route_end': '✅ Fin de Ruta',
  'safety_alert': '⚠️ Alerta de Seguridad',
  'support_message': '💬 Mensaje de Soporte',
  'emergency': '🚨 Emergencia'
};

export const MessageTemplates: React.FC<MessageTemplatesProps> = ({
  templates,
  legalText,
  onChange
}) => {
  const [editingType, setEditingType] = useState<NotificationType | null>(null);

  const handleTemplateChange = (type: NotificationType, field: 'subject' | 'body', value: string) => {
    const updated = templates.map(template =>
      template.type === type ? { ...template, [field]: value } : template
    );
    onChange(updated, legalText);
  };

  const handleLegalTextChange = (value: string) => {
    onChange(templates, value);
  };

  const insertVariable = (type: NotificationType, variable: string) => {
    const template = templates.find(t => t.type === type);
    if (template) {
      const newBody = template.body + ` {{${variable}}}`;
      handleTemplateChange(type, 'body', newBody);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Plantillas de Mensajes
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Personaliza los mensajes que se enviarán a los usuarios. Usa variables dinámicas como {'{{'} userName {'}}'},  {'{{'} location {'}}'}, etc.
      </p>

      <div className="space-y-6">
        {templates.map((template) => (
          <div
            key={template.type}
            className="border border-gray-200 rounded-lg p-5 bg-gray-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">
                {templateLabels[template.type]}
              </h4>
              <button
                onClick={() =>
                  setEditingType(editingType === template.type ? null : template.type)
                }
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {editingType === template.type ? 'Minimizar' : 'Editar'}
              </button>
            </div>

            {editingType === template.type && (
              <div className="space-y-4">
                {/* Asunto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asunto (para Email)
                  </label>
                  <input
                    type="text"
                    value={template.subject}
                    onChange={(e) =>
                      handleTemplateChange(template.type, 'subject', e.target.value)
                    }
                    placeholder="Ej: Ruta iniciada - OpenBlind"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Cuerpo del mensaje */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cuerpo del mensaje
                  </label>
                  <textarea
                    value={template.body}
                    onChange={(e) =>
                      handleTemplateChange(template.type, 'body', e.target.value)
                    }
                    rows={4}
                    placeholder="Ej: Hola {{userName}}, has iniciado tu ruta hacia {{destination}}."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Variables disponibles */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Variables disponibles
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {template.variables.map((variable) => (
                      <button
                        key={variable}
                        onClick={() => insertVariable(template.type, variable)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors"
                      >
                        {'{{'} {variable} {'}}'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h5 className="text-xs font-semibold text-gray-700 mb-2">Vista Previa:</h5>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium mb-1">{template.subject}</p>
                    <p className="whitespace-pre-wrap">{template.body}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Preview colapsado */}
            {editingType !== template.type && (
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-1">{template.subject}</p>
                <p className="truncate">{template.body}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Texto Legal */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h4 className="font-semibold text-gray-900 mb-4">Texto Legal y Privacidad</h4>
        <p className="text-sm text-gray-600 mb-4">
          Este texto aparecerá al final de todas las notificaciones por email.
        </p>
        <textarea
          value={legalText}
          onChange={(e) => handleLegalTextChange(e.target.value)}
          rows={5}
          placeholder="Ej: Este mensaje fue enviado por OpenBlind. Para dejar de recibir notificaciones, actualiza tus preferencias en la aplicación."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm resize-none"
        />
      </div>
    </div>
  );
};