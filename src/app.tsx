// App.tsx
import { useState } from "react";
import { IDCardConfigScreen } from "./features/settings/screens/IDCardConfigScreen";
import { NotificationsConfigScreen } from "./features/settings/screens/NotificationsConfigScreen";

function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "id-card" | "notifications"
  >("id-card");

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navegación Superior Profesional */}
      <nav className="bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo y Título */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-md">
                <span className="text-white text-xl font-bold">OB</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-neutral-900">
                  OpenBlind Admin
                </h1>
                <p className="text-xs text-neutral-500">
                  Panel de Configuración
                </p>
              </div>
            </div>

            {/* Tabs de Navegación */}
            <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-lg">
              <button
                onClick={() => setCurrentScreen("id-card")}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${
                    currentScreen === "id-card"
                      ? "bg-white text-primary-700 shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  <span>🪪</span>
                  <span>Tarjeta ID</span>
                </span>
              </button>
              <button
                onClick={() => setCurrentScreen("notifications")}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${
                    currentScreen === "notifications"
                      ? "bg-white text-primary-700 shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  <span>🔔</span>
                  <span>Notificaciones</span>
                </span>
              </button>
            </div>

            {/* Usuario (placeholder) */}
            <div className="flex items-center gap-3">
              <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all duration-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  RV
                </div>
                <span className="text-sm font-medium text-neutral-700">
                  Ronny Villa
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <a href="#" className="text-neutral-500 hover:text-neutral-700">
              Inicio
            </a>
            <svg
              className="w-4 h-4 text-neutral-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <a href="#" className="text-neutral-500 hover:text-neutral-700">
              Configuraciones
            </a>
            <svg
              className="w-4 h-4 text-neutral-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-neutral-900 font-medium">
              {currentScreen === "id-card"
                ? "Tarjeta de Identificación"
                : "Notificaciones"}
            </span>
          </nav>
        </div>
      </div>

      {/* Contenido Principal */}
      <main className="animate-fade-in">
        {currentScreen === "id-card" && <IDCardConfigScreen />}
        {currentScreen === "notifications" && <NotificationsConfigScreen />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-500">
              © 2024 OpenBlind. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-neutral-500 hover:text-primary-600"
              >
                Documentación
              </a>
              <a
                href="#"
                className="text-sm text-neutral-500 hover:text-primary-600"
              >
                Soporte
              </a>
              <a
                href="#"
                className="text-sm text-neutral-500 hover:text-primary-600"
              >
                API
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
