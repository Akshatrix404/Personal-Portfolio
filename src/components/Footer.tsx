import { motion } from "framer-motion";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/akshatkhndelwal01/" },
  { label: "GitHub",   href: "https://github.com/Akshatrix404" },
];
const CONTACT_INFO = [
  { icon: "✉", text: "ak.professional47@gmail.com" },
  { icon: "📱", text: "+91 6378401213" },
  { icon: "📍", text: "Jaipur, Rajasthan" },
];
const SHAPES = [
  { type: "x",       color: "#7400b8" },
  { type: "circle",  color: "#48bfe3" },
  { type: "diamond", color: "#64dfdf" },
  { type: "hex",     color: "#5e60ce" },
  { type: "ring",    color: "#6930c3" },
  { type: "arrow",   color: "#5e60ce" },
  { type: "dot",     color: "#48bfe3" },
];

function Shape({ type, color }: { type: string; color: string }) {
  const s = 32;
  switch (type) {
    case "x":       return <svg width={s} height={s} viewBox="0 0 32 32" fill="none"><line x1="4" y1="4" x2="28" y2="28" stroke={color} strokeWidth="2.5" strokeLinecap="round"/><line x1="28" y1="4" x2="4" y2="28" stroke={color} strokeWidth="2.5" strokeLinecap="round"/></svg>;
    case "circle":  return <svg width={s} height={s} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="11" stroke={color} strokeWidth="2.5"/></svg>;
    case "diamond": return <svg width={s} height={s} viewBox="0 0 32 32" fill="none"><polygon points="16,3 29,16 16,29 3,16" stroke={color} strokeWidth="2.5" fill="none"/></svg>;
    case "hex":     return <svg width={s} height={s} viewBox="0 0 32 32" fill="none"><polygon points="16,2 28,9 28,23 16,30 4,23 4,9" stroke={color} strokeWidth="2" fill="none"/></svg>;
    case "ring":    return <svg width={s} height={s} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="6" fill={color} opacity="0.7"/><circle cx="16" cy="16" r="12" stroke={color} strokeWidth="1.5" opacity="0.35"/></svg>;
    case "arrow":   return <svg width={s} height={s} viewBox="0 0 32 32" fill="none"><path d="M6 16H26M19 9L26 16L19 23" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case "dot":     return <svg width={s} height={s} viewBox="0 0 32 32" fill="none"><circle cx="8" cy="8" r="2.5" fill={color}/><circle cx="16" cy="8" r="2.5" fill={color} opacity="0.6"/><circle cx="24" cy="8" r="2.5" fill={color} opacity="0.3"/><circle cx="8" cy="16" r="2.5" fill={color} opacity="0.6"/><circle cx="16" cy="16" r="2.5" fill={color} opacity="0.4"/><circle cx="24" cy="16" r="2.5" fill={color} opacity="0.2"/></svg>;
    default: return null;
  }
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden min-h-screen flex flex-col justify-center"
      style={{ background: "#ffffff" }}>
      {/* Subtle grid — identical to About */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(94,96,206,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(94,96,206,0.05) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      {/* Colour blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(116,0,184,0.06) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(72,191,227,0.07) 0%, transparent 70%)", filter: "blur(50px)" }} />

      {/* Top accent line */}
      <div className="w-full h-px absolute top-0"
        style={{ background: "linear-gradient(90deg, transparent, rgba(94,96,206,0.2), rgba(72,191,227,0.2), transparent)" }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-20 pb-10 relative z-10 w-full">
        {/* Main grid */}
        <div className="grid md:grid-cols-3 gap-12 pb-16"
          style={{ borderBottom: "1px solid rgba(94,96,206,0.1)" }}>

          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
            <h2 className="font-heading" style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 0.93,
              background: "linear-gradient(160deg, #0e0025 0%, #5e60ce 55%, #48bfe3 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>AKSHAT<br />KHANDELWAL</h2>
            <p className="font-body text-sm mt-5 leading-relaxed max-w-xs" style={{ color: "#7a7aaa" }}>
              CS Engineer building AI-powered products that matter.
            </p>
          </motion.div>

          {/* Social */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "#5e60ce", opacity: 0.6 }}>Social</p>
            <div className="space-y-4">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="block font-body text-sm transition-colors duration-200"
                  style={{ color: "#7a7aaa" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#5e60ce"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#7a7aaa"; }}>
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "#5e60ce", opacity: 0.6 }}>Contact</p>
            <div className="space-y-4">
              {CONTACT_INFO.map((c) => (
                <div key={c.text} className="flex items-center gap-3 font-body text-sm" style={{ color: "#7a7aaa" }}>
                  <span style={{ color: "#48bfe3", fontSize: "1rem" }}>{c.icon}</span>
                  {c.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative shape strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="flex items-center gap-8 pt-10 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {SHAPES.map((s, i) => (
            <motion.div key={s.type}
              whileHover={{ scale: 1.3, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              style={{ transitionDelay: `${i * 0.06}s` }}
              className="shrink-0 cursor-default">
              <Shape type={s.type} color={s.color} />
            </motion.div>
          ))}
        </motion.div>

        {/* Copyright */}
        <div className="pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-2"
          style={{ borderTop: "1px solid rgba(94,96,206,0.08)" }}>
          <p className="font-body text-xs" style={{ color: "rgba(14,0,37,0.25)" }}>
            © {new Date().getFullYear()} Akshat Khandelwal. All rights reserved.
          </p>
          {/* CTA back to top */}
          <motion.button
            onClick={() => window.dispatchEvent(new CustomEvent("portfolio:navigate", { detail: 0 }))}
            className="font-body text-xs uppercase tracking-widest px-5 py-2 rounded-full"
            style={{ border: "1px solid rgba(94,96,206,0.2)", color: "#5e60ce", background: "transparent", cursor: "pointer" }}
            whileHover={{ scale: 1.05, background: "#5e60ce", color: "#fff", borderColor: "#5e60ce" }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}>
            Back to top ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
}