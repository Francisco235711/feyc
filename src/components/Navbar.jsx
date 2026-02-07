import React from "react";
import { Link, useLocation } from "react-router-dom";
import '../design/navbar.css';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link
        to="/mapa"
        className={location.pathname === "/mapa" ? "active" : ""}
      >
        🗺️ Mapa
      </Link>
      <Link
        to="/heroes"
        className={location.pathname === "/heroes" ? "active" : ""}
      >
        ⚔️ Héroes
      </Link>
    </nav>
  );
}
