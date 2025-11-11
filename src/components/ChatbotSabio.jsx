import React, { useState } from "react";
import sabioImg from "../assets/sabio.png"; // ruta que me diste

export default function ChatbotSabio() {
  const [mensaje, setMensaje] = useState("");
  const [conversacion, setConversacion] = useState([]);
  const [cargando, setCargando] = useState(false);

  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;

    const pregunta = mensaje.trim();
    setConversacion((prev) => [...prev, { rol: "usuario", texto: pregunta }]);
    setMensaje("");
    setCargando(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/preguntar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: pregunta }),
      });

      const data = await res.json();
      const respuesta = data.respuesta || "🤔 El sabio guarda silencio...";

      setConversacion((prev) => [...prev, { rol: "sabio", texto: respuesta }]);
    } catch (error) {
      setConversacion((prev) => [
        ...prev,
        { rol: "sabio", texto: `⚠️ Error: ${error.message}` },
      ]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="chatbot-page">
      {/* 🧙‍♂️ Mago grande al abrir */}
      <div className="sabio-grande-container">
        <img src={sabioImg} alt="Sabio" className="sabio-grande" />
      </div>

      <div className="chat-body">
        {conversacion.map((msg, i) => (
          <div key={i} className={`mensaje ${msg.rol}`}>
            {msg.rol === "sabio" ? (
              <div className="respuesta-sabio">
                <img src={sabioImg} alt="Sabio" className="sabio-avatar" />
                <div className="viñeta-sabio">
                  <p>{msg.texto}</p>
                </div>
              </div>
            ) : (
              <p><b>Tú:</b> {msg.texto}</p>
            )}
          </div>
        ))}
        {cargando && (
          <div className="respuesta-sabio">
            <img src={sabioImg} alt="Sabio" className="sabio-avatar" />
            <div className="viñeta-sabio">
              <p>🤔 Pensando...</p>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={enviarMensaje}>
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Haz tu pregunta al sabio..."
          disabled={cargando}
        />
        <button type="submit" disabled={cargando}>
          {cargando ? "Preguntando..." : "Preguntar"}
        </button>
      </form>
    </div>
  );
}