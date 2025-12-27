import { useState } from "react";
import { IDCardConfigScreen } from "./src/features/settings/screens/IDCardConfigScreen";
import { NotificationsConfigScreen } from "./src/features/settings/screens/NotificationsConfigScreen";

function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "id-card" | "notifications"
  >("id-card");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navegación Superior */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                🎯 OpenBlind Admin - Configuraciones
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentScreen("id-card")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentScreen === "id-card"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                🪪 Tarjeta ID
              </button>
              <button
                onClick={() => setCurrentScreen("notifications")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentScreen === "notifications"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                🔔 Notificaciones
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main>
        {currentScreen === "id-card" && <IDCardConfigScreen />}
        {currentScreen === "notifications" && <NotificationsConfigScreen />}
      </main>
    </div>
  );
}

export default App;
