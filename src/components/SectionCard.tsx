import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function SectionCard({
  accent,
  theme = "light",
  className = "",
  children,
}: {
  accent: string;
  theme?: "light" | "dark";
  className?: string;
  children: ReactNode;
}) {
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        border: `1px solid ${accent}30`,
        background: isDark ? "rgba(255,255,255,0.035)" : "#ffffff",
        boxShadow: isDark
          ? `0 0 60px ${accent}16, 0 32px 80px rgba(0,0,0,0.4)`
          : `0 0 60px ${accent}12, 0 32px 80px rgba(94,96,206,0.1), 0 4px 24px rgba(14,0,37,0.08)`,
        backdropFilter: isDark ? "blur(16px)" : undefined,
        WebkitBackdropFilter: isDark ? "blur(16px)" : undefined,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}