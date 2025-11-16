import React, { useState } from "react";
import fondoMapa from "../assets/fondomapa.jpg";
import IslaPrudencia from "../assets/IslaPrudencia.png";
import IslaTemplanza from "../assets/IslaTemplanza.png";
import IslaJusticia from "../assets/IslaJusticia.png";
import IslaFortaleza from "../assets/IslaFortaleza.png";
import virtudesData from "../data/virtudes";
import { useNavigate } from "react-router-dom";

export default function MapaVirtudes() {
  const [islaSeleccionada, setIslaSeleccionada] = useState(null);

  // Mapear las imágenes con los datos
  const imagenes = {
    1: IslaFortaleza,
    2: IslaJusticia,
    3: IslaPrudencia,
    4: IslaTemplanza,
  };

  const posiciones = {
    1: { top: "10%", left: "15%" },
    2: { top: "10%", right: "7%" },
    3: { bottom: "7%", left: "15%" },
    4: { bottom: "7%", right: "7%" },
  };

  // Combinar datos con imágenes y posiciones
  const islas = virtudesData.map((virtud) => ({
    ...virtud,
    imagen: imagenes[virtud.id],
    posicion: posiciones[virtud.id],
  }));

// Dentro del componente
const navigate = useNavigate();

const iniciarDesafio = (isla) => {
  navigate(`/desafio/${isla.id}`);
};

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
            letterSpacing: "3px",
          }}
        >
          Mapa <br />
          de <br />
          Virtudes
        </h1>
      </div>

      {islas.map((isla) => (
        <div
          key={isla.id}
          onClick={() => setIslaSeleccionada(isla)}
          style={{
            position: "absolute",
            ...isla.posicion,
            width: "300px",
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
              width: "800px",
              height: "800px",
              objectFit: "contain",
              pointerEvents: "none",
              filter: "drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3))",
              position: "relative",
              left: "-250px",
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
            background: "rgba(0, 0, 0, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(135deg, rgba(139, 93, 15, 0.95), rgba(101, 67, 33, 0.95))",
              padding: "40px",
              borderRadius: "20px",
              border: "3px solid #e0bc04",
              textAlign: "center",
              color: "white",
              maxWidth: "600px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
              animation: "slideIn 0.4s ease",
            }}
          >
            <h2
              style={{
                fontFamily: '"Press Start 2P", cursive',
                fontSize: "24px",
                color: "#e0bc04",
                marginBottom: "20px",
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              {islaSeleccionada.nombre}
            </h2>

            <img
              src={islaSeleccionada.imagen}
              alt={islaSeleccionada.nombre}
              style={{
                width: "300px",
                height: "200px",
                objectFit: "contain",
                margin: "20px 0",
                filter: "drop-shadow(0 5px 15px rgba(224, 188, 4, 0.4))",
              }}
            />

            {/* Descripción */}
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.8",
                marginBottom: "30px",
                textAlign: "justify",
                padding: "0 20px",
                color: "#f0f0f0",
              }}
            >
              {islaSeleccionada.descripcion}
            </p>

            {/* Contenedor de botones separados */}
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => setIslaSeleccionada(null)}
                style={{
                  padding: "12px 30px",
                  background: "#6c757d",
                  border: "none",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "white",
                  transition: "all 0.3s",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "#5a6268";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "#6c757d";
                  e.target.style.transform = "scale(1)";
                }}
              >
                Cerrar
              </button>

              <button
                onClick={() => iniciarDesafio(islaSeleccionada)}
                style={{
                  padding: "12px 30px",
                  background: islaSeleccionada.colorBoton,
                  border: "none",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "white",
                  transition: "all 0.3s",
                  boxShadow: `0 4px 8px ${islaSeleccionada.colorBoton}60`,
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "scale(1.1)";
                  e.target.style.boxShadow = `0 6px 12px ${islaSeleccionada.colorBoton}80`;
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = `0 4px 8px ${islaSeleccionada.colorBoton}60`;
                }}
              >
                🔥 Iniciar Desafío
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}