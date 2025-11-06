import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navButtonStyle = {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#264653",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    textDecoration: "none",
    transition: "background 0.3s, transform 0.2s",
  };

  return (
    <nav className="navbar">
      <Link to="/mapa" style={navButtonStyle}>
        🗺️ Mapa
      </Link>

      <Link to="/heroes" style={navButtonStyle}>
        ⚔️ Héroes
      </Link>
    </nav>
  );
}
