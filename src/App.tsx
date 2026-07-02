import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import TestimonialsNew from "./components/TestimonialsNew";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";


// ─── Section definitions ────────────────────────────────────────────
const SECTIONS = [
  { id: "hero",         label: "Home",         theme: "dark"  as const, color: "#64dfdf" },
  { id: "about",        label: "About",        theme: "light" as const, color: "#5e60ce" },
  { id: "services",     label: "Skills",       theme: "dark"  as const, color: "#80ffdb" },
  { id: "projects",     label: "Projects",     theme: "dark"  as const, color: "#48bfe3" },
  { id: "experience",   label: "Experience",   theme: "dark"  as const, color: "#6930c3" },
  { id: "testimonials", label: "Recognition",  theme: "light" as const, color: "#7400b8" },
  { id: "testimonials2",label: "Testimonials", theme: "dark"  as const, color: "#7400b8" },
  { id: "contact",      label: "Contact",      theme: "light" as const, color: "#56cfe1" },
  { id: "footer",       label: "Footer",       theme: "dark"  as const, color: "#4ea8de" },
];

const SECTION_COMPONENTS = [Hero, About, Services, Projects, Experience, Testimonials, TestimonialsNew, Contact, Footer];
const TOTAL = SECTIONS.length;

// ─── Loading screen ─────────────────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "var(--bg-deep)" }}
    >
      <div className="relative flex flex-col items-center gap-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-heading text-[clamp(5rem,15vw,12rem)] tracking-widest"
          style={{
            background: "linear-gradient(135deg, #64dfdf 0%, #5e60ce 50%, #7400b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          AKSHAT
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
          className="h-[2px] w-64 origin-left rounded-full"
          style={{ background: "linear-gradient(90deg, var(--royal-violet), var(--pearl-aqua))" }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.8 }}
          className="font-body text-xs uppercase tracking-[0.4em] text-white/50"
        >
          Loading Portfolio
        </motion.p>
      </div>
    </motion.div>
  );
}

// ─── Iris wipe transition ───────────────────────────────────────────
const MAX_R = Math.ceil(Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)) + 40;

function IrisWipe({ ox, oy, color, onDone }: { ox: number; oy: number; color: string; onDone: () => void }) {
  const circleRef = useRef<SVGCircleElement>(null);
  const clipId = useRef(`iris-clip-${Math.random().toString(36).slice(2)}`).current;

  useEffect(() => {
    const el = circleRef.current;
    if (!el || typeof el.animate !== "function") { onDone(); return; }
    const anim = el.animate(
      [{ r: "0" }, { r: String(MAX_R) }],
      { duration: 750, easing: "cubic-bezier(0.76,0,0.24,1)", fill: "forwards" }
    );
    anim.onfinish = () => onDone();
    return () => { anim.cancel(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <svg className="fixed inset-0 z-[300] pointer-events-none" width="100%" height="100%">
      <defs>
        <clipPath id={clipId}>
          <circle ref={circleRef} cx={ox} cy={oy} r="0" />
        </clipPath>
      </defs>
      <rect width="100%" height="100%" fill={color} clipPath={`url(#${clipId})`} />
    </svg>
  );
}

function SectionFlash({ label, ox, oy, color }: { label: string; ox: number; oy: number; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0.55, scale: 0.8 }}
      animate={{ opacity: 0, scale: 1.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed z-[310] pointer-events-none font-heading select-none"
      style={{
        left: ox,
        top: oy,
        transform: "translate(-50%,-50%)",
        fontSize: "clamp(2.5rem, 8vw, 7rem)",
        color,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </motion.div>
  );
}



// ─── Section nav — vertical Prev / counter / Next (controls section change) ──
function SectionNav({ current, total, onNav, isLight }: {
  current: number; total: number; onNav: (i: number) => void; isLight: boolean;
}) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const atStart = current === 0;
  const atEnd = current === total - 1;
  const dim = isLight ? "rgba(14,0,37,0.2)" : "rgba(232,228,255,0.2)";
  const active = isLight ? "rgba(14,0,37,0.45)" : "rgba(232,228,255,0.55)";
  const accent = isLight ? "#5e60ce" : "var(--pearl-aqua)";

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-6">
      <button
        onClick={() => onNav(current - 1)}
        disabled={atStart}
        aria-label="Previous section"
        className="font-body text-xs uppercase tracking-widest flex flex-col items-center gap-2"
        style={{
          background: "none", border: "none",
          cursor: atStart ? "default" : "pointer",
          color: atStart ? dim : active,
          transition: "color 0.2s",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[9px]" style={{ letterSpacing: "0.05em" }}>Prev</span>
      </button>

      <div className="flex flex-col items-center gap-1">
        <motion.span
          key={current}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-heading"
          style={{ fontSize: "1.2rem", color: accent, lineHeight: 1 }}
        >
          {pad(current + 1)}
        </motion.span>
        <span className="font-body text-[9px]" style={{ color: dim, letterSpacing: "0.05em" }}>of</span>
        <span className="font-heading" style={{ fontSize: "0.9rem", color: dim, lineHeight: 1 }}>
          {pad(total)}
        </span>
      </div>

      <button
        onClick={() => onNav(current + 1)}
        disabled={atEnd}
        aria-label="Next section"
        className="font-body text-xs uppercase tracking-widest flex flex-col items-center gap-2"
        style={{
          background: "none", border: "none",
          cursor: atEnd ? "default" : "pointer",
          color: atEnd ? dim : active,
          transition: "color 0.2s",
        }}
      >
        <motion.svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          animate={atEnd ? {} : { y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
        <span className="text-[9px]" style={{ letterSpacing: "0.05em" }}>Next</span>
      </button>
    </div>
  );
}

// ─── Single flashcard ────────────────────────────────────────────────
// Animation: About-style slide-up + scale + rotateX (same physics as About.tsx)
// The card also has a "flip" entrance: when advancing forward it flips in from
// the bottom (positive rotateX), when going backward it flips in from the top.
function FlashCard({
  index,
  current,
  direction,
  theme,
  children,
}: {
  index: number;
  current: number;
  direction: number; // +1 = forward, -1 = backward
  theme: "dark" | "light";
  children: React.ReactNode;
}) {
  const isActive   = index === current;
  const isBehind   = index < current;
  void isBehind;
  const isAhead    = index > current;
  const stackDepth = current - index;

  if (isAhead) return null;

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: "transparent",
        zIndex: isActive ? 20 : 20 - stackDepth,
        transformOrigin: "center bottom",
        transformStyle: "preserve-3d",
        borderRadius: isActive ? 0 : `${Math.min(stackDepth * 8, 24)}px`,
      }}
      animate={
        isActive
          ? {
              // Card arriving: slide up from below (same as About section)
              y: 0,
              scale: 1,
              rotateX: 0,
              opacity: 1,
              borderRadius: 0,
            }
          : {
              // Cards in the stack behind — scaled down, peeking
              y: `-${Math.min(stackDepth * 4, 12)}px`,
              scale: Math.max(1 - stackDepth * 0.025, 0.93),
              rotateX: 0,
              opacity: Math.max(1 - stackDepth * 0.3, 0),
              borderRadius: `${Math.min(stackDepth * 8, 24)}px`,
            }
      }
      initial={
        index === current
          ? {
              y: "100%",
              scale: 0.92,
              rotateX: direction >= 0 ? 8 : -8,
              opacity: 0,
              borderRadius: "2.5rem",
            }
          : false
      }
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 18,
        mass: 1.1,
        restDelta: 0.001,
      }}
    >
      {/* Subtle grid overlay — same as About */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            theme === "light"
              ? `linear-gradient(rgba(94,96,206,0.04) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(94,96,206,0.04) 1px, transparent 1px)`
              : `linear-gradient(rgba(100,223,223,0.03) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(100,223,223,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          zIndex: 0,
        }}
      />

      {/* Shadow on top edge — same as About card entrance shadow */}
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: theme === "light"
            ? "linear-gradient(to bottom, rgba(94,96,206,0.06), transparent)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.25), transparent)",
          zIndex: 1,
        }}
      />

      <div className="relative" data-section-scroll style={{ zIndex: 2, height: "100%", overflowY: "auto" }}>
        {children}
      </div>
    </motion.div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [iris, setIris] = useState<{ ox: number; oy: number; targetIdx: number } | null>(null);
  const [flash, setFlash] = useState<{ label: string; ox: number; oy: number; color: string; k: number } | null>(null);
  const transitioning = useRef(false);
  const flashKey = useRef(0);
  const isLight = SECTIONS[current].theme === "light";

  const navigate = useCallback((next: number) => {
    if (next < 0 || next >= TOTAL || next === current) return;
    if (transitioning.current) return;
    transitioning.current = true;
    setDirection(next > current ? 1 : -1);

    const ox = window.innerWidth / 2;
    const oy = window.innerHeight / 2;
    flashKey.current += 1;
    setFlash({ label: SECTIONS[next].label, ox, oy, color: SECTIONS[next].color, k: flashKey.current });
    setIris({ ox, oy, targetIdx: next });
  }, [current]);

  const onIrisDone = useCallback(() => {
    if (!iris) return;
    setCurrent(iris.targetIdx);
    setIris(null);
    setFlash(null);
    const scrollers = document.querySelectorAll<HTMLElement>("[data-section-scroll]");
    scrollers.forEach(el => { el.scrollTop = 0; });
    setTimeout(() => { transitioning.current = false; }, 100);
  }, [iris]);

  // ── Section navigation: ONLY Up/Down arrow keys ─────────────────────
  // Wheel/trackpad scroll is intentionally disabled for section changes.
  // Sections that need internal scrolling handle their own wheel events.
  useEffect(() => {
    // Block wheel from ever changing sections
    const blockWheel = (e: WheelEvent) => {
      // Only prevent if no scrollable child is handling it
      // (Projects, Skills, Experience handle their own wheel internally)
      // We just don't call navigate here — wheel does nothing at app level.
    };
    window.addEventListener("wheel", blockWheel, { passive: true });
    return () => window.removeEventListener("wheel", blockWheel);
  }, []);

  // Up/Down arrow keys → section navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Projects uses Left/Right — don't intercept those here
      // Skills/Experience handle Up/Down internally; they call e.preventDefault()
      // so this handler only fires if they don't prevent it.
      if (e.key === "ArrowDown" && !e.defaultPrevented) navigate(current + 1);
      if (e.key === "ArrowUp"   && !e.defaultPrevented) navigate(current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, navigate]);


  // Cross-component navigation (e.g. "Contact Me" button in About)
  useEffect(() => {
    const onNav = (e: Event) => {
      const target = (e as CustomEvent<number>).detail;
      navigate(target);
    };
    window.addEventListener("portfolio:navigate", onNav);
    return () => window.removeEventListener("portfolio:navigate", onNav);
  }, [navigate]);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 overflow-hidden"
          style={{ perspective: "1400px" }}
        >
          <CustomCursor />

          {/* Global background that matches current theme */}
          <motion.div
            className="absolute inset-0"
            animate={{ background: isLight ? "#f5f4ff" : "var(--bg-deep)" }}
            transition={{ duration: 0.5 }}
          />

          {/* Flashcard stack */}
          <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {SECTIONS.map((section, i) => {
              const Component = SECTION_COMPONENTS[i];
              return (
                <FlashCard
                  key={section.id}
                  index={i}
                  current={current}
                  direction={direction}
                  theme={section.theme}
                >
                  {/* Each section component renders its own root element
                      with id={section.id} and height: 100vh. */}
                  <Component />
                </FlashCard>
              );
            })}
          </div>

          {/* Vertical Prev / Next + counter — controls section navigation */}
          <SectionNav
            current={current}
            total={TOTAL}
            onNav={navigate}
            isLight={isLight}
          />

          {/* Iris wipe + section-label flash transition */}
          <AnimatePresence>
            {flash && <SectionFlash key={flash.k} label={flash.label} ox={flash.ox} oy={flash.oy} color={flash.color} />}
          </AnimatePresence>
          <AnimatePresence>
            {iris && <IrisWipe key={iris.targetIdx} ox={iris.ox} oy={iris.oy} color={SECTIONS[iris.targetIdx].color} onDone={onIrisDone} />}
          </AnimatePresence>

        </motion.div>
      )}
    </>
  );
}