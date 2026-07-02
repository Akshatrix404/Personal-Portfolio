import { useState, useRef, useEffect } from "react";
import InlineNav from "./InlineNav";
import { motion, AnimatePresence } from "framer-motion";
<InlineNav activeIdx={5} light={false} />
const TABS = [
  {
    id: "intern", label: "Internships", icon: "💼", accent: "#64dfdf",
    items: [
      {
        role: "AI/ML Engineering & Web Development Intern",
        org: "PraisIT Solutions Private Limited",
        location: "Gurugram, Haryana",
        period: "May 2026 — Jul 2026",
        accent: "#64dfdf",
        points: [
          "Architected and shipped Iris solo — FastAPI + React + ChromaDB + Ollama (llama3.1) chatbot with JWT auth, RAG retrieval, and automated return validation across 10,000+ query scenarios at zero external API cost.",
          "Engineered a 5-module backend with 3-format auto-ingestion (PDF/DOCX/JSON), structured logging, and model-monitoring pipelines; delivered weekly KPI dashboards for stakeholder reviews.",
          "Diagnosed and resolved chatbot query failures by analysing the structured logging pipeline, cutting return-validation errors via improved auto-ingestion accuracy.",
        ],
      },
      {
        role: "Finance Generative AI Intern",
        org: "Genpact",
        location: "Gurugram, Haryana",
        period: "May 2025 — Jul 2025",
        accent: "#5e60ce",
        points: [
          "Delivered 4 production AI solutions — Code Analyzer, Skill Enhancer, Invoice Fraud Detection, CSV Converter — using OpenAI, LangChain, FastAPI, and Python; automated 61,000+ financial records with 100% regulatory compliance.",
          "Achieved 60% manual review reduction, 3× skill-evaluation throughput improvement, and 25% forecasting accuracy gain across all solutions.",
          "Delivered KPI dashboards and root-cause analysis for stakeholder reviews; identified operational bottlenecks and drove end-to-end pipeline improvements under regulatory constraints.",
        ],
      },
    ],
  },
  {
    id: "leadership", label: "Leadership & Management", icon: "🎯", accent: "#7400b8",
    items: [
      {
        role: "Senior Core Member, AI/ML",
        org: "Team Prometheus, VIT",
        location: "Vellore, Tamil Nadu",
        period: "Mar 2025 — May 2025",
        accent: "#7400b8",
        points: [
          "Promoted to Senior Core; conducted 25+ technical recruitment interviews for the AI/ML vertical.",
          "Optimised sprint workflow across 10+ junior members, improving team delivery speed.",
        ],
      },
      {
        role: "Junior Core Member, AI/ML",
        org: "Team Prometheus, VIT",
        location: "Vellore, Tamil Nadu",
        period: "Oct 2024 — Feb 2025",
        accent: "#56cfe1",
        points: [
          "Rewrote the team's AI codebase using reinforcement learning, improving model robustness.",
          "Organised 3 AI/ML workshops engaging 200+ participants, driving a 40% rise in active member participation and 70% engagement improvement.",
        ],
      },
    ],
  },
];

export default function Experience() {
  const [tab, setTab] = useState(0);
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const items = TABS[tab].items;
  const accent = TABS[tab].accent;

  // Reset active item on tab change
  useEffect(() => { setActive(0); }, [tab]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        if (active < items.length - 1) {
          e.preventDefault();
          setActive(i => i + 1);
        }
        // at last item → let App.tsx navigate to next section
      }
      if (e.key === "ArrowUp") {
        if (active > 0) {
          e.preventDefault();
          setActive(i => i - 1);
        }
        // at first item → let App.tsx navigate to prev section
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [items.length, active]);

  useEffect(() => { btnRefs.current[active]?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [active]);

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden" style={{ background: "var(--bg-deep)" }}>
      <InlineNav activeIdx={4} light={false} />
      <div className="relative flex-1 flex items-center px-6 md:px-16 gap-8 md:gap-12" style={{ background: "var(--bg-deep)" }}>
      {/* Ambient */}
      <div className="absolute right-0 top-1/4 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(94,96,206,.14) 0%,transparent 70%)", filter: "blur(70px)" }} />

      {/* LEFT — EXPERIENCE title (~22%) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex flex-col justify-center items-center shrink-0 gap-4"
        style={{ width: "22%" }}
      >
        <h2 className="font-heading select-none"
          style={{
            fontSize: "clamp(1.8rem,3.5vw,3.5rem)",
            lineHeight: 0.9, letterSpacing: "-0.02em", writingMode: "vertical-rl",
            textOrientation: "mixed", transform: "rotate(180deg)",
            background: "linear-gradient(180deg,#fff 0%,#64dfdf 50%,#7400b8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>EXPERIENCE</h2>
        <div className="w-px h-16" style={{ background: "linear-gradient(180deg,#64dfdf,transparent)" }} />
        <div className="flex flex-col gap-2">
          {TABS.map((t, i) => (
            <motion.button key={t.id} onClick={() => setTab(i)}
              animate={{ scale: i === tab ? 1.4 : 1, background: i === tab ? t.accent : "rgba(255,255,255,0.2)" }}
              style={{ width: 8, height: 8, borderRadius: 99, border: "none", cursor: "pointer", padding: 0 }}
              title={t.label}
            />
          ))}
        </div>
      </motion.div>

      {/* RIGHT — card (~78%) */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="relative rounded-2xl flex-1 overflow-hidden"
        style={{
          maxHeight: "85vh",
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${accent}28`,
          backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
          boxShadow: `0 0 60px ${accent}12, 0 32px 80px rgba(0,0,0,0.35)`,
          transition: "border-color 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Tab bar */}
        <div className="flex gap-2 p-4 pb-3 flex-wrap"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {TABS.map((t, i) => (
            <motion.button key={t.id} onClick={() => setTab(i)}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="font-body text-xs flex items-center gap-2 px-4 py-2 rounded-full"
              animate={{
                background: i === tab ? `${t.accent}18` : "rgba(255,255,255,0.04)",
                borderColor: i === tab ? `${t.accent}55` : "rgba(255,255,255,0.08)",
                color: i === tab ? t.accent : "rgba(232,228,255,0.4)",
              }}
              style={{ border: "1px solid", cursor: "pointer", letterSpacing: "0.03em" }}>
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </motion.button>
          ))}
        </div>

        {/* List — company cards, accordion-style */}
        <div className="p-4 overflow-y-auto flex flex-col" style={{ maxHeight: "calc(85vh - 70px)" }}>
          <AnimatePresence mode="wait">
            <motion.div key={tab}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }} className="flex flex-col">
              {items.map((e, i) => {
                const isOpen = i === active;
                return (
                  <motion.div
                    key={e.role + e.org}
                    initial={{ opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    style={{ borderBottom: i < items.length - 1 ? "1px solid rgba(100,223,223,0.07)" : "none" }}
                  >
                    <button
                      ref={el => { btnRefs.current[i] = el; }}
                      onClick={() => setActive(isOpen ? -1 : i)}
                      className="text-left rounded-xl p-4 md:p-5 w-full flex items-start gap-4"
                      style={{ background: isOpen ? `${e.accent}10` : "transparent", border: "none", cursor: "pointer" }}
                    >
                      {/* Company logo badge */}
                      <span className="shrink-0 flex items-center justify-center font-heading rounded-lg"
                        style={{ width: 36, height: 36, background: `${e.accent}22`, color: e.accent, fontSize: "1rem" }}>
                        {e.org.charAt(0)}
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-1">
                          <h3 className="font-heading text-base md:text-lg"
                            style={{
                              background: `linear-gradient(135deg,#fff 0%,${e.accent} 100%)`,
                              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                            }}>{e.role}</h3>
                          <span className="font-body text-xs uppercase tracking-[0.15em] shrink-0" style={{ color: e.accent }}>{e.period}</span>
                        </div>
                        <p className="font-body text-xs" style={{ color: "rgba(232,228,255,.5)" }}>{e.org} · {e.location}</p>
                      </div>
                      <motion.svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0 mt-1.5"
                        style={{ color: e.accent }}
                      >
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="px-5 pb-5 pl-[3.75rem]">
                            <ul className="flex flex-col gap-3 relative pl-5"
                              style={{ borderLeft: `2px solid ${e.accent}25` }}>
                              {e.points.map((pt, pi) => (
                                <li key={pi} className="relative font-body text-sm leading-relaxed" style={{ color: "rgba(232,228,255,.65)" }}>
                                  <span className="absolute -left-[26px] top-1 w-2 h-2 rounded-full" style={{ background: e.accent, opacity: 0.8 }} />
                                  <span style={{ color: e.accent }}>– </span>{pt}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
          <p className="font-body text-[10px] uppercase tracking-[0.25em] mt-2 text-center"
            style={{ color: "rgba(232,228,255,.2)" }}>Use ↑ / ↓ to step through roles</p>
        </div>
      </motion.div>
      </div>
    </div>
  );
}