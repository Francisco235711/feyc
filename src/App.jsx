import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MapaVirtudes from "./components/MapaVirtudes";
import HeroesArdientes from "./components/HeroesArdientes";
import ChatbotSabio from "./components/ChatbotSabio";
import BotonFlotanteSabio from "./components/BotonFlotanteSabio";
import BarraProgreso from "./components/BarraProgreso";
import Desafio from "./components/desafio";
import "./index.css";
import sabioImg from "./assets/sabio.png";

export default function App() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <Router>
      <Navbar />
      <BarraProgreso />

      <Routes>
        <Route path="/" element={<MapaVirtudes />} />
        <Route path="/mapa" element={<MapaVirtudes />} />
        <Route path="/heroes" element={<HeroesArdientes />} />
         <Route path="/desafio/:id" element={<Desafio />} />
      </Routes>

      {/* Botón flotante del sabio */}
      <BotonFlotanteSabio onClick={() => setShowChatbot(true)} />

      {showChatbot && (
        <div
          style={{
            position: "fixed",
            bottom: "110px",
            right: "30px",
            zIndex: 1000,
            display: "flex",
            alignItems: "flex-end",
            gap: "20px",
          }}
        >
           <div className="sabio-imagen">
            <img src={sabioImg} alt="El Sabio" />
          </div>
          {/* Imagen del Sabio */}
          <div
            style={{
              animation: "slideInLeft 0.5s ease-out",
            }}>
          </div>

          {/* Contenedor del Chat */}
          <div
            style={{
              position: "relative",
              background: "transparent",
              borderRadius: "15px",
              animation: "slideInRight 0.5s ease-out",
            }}
          >
            <ChatbotSabio />
            
            {/* Botón cerrar */}
            <button
              onClick={() => setShowChatbot(false)}
              style={{
                position: "absolute",
                top: "9px",
                right: "9px",
                background: "#e63946",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                transition: "transform 0.2s, background 0.2s",
                zIndex: 1001,
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.1)";
                e.target.style.background = "#c42a35";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.background = "#e63946";
              }}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </Router>
  );
}