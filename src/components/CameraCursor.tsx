import { useEffect, useRef } from "react";

export default function CameraCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  /* ---------------- Mouse follow effect --------------- */
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let x = 0;
    let y = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      x += (mouseX - x) * 0.15;
      y += (mouseY - y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    animate();

    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ---------------- Hover focus boost effect ---------------- */
  useEffect(() => {
    const enter = () => glowRef.current?.classList.add("scale-125");
    const leave = () => glowRef.current?.classList.remove("scale-125");

    const elements = document.querySelectorAll(
      "a, button, .cursor-focus"
    );

    elements.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      {/* Light focus */}
      <div
        ref={glowRef}
        className="
          fixed top-0 left-0 pointer-events-none z-[9997]
          w-40 h-40 -translate-x-1/2 -translate-y-1/2
          rounded-full blur-2xl
          bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_70%)]
          transition-transform duration-300
        "
      />

      {/* Camera cursor */}
      <div
        ref={cursorRef}
        className="
          fixed top-0 left-0 pointer-events-none z-[9998]
          -translate-x-1/2 -translate-y-1/2
        "
      >
        <img
          src="/camera.svg"
          alt="Camera Cursor"
          className="w-8 h-8 opacity-90"
        />
      </div>
    </>
  );
}
