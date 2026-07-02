import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [pointer, setPointer] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.4 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement;
      setPointer(!!target.closest("button, a, [role='button']"));
    };
    const hide = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
    };
  }, [x, y, visible]);

  // Only render on devices with a real pointer
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div className="hidden md:block" aria-hidden="true">
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000]"
        style={{
          x, y,
          width: 6, height: 6,
          translateX: "-50%", translateY: "-50%",
          background: "var(--pearl-aqua)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          x: ringX, y: ringY,
          width: pointer ? 48 : 32,
          height: pointer ? 48 : 32,
          translateX: "-50%", translateY: "-50%",
          border: "1px solid rgba(100,223,223,0.4)",
          background: pointer ? "rgba(100,223,223,0.08)" : "transparent",
          opacity: visible ? 1 : 0,
          transition: "width 0.25s ease, height 0.25s ease, background 0.25s ease, opacity 0.2s ease",
        }}
      />
    </div>
  );
}