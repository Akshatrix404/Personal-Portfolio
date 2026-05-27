import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function GlowOrb({
  cx, cy, rx, ry, color, opacity = 0.18
}: { cx: string; cy: string; rx: string; ry: string; color: string; opacity?: number }) {
  return (
    <ellipse
      cx={cx} cy={cy} rx={rx} ry={ry}
      fill={color} opacity={opacity}
      style={{ filter: "blur(60px)" }}
    />
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY   = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      style={{ background: "var(--bg-deep)" }}
    >
      {/* Ambient glow */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true" style={{ zIndex: 0 }}
        preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 900">
        <GlowOrb cx="200"  cy="200"  rx="400" ry="350" color="#7400b8" opacity={0.22} />
        <GlowOrb cx="1300" cy="250"  rx="350" ry="300" color="#48bfe3" opacity={0.16} />
        <GlowOrb cx="720"  cy="800"  rx="500" ry="300" color="#5e60ce" opacity={0.14} />
        <GlowOrb cx="900"  cy="500"  rx="250" ry="200" color="#64dfdf" opacity={0.08} />
      </svg>

      {/* Mesh grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(100,223,223,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(100,223,223,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px", zIndex: 1,
      }} />

      <div className="w-full h-px" style={{ background: "rgba(100,223,223,0.08)", zIndex: 2 }} />

      {/* Heading block */}
      <motion.div style={{ y: textY, position: "relative", zIndex: 3 }}
        className="flex-1 flex items-center px-6 md:px-12 lg:px-16 pt-24">
        <div className="w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 mb-6">
            <div className="h-px w-12"
              style={{ background: "linear-gradient(90deg, transparent, var(--pearl-aqua))" }} />
            <span className="font-body text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--pearl-aqua)", fontWeight: 500 }}>
              CS Engineer & AI Builder
            </span>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
            }}
            className="font-heading leading-[0.86] tracking-tight select-none"
            style={{ fontSize: "clamp(72px, 14vw, 185px)" }}
            aria-label="Hi, I'm Akshat"
          >
            {["HI,", "I'M", "AKSHAT"].map((word, wi) => (
              <span key={wi} className="block overflow-hidden">
                <motion.span
                  variants={{
                    hidden:   { y: "110%", opacity: 0 },
                    visible:  { y: "0%", opacity: 1, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="block"
                  style={{
                    color: wi === 2 ? "transparent" : "#fff",
                    background: wi === 2
                      ? "linear-gradient(135deg, #64dfdf 0%, #5e60ce 50%, #7400b8 100%)"
                      : undefined,
                    WebkitBackgroundClip: wi === 2 ? "text" : undefined,
                    WebkitTextFillColor: wi === 2 ? "transparent" : undefined,
                    backgroundClip: wi === 2 ? "text" : undefined,
                  }}
                >{word}</motion.span>
              </span>
            ))}
          </motion.h1>
        </div>
      </motion.div>

      {/* 3D Avatar */}
      <motion.div
        style={{ y: avatarY, position: "absolute", zIndex: 4 }}
        initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="right-[4%] md:right-[8%] lg:right-[10%] top-1/2"
        aria-hidden="true">
        <div className="pointer-events-none select-none"
          style={{ width: "clamp(240px, 35vw, 500px)", transform: "translateY(-52%)" }}>
          <div className="absolute inset-0 rounded-full" style={{
            background: "radial-gradient(circle at 50% 60%, rgba(116,0,184,0.35) 0%, rgba(72,191,227,0.15) 50%, transparent 75%)",
            filter: "blur(30px)", transform: "scale(0.85) translateY(10%)",
          }} />
          <img src="/hero-avatar.svg" alt="3D cartoon avatar"
            className="w-full h-auto object-contain relative z-10"
            style={{
              animation: "floatY 5s ease-in-out infinite",
              filter: "drop-shadow(0 20px 50px rgba(116,0,184,0.4)) drop-shadow(0 0 30px rgba(100,223,223,0.2))",
            }}
            draggable={false}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="relative flex items-end justify-between px-6 md:px-12 lg:px-16 pb-12 gap-6"
        style={{ zIndex: 5 }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="font-body leading-relaxed max-w-xs md:max-w-sm"
          style={{ color: "rgba(232,228,255,0.5)", fontSize: "0.95rem" }}>
          A CS Engineer passionate about building
          bold AI and full-stack products.
        </motion.p>

        {/* ── CONTACT ME button — matches hero aqua/violet gradient theme ── */}
        <motion.button
          onClick={() => window.dispatchEvent(new CustomEvent("portfolio:navigate", { detail: 6 }))}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="relative font-body text-sm uppercase tracking-widest px-8 py-4 rounded-full overflow-hidden"
          style={{ cursor: "pointer", border: "none", background: "none" }}
        >
          {/* Gradient border ring */}
          <span aria-hidden="true" style={{
            position: "absolute", inset: 0, borderRadius: "9999px",
            padding: "1.5px",
            background: "linear-gradient(135deg, #64dfdf, #5e60ce, #7400b8)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          }} />

          {/* Dark fill so text is readable */}
          <span aria-hidden="true" style={{
            position: "absolute", inset: "1.5px", borderRadius: "9999px",
            background: "rgba(7,0,26,0.65)",
            backdropFilter: "blur(8px)",
            pointerEvents: "none",
            transition: "background 0.3s",
          }} />

          {/* Gradient text label */}
          <span className="relative z-10" style={{
            background: "linear-gradient(135deg, #64dfdf 0%, #a78bfa 50%, #c084fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            CONTACT ME →
          </span>

          {/* Hover glow layer */}
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute", inset: "1.5px", borderRadius: "9999px",
              background: "linear-gradient(135deg, rgba(100,223,223,0.18), rgba(94,96,206,0.22), rgba(116,0,184,0.18))",
              pointerEvents: "none",
            }}
          />
        </motion.button>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 w-full h-px"
        style={{ background: "rgba(100,223,223,0.06)", zIndex: 5 }} />
    </section>
  );
}