import React from "react";
import virtudes from "../data/virtudes";

export default function MapaVirtudes() {
  return (
    <div className="mapa-container">
      <h2>🗺️ Mapa de Virtudes</h2>
      <p>
        Selecciona una virtud para descubrir su historia y héroes relacionados.
      </p>

      <div className="mapa-grid">
        {virtudes.map((virtud) => (
          <button key={virtud.id} className="mapa-item">
            {virtud.icono} {virtud.nombre}
          </button>
        ))}
      </div>
    </div>
  );
}
