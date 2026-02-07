import React from "react";
import '../design/boton-flotante-sabio.css';

export default function BotonFlotanteSabio({ onClick }) {
  return (
    <button
      className="boton-flotante"
      onClick={onClick}
      aria-label="Abrir sabio"
      // opcional: añadir la clase de entrada si querés animación
      // className="boton-flotante boton-flotante--entrar"
    >
      ✝️
    </button>
  );
}