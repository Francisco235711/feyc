import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MapaVirtudes from "./components/MapaVirtudes";
import HeroesArdientes from "./components/HeroesArdientes";
import ChatbotSabio from "./components/ChatbotSabio";
import BotonFlotanteSabio from "./components/BotonFlotanteSabio";
import "./index.css";

export default function App() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <Routes>
          <Route path="/" element={<MapaVirtudes />} />
          <Route path="/mapa" element={<MapaVirtudes />} />
          <Route path="/heroes" element={<HeroesArdientes />} />
        </Routes>

        {/* Botón flotante del sabio */}
        <BotonFlotanteSabio onClick={() => setShowChatbot(true)} />

        {/* Ventana flotante del sabio */}
        {showChatbot && (
          <div
            style={{
              position: "fixed",
              bottom: "110px",
              right: "30px",
              zIndex: 1000,
              background: "white",
              borderRadius: "15px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            }}
          >
            <ChatbotSabio />
            <button
              onClick={() => setShowChatbot(false)}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "#e63946",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          </div>
        )}
      </div>
    </Router>
  );
}
