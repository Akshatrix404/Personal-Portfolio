import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

const SECTIONS = [
  { id: "hero", label: "Home", theme: "dark" as const, color: "#64dfdf" },
  { id: "about", label: "About", theme: "light" as const, color: "#5e60ce" },
  { id: "services", label: "Skills", theme: "dark" as const, color: "#80ffdb" },
  { id: "projects", label: "Projects", theme: "light" as const, color: "#48bfe3" },
  { id: "experience", label: "Experience", theme: "dark" as const, color: "#6930c3" },
  { id: "testimonials", label: "Testimonials", theme: "light" as const, color: "#7400b8" },
  { id: "contact", label: "Contact", theme: "dark" as const, color: "#56cfe1" },
  { id: "footer", label: "Footer", theme: "light" as const, color: "#4ea8de" },
];
const COMPONENTS = [Hero, About, Services, Projects, Experience, Testimonials, Contact, Footer];
const N = SECTIONS.length;
const MAX_R = Math.ceil(Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)) + 40;

// ─── Loading ───────────────────────────────────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "#07001a" }}>
      <div className="flex flex-col items-center gap-6">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-heading tracking-widest select-none"
          style={{
            fontSize: "clamp(5rem,15vw,12rem)",
            background: "linear-gradient(135deg,#64dfdf 0%,#5e60ce 50%,#7400b8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>AKSHAT</motion.h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="h-[2px] w-64 origin-left rounded-full"
          style={{ background: "linear-gradient(90deg,#7400b8,#64dfdf)" }} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.9 }}
          className="font-body text-xs uppercase tracking-[0.4em]"
          style={{ color: "rgba(255,255,255,0.5)" }}>
          Loading Portfolio
        </motion.p>
      </div>
    </motion.div>
  );
}

// ─── Iris wipe ─────────────────────────────────────────────────────────────────
function IrisWipe({ ox, oy, bgColor, onDone }: {
  ox: number; oy: number; bgColor: string; onDone: () => void;
}) {
  const ref = useRef<SVGCircleElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    c.setAttribute("r", "0");
    const a = c.animate([{ r: "0" }, { r: String(MAX_R) }],
      { duration: 750, easing: "cubic-bezier(0.76,0,0.24,1)", fill: "forwards" });
    a.onfinish = onDone;
    return () => a.cancel();
  }, [onDone]);
  return (
    <svg className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 60 }}>
      <defs><clipPath id="iris-c"><circle ref={ref} r="0" cx={ox} cy={oy} /></clipPath></defs>
      <rect width="100%" height="100%" fill={bgColor} clipPath="url(#iris-c)" />
    </svg>
  );
}

// ─── Section flash ─────────────────────────────────────────────────────────────
function SectionFlash({ label, ox, oy, color }: { label: string; ox: number; oy: number; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0.55, scale: 0.8 }} animate={{ opacity: 0, scale: 1.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed pointer-events-none select-none font-heading z-[62]"
      style={{
        left: ox, top: oy, transform: "translate(-50%,-50%)",
        fontSize: "clamp(2rem,8vw,6rem)", color, letterSpacing: "0.14em", whiteSpace: "nowrap"
      }}>
      {label.toUpperCase()}
    </motion.div>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ current, isLight, activeColor, onNavigate }: {
  current: number; isLight: boolean; activeColor: string;
  onNavigate: (i: number) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-[60px] px-6 md:px-8"
        style={{
          background: isLight ? "rgba(255,255,255,0.85)" : "rgba(7,0,26,0.8)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          boxShadow: isLight ? "0 1px 0 rgba(94,96,206,0.12)" : "0 1px 0 rgba(100,223,223,0.07)",
          pointerEvents: "auto",
        }}>
        {/* Logo */}
        <span className="font-heading text-xl tracking-widest select-none"
          style={{
            background: "linear-gradient(135deg,#64dfdf 0%,#5e60ce 50%,#7400b8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>AK</span>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {SECTIONS.map((s, i) => (
            <button key={s.id} onClick={() => onNavigate(i)}
              className="font-body text-xs uppercase tracking-[0.18em] transition-all duration-200"
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: i === current ? activeColor : (isLight ? "rgba(14,0,37,0.45)" : "rgba(232,228,255,0.4)"),
                fontWeight: i === current ? 700 : 400,
              }}>
              {s.label}
              {i === current && (
                <motion.div layoutId="nav-underline" className="h-px mt-0.5 rounded-full"
                  style={{ background: activeColor }} />
              )}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(v => !v)}
          style={{ background: "none", border: "none", cursor: "pointer" }}>
          {[0, 1, 2].map(i => (
            <motion.div key={i} className="w-5 h-px rounded-full"
              animate={menuOpen
                ? i === 1 ? { opacity: 0, scaleX: 0 } : i === 0 ? { rotate: 45, y: 6 } : { rotate: -45, y: -6 }
                : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }}
              style={{ background: isLight ? "#5e60ce" : "#64dfdf" }} />
          ))}
        </button>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
            className="fixed top-[60px] left-0 right-0 z-40 flex flex-col py-3 px-6 gap-1 md:hidden"
            style={{
              background: isLight ? "rgba(255,255,255,0.96)" : "rgba(7,0,26,0.96)",
              backdropFilter: "blur(20px)",
              boxShadow: isLight ? "0 8px 24px rgba(94,96,206,0.08)" : "0 8px 24px rgba(0,0,0,0.4)",
            }}>
            {SECTIONS.map((s, i) => (
              <button key={s.id} onClick={() => { onNavigate(i); setMenuOpen(false); }}
                className="font-body text-sm uppercase tracking-widest text-left py-2.5 border-b"
                style={{
                  background: "none", border: "none", borderBottom: isLight ? "1px solid rgba(94,96,206,0.08)" : "1px solid rgba(100,223,223,0.05)",
                  cursor: "pointer",
                  color: i === current ? activeColor : (isLight ? "rgba(14,0,37,0.55)" : "rgba(232,228,255,0.5)"),
                  fontWeight: i === current ? 700 : 400,
                }}>
                <span style={{ opacity: 0.4, marginRight: 10, fontSize: "0.7rem" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [iris, setIris] = useState<{ ox: number; oy: number; targetIdx: number } | null>(null);
  const [flash, setFlash] = useState<{ label: string; ox: number; oy: number; color: string; k: number } | null>(null);

  const locked = useRef(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const isLight = SECTIONS[current].theme === "light";
  const activeColor = SECTIONS[current].color;

  // ── Navigate — ONLY called from buttons, never from scroll ────────
  const navigate = useCallback((next: number) => {
    if (locked.current) return;
    if (next < 0 || next >= N || next === current) return;
    locked.current = true;

    // Iris fires from center of screen for button navigation
    const ox = window.innerWidth / 2;
    const oy = window.innerHeight / 2;

    setFlash({ label: SECTIONS[next].label, ox, oy, color: SECTIONS[next].color, k: Date.now() });
    setIris({ ox, oy, targetIdx: next });
  }, [current]);

  const onIrisDone = useCallback(() => {
    const next = iris!.targetIdx;
    setCurrent(next);
    setIris(null);
    setFlash(null);
    // Scroll new section to top
    if (contentRef.current) contentRef.current.scrollTop = 0;
    setTimeout(() => { locked.current = false; }, 100);
  }, [iris]);

  // ── Scroll: NEVER changes section — only scrolls within content ───
  // No wheel handler that navigates. Scroll is purely native.

  // ── Keyboard: arrows navigate sections ───────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (locked.current || iris) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") navigate(current + 1);
      if (e.key === "ArrowLeft" || e.key === "PageUp") navigate(current - 1);
      // Up/Down arrows scroll normally inside section (no interception)
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, iris, navigate]);

  // ── CTA events ────────────────────────────────────────────────────
  useEffect(() => {
    const h = (e: Event) => navigate((e as CustomEvent<number>).detail);
    window.addEventListener("portfolio:navigate", h);
    return () => window.removeEventListener("portfolio:navigate", h);
  }, [navigate]);

  const CurrentComp = COMPONENTS[current];

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="fixed inset-0 overflow-hidden"
          style={{ background: isLight ? "#ffffff" : "#07001a" }}>
          <CustomCursor />

          {/* ── Section content — pure native scroll, no interception ── */}
          <div
            ref={contentRef}
            key={current}
            className="absolute inset-0 overflow-y-auto"
            style={{
              zIndex: 10,
              background: isLight ? "#ffffff" : "#07001a",
              overscrollBehavior: "contain",
              // padding top for navbar
              paddingTop: 0,
            }}
          >
            {/* Grid bg */}
            <div className="fixed inset-0 pointer-events-none" style={{
              backgroundImage: isLight
                ? `linear-gradient(rgba(94,96,206,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(94,96,206,0.04) 1px,transparent 1px)`
                : `linear-gradient(rgba(100,223,223,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(100,223,223,0.025) 1px,transparent 1px)`,
              backgroundSize: "60px 60px", zIndex: 0,
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <CurrentComp />
            </div>
          </div>

          {/* ── Right-side navigation hint ─────────────────────────────── */}
          <div className="hidden md:flex pointer-events-none fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-2">
            <span className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-[rgba(232,228,255,0.75)]">
              Next
            </span>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/20"
              style={{ color: activeColor, boxShadow: `0 0 0 1px rgba(255,255,255,0.08), 0 0 18px ${activeColor}33` }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M8 6L16 12L8 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>

          {/* ── Iris wipe ─────────────────────────────────────────────── */}
          {iris && (
            <IrisWipe
              key={`${iris.targetIdx}-${iris.ox}-${iris.oy}`}
              ox={iris.ox} oy={iris.oy}
              bgColor={SECTIONS[iris.targetIdx].theme === "light" ? "#ffffff" : "#07001a"}
              onDone={onIrisDone}
            />
          )}

          {/* ── Section flash ──────────────────────────────────────────── */}
          <AnimatePresence>
            {flash && (
              <SectionFlash key={flash.k}
                label={flash.label} ox={flash.ox} oy={flash.oy} color={flash.color} />
            )}
          </AnimatePresence>

          {/* ── Navbar — only way to change sections ──────────────────── */}
          <Navbar
            current={current} isLight={isLight}
            activeColor={activeColor} onNavigate={navigate}
          />
        </div>
      )}
    </>
  );
}