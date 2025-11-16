import React, { useRef, useEffect, useState } from "react";
import heroes from "../data/heroes";

export default function HeroesArdientes() {
  const scrollRef = useRef(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});

  useEffect(() => {
    const container = scrollRef.current;

    const handleScroll = () => {
      const cards = Array.from(container.children);
      const center = container.scrollLeft + container.clientWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(center - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      setFocusIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    //frase inicial de la seccion
    <>
      <div
        className="texto-contenido"
        style={{
          textAlign: "top",
          color: "#fff",
          textShadow: "5px 2px 8px rgba(0,0,0,0.7)",
          paddingTop: "4px",
        }}
      >
        <h1
          style={{
            fontFamily: '"Press Start 2P", cursive',
            fontSize: "60px",
            color: "#ffffffff",
            textShadow: "4px 4px 0 #000",
            marginBottom: "-5px",
            letterSpacing: "3px",
          }}
        >
          Héroes Ardientes
        </h1>
                <h2
          style={{
            fontFamily: '"Press Start 2P", cursive',
            fontSize: "20px",
            color: "#f4a261",
          }}
          >
          Descubre las historias inspiradoras de aquellos que encarnaron las virtudes en los momentos más desafiantes
          </h2>
      </div>
    

    <div className="heroes-wrapper">
      <div className="heroes-scroll" ref={scrollRef}>
        {heroes.map((heroe, index) => (
          <div
            key={heroe.id}
            className={`hero-card ${index === focusIndex ? "focus" : ""} ${
              flippedCards[heroe.id] ? "is-flipped" : ""
            }`}
            onClick={() => toggleFlip(heroe.id)}
          >
            <div className="card-inner">
              {/* Cara frontal */}
              <div
                className="card-front"
                style={{
                  backgroundImage: `url(${heroe.imagen})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h3 className="card-title">{heroe.nombre}</h3>
                <h4 className="card-subtitle">{heroe.virtud}</h4>
              </div>

              {/* Cara trasera */}
              <div className="card-back">
                <h3 className="card-title">{heroe.nombre}</h3>
                <div className="card-content">
                  <p className="hero-description">{heroe.historia}</p>
                  {heroe.frase && <p className="hero-frase">{heroe.frase}</p>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
