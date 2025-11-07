import React, { useState } from "react";
import fondoMapa from "../assets/fondomapa.jpg";
import IslaPrudencia from "../assets/IslaPrudencia.png";
import IslaTemplanza from "../assets/IslaTemplanza.png";
import IslaJusticia from "../assets/IslaJusticia.png";
import IslaFortaleza from "../assets/IslaFortaleza.png";

export default function MapaVirtudes() {
  const [islaSeleccionada, setIslaSeleccionada] = useState(null);

  const islas = [
    {
      id: 1,
      nombre: "Isla de la Fortaleza",
      imagen: IslaFortaleza,
      posicion: { top: "10%", left: "15%" },
    },
    {
      id: 2,
      nombre: "Isla de la Justicia",
      imagen: IslaJusticia,
      posicion: { top: "10%", right: "7%" },
    },
    {
      id: 3,
      nombre: "Isla de la Prudencia",
      imagen: IslaPrudencia,
      posicion: { bottom: "7%", left: "15%" },
    },
    {
      id: 4,
      nombre: "Isla de la Templanza",
      imagen: IslaTemplanza,
      posicion: { bottom: "7%", right: "7%" },
    },
  ];

  return (
    <div
      className="mapa-fondo"
      style={{
        backgroundImage: `url(${fondoMapa})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="mapa-contenido"
        style={{
          textAlign: "center",
          color: "#fff",
          textShadow: "5px 2px 8px rgba(0,0,0,0.7)",
          paddingTop: "4px",
        }}
      >
        <h1
          style={{
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "60px",
    color: "#ffffffff",
    textShadow: "4px 4px 0 #000",
    marginBottom: "-5px",
    letterSpacing: "3px"
  }}>Mapa <br />de <br />Virtudes</h1>
      </div>

      {islas.map((isla) => (
        <div
          key={isla.id}
          onClick={() => setIslaSeleccionada(isla)}
          style={{
            position: "absolute",
            ...isla.posicion,
            width: "300px", // 👈 Área sensible reducida
            height: "300px",
            cursor: "pointer",
            zIndex: 10,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1) translateY(-10px)";
            e.currentTarget.style.filter =
              "drop-shadow(0 10px 20px rgba(224, 188, 4, 0.6))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1) translateY(0)";
            e.currentTarget.style.filter =
              "drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3))";
          }}
        >
          <img
            src={isla.imagen}
            alt={isla.nombre}
            style={{
              width: "800px", // tamaño visual grande
              height: "800px",
              objectFit: "contain",
              pointerEvents: "none", // 👈 evita que el hover sea sobre toda la imagen
              filter: "drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3))",
              position: "relative",
              left: "-250px", // opcional: centra mejor la imagen dentro del área sensible
              top: "-250px",
            }}
          />
        </div>
      ))}

      {islaSeleccionada && (
        <div
          onClick={() => setIslaSeleccionada(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "rgba(139, 93, 15, 0.95)",
              padding: "40px",
              borderRadius: "20px",
              border: "3px solid #e0bc04",
              textAlign: "center",
              color: "white",
              maxWidth: "500px",
            }}
          >
            <h2>{islaSeleccionada.nombre}</h2>
            <img
              src={islaSeleccionada.imagen}
              alt={islaSeleccionada.nombre}
              style={{
                width: "400px",
                height: "200px",
                objectFit: "contain",
                margin: "20px 0",
              }}
            />
            <button
              onClick={() => setIslaSeleccionada(null)}
              style={{
                marginTop: "20px",
                padding: "10px 30px",
                background: "#e0bc04",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
