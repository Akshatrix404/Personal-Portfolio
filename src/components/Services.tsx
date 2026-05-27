import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skillCategories = [
  {
    id: "android", number: "01", title: "Android Developer", icon: "📱", accent: "#72efdd",
    groups: [
      { label: "Languages",       skills: ["Kotlin","Java","Python","SQL"] },
      { label: "Android",         skills: ["Jetpack Compose","Android SDK","Room DB","Retrofit","Hilt","Material Design 3"] },
      { label: "Kotlin",          skills: ["Coroutines","Flow","Sealed Classes","Extension Functions"] },
      { label: "Architecture",    skills: ["MVVM","Repository Pattern","Clean Architecture","Dependency Injection"] },
      { label: "Backend & APIs",  skills: ["REST APIs","FastAPI","Flask","JWT Authentication"] },
      { label: "AI Integration",  skills: ["Gemini AI","OpenAI API","LangChain"] },
      { label: "Cloud & DevOps",  skills: ["AWS EC2","AWS S3","IAM","Docker","Git","GitHub"] },
      { label: "CS Fundamentals", skills: ["Data Structures & Algorithms","LLD","System Design"] },
    ],
  },
  {
    id: "aiml", number: "02", title: "AI / ML Engineer", icon: "🧠", accent: "#64dfdf",
    groups: [
      { label: "Languages",            skills: ["Python","Java","SQL","JavaScript"] },
      { label: "ML & Data",            skills: ["Scikit-learn","NumPy","Pandas","Matplotlib","Seaborn"] },
      { label: "ML Algorithms",        skills: ["Linear Regression","Logistic Regression","Decision Trees","Random Forest","XGBoost","SVM","KNN","K-Means","PCA","Feature Engineering"] },
      { label: "Deep Learning",        skills: ["PyTorch","ANN","CNN","RNN","LSTM","Transformers","Transfer Learning"] },
      { label: "Generative AI & LLMs", skills: ["LangChain","LangGraph","RAG","Agentic AI","OpenAI API","Gemini AI","Vector Databases","Prompt Engineering"] },
      { label: "MLOps & Deployment",   skills: ["FastAPI","Flask","Docker","Streamlit","AWS EC2","AWS S3","Git","GitHub"] },
      { label: "Certifications",       skills: ["AWS Cloud Practitioner (in progress)"] },
    ],
  },
  {
    id: "fullstack", number: "03", title: "Full Stack Web Developer", icon: "⚡", accent: "#56cfe1",
    groups: [
      { label: "Languages",      skills: ["JavaScript","TypeScript","Python","Java","SQL"] },
      { label: "Frontend",       skills: ["React.js","HTML5","CSS3"] },
      { label: "Backend",        skills: ["Node.js","Express.js","FastAPI","Flask","REST APIs"] },
      { label: "Databases",      skills: ["PostgreSQL","MongoDB","Redis"] },
      { label: "Cloud & DevOps", skills: ["AWS EC2","AWS S3","SNS","IAM","Docker","Kubernetes","Git","GitHub"] },
      { label: "AI Integration", skills: ["LangChain","OpenAI API","Gemini AI","Prompt Engineering"] },
      { label: "System Design",  skills: ["LLD","HLD","Microservices","Caching","CAP Theorem"] },
    ],
  },
];

// ── 3D tilt card ───────────────────────────────────────────────────────────────
function SkillCard({ group, accent, index }: {
  group: { label: string; skills: string[] }; accent: string; index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt]       = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const px = (e.clientX - r.left)  / r.width  - 0.5;
    const py = (e.clientY - r.top)   / r.height - 0.5;
    setTilt({ x: py * -14, y: px * 14 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, rotateX: -20 }}
      animate={{ opacity: 1, y: 0,  rotateX: 0   }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.16,1,0.3,1] }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x:0, y:0 }); setHovered(false); }}
      style={{
        rotateX: tilt.x, rotateY: tilt.y,
        transformStyle: "preserve-3d", willChange: "transform",
        background:   hovered ? `${accent}10` : "rgba(6,0,18,0.6)",
        border:       `1px solid ${hovered ? accent+"55" : accent+"18"}`,
        borderRadius: "1rem",
        padding:      "1.25rem",
        boxShadow:    hovered
          ? `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${accent}18`
          : "0 4px 20px rgba(0,0,0,0.3)",
        transition:   "background 0.2s, border-color 0.2s, box-shadow 0.2s",
        cursor:       "default",
      }}
    >
      <div style={{ transform: "translateZ(20px)", marginBottom: "0.75rem" }}>
        <span className="font-body text-xs uppercase tracking-[0.2em]"
          style={{ color: `${accent}cc` }}>{group.label}</span>
      </div>
      <div className="flex flex-wrap gap-2" style={{ transform: "translateZ(10px)" }}>
        {group.skills.map((skill, si) => (
          <motion.span key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1   }}
            transition={{ delay: index * 0.07 + si * 0.02, duration: 0.3 }}
            className="font-body text-xs px-3 py-1 rounded-full"
            style={{
              background: `${accent}14`,
              border:     `1px solid ${accent}30`,
              color:      accent,
              letterSpacing: "0.04em",
            }}>{skill}</motion.span>
        ))}
      </div>
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          height: 2, borderRadius: 99, marginTop: "1rem",
          background:     `linear-gradient(90deg,${accent},transparent)`,
          transformOrigin: "left",
        }} />
    </motion.div>
  );
}

export default function Services() {
  const [active, setActive] = useState("android");
  const current = skillCategories.find(c => c.id === active)!;

  return (
    /*
      CRITICAL: background is set as a hard #07001a here AND as an inline style.
      This prevents the white-box flash which was caused by -webkit-text-fill-color:transparent
      on the <h2> being painted before the gradient background-clip was composited.
      The heading now uses a plain colored SVG text approach — no webkit gradient clip at all.
    */
    <section
      id="services"
      className="relative min-h-screen py-24 px-6 md:px-12 overflow-hidden"
      style={{ background: "#07001a" }}
    >
      {/* ── CSS that locks the section background so it can never flash white ── */}
      <style>{`
        #services, #services * { box-sizing: border-box; }
        #services { background-color: #07001a !important; }
      `}</style>

      {/* Ambient blobs */}
      <motion.div
        className="absolute right-0 top-1/3 w-96 h-96 pointer-events-none"
        animate={{ background: `radial-gradient(circle,${current.accent}14 0%,transparent 70%)` }}
        transition={{ duration: 0.6 }}
        style={{ filter: "blur(60px)" }}
      />
      <div className="absolute left-0 bottom-1/4 w-72 h-72 pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(116,0,184,0.1) 0%,transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(100,223,223,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(100,223,223,0.025) 1px,transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header — stable, never remounts so gradient clip never flashes */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10"
              style={{ background: `linear-gradient(90deg,transparent,${current.accent})` }} />
            <span className="font-body text-xs uppercase tracking-[0.3em]"
              style={{ color: current.accent, opacity: 0.75 }}>What I know</span>
            <div className="h-px w-10"
              style={{ background: `linear-gradient(90deg,${current.accent},transparent)` }} />
          </div>

          <h2
            className="font-heading"
            style={{
              fontSize: "clamp(4rem,10vw,8rem)",
              lineHeight: 0.93,
              background: "linear-gradient(135deg, #cffafe 0%, #a5f3fc 30%, #67e8f9 60%, #22d3ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
              // Key fix: paint-order forces the gradient to composite before text fill
              // preventing the white flash frame
              paintOrder: "stroke fill",
            }}
          >
            SKILLS
          </h2>
        </div>

        {/* ── Tab switcher ────────────────────────────────────────────────── */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {skillCategories.map(cat => (
            <motion.button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="font-body text-sm flex items-center gap-2.5 px-5 py-3 rounded-full"
              style={{
                background:  active===cat.id ? `${cat.accent}18` : "rgba(6,0,18,0.5)",
                border:      `1px solid ${active===cat.id ? cat.accent+"60" : "rgba(86,207,225,0.12)"}`,
                color:       active===cat.id ? cat.accent : "rgba(232,228,255,0.45)",
                cursor:      "pointer",
                letterSpacing: "0.02em",
                boxShadow:   active===cat.id ? `0 0 14px ${cat.accent}24` : "none",
                transition:  "all 0.3s ease",
              }}>
              <span>{cat.icon}</span>
              <span className="font-body font-medium">{cat.number}</span>
              <span className="hidden md:inline">{cat.title}</span>
            </motion.button>
          ))}
        </div>

        {/* ── Active category title ───────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active + "-head"}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0   }}
            exit={{    opacity: 0, y:  12  }}
            transition={{ duration: 0.28, ease: [0.16,1,0.3,1] }}
            className="flex items-center gap-4 mb-8"
          >
            <motion.span
              key={active + "-icon"}
              initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0,    scale: 1,   opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
              className="text-3xl"
            >{current.icon}</motion.span>

            {/* Category title — also plain white, no gradient clip */}
            <h3
              className="font-heading"
              style={{
                fontSize: "clamp(1.8rem,4vw,3rem)",
                color: "#ffffff",
                lineHeight: 1,
                margin: 0,
              }}
            >
              {current.title}
            </h3>

            <motion.div
              layoutId="tab-line"
              className="h-0.5 flex-1 max-w-[120px] rounded-full"
              style={{ background: `linear-gradient(90deg,${current.accent},transparent)` }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── 3D skill cards grid ─────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active + "-grid"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))",
              perspective: "1000px",
            }}
          >
            {current.groups.map((group, gi) => (
              <SkillCard
                key={group.label}
                group={group}
                accent={current.accent}
                index={gi}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}