import React, { useState, useEffect } from 'react';
import { IDCardFieldsConfig } from '../components/IDCardFieldsConfig';
import { QRConfig } from '../components/QRConfig';
import { Button } from '../../../shared/components/buttons/Button';
import { SuccessMessage } from '../../../shared/components/feedback/SuccessMessage';
import { useSettings } from '../hooks/useSettings';
import { useConfigUpdate } from '../hooks/useConfigUpdate';

// IMPORTANTE: Definimos los tipos AQUÍ, no los importamos
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

export const IDCardConfigScreen: React.FC = () => {
  const { idCardConfig, loading, error } = useSettings();
  const { updateIDCard, saving, error: saveError, success } = useConfigUpdate();

  const [fields, setFields] = useState<IDCardField[]>([]);
  const [qrConfig, setQrConfig] = useState<QRConfigData>({
    includePhoto: false,
    includeEmergencyContacts: true,
    includeMedicalInfo: false,
    includeBloodType: false,
    includeAllergies: false,
    expirationDays: 30
  });

  useEffect(() => {
    if (idCardConfig) {
      setFields(idCardConfig.fields);
      setQrConfig(idCardConfig.qrConfig);
    }
  }, [idCardConfig]);

  const handleSave = async () => {
    await updateIDCard({ fields, qrConfig });
  };

  const handleReset = () => {
    if (idCardConfig) {
      setFields(idCardConfig.fields);
      setQrConfig(idCardConfig.qrConfig);
    }
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
            🪪 Configuración de Tarjeta de Identificación
          </h1>
          <p className="text-gray-600">
            Personaliza los campos de la tarjeta digital y la información del código QR.
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

        {/* Configuración de Campos */}
        <div className="mb-6">
          <IDCardFieldsConfig fields={fields} onChange={setFields} />
        </div>

        {/* Configuración de QR */}
        <div className="mb-8">
          <QRConfig config={qrConfig} onChange={setQrConfig} />
        </div>

        {/* Nota informativa */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <span className="text-xl">ℹ️</span>
            <div>
              <h5 className="font-medium text-blue-900 text-sm mb-1">
                Información sobre privacidad
              </h5>
              <p className="text-xs text-blue-700">
                El código QR solo se genera cuando el usuario lo solicita y expira automáticamente
                después del período configurado. Los datos médicos sensibles se cifran antes de
                codificarse en el QR.
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