import React, { useState, useEffect } from "react";

function BubblesBackground() {
  const [bubbles, setBubbles] = useState([]);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const bubblesArray = Array.from({ length: 15 }, (_, index) => ({
      id: index,
      size: Math.random() * 100 + 50,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setBubbles(bubblesArray);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden bg-[#f3f4f6] z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute border-2 border-[#1f2937] rounded-full animate-float"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            top: `${bubble.y}px`,
            left: `${bubble.x}px`,
            transform: `translate(${(mouseX - window.innerWidth / 2) / 30}px, ${
              (mouseY - window.innerHeight / 2) / 30
            }px)`,
            transition: "transform 0.1s ease-out",
            opacity: 0.1,
            zIndex: 1,
          }}
        ></div>
      ))}
    </div>
  );
}

export default BubblesBackground;
