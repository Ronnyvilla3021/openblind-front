import React from 'react';

// Importamos el tipo con un alias para evitar conflicto con el nombre del componente
interface QRConfigData {
  includePhoto: boolean;
  includeEmergencyContacts: boolean;
  includeMedicalInfo: boolean;
  includeBloodType: boolean;
  includeAllergies: boolean;
  expirationDays: number;
}

interface QRConfigProps {
  config: QRConfigData;
  onChange: (config: QRConfigData) => void;
}

export const QRConfig: React.FC<QRConfigProps> = ({ config, onChange }) => {
  const handleToggle = (field: keyof QRConfigData) => {
    if (field === 'expirationDays') return; // No es un booleano
    onChange({
      ...config,
      [field]: !config[field]
    });
  };

  const handleExpirationChange = (days: number) => {
    onChange({
      ...config,
      expirationDays: days
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Configuración del Código QR
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Selecciona qué información se incluirá en el código QR de la tarjeta de identificación.
      </p>

      <div className="space-y-4">
        {/* Incluir Foto */}
        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <div>
            <span className="font-medium text-gray-900">📷 Incluir Foto</span>
            <p className="text-xs text-gray-500 mt-1">
              Añade la foto del usuario al código QR
            </p>
          </div>
          <input
            type="checkbox"
            checked={config.includePhoto}
            onChange={() => handleToggle('includePhoto')}
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Incluir Contactos de Emergencia */}
        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <div>
            <span className="font-medium text-gray-900">🆘 Contactos de Emergencia</span>
            <p className="text-xs text-gray-500 mt-1">
              Nombres y teléfonos de contactos de emergencia
            </p>
          </div>
          <input
            type="checkbox"
            checked={config.includeEmergencyContacts}
            onChange={() => handleToggle('includeEmergencyContacts')}
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Incluir Información Médica */}
        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <div>
            <span className="font-medium text-gray-900">🏥 Información Médica</span>
            <p className="text-xs text-gray-500 mt-1">
              Condiciones médicas relevantes
            </p>
          </div>
          <input
            type="checkbox"
            checked={config.includeMedicalInfo}
            onChange={() => handleToggle('includeMedicalInfo')}
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Incluir Tipo de Sangre */}
        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <div>
            <span className="font-medium text-gray-900">🩸 Tipo de Sangre</span>
            <p className="text-xs text-gray-500 mt-1">
              Tipo y factor RH
            </p>
          </div>
          <input
            type="checkbox"
            checked={config.includeBloodType}
            onChange={() => handleToggle('includeBloodType')}
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Incluir Alergias */}
        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <div>
            <span className="font-medium text-gray-900">⚠️ Alergias</span>
            <p className="text-xs text-gray-500 mt-1">
              Lista de alergias conocidas
            </p>
          </div>
          <input
            type="checkbox"
            checked={config.includeAllergies}
            onChange={() => handleToggle('includeAllergies')}
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Días de Expiración */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <label className="block">
            <span className="font-medium text-gray-900">⏱️ Días de Expiración del QR</span>
            <p className="text-xs text-gray-600 mt-1 mb-3">
              El código QR expirará automáticamente después de este período por seguridad
            </p>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="90"
                value={config.expirationDays}
                onChange={(e) => handleExpirationChange(parseInt(e.target.value))}
                className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={config.expirationDays}
                  onChange={(e) => handleExpirationChange(parseInt(e.target.value))}
                  className="w-20 px-3 py-2 border border-blue-300 rounded-lg text-center font-semibold text-blue-900"
                />
                <span className="text-sm text-gray-700">días</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Información de seguridad */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex gap-3">
          <span className="text-xl">🔒</span>
          <div>
            <h5 className="font-medium text-yellow-900 text-sm mb-1">
              Seguridad y Privacidad
            </h5>
            <p className="text-xs text-yellow-700">
              Los datos médicos sensibles se cifran antes de codificarse en el QR. El código expira automáticamente para proteger la información del usuario.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};