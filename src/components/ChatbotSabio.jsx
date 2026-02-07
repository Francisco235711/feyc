import React, { useState, useEffect, useRef } from "react";
import '../design/chatbot-sabio.css';
import chatbotData from '../data/chatbot-data.json';
import heroes from '../data/heroes';
import versiculos from '../data/versiculos';
import desafios from '../data/desafios';

export default function ChatbotSabio() {
  const [mensaje, setMensaje] = useState("");
  const [conversacion, setConversacion] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [pasoActual, setPasoActual] = useState("inicio");
  const [opcionesActuales, setOpcionesActuales] = useState([]);
  const chatBodyRef = useRef(null);

  // 📚 CARGAR historial o iniciar
  useEffect(() => {
    const historialGuardado = localStorage.getItem("chatbot-historial");
    const pasoGuardado = localStorage.getItem("chatbot-paso");
    
    if (historialGuardado && pasoGuardado) {
      setConversacion(JSON.parse(historialGuardado));
      setPasoActual(pasoGuardado);
      if (chatbotData[pasoGuardado]) {
        setOpcionesActuales(chatbotData[pasoGuardado].opciones || []);
      }
    } else {
      cargarPaso("inicio", true);
    }
  }, []);

  // 💾 GUARDAR historial
  useEffect(() => {
    if (conversacion.length > 0) {
      const ultimosMensajes = conversacion.slice(-50);
      localStorage.setItem("chatbot-historial", JSON.stringify(ultimosMensajes));
      localStorage.setItem("chatbot-paso", pasoActual);
    }
  }, [conversacion, pasoActual]);

  // 📜 Auto-scroll
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [conversacion, opcionesActuales]);

  // 🎮 Cargar paso del JSON
  const cargarPaso = (idPaso, esPrimeraCarga = false) => {
  const datos = chatbotData[idPaso];
  if (!datos) {
  setConversacion(prev => [...prev, {
    rol: "sabio",
    texto: "❌ Error: No encontré esa información.",
  }]);
  cargarPaso("inicio");
  return;
}

  // Si el nodo pide un héroe aleatorio
  if (datos.type === 'hero' && datos.virtud) {
    const pool = heroes.filter(h => h.virtud === datos.virtud);
    const elegido = pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
    const texto = elegido ? (elegido.resumen || elegido.historia || 'Historia no disponible.') : (datos.texto || 'No hay historias.');
    setPasoActual(idPaso);
    if (esPrimeraCarga) {
      setConversacion([{ rol: 'sabio', texto }]);
    } else {
      setConversacion(prev => [...prev, { rol: 'sabio', texto }]);
    }
    setOpcionesActuales(datos.opciones || []);
    return;
  }

  if (datos.type === 'versiculo' && datos.virtud) {
  const pool = versiculos.filter(v => v.virtud === datos.virtud);
  const elegido = pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
  const texto = elegido ? elegido.texto : (datos.texto || 'Versículo no disponible.');
  setPasoActual(idPaso);
    if (esPrimeraCarga) {
      setConversacion([{ rol: 'sabio', texto }]);
    } else {
      setConversacion(prev => [...prev, { rol: 'sabio', texto }]);
    }
    setOpcionesActuales(datos.opciones || []);
    return;
  }

  // Si el paso es un desafío, mostrarlo como tal
  if (datos.type === 'desafio' && datos.virtud) {
    const pool = desafios.filter(d => d.virtud === datos.virtud);
    const elegido = pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
    const texto = elegido ? elegido.texto : (datos.texto || 'Desafío no disponible.');
    setPasoActual(idPaso);
      if (esPrimeraCarga) {
        setConversacion([{ rol: 'sabio', texto }]);
      } else {
        setConversacion(prev => [...prev, { rol: 'sabio', texto }]);
      }
      setOpcionesActuales(datos.opciones || []);
      return;
  }

  // comportamiento normal:
  setPasoActual(idPaso);
  if (esPrimeraCarga) setConversacion([{ rol: "sabio", texto: datos.texto }]);
  else setConversacion(prev => [...prev, { rol: "sabio", texto: datos.texto }]);
  setOpcionesActuales(datos.opciones || []);
};

  // 🔘 Click en botón de opción
  const manejarClickOpcion = (opcion) => {
    setCargando(true);

    setConversacion(prev => [...prev, { 
      rol: "usuario", 
      texto: opcion.label 
    }]);

    setTimeout(() => {
      cargarPaso(opcion.nextId);
      setCargando(false);
    }, 500);
  };

  // 🗑️ Limpiar historial
  const limpiarHistorial = () => {
    localStorage.removeItem("chatbot-historial");
    localStorage.removeItem("chatbot-paso");
    cargarPaso("inicio", true);
  };



  return (
    <div className="chatbot-page">
      {/* Header */}
      <div className="chatbot-header">
        <h3>🔥 El Sabio</h3>
        <button onClick={limpiarHistorial} className="btn-limpiar">
          🗑️ Limpiar
        </button>
      </div>

      {/* Chat body */}
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

        {/* Botones de opciones */}
        {!cargando && opcionesActuales.length > 0 && (
          <div className="contenedor-botones">
            {opcionesActuales.map((opcion, index) => (
              <button
                key={index}
                className="boton-opcion"
                onClick={() => manejarClickOpcion(opcion)}
                disabled={cargando}
              >
                {opcion.label}
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}