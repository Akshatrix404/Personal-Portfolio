import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",        href: "#home"       },
  { label: "About",       href: "#about"      },
  { label: "Skills",      href: "#services"   },
  { label: "Projects",    href: "#projects"   },
  { label: "Experience",  href: "#experience" },
  { label: "Recognition", href: "#recognition"},
  { label: "Testimonials",href: "#testimonials"},
  { label: "Contact",     href: "#contact"    },
];

const projects = [
  {
    number: "01",
    name: "SearchLens",
    category: "AI / Full-Stack",
    year: "2025",
    link: "https://github.com/Akshatrix404/Hybrid-Lexical-and-Semantic-Matching",
    stack: ["TypeScript", "React", "FastAPI", "BM25", "Google Gemini", "JWT", "AWS (EC2, S3, SNS, IAM)", "Docker"],
    description: "Hybrid BM25 + semantic search engine with AI query rewriting and domain detection across 30+ domains.\nReal-time IoT fleet dashboard with SSE streaming, Z-score anomaly detection, and Gemini-powered root-cause analysis.",
    color: "#10c1c1",
    images: ["/projects/searchlens.png", "/projects/searchlens-2.png"],
  },
  {
    number: "02",
    name: "WealthSense",
    category: "Android / ML",
    year: "2025",
    link: "https://github.com/Akshatrix404/WealthSense",
    stack: ["Kotlin", "Jetpack Compose", "Python", "PyTorch", "TensorFlow", "FastAPI", "PostgreSQL", "Docker", "AWS", "Power BI"],
    description: "Bidirectional LSTM trained on 500 simulated users' 90-day data, forecasting 7-day balances from a 30-transaction window — quantised for on-device Android inference.\nIsolation Forest anomaly detector flagging fraud across 10M+ records, with every transaction hash logged to a tamper-proof FastAPI ledger.",
    color: "#7400b8",
    images: ["/projects/wealthsense-1.png", "/projects/wealthsense-2.png"],
  },
  {
    number: "03",
    name: "Iris AI (Interactive RAG Module)",
    category: "AI / GenAI",
    year: "2026",
    link: "https://github.com/Akshatrix404/Interactive-RAG-Module",
    stack: ["FastAPI", "React", "ChromaDB", "Ollama (llama3.1)", "PostgreSQL", "Sentence-Transformers", "Docker", "RAG", "JWT"],
    description: "Production RAG chatbot serving 10,000+ queries at zero external API cost across 6 intent flows — order, compare, offers, returns, damage verification, wrong-item resolution.\nVision-model return-validation loop, Amazon-style recommendations, 5-module backend with 3-format auto-ingestion (PDF / DOCX / JSON).",
    color: "#5e60ce",
    images: ["/projects/iris-1.png", "/projects/iris-2.png"],
  },
  {
    number: "04",
    name: "RetailX",
    category: "Data / SQL",
    year: "2025",
    link: "https://github.com/Akshatrix404/RetailX",
    stack: ["SQL Server", "T-SQL", "Power BI", "DAX", "RFM Modeling", "Cohort Analysis", "Data Warehousing", "Git"],
    description: "21-module SQL data warehouse on Bronze-Silver-Gold medallion architecture — RFM scoring, cohort retention modeling, and a rule-based churn classifier flagging up to 60% churn risk.\n3 Power BI dashboards with DAX-calculated KPIs across 6 source tables, surfacing a 12% Month-3 retention decline to drive retention strategy.",
    color: "#48bfe3",
    images: ["/projects/retailx-1.png", "/projects/retailx-2.png"],
  },
];

// ─── Light-theme nav item ──────────────────────────────────────────────
function LightNavItem({ link, active }: { link: typeof NAV_LINKS[0]; active: boolean }) {
  const [hovered, setHovered] = useState(false);
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const highlight = hovered || active;
  return (
    <a
      href={link.href}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex flex-col items-center gap-[3px]"
      style={{ textDecoration: "none" }}
    >
      <span
        className="font-body text-xs uppercase tracking-widest transition-all duration-200"
        style={{
          color: highlight ? "#5e60ce" : "rgba(14,0,37,0.45)",
          fontWeight: active ? 600 : 500,
          letterSpacing: "0.14em",
        }}
      >
        {link.label}
      </span>
      <span className="relative h-px w-full overflow-hidden">
        <motion.span
          className="absolute inset-0"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: highlight ? 1 : 0 }}
          transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            display: "block",
            background: "linear-gradient(90deg,#5e60ce,#48bfe3)",
          }}
        />
      </span>
    </a>
  );
}

// ─── Tech badge ────────────────────────────────────────────────────────
function TechBadge({ tech, color }: { tech: string; color: string }) {
  return (
    <span
      className="font-body px-2 py-1 rounded whitespace-nowrap inline-block"
      style={{ background: `${color}22`, border: `0.5px solid ${color}50`, color: `${color}cc`, fontSize: "10px" }}
    >
      {tech}
    </span>
  );
}

// ─── Project image with dark fallback ─────────────────────────────────
function ProjectImg({ src, color, alt }: { src: string; color: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!failed)
    return <img src={src} alt={alt} onError={() => setFailed(true)} className="w-full h-full object-cover" />;
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ background: `linear-gradient(135deg,${color}22,${color}08)` }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(${color}18 1px,transparent 1px),linear-gradient(90deg,${color}18 1px,transparent 1px)`,
        backgroundSize: "24px 24px",
      }} />
      <span className="font-body text-xs uppercase tracking-widest relative z-10 text-center px-4" style={{ color: `${color}66` }}>
        {alt}
      </span>
    </div>
  );
}

// ─── Card rotation animation variants ─────────────────────────────────
// Cards rotate in like being dealt from a deck — swing in from the side with Y-axis rotation
const cardVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 120 : -120,
    rotateY: dir > 0 ? 45 : -45,
    opacity: 0,
    scale: 0.88,
    zIndex: 1,
  }),
  center: {
    x: 0,
    rotateY: 0,
    opacity: 1,
    scale: 1,
    zIndex: 2,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      opacity: { duration: 0.3 },
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -120 : 120,
    rotateY: dir > 0 ? -45 : 45,
    opacity: 0,
    scale: 0.88,
    zIndex: 1,
    transition: {
      duration: 0.45,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  }),
};

// ─── Ghost cards behind current (deck effect) ─────────────────────────
function DeckGhosts({ idx, color }: { idx: number; color: string }) {
  const remaining = projects.length - 1 - idx;
  return (
    <>
      {[...Array(Math.min(remaining, 2))].map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: "linear-gradient(160deg,#0d0020 0%,#0a001a 60%,#06001a 100%)",
            border: `1px solid ${color}18`,
            transform: `translateX(${(i + 1) * 7}px) translateY(${(i + 1) * -5}px) scale(${1 - (i + 1) * 0.025})`,
            zIndex: 1 - i,
            opacity: 0.55 - i * 0.15,
          }}
        />
      ))}
    </>
  );
}

export default function Projects() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const locked = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  // Trackpad horizontal scroll accumulator
  const wheelAccX = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const project = projects[idx];
  const pad = (n: number) => String(n).padStart(2, "0");

  const goTo = useCallback((next: number, direction: number) => {
    if (locked.current) return;
    if (next < 0 || next >= projects.length) return;
    locked.current = true;
    setDir(direction);
    setIdx(next);
    setTimeout(() => { locked.current = false; }, 620);
  }, []);

  // ── Arrow keys ───────────────────────────────────────────────────────
  // Left / Right  → rotate project cards
  // Up / Down     → navigate sections (let App.tsx handle it)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  { e.preventDefault(); goTo(idx - 1, -1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); goTo(idx + 1,  1); }
      // ArrowUp / ArrowDown intentionally NOT handled here → falls through to App.tsx
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [idx, goTo]);

  // ── Touchpad horizontal scroll (deltaX only) → rotate cards ─────────
  // Vertical-dominant wheel events are NOT consumed; App.tsx handles those.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      // Only handle clearly horizontal swipes
      if (absX <= absY || absX < 2) return;
      e.preventDefault();

      wheelAccX.current += e.deltaX;

      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => { wheelAccX.current = 0; }, 200);

      const THRESHOLD = 80;
      if (wheelAccX.current > THRESHOLD) {
        wheelAccX.current = 0;
        goTo(idx + 1, 1);
      } else if (wheelAccX.current < -THRESHOLD) {
        wheelAccX.current = 0;
        goTo(idx - 1, -1);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [idx, goTo]);

  // ── Touch swipe (mobile) ─────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const delta = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) { delta > 0 ? goTo(idx + 1, 1) : goTo(idx - 1, -1); }
    touchX.current = null;
  };

  const isExternal = project.link.startsWith("http");

  return (
    <div
      ref={sectionRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "#f5f4ff" }}
    >
      {/* ── Ambient blobs ── */}
      <div className="absolute top-0 left-1/4 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(116,0,184,.06) 0%,transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(72,191,227,.07) 0%,transparent 70%)", filter: "blur(50px)" }} />

      {/* ══════════════════════════════════════════════════════════════
          INTEGRATED NAVBAR — light theme, lives inside this section
      ══════════════════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-50 flex items-center justify-between px-8 md:px-16 shrink-0"
        style={{
          height: "64px",
          borderBottom: "1px solid rgba(94,96,206,0.10)",
          background: "rgba(245,244,255,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {/* Logo / monogram */}
        <span
          className="font-heading select-none"
          style={{
            fontSize: "1.4rem",
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg,#5e60ce 0%,#48bfe3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          AK
        </span>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <LightNavItem link={link} active={link.href === "#projects"} />
            </li>
          ))}
        </ul>

        {/* Mobile hamburger placeholder */}
        <div className="md:hidden flex flex-col gap-1.5 cursor-pointer p-1">
          {[0, 1, 2].map(i => (
            <span key={i} className="block w-5 h-px rounded-full" style={{ background: "rgba(14,0,37,0.4)" }} />
          ))}
        </div>
      </motion.nav>

      {/* ══════════════════════════════════════════════════════════════
          MAIN CONTENT — vertical title + card stage
      ══════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex items-center overflow-hidden px-6 md:px-16 gap-8 md:gap-12 py-4">

        {/* LEFT — vertical PROJECTS title */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex flex-col justify-center items-center shrink-0 gap-4"
          style={{ width: "18%" }}
        >
          <h2
            className="font-heading select-none"
            style={{
              fontSize: "clamp(2.2rem,4.5vw,4.5rem)",
              lineHeight: 0.9, letterSpacing: "-0.02em",
              writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)",
              background: "linear-gradient(180deg,#0e0025 0%,#5e60ce 60%,#48bfe3 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}
          >
            PROJECTS
          </h2>
          <div className="mt-4 w-px h-14 self-center" style={{ background: "linear-gradient(180deg,#5e60ce,transparent)" }} />
        </motion.div>

        {/* RIGHT — card area */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative flex-1 flex flex-col"
          style={{ height: "calc(100vh - 64px - 2.5rem)", maxHeight: "780px" }}
        >
          {/* Navigation row */}
          <div className="flex items-center justify-between mb-3 px-1 shrink-0">
            {/* Prev */}
            <button
              onClick={() => goTo(idx - 1, -1)}
              disabled={idx === 0}
              aria-label="Previous project"
              className="flex items-center gap-2 font-body text-xs uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-200"
              style={{
                background: idx === 0 ? "rgba(94,96,206,.04)" : "rgba(94,96,206,.10)",
                border: `1px solid ${idx === 0 ? "rgba(94,96,206,.10)" : "rgba(94,96,206,.28)"}`,
                color: idx === 0 ? "rgba(14,0,37,.2)" : "#5e60ce",
                cursor: idx === 0 ? "default" : "pointer",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Prev
            </button>

            {/* Dot pills + counter */}
            <div className="flex items-center gap-3">
              {projects.map((p, i) => (
                <button key={p.number} onClick={() => goTo(i, i > idx ? 1 : -1)}
                  aria-label={`Go to ${p.name}`}
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                  <motion.div
                    animate={{ width: i === idx ? 28 : 8, background: i === idx ? p.color : "rgba(14,0,37,.15)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    style={{ height: 5, borderRadius: 99 }}
                  />
                </button>
              ))}
              <span className="font-body text-xs ml-1" style={{ color: "rgba(14,0,37,.3)" }}>
                <AnimatePresence mode="wait">
                  <motion.span key={idx}
                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                    style={{ display: "inline-block", color: project.color, fontWeight: 700 }}>
                    {pad(idx + 1)}
                  </motion.span>
                </AnimatePresence>
                <span style={{ color: "rgba(14,0,37,.2)" }}> / {pad(projects.length)}</span>
              </span>
            </div>

            {/* Next */}
            <button
              onClick={() => goTo(idx + 1, 1)}
              disabled={idx === projects.length - 1}
              aria-label="Next project"
              className="flex items-center gap-2 font-body text-xs uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-200"
              style={{
                background: idx === projects.length - 1 ? "rgba(94,96,206,.04)" : "rgba(94,96,206,.10)",
                border: `1px solid ${idx === projects.length - 1 ? "rgba(94,96,206,.10)" : "rgba(94,96,206,.28)"}`,
                color: idx === projects.length - 1 ? "rgba(14,0,37,.2)" : "#5e60ce",
                cursor: idx === projects.length - 1 ? "default" : "pointer",
              }}
            >
              Next
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* ── Deck stage with perspective ── */}
          <div
            className="relative flex-1"
            style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
          >
            {/* Ghost cards — stacked deck behind active */}
            <DeckGhosts idx={idx} color={project.color} />

            {/* Active card with rotation animation */}
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={idx}
                custom={dir}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d", willChange: "transform" }}
              >
                {/* Light outer shell — like About card */}
                <div
                  className="w-full h-full rounded-2xl overflow-hidden"
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(94,96,206,0.15)",
                    boxShadow: `0 0 60px rgba(94,96,206,0.09), 0 32px 80px rgba(14,0,37,0.09), 0 0 0 1px ${project.color}12`,
                  }}
                >
                  {/* Dark inner card */}
                  <div
                    className="w-full h-full flex flex-col overflow-hidden"
                    style={{ background: "linear-gradient(160deg,#0d0020 0%,#0a001a 60%,#06001a 100%)" }}
                  >
                    {/* Top bar */}
                    <div
                      className="flex items-center justify-between px-6 py-4 flex-wrap gap-3 shrink-0"
                      style={{ borderBottom: `1px solid ${project.color}25` }}
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-heading"
                          style={{ fontSize: "clamp(1.2rem,2.5vw,2rem)", color: project.color, lineHeight: 1 }}>
                          {project.number}
                        </span>
                        <div>
                          <p className="font-body text-xs uppercase tracking-[0.2em] mb-0.5" style={{ color: project.color }}>
                            {project.category} · {project.year}
                          </p>
                          <h3 className="font-heading"
                            style={{ fontSize: "clamp(0.9rem,1.8vw,1.3rem)", color: "#ffffff", lineHeight: 1.1, fontWeight: 700 }}>
                            {project.name}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {isExternal ? (
                          <a href={project.link} target="_blank" rel="noopener noreferrer"
                            className="font-body text-xs uppercase tracking-widest px-4 py-2 rounded-full"
                            style={{ border: `1px solid ${project.color}55`, color: project.color, background: `${project.color}12`, textDecoration: "none", whiteSpace: "nowrap" }}>
                            View on GitHub
                          </a>
                        ) : (
                          <span className="font-body text-xs uppercase tracking-widest px-4 py-2 rounded-full"
                            style={{ border: "1px solid rgba(255,255,255,.12)", color: "rgba(255,255,255,.25)" }}>
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Image grid + tech stack */}
                    <div className="grid gap-2 p-4 shrink-0"
                      style={{ gridTemplateColumns: "2fr 1fr", gridTemplateRows: "130px 130px", height: "280px" }}>
                      <div className="overflow-hidden rounded-xl" style={{ gridRow: "1 / 3", border: `1px solid ${project.color}20` }}>
                        <ProjectImg src={project.images[0]} color={project.color} alt={project.name} />
                      </div>
                      <div className="overflow-hidden rounded-xl" style={{ border: `1px solid ${project.color}20` }}>
                        <ProjectImg src={project.images[1] ?? project.images[0]} color={project.color} alt={project.stack[0]} />
                      </div>
                      <div className="overflow-hidden rounded-xl p-3 flex flex-col gap-2"
                        style={{ border: `1px solid ${project.color}20`, background: `${project.color}08` }}>
                        <p className="font-body text-[9px] uppercase tracking-widest" style={{ color: `${project.color}88` }}>
                          Tech Stack
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.stack.map(t => <TechBadge key={t} tech={t} color={project.color} />)}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="px-6 pb-5 pt-1 flex-1 overflow-y-auto">
                      <p className="font-body leading-relaxed"
                        style={{ color: "rgba(255,255,255,.6)", fontSize: "0.8rem", whiteSpace: "pre-line" }}>
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}