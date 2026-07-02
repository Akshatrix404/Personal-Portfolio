import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Section registry — must match App.tsx SECTIONS order ─────────────
export const NAV_SECTIONS = [
  { label: "Home",         href: "#home",         idx: 0 },
  { label: "About",        href: "#about",        idx: 1 },
  { label: "Skills",       href: "#services",     idx: 2 },
  { label: "Projects",     href: "#projects",     idx: 3 },
  { label: "Experience",   href: "#experience",    idx: 5 },
  { label: "Recognition",  href: "#testimonials",  idx: 6 },
  { label: "Testimonials", href: "#testimonials2", idx: 7 },
  { label: "Contact",      href: "#contact",       idx: 8 },
];

const nav = (i: number) =>
  window.dispatchEvent(new CustomEvent("portfolio:navigate", { detail: i }));

// ─── Single nav link ───────────────────────────────────────────────────
function NavLink({
  section,
  active,
  light,
}: {
  section: typeof NAV_SECTIONS[0];
  active: boolean;
  light: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const lit = hovered || active;

  // Colour tokens per theme
  const textColor = light
    ? lit ? "#5e60ce" : "rgba(14,0,37,0.42)"
    : lit ? "#64dfdf" : "rgba(232,228,255,0.52)";

  const underlineGrad = light
    ? "linear-gradient(90deg,#5e60ce,#48bfe3)"
    : "linear-gradient(90deg,#64dfdf,#5e60ce)";

  return (
    <button
      onClick={() => nav(section.idx)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex flex-col items-center gap-[3px]"
      style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
    >
      <span
        className="font-body text-xs uppercase transition-colors duration-200"
        style={{
          color: textColor,
          fontWeight: active ? 600 : 500,
          letterSpacing: "0.14em",
          whiteSpace: "nowrap",
        }}
      >
        {section.label}
      </span>

      {/* Animated underline */}
      <span className="relative h-px w-full overflow-hidden">
        <motion.span
          className="absolute inset-0"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: lit ? 1 : 0 }}
          transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: "block", background: underlineGrad }}
        />
      </span>
    </button>
  );
}

// ─── InlineNav — drop this at the very top of any section ──────────────
// Props:
//   activeIdx — the section index this component lives in (marks the active link)
//   light     — true for light-bg sections (#f5f4ff), false for dark (var(--bg-deep))

export default function InlineNav({
  activeIdx,
  light,
}: {
  activeIdx: number;
  light: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Theme-derived tokens
  const bg = light
    ? "rgba(245,244,255,0.82)"
    : "rgba(7,0,26,0.72)";

  const border = light
    ? "1px solid rgba(94,96,206,0.10)"
    : "1px solid rgba(100,223,223,0.07)";

  const logoGrad = light
    ? "linear-gradient(135deg,#5e60ce 0%,#48bfe3 100%)"
    : "linear-gradient(135deg,#64dfdf 0%,#5e60ce 100%)";

  const barColor = light ? "#5e60ce" : "#64dfdf";

  const mobileBg = light
    ? "rgba(245,244,255,0.97)"
    : "rgba(7,0,26,0.97)";

  return (
    <nav
      className="relative z-50 w-full shrink-0 flex items-center justify-between px-6 md:px-14"
      style={{
        height: 60,
        background: bg,
        backdropFilter: "blur(18px) saturate(1.4)",
        WebkitBackdropFilter: "blur(18px) saturate(1.4)",
        borderBottom: border,
      }}
    >
      {/* Logo */}
      <button
        onClick={() => nav(0)}
        className="font-heading select-none"
        style={{
          fontSize: "1.3rem",
          letterSpacing: "-0.02em",
          background: logoGrad,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        AK
      </button>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-6 lg:gap-9">
        {NAV_SECTIONS.map((s) => (
          <li key={s.idx}>
            <NavLink section={s} active={s.idx === activeIdx} light={light} />
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-[5px] p-1"
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
                  ? { rotate: 45, y: 7 }
                  : { rotate: -45, y: -7 }
                : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
            }
            className="w-5 h-px rounded-full"
            style={{ background: barColor }}
          />
        ))}
      </button>

      {/* Mobile drawer — absolutely positioned below nav strip */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[60px] left-0 right-0 flex flex-col py-4 px-6 gap-4 md:hidden"
            style={{
              background: mobileBg,
              backdropFilter: "blur(20px)",
              borderBottom: border,
              zIndex: 100,
            }}
          >
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.idx}
                onClick={() => { nav(s.idx); setMobileOpen(false); }}
                className="font-body text-sm uppercase tracking-widest text-left py-1"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color:
                    s.idx === activeIdx
                      ? barColor
                      : light
                      ? "rgba(14,0,37,0.55)"
                      : "rgba(232,228,255,0.55)",
                }}
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}