import React from 'react';
import { IDCardField } from '../types/settings.types';

interface IDCardFieldsConfigProps {
  fields: IDCardField[];
  onChange: (fields: IDCardField[]) => void;
}

export const IDCardFieldsConfig: React.FC<IDCardFieldsConfigProps> = ({ fields, onChange }) => {
  const handleToggleRequired = (fieldId: string) => {
    const updated = fields.map(field =>
      field.id === fieldId ? { ...field, required: !field.required } : field
    );
    onChange(updated);
  };

  const handleToggleVisible = (fieldId: string) => {
    const updated = fields.map(field =>
      field.id === fieldId ? { ...field, visible: !field.visible } : field
    );
    onChange(updated);
  };

  const handleOrderChange = (fieldId: string, newOrder: number) => {
    const updated = fields.map(field =>
      field.id === fieldId ? { ...field, order: newOrder } : field
    );
    onChange(updated.sort((a, b) => a.order - b.order));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Campos de la Tarjeta de Identificación
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Configura qué campos son obligatorios, visibles y su orden de visualización.
      </p>

      <div className="space-y-3">
        {fields.map((field) => (
          <div
            key={field.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <label className="font-medium text-gray-900">{field.label}</label>
              <p className="text-xs text-gray-500 mt-0.5">{field.name}</p>
            </div>

            <div className="flex items-center gap-6">
              {/* Orden */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Orden:</label>
                <input
                  type="number"
                  min="1"
                  value={field.order}
                  onChange={(e) => handleOrderChange(field.id, parseInt(e.target.value))}
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                />
              </div>

              {/* Toggle Visible */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={field.visible}
                  onChange={() => handleToggleVisible(field.id)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Visible</span>
              </label>

              {/* Toggle Obligatorio */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={() => handleToggleRequired(field.id)}
                  disabled={!field.visible}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
                <span className="text-sm text-gray-700">Obligatorio</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};