import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function GlowOrb({
  cx, cy, rx, ry, color, opacity = 0.18
}: { cx: string; cy: string; rx: string; ry: string; color: string; opacity?: number }) {
  return (
    <ellipse
      cx={cx} cy={cy} rx={rx} ry={ry}
      fill={color}
      opacity={opacity}
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
  const textY    = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      style={{ background: "var(--bg-deep)" }}
    >
      {/* Ambient glow layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 0 }}
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
      >
        <GlowOrb cx="200"  cy="200"  rx="400" ry="350" color="#7400b8" opacity={0.22} />
        <GlowOrb cx="1300" cy="250"  rx="350" ry="300" color="#48bfe3" opacity={0.16} />
        <GlowOrb cx="720"  cy="800"  rx="500" ry="300" color="#5e60ce" opacity={0.14} />
        <GlowOrb cx="900"  cy="500"  rx="250" ry="200" color="#64dfdf" opacity={0.08} />
      </svg>

      {/* Mesh grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100,223,223,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,223,223,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          zIndex: 1,
        }}
      />

      {/* Top divider */}
      <div className="w-full h-px" style={{ background: "rgba(100,223,223,0.08)", zIndex: 2 }} />

      {/* Heading block */}
      <motion.div
        style={{ y: textY, position: "relative", zIndex: 3 }}
        className="flex-1 flex items-center px-6 md:px-12 lg:px-16 pt-24"
      >
        <div className="w-full">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 mb-6"
          >
            <div
              className="h-px w-12"
              style={{ background: "linear-gradient(90deg, transparent, var(--pearl-aqua))" }}
            />
            <span
              className="font-body text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--pearl-aqua)", fontWeight: 500 }}
            >
              CS Engineer & AI Builder
            </span>
          </motion.div>

          {/* Giant heading */}
          <motion.h1
            initial="hidden"
            animate="visible"
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
                    hidden: { y: "110%", opacity: 0 },
                    visible: {
                      y: "0%", opacity: 1,
                      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                    },
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
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>
        </div>
      </motion.div>

      {/* 3D Avatar */}
      <motion.div
        style={{ y: avatarY, position: "absolute", zIndex: 4 }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="right-[4%] md:right-[8%] lg:right-[10%] top-1/2"
        aria-hidden="true"
        sx-style="transform: translateY(-52%)"
      >
        <div
          className="pointer-events-none select-none"
          style={{
            width: "clamp(240px, 35vw, 500px)",
            transform: "translateY(-52%)",
          }}
        >
          {/* Glow ring behind avatar */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at 50% 60%, rgba(116,0,184,0.35) 0%, rgba(72,191,227,0.15) 50%, transparent 75%)",
              filter: "blur(30px)",
              transform: "scale(0.85) translateY(10%)",
            }}
          />
          <img
            src="/hero-avatar.svg"
            alt="3D cartoon avatar"
            className="w-full h-auto object-contain relative z-10"
            style={{
              animation: "floatY 5s ease-in-out infinite",
              filter: "drop-shadow(0 20px 50px rgba(116,0,184,0.4)) drop-shadow(0 0 30px rgba(100,223,223,0.2))",
            }}
            draggable={false}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="relative z-5 flex items-end justify-between px-6 md:px-12 lg:px-16 pb-12 gap-6" style={{ zIndex: 5 }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="font-body leading-relaxed max-w-xs md:max-w-sm"
          style={{ color: "rgba(232,228,255,0.5)", fontSize: "0.95rem" }}
        >
          A CS Engineer passionate about building
          bold AI and full-stack products.
        </motion.p>

        <motion.a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="gradient-border-btn shrink-0"
        >
          <span>CONTACT ME →</span>
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ zIndex: 5 }}
        aria-hidden="true"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.35em]" style={{ color: "rgba(232,228,255,0.2)" }}>scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8 rounded-full"
          style={{ background: "linear-gradient(to bottom, var(--pearl-aqua), transparent)" }}
        />
      </motion.div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 w-full h-px" style={{ background: "rgba(100,223,223,0.06)", zIndex: 5 }} />
    </section>
  );
}
