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
                  backgroundImage: `url(${heroe.imagen || heroe.imagenFondo})`,
                }}
              >
                <h3 className="card-title">{heroe.nombre}</h3>
                <p className="card-subtitle">{heroe.virtud}</p>
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
  );
}
