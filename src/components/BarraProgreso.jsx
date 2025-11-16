import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import virtudesData from "../data/virtudes";

export default function BarraProgreso() {
  const [completadas, setCompletadas] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const actualizarProgreso = () => {
      const data = JSON.parse(localStorage.getItem("virtudes-completadas") || "[]");
      setCompletadas(data);
    };

    actualizarProgreso();

    // Escuchar cambios en localStorage
    window.addEventListener("storage", actualizarProgreso);
    // Revisar cada segundo (para capturar cambios en la misma pestaña)
    const interval = setInterval(actualizarProgreso, 1000);

    return () => {
      window.removeEventListener("storage", actualizarProgreso);
      clearInterval(interval);
    };
  }, []);

  const porcentaje = (completadas.length / virtudesData.length) * 100;

  if (location.pathname !== "/mapa") return null;
  return (
    <>
    <div
      style={{
        position: "fixed",
        top: "70px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 900,
        background: "rgba(26, 11, 46, 0.95)",
        padding: "15px 30px",
        borderRadius: "15px",
        border: "2px solid #f4a261",
        boxShadow: "0 5px 20px rgba(0,0,0,0.5)",
        backdropFilter: "blur(10px)",
        minWidth: "300px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <span
          style={{
            color: "#f4a261",
            fontWeight: "bold",
            fontSize: "14px",
            fontFamily: '"Press Start 2P", cursive',
          }}
        >
          🏆 Progreso
        </span>
        <span
          style={{
            color: "white",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {completadas.length}/{virtudesData.length}
        </span>
      </div>

      {/* Barra de progreso */}
      <div
        style={{
          width: "100%",
          height: "20px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${porcentaje}%`,
            height: "100%",
            background: "linear-gradient(90deg, #f4a261, #e63946)",
            transition: "width 0.5s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {porcentaje > 0 && `${Math.round(porcentaje)}%`}
        </div>
      </div>

        {/*borrar progreso */}
        <button
         onClick={() => {
         localStorage.removeItem("virtudes-completadas");
        setCompletadas([]);
  }}
    style={{
        marginTop: "5px",
        background: "#e63946",
        color: "white",
        border: "none",
        borderRadius: "8px",
        padding: "6px 12px",
        fontSize: "12px",
        fontWeight: "bold",
        cursor: "pointer",
        fontFamily: '"Press Start 2P", cursive',
    }}
    >
  x
        </button>      
    </div>
            {/* Mensaje de completitud */}
{completadas.length === virtudesData.length && (
  <div
        style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "1300px",
        backgroundColor: "rgba(0, 0, 0, 0.4)", // fondo negro semitransparente
        backdropFilter: "blur(8px)",          // desenfoque del fondo
        color: "white",
        padding: "25px 60px",
        fontFamily: '"Press Start 2P", cursive',
        fontSize: "70px",
        textAlign: "center",
        borderRadius: "30px",
        animation: "pulse 2s infinite",
        zIndex: 1000,
        }}
  >
    🌟El verdadero Héroe está dentro de ti🌟
  </div>
)}

</>
  );
}