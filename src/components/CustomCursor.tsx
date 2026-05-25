import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 280 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const trailX = useSpring(mouseX, { damping: 40, stiffness: 150 });
  const trailY = useSpring(mouseY, { damping: 40, stiffness: 150 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 8);
      mouseY.set(e.clientY - 8);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Trail dot */}
      <motion.div
        style={{
          position: "fixed",
          left: trailX,
          top: trailY,
          width: 32,
          height: 32,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          border: "1px solid rgba(100, 223, 223, 0.35)",
          transform: "translate(-8px, -8px)",
          mixBlendMode: "screen",
        }}
      />
      {/* Main cursor */}
      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          width: 12,
          height: 12,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          background: "var(--pearl-aqua)",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
