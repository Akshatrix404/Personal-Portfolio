import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

// ─── Section definitions ────────────────────────────────────────────
// theme: "dark" = original deep-purple bg, "light" = white About-style bg
const SECTIONS = [
  { id: "hero",        label: "Home",        theme: "dark"  as const },
  { id: "about",       label: "About",       theme: "light" as const },
  { id: "services",    label: "Skills",      theme: "dark"  as const },
  { id: "projects",    label: "Projects",    theme: "light" as const },
  { id: "experience",  label: "Experience",  theme: "dark"  as const },
  { id: "testimonials",label: "Testimonials",theme: "light" as const },
  { id: "contact",     label: "Contact",     theme: "dark"  as const },
  { id: "footer",      label: "Footer",      theme: "light" as const },
];

const SECTION_COMPONENTS = [Hero, About, Services, Projects, Experience, Testimonials, Contact, Footer];
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

// ─── Navbar ─────────────────────────────────────────────────────────
function Navbar({ current, onNav, isLight }: {
  current: number;
  onNav: (i: number) => void;
  isLight: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = SECTIONS.slice(0, -1); // exclude Footer from nav

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-[72px] px-8"
      style={{
        background: isLight
          ? "rgba(255,255,255,0.72)"
          : "rgba(10,0,24,0.6)",
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        boxShadow: isLight
          ? "0 1px 0 rgba(94,96,206,0.1), 0 4px 24px rgba(94,96,206,0.06)"
          : "0 1px 0 rgba(100,223,223,0.06), 0 4px 24px rgba(0,0,0,0.35)",
        transition: "background 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {/* Logo */}
      <button
        onClick={() => onNav(0)}
        className="font-heading text-2xl tracking-widest select-none"
        style={{
          background: "linear-gradient(135deg, #64dfdf 0%, #5e60ce 50%, #7400b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          cursor: "pointer",
          border: "none",
          padding: 0,
        }}
      >
        AK
      </button>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((s, i) => {
          const active = current === i;
          return (
            <button
              key={s.id}
              onClick={() => onNav(i)}
              className="relative inline-flex flex-col items-center gap-[3px] group"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <span
                className="font-body text-sm uppercase tracking-widest transition-all duration-200"
                style={{
                  color: active
                    ? isLight ? "#5e60ce" : "var(--pearl-aqua)"
                    : isLight ? "rgba(14,0,37,0.5)" : "rgba(232,228,255,0.55)",
                  fontWeight: active ? 600 : 500,
                  letterSpacing: "0.14em",
                }}
              >
                {s.label}
              </span>
              <motion.span
                className="h-px w-full rounded-full"
                animate={{ scaleX: active ? 1 : 0, originX: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  display: "block",
                  background: isLight
                    ? "linear-gradient(90deg, #5e60ce, #48bfe3)"
                    : "linear-gradient(90deg, var(--pearl-aqua), var(--slate-blue))",
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMobileOpen((v) => !v)}
        style={{ background: "none", border: "none", cursor: "pointer" }}
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={
              mobileOpen
                ? i === 1
                  ? { opacity: 0, scaleX: 0 }
                  : i === 0
                  ? { rotate: 45, y: 8 }
                  : { rotate: -45, y: -8 }
                : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
            }
            className="w-6 h-px rounded-full"
            style={{ background: isLight ? "#5e60ce" : "var(--pearl-aqua)" }}
          />
        ))}
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[72px] left-0 right-0 flex flex-col py-4 px-8 gap-4 md:hidden"
            style={{
              background: isLight ? "rgba(255,255,255,0.95)" : "rgba(10,0,24,0.95)",
              backdropFilter: "blur(20px)",
              borderBottom: isLight
                ? "1px solid rgba(94,96,206,0.12)"
                : "1px solid rgba(100,223,223,0.08)",
            }}
          >
            {navLinks.map((s, i) => (
              <button
                key={s.id}
                onClick={() => { onNav(i); setMobileOpen(false); }}
                className="font-body text-sm uppercase tracking-widest text-left py-2"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: current === i
                    ? isLight ? "#5e60ce" : "var(--pearl-aqua)"
                    : isLight ? "rgba(14,0,37,0.6)" : "rgba(232,228,255,0.55)",
                }}
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Progress dots ───────────────────────────────────────────────────
function ProgressDots({ current, total, onNav, isLight }: {
  current: number; total: number; onNav: (i: number) => void; isLight: boolean;
}) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 hidden md:flex">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onNav(i)}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
          }}
          aria-label={`Go to ${SECTIONS[i].label}`}
        >
          <motion.div
            animate={{
              scale: current === i ? 1.5 : 1,
              opacity: current === i ? 1 : 0.35,
              background: current === i
                ? isLight ? "#5e60ce" : "#64dfdf"
                : isLight ? "#5e60ce" : "#64dfdf",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="w-2 h-2 rounded-full"
          />
        </button>
      ))}
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
  const isBehind   = index < current;   // already visited — stacked below
  const isAhead    = index > current;   // not yet reached

  // Depth offset for the "stack behind" effect — up to 3 cards visible
  const stackDepth = current - index;   // 1 = directly behind, 2 = further, …

  const bg = theme === "light" ? "#ffffff" : "var(--bg-deep)";

  if (isAhead) return null; // cards ahead are invisible until they become active

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: bg,
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

      <div className="relative" style={{ zIndex: 2, height: "100%", overflowY: "auto" }}>
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
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);

  const isLight = SECTIONS[current].theme === "light";

  const navigate = useCallback((next: number) => {
    if (next < 0 || next >= TOTAL || next === current) return;
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  }, [current]);

  // Wheel scroll handler — debounced so one scroll = one page
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      isScrolling.current = true;
      const delta = e.deltaY > 0 ? 1 : -1;
      setCurrent((prev) => {
        const next = Math.max(0, Math.min(TOTAL - 1, prev + delta));
        setDirection(delta);
        return next;
      });
      setTimeout(() => { isScrolling.current = false; }, 800);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Touch support
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return;
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;
      isScrolling.current = true;
      const delta = dy > 0 ? 1 : -1;
      setCurrent((prev) => {
        const next = Math.max(0, Math.min(TOTAL - 1, prev + delta));
        setDirection(delta);
        return next;
      });
      setTimeout(() => { isScrolling.current = false; }, 800);
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Keyboard arrow support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") navigate(current + 1);
      if (e.key === "ArrowUp"   || e.key === "PageUp")   navigate(current - 1);
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
                  {/* Wrap each component in a full-height scrollable div.
                      The section IDs are preserved so existing anchor logic works. */}
                  <div
                    id={section.id}
                    className="min-h-screen"
                    style={{
                      // Pass theme context via CSS custom property so
                      // components can adapt if needed
                      "--card-theme": section.theme,
                    } as React.CSSProperties}
                  >
                    <Component />
                  </div>
                </FlashCard>
              );
            })}
          </div>

          {/* Navbar — aware of current light/dark */}
          <Navbar current={current} onNav={navigate} isLight={isLight} />

          {/* Side progress dots */}
          <ProgressDots
            current={current}
            total={TOTAL}
            onNav={navigate}
            isLight={isLight}
          />

          {/* Scroll hint at bottom */}
          <AnimatePresence>
            {current < TOTAL - 1 && (
              <motion.button
                key="scroll-hint"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4 }}
                onClick={() => navigate(current + 1)}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1"
                style={{ background: "none", border: "none", cursor: "pointer" }}
                aria-label="Next section"
              >
                <span
                  className="font-body text-[10px] uppercase tracking-[0.35em]"
                  style={{ color: isLight ? "rgba(14,0,37,0.3)" : "rgba(232,228,255,0.2)" }}
                >
                  scroll
                </span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="w-px h-8 rounded-full"
                  style={{
                    background: isLight
                      ? "linear-gradient(to bottom, #5e60ce, transparent)"
                      : "linear-gradient(to bottom, var(--pearl-aqua), transparent)",
                  }}
                />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}