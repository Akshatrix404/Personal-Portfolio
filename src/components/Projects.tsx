import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";

const projects = [
  {
    number: "01", name: "Hybrid Lexical & Semantic Matching",
    tagline: "AI search — BM25 + semantic hybrid, ATS resume scorer, IoT fleet & ML anomaly detection",
    stack: ["Gemini 2.5", "NLP", "AWS", "SSE", "TypeScript", "Node.js", "React"],
    link: "https://github.com/Akshatrix404/Hybrid-Lexical-and-Semantic-Matching",
    accentColor: "#5e60ce", category: "AI / Full Stack",
    badges: ["ML", "IoT", "NLP", "Semantic Search", "ATS"],
    description: "SearchLens — Hybrid Okapi BM25 + semantic search with AI query intelligence, real-time IoT fleet dashboard with SSE streaming, ML anomaly detection, and Gemini-powered ATS resume analyser with section rewriting. JWT-secured APIs on AWS EC2, S3, SNS, IAM.",
    image: "/projects/searchlens.png",
  },
  {
    number: "02", name: "HireFlow ATS",
    tagline: "AI-powered applicant tracking for 63M Indian SMEs",
    stack: ["Gemini AI", "Redis", "Docker", "PostgreSQL", "TypeScript", "Node.js", "React.js"],
    link: "#", accentColor: "#48bfe3", category: "Full Stack Web",
    badges: ["AI Scoring", "ATS", "Pipeline"],
    description: "Full ATS — job posting, AI resume parsing & scoring, candidate pipeline stages, interviewer feedback, analytics dashboards, email notifications, and calendar interview scheduling.",
    image: null,
  },
  {
    number: "03", name: "LocalMart",
    tagline: "Hyperlocal inventory & GST invoicing for kirana stores",
    stack: ["AWS S3", "Redis", "WhatsApp API", "PostgreSQL", "Node.js", "React.js"],
    link: "#", accentColor: "#5e60ce", category: "Full Stack Web",
    badges: ["GST", "WhatsApp", "Inventory"],
    description: "Mobile-first web app for shop owners — inventory management, low-stock alerts, daily sales tracking, GST-ready invoices, and shareable order links for customers. No app download needed.",
    image: null,
  },
  {
    number: "04", name: "MedScribe",
    tagline: "Clinical note assistant — RAG over ICMR & WHO guidelines",
    stack: ["LangGraph", "ChromaDB", "Whisper API", "Gemini AI", "FastAPI", "Python"],
    link: "#", accentColor: "#48bfe3", category: "AI / ML",
    badges: ["RAG", "Drug Interactions", "Whisper", "SOAP"],
    description: "Doctor speaks → Whisper transcribes → structured into SOAP format → drug interactions flagged → patient-facing summary generated. AI assists, doctor decides.",
    image: null,
  },
  {
    number: "05", name: "SkillMap",
    tagline: "Personalised week-by-week learning paths for career switchers",
    stack: ["LangGraph", "RAG", "PostgreSQL", "Redis", "FastAPI", "Python", "React"],
    link: "#", accentColor: "#5e60ce", category: "AI / ML",
    badges: ["LangGraph", "RAG", "Adaptive Agent"],
    description: "AI agent runs adaptive skill-gap quiz → maps gaps to role competency framework → generates week-by-week learning plan with curated free resources → tracks progress → adapts plan dynamically.",
    image: null,
  },
  {
    number: "06", name: "SafeRoute",
    tagline: "Women's safety — auto SOS, route deviation & community heatmaps",
    stack: ["Google Maps SDK", "Firebase FCM", "FastAPI", "Room DB", "Jetpack Compose", "Kotlin"],
    link: "#", accentColor: "#48bfe3", category: "Android",
    badges: ["Offline SOS", "Heatmap", "Safety"],
    description: "Automatic SOS via shake / 5× power press, route deviation detection, silent cloud evidence upload, community heatmap of unsafe areas, fake call feature. Fully offline-capable.",
    image: null,
  },
  {
    number: "07", name: "FarmAssist",
    tagline: "On-device crop disease detection + mandi price intelligence",
    stack: ["PyTorch", "TensorFlow Lite", "AWS", "FastAPI", "CameraX", "Room DB", "Kotlin"],
    link: "#", accentColor: "#5e60ce", category: "Android / ML",
    badges: ["On-device ML", "TFLite", "Multilingual", "Offline"],
    description: "Photograph crop leaf → on-device TFLite model detects disease/pest/deficiency → treatment advice in local language. Daily mandi prices, weather crop advisory, voice interface in Hindi/Rajasthani, full offline mode.",
    image: null,
  },
];

function ProjectImage({ project }: { project: (typeof projects)[0] }) {
  const [imgFailed, setImgFailed] = useState(false);
  if (project.image && !imgFailed) {
    return (
      <div className="relative overflow-hidden" style={{ borderRadius: "0.75rem", border: `1px solid ${project.accentColor}28` }}>
        <img src={project.image} alt={project.name} onError={() => setImgFailed(true)}
          className="w-full object-cover" style={{ maxHeight: "240px", display: "block" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${project.accentColor}18 0%, transparent 50%)` }} />
      </div>
    );
  }
  return (
    <div className="relative overflow-hidden flex items-center justify-center"
      style={{ borderRadius: "0.75rem", border: `1px solid ${project.accentColor}20`, height: "160px",
        background: `linear-gradient(135deg, rgba(240,238,255,0.8) 0%, ${project.accentColor}08 100%)` }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `linear-gradient(${project.accentColor}08 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor}08 1px, transparent 1px)`,
          backgroundSize: "28px 28px" }} />
      <div className="relative text-center px-4">
        <div className="font-heading" style={{ fontSize: "1.2rem", color: project.accentColor, opacity: 0.25 }}>{project.name}</div>
        <div className="font-body text-xs uppercase tracking-[0.2em] mt-1" style={{ color: `${project.accentColor}55` }}>Coming soon</div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, expanded, onToggle }: {
  project: (typeof projects)[0]; index: number; expanded: boolean; onToggle: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotX = useSpring(0, { stiffness: 200, damping: 22 });
  const rotY = useSpring(0, { stiffness: 200, damping: 22 });
  const glowX = useSpring(50, { stiffness: 200, damping: 22 });
  const glowY = useSpring(50, { stiffness: 200, damping: 22 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotX.set((py - 0.5) * -12); rotY.set((px - 0.5) * 12);
    glowX.set(px * 100); glowY.set(py * 100);
  }, [rotX, rotY, glowX, glowY]);

  const handleMouseLeave = useCallback(() => {
    rotX.set(0); rotY.set(0); glowX.set(50); glowY.set(50);
  }, [rotX, rotY, glowX, glowY]);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -36 : 36, y: 28 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.1 + index * 0.055, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onToggle}
      style={{
        rotateX: rotX, rotateY: rotY,
        transformStyle: "preserve-3d", willChange: "transform",
        background: "rgba(255,255,255,0.97)",
        border: `1.5px solid ${expanded ? project.accentColor + "60" : "rgba(94,96,206,0.12)"}`,
        borderRadius: "1.25rem", overflow: "hidden",
        boxShadow: "0 4px 24px rgba(94,96,206,0.07)",
        cursor: "pointer", transition: "border-color 0.3s",
      }}
      className="group relative flex flex-col h-full"
    >
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: useTransform(glowX, (x) => `radial-gradient(ellipse 55% 55% at ${x}% ${glowY.get()}%, ${project.accentColor}12 0%, transparent 70%)`), borderRadius: "inherit", zIndex: 0 }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(94,96,206,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(94,96,206,0.03) 1px, transparent 1px)`,
        backgroundSize: "36px 36px", zIndex: 0,
      }} />

      <div className="relative z-10 p-5 flex flex-col h-full gap-3" style={{ transformStyle: "preserve-3d" }}>
        <div className="flex items-start justify-between">
          <span className="font-heading" style={{ fontSize: "2.8rem", color: project.accentColor, opacity: 0.15, lineHeight: 1 }}>{project.number}</span>
          <span className="font-body text-xs uppercase tracking-[0.14em] px-3 py-1 rounded-full"
            style={{ background: `${project.accentColor}10`, border: `1px solid ${project.accentColor}26`, color: project.accentColor }}>
            {project.category}
          </span>
        </div>
        <h3 className="font-heading" style={{
          fontSize: "clamp(1.3rem, 1.9vw, 2rem)", lineHeight: 1.05,
          background: `linear-gradient(160deg, #0e0025 0%, ${project.accentColor} 100%)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          transform: "translateZ(10px)",
        }}>{project.name}</h3>
        <p className="font-body text-sm" style={{ color: "#5a587a", lineHeight: 1.5 }}>{project.tagline}</p>

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
              <div className="pt-1 pb-2 flex flex-col gap-3">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                  <ProjectImage project={project} />
                </motion.div>
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
                  className="font-body text-sm leading-relaxed" style={{ color: "#3a3a5c" }}>
                  {project.description}
                </motion.p>
                <div className="flex flex-wrap gap-2">
                  {project.badges.map((b, bi) => (
                    <motion.span key={b} initial={{ opacity: 0, scale: 0.75, y: 6 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.15 + bi * 0.05 }} className="font-body text-xs px-2.5 py-0.5 rounded-full"
                      style={{ background: `${project.accentColor}12`, border: `1px solid ${project.accentColor}28`, color: project.accentColor }}>
                      {b}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto pt-3 flex flex-col gap-2" style={{ borderTop: "1px solid rgba(94,96,206,0.08)" }}>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((tech) => (
              <span key={tech} className="font-body text-xs px-2 py-0.5 rounded-full"
                style={{ background: "rgba(94,96,206,0.06)", border: "1px solid rgba(94,96,206,0.12)", color: "#5e60ce" }}>{tech}</span>
            ))}
            {project.stack.length > 5 && (
              <span className="font-body text-xs px-2 py-0.5 rounded-full"
                style={{ background: "rgba(94,96,206,0.04)", border: "1px solid rgba(94,96,206,0.09)", color: "rgba(94,96,206,0.5)" }}>
                +{project.stack.length - 5}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-xs" style={{ color: "rgba(94,96,206,0.36)" }}>
              {expanded ? "Click to collapse ↑" : "Click to expand ↓"}
            </span>
            {project.link.startsWith("http") && (
              <motion.a href={project.link} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-body text-xs uppercase tracking-widest px-4 py-2 rounded-full"
                style={{ border: `1px solid ${project.accentColor}40`, color: project.accentColor, background: "transparent" }}
                whileHover={{ scale: 1.06, background: project.accentColor, color: "#fff" }}
                whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}>
                GitHub ↗
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="projects" className="relative min-h-screen py-24 px-6 md:px-12 overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(94,96,206,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(94,96,206,0.04) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      <div className="absolute top-0 left-1/4 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(116,0,184,0.055) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(72,191,227,0.065) 0%, transparent 70%)", filter: "blur(50px)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div className="mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: "linear-gradient(90deg, transparent, #5e60ce)" }} />
            <span className="font-body text-xs uppercase tracking-[0.3em]" style={{ color: "#5e60ce", opacity: 0.8 }}>Selected Work</span>
            <div className="h-px w-10" style={{ background: "linear-gradient(90deg, #5e60ce, transparent)" }} />
          </div>
          <h2 className="font-heading" style={{
            fontSize: "clamp(4rem, 10vw, 8rem)",
            background: "linear-gradient(160deg, #0e0025 0%, #5e60ce 55%, #48bfe3 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 0.93,
          }}>PROJECTS</h2>
          <p className="font-body text-sm mt-3" style={{ color: "#7a7aaa" }}>Click any card to read more · hover to feel the tilt</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-2"><ProjectCard project={projects[0]} index={0} expanded={openIndex === 0} onToggle={() => toggle(0)} /></div>
          <div className="col-span-1"><ProjectCard project={projects[1]} index={1} expanded={openIndex === 1} onToggle={() => toggle(1)} /></div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-1"><ProjectCard project={projects[2]} index={2} expanded={openIndex === 2} onToggle={() => toggle(2)} /></div>
          <div className="col-span-2"><ProjectCard project={projects[3]} index={3} expanded={openIndex === 3} onToggle={() => toggle(3)} /></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[4, 5, 6].map((i) => (
            <div key={i}><ProjectCard project={projects[i]} index={i} expanded={openIndex === i} onToggle={() => toggle(i)} /></div>
          ))}
        </div>
      </div>
    </section>
  );
}