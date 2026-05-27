import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    number: "01",
    name: "Hybrid Lexical & Semantic Matching",
    client: "SearchLens",
    category: "AI / Full Stack",
    year: "2025",
    link: "https://github.com/Akshatrix404/Hybrid-Lexical-and-Semantic-Matching",
    Github: "https://github.com/Akshatrix404/Hybrid-Lexical-and-Semantic-Matching",
    stack: ["Gemini 2.5", "NLP", "AWS", "TypeScript", "Node.js", "React"],
    description: "Search relevance reinvented with BM25 and Gemini AI.\nEnterprise-grade fleet intelligence, anomaly detection, and resume scoring in one platform.",
    color: "#10c1c1",
    images: ["/projects/searchlens-1.png", "/projects/searchlens-2.png", "/projects/searchlens-3.png"],
  },
  {
    number: "02",
    name: "HireFlow ATS",
    client: "HireFlow",
    category: "Full Stack Web",
    year: "2025",
    link: "#",
    Github: "#",
    stack: ["React.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Redis", "Docker", "AWS", "Gemini AI"],
    description: "An applicant tracking system that automates hiring from resume parse to interview scheduling.\nAI scoring, pipeline visibility, and analytics built for fast, data-driven recruitment.",
    color: "#1aa57e",
    images: ["/projects/hireflow-1.png", "/projects/hireflow-2.png"],
  },
  {
    number: "03",
    name: "LocalMart",
    client: "LocalMart",
    category: "Full Stack Web",
    year: "2025",
    link: "#",
    Github: "#",
    stack: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Redis", "AWS S3", "WhatsApp Business API", "Docker"],
    description: "Mobile-first hyperlocal commerce with GST-ready invoicing for kirana stores.\nReal-time stock alerts, shareable orders, and smooth neighborhood retail operations.",
    color: "#208cac",
    images: ["/projects/localmart-1.png", "/projects/localmart-2.png"],
  },
  {
    number: "04",
    name: "MedScribe",
    client: "MedScribe",
    category: "AI / ML",
    year: "2025",
    link: "#",
    Github: "#",
    stack: ["Python", "FastAPI", "LangChain", "LangGraph", "RAG", "ChromaDB", "Whisper API", "Gemini AI", "PostgreSQL", "React", "Docker", "AWS"],
    description: "AI clinical assistant that converts voice notes into structured SOAP summaries.\nTranscription, interaction alerts, and patient-ready reports for faster, safer care.",
    color: "#5e60ce",
    images: ["/projects/medscribe-1.png", "/projects/medscribe-2.png"],
  },
  {
    number: "05",
    name: "SkillMap",
    client: "SkillMap",
    category: "AI / ML",
    year: "2025",
    link: "#",
    Github: "#",
    stack: ["Python", "FastAPI", "LangGraph", "RAG", "PostgreSQL", "React", "Redis", "Docker", "AWS"],
    description: "Adaptive skill-gap coaching with personalised weekly learning plans.\nDynamic progress tracking and targeted reskilling for measurable career growth.",
    color: "#6930c3",
    images: ["/projects/skillmap-1.png", "/projects/skillmap-2.png"],
  },
  {
    number: "06",
    name: "SafeRoute",
    client: "SafeRoute",
    category: "Android",
    year: "205",
    link: "#",
    Github: "#",
    stack: ["Kotlin", "Jetpack Compose", "Coroutines", "Room DB", "WorkManager", "Google Maps SDK", "AWS S3", "Firebase Cloud Messaging", "FastAPI"],
    description: "Safety-first route tracking with instant SOS and silent evidence capture.\nReal-time route deviation alerts, community heatmaps, and one-touch protection.",
    color: "#7400b8",
    images: ["/projects/saferoute-1.png", "/projects/saferoute-2.png"],
  },
  {
    number: "07",
    name: "FarmAssist",
    client: "FarmAssist",
    category: "Android / ML",
    year: "2025",
    link: "#",
    Github: "#",
    stack: ["Kotlin", "Jetpack Compose", "TensorFlow Lite", "CameraX", "Room DB", "Retrofit", "FastAPI", "Python/PyTorch", "AWS", "Google Translate API"],
    description: "Offline crop disease detection and mandi price intelligence for rural farmers.\nMultilingual voice guidance in Hindi/Rajasthani with AI insights for every harvest.",
    color: "#2293a4",
    images: ["/projects/farmassist-1.png", "/projects/farmassist-2.png"],
  },
];

// ── Render tech as text badge ──────────────────────────────────────────────────
function TechBadge({ tech, color }: { tech: string; color: string }) {
  return (
    <span className="font-body px-2 py-1 rounded whitespace-nowrap inline-block"
      style={{
        background: `${color}15`,
        border: `0.5px solid ${color}30`,
        color: `${color}aa`,
        fontSize: "10px",
      }}>
      {tech}
    </span>
  );
}
function ProjectImg({ src, color, alt }: { src: string; color: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!failed) {
    return (
      <img src={src} alt={alt} onError={() => setFailed(true)}
        className="w-full h-full object-cover" />
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${color}18, ${color}06)` }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(${color}12 1px,transparent 1px),linear-gradient(90deg,${color}12 1px,transparent 1px)`,
        backgroundSize: "24px 24px",
      }} />
      <span className="font-body text-xs uppercase tracking-widest relative z-10 text-center px-4"
        style={{ color: `${color}55` }}>{alt}</span>
    </div>
  );
}

// ── Flip card directions ──────────────────────────────────────────────────────
const variants = {
  enter: (dir: number) => ({
    y: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.94,
    rotateX: dir > 0 ? 12 : -12,
  }),
  center: {
    y: "0%",
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: (dir: number) => ({
    y: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.94,
    rotateX: dir > 0 ? -12 : 12,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  }),
};

export default function Projects() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const locked = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const extraScroll = useRef(0);
  const EXTRA = 3;

  const project = projects[idx];

  const goTo = useCallback((next: number, direction: number) => {
    if (locked.current) return;
    if (next < 0 || next >= projects.length) return;
    locked.current = true;
    setDir(direction);
    setIdx(next);
    extraScroll.current = 0;
    setTimeout(() => { locked.current = false; }, 700);
  }, []);

  // Scroll inside the section cycles through projects
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (locked.current) return;

      const goingDown = e.deltaY > 0;

      if (goingDown) {
        if (idx < projects.length - 1) {
          extraScroll.current += 1;
          if (extraScroll.current >= EXTRA) goTo(idx + 1, 1);
        }
        // If at last project, do nothing — parent App handles section change
      } else {
        if (idx > 0) {
          extraScroll.current += 1;
          if (extraScroll.current >= EXTRA) goTo(idx - 1, -1);
        }
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [idx, goTo]);

  // Touch support
  const touchY = useRef(0);
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchY.current = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      const dy = touchY.current - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 50) return;
      if (dy > 0 && idx < projects.length - 1) goTo(idx + 1, 1);
      if (dy < 0 && idx > 0) goTo(idx - 1, -1);
    };
    const el = sectionRef.current;
    el?.addEventListener("touchstart", onStart, { passive: true });
    el?.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el?.removeEventListener("touchstart", onStart);
      el?.removeEventListener("touchend", onEnd);
    };
  }, [idx, goTo]);

  // Keyboard support - arrow keys
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (idx < projects.length - 1) goTo(idx + 1, 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (idx > 0) goTo(idx - 1, -1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [idx, goTo]);

  const isExternal = project.link.startsWith("http");

  return (
    <div ref={sectionRef} id="projects"
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", background: "#ffffff", userSelect: "none" }}>

      {/* Light grid — matches About section */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(94,96,206,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(94,96,206,0.05) 1px,transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      {/* Blobs — same as About */}
      <div className="absolute top-0 left-1/4 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(116,0,184,0.06) 0%,transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(72,191,227,0.07) 0%,transparent 70%)", filter: "blur(50px)" }} />

      {/* PROJECTS heading — pinned top-center, behind cards */}
      <div className="absolute top-0 left-0 right-0 flex items-start justify-center pt-16 pointer-events-none" style={{ zIndex: 0 }}>
        <h2 className="font-heading select-none text-center"
          style={{
            fontSize: "clamp(4rem,10vw,8rem)",
            lineHeight: 0.80,
            padding: "55px",
            letterSpacing: "-0.02em",
            background: "linear-gradient(160deg, #0e0025 0%, #5e60ce 55%, #48bfe3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
          PROJECTS
        </h2>
      </div>

      {/* Card stage — z-index 1 so it sits above the PROJECTS title behind it */}
      <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12"
        style={{ perspective: "1200px", paddingTop: "60px", zIndex: 1 }}>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full max-w-5xl"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {/* ── The Card ───────────────────────────────────────────── */}
            <div className="relative rounded-2xl overflow-hidden"
              style={{
                border: `1px solid ${project.color}30`,
                background: "#ffffff",
                boxShadow: `0 0 60px ${project.color}12, 0 32px 80px rgba(94,96,206,0.1), 0 4px 24px rgba(14,0,37,0.08)`,
              }}>

              {/* Card top bar */}
              <div className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: `1px solid ${project.color}20` }}>
                <div className="flex items-center gap-4">
                  {/* Number */}
                  <span className="font-heading"
                    style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)", color: project.color, lineHeight: 1 }}>
                    {project.number}
                  </span>
                  {/* Name + client */}
                  <div>
                    <p className="font-body text-xs uppercase tracking-[0.2em] mb-0.5"
                      style={{ color: project.color }}>
                      {project.category} · {project.year}
                    </p>
                    <h3 className="font-heading"
                      style={{ fontSize: "clamp(0.95rem,2vw,1.4rem)", color: "#0e0025", lineHeight: 1.1, fontWeight: 700 }}>
                      {project.name}
                    </h3>
                  </div>
                </div>

                {/* Live Project + GitHub buttons */}
                <div className="flex items-center gap-6">
                  {isExternal ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                      className="font-body text-xs uppercase tracking-widest px-5 py-2.5 rounded-full"
                      style={{
                        border: `1px solid ${project.color}50`,
                        color: project.color,
                        background: `${project.color}0d`,
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                      }}>
                      Live Project
                    </a>
                  ) : (
                    <span className="font-body text-xs uppercase tracking-widest px-5 py-2.5 rounded-full"
                      style={{
                        border: "1px solid rgba(14,0,37,0.12)",
                        color: "rgba(14,0,37,0.25)",
                      }}>
                      Coming Soon
                    </span>
                  )}

                  {project.Github !== "#" ? (
                    <a href={project.Github} target="_blank" rel="noopener noreferrer"
                      className="font-body text-xs uppercase tracking-widest px-5 py-2.5 rounded-full"
                      style={{
                        border: `1px solid ${project.color}50`,
                        color: project.color,
                        background: `${project.color}0d`,
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                      }}>
                      GitHub
                    </a>
                  ) : (
                    <span className="font-body text-xs uppercase tracking-widest px-5 py-2.5 rounded-full"
                      style={{
                        border: "1px solid rgba(14,0,37,0.12)",
                        color: "rgba(14,0,37,0.25)",
                      }}>
                      GitHub
                    </span>
                  )}
                </div>
              </div>
              {/* Image grid with tech stack */}
              <div className="grid gap-2 p-4"
                style={{
                  gridTemplateColumns: "2fr 1fr",
                  gridTemplateRows: "160px 160px",
                  height: "340px",
                }}>
                {/* Big left image spans 2 rows */}
                <div className="overflow-hidden rounded-xl"
                  style={{ gridRow: "1 / 3", border: `1px solid ${project.color}15` }}>
                  <ProjectImg src={project.images[0]} color={project.color} alt={project.name} />
                </div>
                {/* Right column: image + tech stack */}
                <div className="overflow-hidden rounded-xl"
                  style={{ border: `1px solid ${project.color}15` }}>
                  <ProjectImg src={project.images[1] ?? project.images[0]} color={project.color} alt={project.stack[0]} />
                </div>
                {/* Tech stack box */}
                <div className="overflow-hidden rounded-xl p-3 flex flex-col gap-2"
                  style={{ border: `1px solid ${project.color}15`, background: `${project.color}06` }}>
                  <p className="font-body text-[9px] uppercase tracking-widest" style={{ color: `${project.color}88` }}>Tech Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map(tech => (
                      <TechBadge key={tech} tech={tech} color={project.color} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Description only */}
              <div className="px-6 pb-5 pt-1">
                <p className="font-body text-sm leading-relaxed"
                  style={{ color: "rgba(14,0,37,0.65)", fontSize: "0.82rem", whiteSpace: "pre-line" }}>
                  {project.description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Progress indicator — right side ─────────────────────────── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 pointer-events-none" style={{ zIndex: 2 }}>
        {projects.map((p, i) => (
          <motion.div key={i}
            animate={{
              height: i === idx ? 28 : 6,
              background: i === idx ? p.color : "rgba(14,0,37,0.12)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            style={{ width: 3, borderRadius: 99 }}
          />
        ))}
      </div>

      {/* ── Vertical nav: left side with up / counter / down ───────────────────────── */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-6 z-10">
        <button onClick={() => goTo(idx - 1, -1)} disabled={idx === 0}
          className="font-body text-xs uppercase tracking-widest flex flex-col items-center gap-2"
          style={{
            background: "none", border: "none", cursor: idx === 0 ? "default" : "pointer",
            color: idx === 0 ? "rgba(14,0,37,0.2)" : "rgba(14,0,37,0.45)",
            transition: "color 0.2s",
          }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[9px]" style={{ letterSpacing: "0.05em" }}>Prev</span>
        </button>

        <div className="flex flex-col items-center gap-1">
          <motion.span key={idx} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            className="font-heading" style={{ fontSize: "1.2rem", color: project.color, lineHeight: 1 }}>
            {project.number}
          </motion.span>
          <span className="font-body text-[9px]" style={{ color: "rgba(14,0,37,0.2)", letterSpacing: "0.05em" }}>of</span>
          <span className="font-heading" style={{ fontSize: "0.9rem", color: "rgba(14,0,37,0.2)", lineHeight: 1 }}>
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <button onClick={() => goTo(idx + 1, 1)} disabled={idx === projects.length - 1}
          className="font-body text-xs uppercase tracking-widest flex flex-col items-center gap-2"
          style={{
            background: "none", border: "none", cursor: idx === projects.length - 1 ? "default" : "pointer",
            color: idx === projects.length - 1 ? "rgba(14,0,37,0.2)" : "rgba(14,0,37,0.45)",
            transition: "color 0.2s",
          }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[9px]" style={{ letterSpacing: "0.05em" }}>Next</span>
        </button>
      </div>
    </div>
  );
}