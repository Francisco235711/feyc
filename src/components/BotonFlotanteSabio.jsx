import React from "react";

export default function BotonFlotanteSabio({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        width: "65px",
        height: "65px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #f4a261, #e63946)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2rem",
        boxShadow: "0 8px 20px rgba(230, 57, 70, 0.6)",
        zIndex: 999,
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.15)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(230, 57, 70, 0.8)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(230, 57, 70, 0.6)";
      }}
    >
      🧙‍♂️
    </button>
  );
}
