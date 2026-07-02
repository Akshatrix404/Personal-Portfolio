import { motion } from "framer-motion";
import InlineNav from "./InlineNav";

const STATS = [
  { value: "8.43", label: "CGPA / 10.0" },
  { value: "2",    label: "Production Internships" },
  { value: "4",    label: "Resume-backed Projects" },
  { value: "61K+", label: "Records Automated" },
];
const COURSEWORK = ["NLP","Statistics","DSA","Machine Learning","DBMS","Probability & Stochastic Processes","Operating Systems","Computer Networks"];

function StarGlyph() {
  return (<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%",height:"100%" }}><defs><radialGradient id="about-star-g"><stop offset="0%" stopColor="#80ffdb"/><stop offset="100%" stopColor="#48bfe3"/></radialGradient></defs><polygon points="60,10 72,40 105,40 80,58 90,90 60,70 30,90 40,58 15,40 48,40" fill="url(#about-star-g)"/></svg>);
}
function GemGlyph() {
  return (<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%",height:"100%" }}><defs><linearGradient id="about-gem-g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#64dfdf"/><stop offset="100%" stopColor="#5e60ce"/></linearGradient></defs><polygon points="60,8 100,40 85,112 35,112 20,40" fill="url(#about-gem-g)"/><polygon points="60,8 100,40 60,55 20,40" fill="#ffffff" opacity="0.22"/></svg>);
}
function FlowerGlyph() {
  return (<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%",height:"100%" }}><defs><radialGradient id="about-flower-g"><stop offset="0%" stopColor="#72efdd"/><stop offset="100%" stopColor="#5390d9"/></radialGradient></defs><circle cx="60" cy="30" r="18" fill="url(#about-flower-g)" opacity="0.85"/><circle cx="90" cy="60" r="18" fill="url(#about-flower-g)" opacity="0.85"/><circle cx="60" cy="90" r="18" fill="url(#about-flower-g)" opacity="0.85"/><circle cx="30" cy="60" r="18" fill="url(#about-flower-g)" opacity="0.85"/><circle cx="60" cy="60" r="14" fill="#7400b8" opacity="0.9"/></svg>);
}
const FLOATS = [
  { Glyph: StarGlyph,   className: "absolute top-20 left-8 md:left-14",                     w: "w-14 md:w-20", dur: 4.0, delay: 0 },
  { Glyph: GemGlyph,    className: "absolute top-24 right-8 md:right-14",                   w: "w-14 md:w-20", dur: 5.2, delay: 0.5 },
  { Glyph: FlowerGlyph, className: "absolute right-8 md:right-12 top-1/2 -translate-y-1/2", w: "w-14 md:w-20", dur: 7.3, delay: 0.3 },
];

export default function About() {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden" style={{ background: "#f5f4ff" }}>
      {/* ── Integrated nav — light theme ── */}
      <InlineNav activeIdx={1} light={true} />

      {/* ── Section content ── */}
      <div className="flex-1 flex items-center px-6 md:px-16 gap-8 md:gap-12 overflow-hidden">
        {/* Ambient */}
        <div className="absolute top-0 left-1/4 w-96 h-96 pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(116,0,184,.06) 0%,transparent 70%)", filter: "blur(50px)" }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(72,191,227,.07) 0%,transparent 70%)", filter: "blur(50px)" }} />

        {/* Floating glyphs */}
        {FLOATS.map((f, i) => (
          <motion.div key={i} animate={{ y: [0,-14,0] }} transition={{ repeat: Infinity, duration: f.dur, delay: f.delay, ease: "easeInOut" }}
            className={`${f.className} ${f.w} z-10 pointer-events-none hidden md:block`}
            style={{ filter: "drop-shadow(0 8px 24px rgba(116,0,184,0.2))" }}>
            <f.Glyph />
          </motion.div>
        ))}

        {/* LEFT — vertical title */}
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
          className="hidden md:flex flex-col justify-center items-center shrink-0 gap-4" style={{ width: "22%" }}>
          <h2 className="font-heading select-none" style={{
            fontSize: "clamp(2.5rem,5vw,5rem)", lineHeight: 0.9, letterSpacing: "-0.02em",
            writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)",
            background: "linear-gradient(180deg,#0e0025 0%,#5e60ce 60%,#48bfe3 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>ABOUT</h2>
          <div className="mt-6 w-px h-16 self-center" style={{ background: "linear-gradient(180deg,#5e60ce,transparent)" }} />
        </motion.div>

        {/* RIGHT — card */}
        <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.16,1,0.3,1], delay: 0.1 }}
          className="relative rounded-2xl p-7 md:p-9 flex-1 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 60px - 2rem)", background: "#ffffff", border: "1px solid rgba(94,96,206,0.15)", boxShadow: "0 0 60px rgba(94,96,206,0.08),0 32px 80px rgba(14,0,37,0.08)" }}>
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3 flex flex-col gap-5">
              <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: "rgba(14,0,37,.78)" }}>
                I'm a final-year Computer Science undergraduate at VIT Vellore working at the intersection of AI engineering, data analysis, and full-stack development. Across two production internships I've shipped a solo RAG-powered e-commerce chatbot, an Invoice Fraud Detection model, and KPI dashboards that cut manual review by 60% across 61,000+ financial records.
              </p>
              <p className="font-body text-sm md:text-base leading-relaxed" style={{ color: "rgba(14,0,37,.6)" }}>
                I like problems that sit between worlds — building the model is only half the job. The other half is wiring it into a clean API, surfacing the numbers in a dashboard, and making sure the pipeline tells the same story end-to-end.
              </p>
              <div>
                <span className="font-body text-xs uppercase tracking-[0.25em]" style={{ color: "rgba(14,0,37,.4)" }}>Coursework</span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {COURSEWORK.map((c, i) => (
                    <motion.span key={c} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}
                      className="font-body text-sm px-4 py-1.5 rounded-full"
                      style={{ background: "rgba(94,96,206,.08)", border: "1px solid rgba(94,96,206,.18)", color: "#5e60ce" }}>
                      {c}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="rounded-2xl p-6" style={{ background: "rgba(94,96,206,.04)", border: "1px solid rgba(94,96,206,.12)" }}>
                <span className="font-body text-xs uppercase tracking-[0.25em]" style={{ color: "#5e60ce", opacity: 0.7 }}>Education</span>
                <h3 className="font-heading text-xl md:text-2xl mt-2" style={{ color: "#0e0025" }}>Vellore Institute of Technology</h3>
                <p className="font-body text-sm mt-1" style={{ color: "rgba(14,0,37,.5)" }}>Vellore, Tamil Nadu</p>
                <p className="font-body text-base mt-4" style={{ color: "rgba(14,0,37,.75)" }}>B.Tech, Computer Science Engineering</p>
                <p className="font-body text-sm mt-1" style={{ color: "rgba(14,0,37,.5)" }}>August 2023 — Present · CGPA 8.43 / 10.0</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {STATS.map(s => (
              <motion.div key={s.label} className="rounded-2xl p-5 text-center"
                whileHover={{ scale: 1.06, background: "rgba(94,96,206,0.12)" }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                style={{ background: "rgba(94,96,206,.04)", border: "1px solid rgba(94,96,206,.12)" }}>
                <div className="font-heading" style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", background: "linear-gradient(135deg,#5e60ce 0%,#48bfe3 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.value}</div>
                <div className="font-body text-xs uppercase tracking-[0.15em] mt-2" style={{ color: "rgba(14,0,37,.45)" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}