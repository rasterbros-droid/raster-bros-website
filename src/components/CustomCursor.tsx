import React, { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", onMove);

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.18;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18;

      const x = pos.current.x;
      const y = pos.current.y;

      // Camera
      if (cursorRef.current) {
        cursorRef.current.style.transform = `
          translate3d(${x}px, ${y}px, 0)
          translate(-50%, -50%)
        `;
      }

      // Spotlight projected forward
      if (lightRef.current) {
        lightRef.current.style.transform = `
          translate3d(${x + 40}px, ${y}px, 0)
          translate(-50%, -50%)
        `;
      }

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {/* Spotlight coming FROM lens */}
      <div
        ref={lightRef}
        className="pointer-events-none fixed z-40"
        style={{
          width: "520px",
          height: "320px",
          background:
            "radial-gradient(ellipse at left center, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.08) 45%, rgba(0,0,0,0) 70%)",
          filter: "blur(40px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Modern camera icon */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-50"
        style={{
          width: 28,
          height: 28,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xl"
        >
          {/* Body */}
          <rect
            x="2.5"
            y="6"
            width="15"
            height="12"
            rx="3"
            stroke="white"
            strokeWidth="1.4"
            fill="rgba(255,255,255,0.08)"
          />

          {/* Lens */}
          <circle
            cx="10"
            cy="12"
            r="3.2"
            stroke="white"
            strokeWidth="1.4"
            fill="rgba(0,0,0,0.4)"
          />

          {/* Lens highlight */}
          <circle
            cx="9"
            cy="11"
            r="1"
            fill="rgba(255,255,255,0.6)"
          />

          {/* Video notch */}
          <polygon
            points="17.5,9 21,7.5 21,16.5 17.5,15"
            stroke="white"
            strokeWidth="1.4"
            fill="rgba(255,255,255,0.08)"
          />
        </svg>
      </div>

      {/* Hide system cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}