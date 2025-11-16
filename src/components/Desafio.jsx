import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import virtudesData from "../data/virtudes";

export default function Desafio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const virtud = virtudesData.find((v) => v.id === parseInt(id));

  const [pruebaActual, setPruebaActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [desafioCompletado, setDesafioCompletado] = useState(false);

  if (!virtud) {
    return (
      <div style={{ padding: "100px", textAlign: "center", color: "white" }}>
        <h2>Virtud no encontrada</h2>
        <button onClick={() => navigate("/mapa")}>Volver al Mapa</button>
      </div>
    );
  }

  const prueba = virtud.desafioCompleto.pruebas[pruebaActual];

  const verificarRespuesta = () => {
    if (respuestaSeleccionada === prueba.respuestaCorrecta) {
      setRespuestasCorrectas(respuestasCorrectas + 1);
    }
    setMostrarExplicacion(true);
  };

  const siguientePrueba = () => {
    if (pruebaActual < virtud.desafioCompleto.pruebas.length - 1) {
      setPruebaActual(pruebaActual + 1);
      setRespuestaSeleccionada(null);
      setMostrarExplicacion(false);
    } else {
      // Completar desafío
      const completados = JSON.parse(localStorage.getItem("virtudes-completadas") || "[]");
      if (!completados.includes(virtud.id)) {
        completados.push(virtud.id);
        localStorage.setItem("virtudes-completadas", JSON.stringify(completados));
      }
      setDesafioCompletado(true);
    }
  };

  if (desafioCompletado) {
    const porcentaje = (respuestasCorrectas / virtud.desafioCompleto.pruebas.length) * 100;
    const aprobado = porcentaje >= 66;

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1a0b2e 0%, #2d1b3d 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: aprobado
              ? "linear-gradient(135deg, rgba(42, 157, 143, 0.9), rgba(35, 130, 120, 0.9))"
              : "linear-gradient(135deg, rgba(230, 57, 70, 0.9), rgba(200, 50, 60, 0.9))",
            padding: "50px",
            borderRadius: "20px",
            border: `3px solid ${aprobado ? "#2a9d8f" : "#e63946"}`,
            textAlign: "center",
            color: "white",
            maxWidth: "600px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ fontSize: "80px", marginBottom: "20px" }}>
            {aprobado ? "🎉" : "💪"}
          </div>
          <h1
            style={{
              fontFamily: '"Press Start 2P", cursive',
              fontSize: "28px",
              marginBottom: "20px",
            }}
          >
            {aprobado ? "¡Desafío Completado!" : "¡Intenta de Nuevo!"}
          </h1>
          <p style={{ fontSize: "20px", marginBottom: "30px" }}>
            Respuestas correctas: {respuestasCorrectas} de {virtud.desafioCompleto.pruebas.length}
          </p>
          <div
            style={{
              background: "rgba(0,0,0,0.3)",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "30px",
            }}
          >
            <p style={{ fontSize: "18px", lineHeight: "1.8" }}>
              {aprobado
                ? `Has demostrado comprender ${virtud.nombre.replace("Isla de ", "")}. Este conocimiento te acompañará en tu viaje hacia la felicidad.`
                : `${virtud.nombre.replace("Isla de ", "")} requiere más reflexión. No te desanimes, el camino del héroe está lleno de intentos y aprendizajes.`}
            </p>
          </div>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
            {!aprobado && (
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: "15px 30px",
                  background: "#f4a261",
                  border: "none",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "white",
                }}
              >
                Reintentar
              </button>
            )}
            <button
              onClick={() => navigate("/mapa")}
              style={{
                padding: "15px 30px",
                background: virtud.colorBoton,
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                color: "white",
              }}
            >
              Volver al Mapa
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a0b2e 0%, #2d1b3d 100%)",
        padding: "100px 20px 40px 20px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            background: "rgba(244, 162, 97, 0.1)",
            padding: "30px",
            borderRadius: "15px",
            marginBottom: "30px",
            border: `2px solid ${virtud.colorBoton}`,
          }}
        >
          <h1
            style={{
              fontFamily: '"Press Start 2P", cursive',
              fontSize: "24px",
              color: virtud.colorBoton,
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            {virtud.desafioCompleto.titulo}
          </h1>
          <p
            style={{
              color: "#f0f0f0",
              textAlign: "center",
              fontSize: "16px",
              lineHeight: "1.6",
            }}
          >
            {virtud.desafioCompleto.introduccion}
          </p>
        </div>

        {/* Progreso */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "30px",
          }}
        >
          {virtud.desafioCompleto.pruebas.map((_, index) => (
            <div
              key={index}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background:
                  index < pruebaActual
                    ? "#2a9d8f"
                    : index === pruebaActual
                    ? virtud.colorBoton
                    : "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                border: "2px solid white",
              }}
            >
              {index < pruebaActual ? "✓" : index + 1}
            </div>
          ))}
        </div>

        {/* Pregunta */}
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "40px",
            borderRadius: "15px",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              color: "#f4a261",
              fontSize: "22px",
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            {prueba.pregunta}
          </h2>

          {/* Opciones */}
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {prueba.opciones.map((opcion, index) => (
              <button
                key={index}
                onClick={() => !mostrarExplicacion && setRespuestaSeleccionada(index)}
                disabled={mostrarExplicacion}
                style={{
                  padding: "20px",
                  background:
                    mostrarExplicacion
                      ? index === prueba.respuestaCorrecta
                        ? "#2a9d8f"
                        : respuestaSeleccionada === index
                        ? "#e63946"
                        : "rgba(255,255,255,0.1)"
                      : respuestaSeleccionada === index
                      ? virtud.colorBoton
                      : "rgba(255,255,255,0.1)",
                  border: `2px solid ${
                    respuestaSeleccionada === index ? virtud.colorBoton : "rgba(255,255,255,0.3)"
                  }`,
                  borderRadius: "10px",
                  cursor: mostrarExplicacion ? "not-allowed" : "pointer",
                  color: "white",
                  fontSize: "16px",
                  textAlign: "left",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => {
                  if (!mostrarExplicacion && respuestaSeleccionada !== index) {
                    e.target.style.background = "rgba(255,255,255,0.2)";
                  }
                }}
                onMouseOut={(e) => {
                  if (!mostrarExplicacion && respuestaSeleccionada !== index) {
                    e.target.style.background = "rgba(255,255,255,0.1)";
                  }
                }}
              >
                {String.fromCharCode(65 + index)}. {opcion}
              </button>
            ))}
          </div>

          {/* Explicación */}
          {mostrarExplicacion && (
            <div
              style={{
                marginTop: "30px",
                padding: "20px",
                background:
                  respuestaSeleccionada === prueba.respuestaCorrecta
                    ? "rgba(42, 157, 143, 0.2)"
                    : "rgba(230, 57, 70, 0.2)",
                borderRadius: "10px",
                border: `2px solid ${
                  respuestaSeleccionada === prueba.respuestaCorrecta ? "#2a9d8f" : "#e63946"
                }`,
              }}
            >
              <p style={{ color: "#f0f0f0", fontSize: "16px", lineHeight: "1.8" }}>
                {prueba.explicacion}
              </p>
            </div>
          )}
        </div>

        {/* Botones */}
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <button
            onClick={() => navigate("/mapa")}
            style={{
              padding: "15px 30px",
              background: "#6c757d",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              color: "white",
            }}
          >
            Abandonar
          </button>

          {!mostrarExplicacion ? (
            <button
              onClick={verificarRespuesta}
              disabled={respuestaSeleccionada === null}
              style={{
                padding: "15px 30px",
                background: respuestaSeleccionada !== null ? virtud.colorBoton : "#495057",
                border: "none",
                borderRadius: "25px",
                cursor: respuestaSeleccionada !== null ? "pointer" : "not-allowed",
                fontWeight: "bold",
                fontSize: "16px",
                color: "white",
              }}
            >
              Verificar Respuesta
            </button>
          ) : (
            <button
              onClick={siguientePrueba}
              style={{
                padding: "15px 30px",
                background: virtud.colorBoton,
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                color: "white",
              }}
            >
              {pruebaActual < virtud.desafioCompleto.pruebas.length - 1
                ? "Siguiente Prueba →"
                : "Completar Desafío"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}