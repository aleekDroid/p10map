import React from "react"; // Importa React para utilizar JSX y componentes
import MapComponent from "./MapComponent"; // Importa el componente MapComponent desde el archivo correspondiente

// Definición del componente principal de la aplicación
function App() {
  return (
    <div style={{ padding: "20px" }}> {/* Contenedor con un padding de 20px para separación */}
      <h2>Mapa en Tiempo Real | Vilchis Márquez Sergio Alexis</h2> {/* Título que describe la funcionalidad de la aplicación */}
      <MapComponent /> {/* Renderiza el componente del mapa */}
    </div>
  );
}

export default App; // Exporta el componente App para su uso en la aplicación
