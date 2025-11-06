import React, { useState, useEffect, useRef } from "react";
import respuestas from "../data/respuestas";

export default function ChatbotSabio() {
  const [mensaje, setMensaje] = useState("");
  const [historial, setHistorial] = useState([]);
  const chatRef = useRef(null);

  // Auto-scroll hacia el último mensaje
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [historial]);

  // Enviar mensaje y generar respuesta del sabio
  const responder = () => {
    const pregunta = mensaje.trim().toLowerCase();
    if (!pregunta) return;

    setHistorial([...historial, { emisor: "tú", texto: mensaje }]);
    setMensaje("");

    // Pequeño delay para que parezca que "piensa"
    setTimeout(() => {
      const respuesta =
        respuestas[pregunta] ||
        "💭 El sabio medita... intenta con otra pregunta o menciona una virtud.";
      setHistorial((prev) => [...prev, { emisor: "sabio", texto: respuesta }]);
    }, 700);
  };

  return (
    <div
      className="chatbot"
      style={{
        width: "350px",
        height: "450px",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #1a0b2e 0%, #2d1b3d 100%)",
        color: "#fff",
        borderRadius: "15px",
        overflow: "hidden",
        fontFamily: "Georgia, serif",
        position: "relative",
      }}
    >
      {/* Encabezado */}
      <div
        style={{
          background: "linear-gradient(135deg, #f4a261, #e63946)",
          padding: "10px",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.1rem",
          color: "#1a0b2e",
          borderBottom: "2px solid rgba(0,0,0,0.2)",
        }}
      >
        💬 El Sabio del Camino
      </div>

      {/* Cuerpo del chat */}
      <div
        ref={chatRef}
        style={{
          flex: 1,
          padding: "10px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {historial.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.emisor === "tú" ? "right" : "left",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background:
                  m.emisor === "tú"
                    ? "linear-gradient(135deg, #f4a261, #e76f51)"
                    : "rgba(255,255,255,0.1)",
                color: m.emisor === "tú" ? "#1a0b2e" : "#fff",
                padding: "8px 12px",
                borderRadius: "10px",
                maxWidth: "80%",
                fontSize: "0.95rem",
                lineHeight: "1.4",
              }}
            >
              {m.texto}
            </span>
          </div>
        ))}
      </div>

      {/* Input de mensaje */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          padding: "10px",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <input
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              responder();
            }
          }}
          placeholder="Habla con el Sabio..."
          style={{
            flex: 1,
            padding: "10px",
            border: "none",
            outline: "none",
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
            borderRadius: "8px",
          }}
        />
        <button
          onClick={responder}
          style={{
            marginLeft: "8px",
            background: "linear-gradient(135deg, #f4a261, #e63946)",
            border: "none",
            borderRadius: "8px",
            color: "#1a0b2e",
            fontWeight: "bold",
            padding: "0 15px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
}
