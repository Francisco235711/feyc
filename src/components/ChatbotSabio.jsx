import React, { useState, useEffect, useRef } from "react";

export default function ChatbotSabio() {
  const [mensaje, setMensaje] = useState("");
  const [conversacion, setConversacion] = useState([]);
  const [cargando, setCargando] = useState(false);
  const chatBodyRef = useRef(null);

  // 📚 CARGAR historial al montar el componente
  useEffect(() => {
    const historialGuardado = localStorage.getItem("chatbot-historial");
    
    if (historialGuardado) {
      // Si hay historial guardado, cargarlo
      setConversacion(JSON.parse(historialGuardado));
    } else {
      // Si no hay historial, mensaje de bienvenida
      setConversacion([
        {
          rol: "sabio",
          texto: "🔥 Bienvenido, viajero del alma. Soy el Sabio del Camino. ¿Qué virtud deseas explorar hoy?",
        },
      ]);
    }
  }, []);

  // 💾 GUARDAR historial cada vez que cambie la conversación
  useEffect(() => {
    if (conversacion.length > 0) {
      // Guardar solo los últimos 50 mensajes para no saturar
      const ultimosMensajes = conversacion.slice(-50);
      localStorage.setItem("chatbot-historial", JSON.stringify(ultimosMensajes));
    }
  }, [conversacion]);

  // 📜 Auto-scroll al final cuando hay nuevos mensajes
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [conversacion]);

  // 🗑️ Función para limpiar historial
  const limpiarHistorial = () => {
    localStorage.removeItem("chatbot-historial");
    setConversacion([
      {
        rol: "sabio",
        texto: "🔥 Historial limpio. Comencemos de nuevo. ¿Qué virtud deseas explorar?",
      },
    ]);
  };

  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (!mensaje.trim() || cargando) return;

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

      if (!res.ok) throw new Error(`Error del servidor: ${res.status}`);

      const data = await res.json();
      const respuesta = data.respuesta || "🤔 El sabio guarda silencio...";

      setConversacion((prev) => [...prev, { rol: "sabio", texto: respuesta }]);
    } catch (error) {
      console.error("Error completo:", error);
      setConversacion((prev) => [
        ...prev,
        { rol: "sabio", texto: `⚠️ No pude conectar con el sabio. Verifica que el servidor esté corriendo.` },
      ]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="chatbot-page">
      {/* 🎯 Header con botón de limpiar */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "10px",
        padding: "10px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "8px"
      }}>
        <h3 style={{ 
          margin: 0, 
          color: "#f4a261", 
          fontSize: "1rem",
          fontFamily: "'Press Start 2P', cursive"
        }}>
          🧙‍♂️ El Sabio
        </h3>
        <button
          onClick={limpiarHistorial}
          style={{
            background: "#e63946",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
            fontSize: "0.7rem",
            fontWeight: "bold",
            fontFamily: "'Press Start 2P', cursive"
          }}
          title="Limpiar historial de conversación"
        >
          🗑️ Limpiar
        </button>
      </div>

      {/* 💬 Cuerpo del chat */}
      <div className="chat-body" ref={chatBodyRef}>
        {conversacion.map((msg, i) => (
          <div key={i} className={`mensaje ${msg.rol}`}>
            {msg.rol === "sabio" ? (
              <div className="respuesta-sabio">
                <div className="viñeta-sabio">
                  <p>{msg.texto}</p>
                </div>
              </div>
            ) : (
              <div className="mensaje-tu">
                <p>{msg.texto}</p>
              </div>
            )}
          </div>
        ))}

        {cargando && (
          <div className="respuesta-sabio">
            <div className="viñeta-sabio">
              <p>🤔 Pensando...</p>
            </div>
          </div>
        )}
      </div>

      {/* 🧭 Campo de entrada */}
      <form onSubmit={enviarMensaje}>
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Haz tu pregunta al sabio..."
          disabled={cargando}
        />
        <button type="submit" disabled={cargando || !mensaje.trim()}>
          {cargando ? "⏳" : "➤"}
        </button>
      </form>
    </div>
  );
}