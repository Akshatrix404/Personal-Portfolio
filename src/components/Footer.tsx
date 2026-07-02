import { useState } from "react";
import InlineNav from "./InlineNav";
import { motion } from "framer-motion";

const SOCIAL_LINKS = [
  { label: "Email",    href: "mailto:ak.professional47@gmail.com" },
  { label: "GitHub",   href: "https://github.com/Akshatrix404" },
  { label: "LinkedIn", href: "https://linkedin.com/in/akshatkhndelwal01/" },
  { label: "Website",  href: "https://akshatrix404.github.io/" },
];

const CONTACT_LINES = [
  { icon: "✉", label: "ak.professional47@gmail.com", href: "mailto:ak.professional47@gmail.com" },
  { icon: "☏", label: "+91 6378401213", href: "tel:+916378401213" },
  { icon: "⌖", label: "Vellore, Tamil Nadu, India", href: undefined },
];

const SHAPES: { type: "x" | "circle" | "diamond" | "hex" | "ring" | "arrow" | "dot"; color: string }[] = [
  { type: "x",       color: "#7400b8" },
  { type: "circle",  color: "#48bfe3" },
  { type: "diamond", color: "#64dfdf" },
  { type: "hex",     color: "#5e60ce" },
  { type: "ring",    color: "#6930c3" },
  { type: "arrow",   color: "#5e60ce" },
  { type: "dot",     color: "#48bfe3" },
];

function Shape({ type, color }: { type: typeof SHAPES[number]["type"]; color: string }) {
  const common = { width: 32, height: 32, viewBox: "0 0 32 32" };
  switch (type) {
    case "x":
      return <svg {...common}><line x1="6" y1="6" x2="26" y2="26" stroke={color} strokeWidth="2" strokeLinecap="round" /><line x1="26" y1="6" x2="6" y2="26" stroke={color} strokeWidth="2" strokeLinecap="round" /></svg>;
    case "circle":
      return <svg {...common}><circle cx="16" cy="16" r="11" stroke={color} strokeWidth="2" fill="none" /></svg>;
    case "diamond":
      return <svg {...common}><polygon points="16,3 29,16 16,29 3,16" fill={color} opacity="0.85" /></svg>;
    case "hex":
      return <svg {...common}><polygon points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5" fill="none" stroke={color} strokeWidth="2" /></svg>;
    case "ring":
      return <svg {...common}><circle cx="16" cy="16" r="11" stroke={color} strokeWidth="1.5" fill="none" /><circle cx="16" cy="16" r="4" fill={color} /></svg>;
    case "arrow":
      return <svg {...common}><line x1="4" y1="16" x2="26" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" /><path d="M19 9l7 7-7 7" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case "dot":
      return (
        <svg {...common}>
          {[0, 1, 2].map(r => [0, 1].map(c => (
            <circle key={`${r}-${c}`} cx={9 + c * 14} cy={6 + r * 10} r="2.4" fill={color} opacity={1 - (r * 2 + c) * 0.12} />
          )))}
        </svg>
      );
    default:
      return null;
  }
}

function SocialLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="font-body text-sm"
      style={{ color: hovered ? "#64dfdf" : "rgba(232,228,255,.6)", textDecoration: "none", transition: "color 0.2s" }}>
      {label}
    </a>
  );
}

const nav = (i: number) => window.dispatchEvent(new CustomEvent("portfolio:navigate", { detail: i }));

export default function Footer() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-y-auto px-6 md:px-16 py-10" style={{ background: "var(--bg-deep)" }}>
      {/* Ambient */}
      <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(116,0,184,.18) 0%,transparent 70%)", filter: "blur(70px)" }} />
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(100,223,223,.1) 0%,transparent 70%)", filter: "blur(70px)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(100,223,223,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(100,223,223,0.025) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-6xl"
        style={{ zIndex: 1 }}
      >
        {/* 3-column grid */}
        <div className="grid md:grid-cols-3 gap-12 pb-10" style={{ borderBottom: "1px solid rgba(100,223,223,0.08)" }}>
          {/* Col 1 — Brand */}
          <div>
            <h2 className="font-heading select-none"
              style={{
                fontSize: "clamp(2.5rem,4.5vw,4.5rem)", lineHeight: 0.95,
                background: "linear-gradient(160deg,#fff 0%,#64dfdf 50%,#7400b8 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>AKSHAT</h2>
            <p className="font-body text-sm mt-3 max-w-xs" style={{ color: "rgba(232,228,255,.5)" }}>
              AI/ML Engineer &amp; Data Analyst — Vellore Institute of Technology, India
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => nav(0)}
              className="font-body text-sm font-medium px-7 py-3 rounded-full mt-6"
              style={{
                backgroundImage: "linear-gradient(135deg,#64dfdf 0%,#5e60ce 60%,#7400b8 100%)",
                color: "#0a0014", border: "none", cursor: "pointer", letterSpacing: "0.04em",
                boxShadow: "0 0 20px rgba(100,223,223,.2)",
              }}>Back to top</motion.button>
          </div>

          {/* Col 2 — Social */}
          <div>
            <span className="font-body text-xs uppercase tracking-[0.25em]" style={{ color: "rgba(232,228,255,.3)" }}>Social</span>
            <div className="flex flex-col gap-3 mt-4">
              {SOCIAL_LINKS.map(l => <SocialLink key={l.label} label={l.label} href={l.href} />)}
            </div>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <span className="font-body text-xs uppercase tracking-[0.25em]" style={{ color: "rgba(232,228,255,.3)" }}>Contact</span>
            <div className="flex flex-col gap-3 mt-4">
              {CONTACT_LINES.map(c => (
                c.href ? (
                  <a key={c.label} href={c.href} className="font-body text-sm flex items-center gap-2"
                    style={{ color: "rgba(232,228,255,.6)", textDecoration: "none" }}>
                    <span style={{ color: "#64dfdf" }}>{c.icon}</span>{c.label}
                  </a>
                ) : (
                  <span key={c.label} className="font-body text-sm flex items-center gap-2" style={{ color: "rgba(232,228,255,.6)" }}>
                    <span style={{ color: "#64dfdf" }}>{c.icon}</span>{c.label}
                  </span>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Animated shape strip */}
        <div className="flex items-center gap-8 py-7 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {SHAPES.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.3, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 18, delay: i * 0.06 }}
              className="shrink-0"
            >
              <Shape type={s.type} color={s.color} />
            </motion.div>
          ))}
        </div>

        {/* Copyright row */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
          <p className="font-body text-xs" style={{ color: "rgba(232,228,255,.2)" }}>
            © {new Date().getFullYear()} Akshat Khandelwal. All rights reserved.
          </p>
          <button onClick={() => nav(0)}
            className="font-body text-xs uppercase tracking-[0.2em]"
            style={{ background: "none", border: "none", color: "rgba(100,223,223,.5)", cursor: "pointer" }}>
            Back to top ↑
          </button>
        </div>
      </motion.div>
    </div>
  );
}