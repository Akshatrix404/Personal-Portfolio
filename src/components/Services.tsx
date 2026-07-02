import { useState, useEffect, useRef } from "react";
import InlineNav from "./InlineNav";
import { motion, AnimatePresence } from "framer-motion";

const CATS = [
  {
    id: "aiml", number: "01", title: "AI / ML Engineer", icon: "🧠", accent: "#64dfdf",
    groups: [
      { label: "Languages",              skills: ["Python", "Java", "SQL", "DSA"] },
      { label: "ML & Data",              skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-Learn", "Statistics", "EDA"] },
      { label: "ML Algorithms",          skills: ["Regression", "Classification", "Clustering", "XGBoost", "Feature Engineering", "Model Evaluation", "A/B Testing", "Fine-Tuning"] },
      { label: "Deep Learning & NLP",    skills: ["TensorFlow", "PyTorch", "ANN", "CNN", "RNN", "LSTM", "Bidirectional LSTM", "BERT", "Transformers", "HuggingFace", "Sentence-Transformers", "Attention Mechanism"] },
      { label: "Generative AI & LLMs",   skills: ["LangChain", "LangGraph", "RAG", "Agentic AI", "Prompt Engineering", "Vector DB", "Ollama", "OpenAI", "Google Gemini"] },
      { label: "Reinforcement Learning", skills: ["Policy Gradients", "Q-Learning"] },
      { label: "MLOps & Deployment",     skills: ["AWS (S3, EC2)", "Docker", "Kubernetes", "MLflow", "Model Monitoring", "Data Pipelines", "FastAPI", "Git", "GitHub"] },
    ],
  },
  {
    id: "analyst", number: "02", title: "Data Analyst", icon: "📊", accent: "#56cfe1",
    groups: [
      { label: "Languages & Tools",           skills: ["Python", "SQL", "Web Scraping", "Git", "GitHub", "PowerPoint"] },
      { label: "Analysis & Visualisation",    skills: ["NumPy", "Pandas", "Matplotlib", "Excel", "Power Query", "Power BI", "DAX", "Tableau", "EDA", "Data Modeling", "ETL"] },
      { label: "SQL & Databases",             skills: ["SQL", "T-SQL", "SQL Server", "PostgreSQL", "AWS Redshift", "AWS Athena"] },
      { label: "Cloud & Data Engineering",    skills: ["AWS S3", "AWS Glue", "AWS Glue DataBrew", "AWS QuickSight", "PySpark", "Airflow", "Docker"] },
      { label: "Business & Product Analytics",skills: ["Product Analytics", "A/B Testing", "Data Storytelling", "Financial Modeling", "Market Sizing", "Guesstimates & Case Studies"] },
      { label: "ML Applied",                  skills: ["Scikit-Learn", "Predictive Analytics", "LangChain", "GenAI"] },
    ],
  },
  {
    id: "fullstack", number: "03", title: "Full-Stack / SWE", icon: "💻", accent: "#72efdd",
    groups: [
      { label: "Languages",       skills: ["Python", "Java", "JavaScript", "TypeScript", "Kotlin", "DSA"] },
      { label: "Frontend",        skills: ["React.js", "Next.js", "Tailwind CSS", "HTML", "CSS"] },
      { label: "Backend & APIs",  skills: ["Node.js", "Express.js", "FastAPI", "REST APIs", "JWT Auth", "WebSockets", "Socket.io", "OAuth"] },
      { label: "Mobile",          skills: ["Android", "Kotlin", "Jetpack Compose"] },
      { label: "Databases",       skills: ["MongoDB", "PostgreSQL", "Redis", "SQL"] },
      { label: "Cloud & DevOps",  skills: ["AWS (EC2, S3, ECS, ECR, SNS, IAM)", "Docker", "Kubernetes", "CI/CD Pipelines"] },
      { label: "AI/ML Applied",   skills: ["Pandas", "NumPy", "Scikit-Learn", "PyTorch", "LangChain", "RAG", "Google Gemini", "NLP"] },
    ],
  },
];

// ── Gradient text isolated from Framer Motion color interpolation ────
// We use a plain <span> with a CSS class + inline --accent var so that
// Framer Motion's animated `color` on ancestor buttons never bleeds in.
function GradientText({ text, accent, className = "", style = {} }: {
  text: string; accent: string; className?: string; style?: React.CSSProperties;
}) {
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        backgroundImage: `linear-gradient(135deg, #fff 0%, ${accent} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",          // fallback — also blocks FM color bleed
        backgroundColor: "transparent",
        ...style,
      }}
    >
      {text}
    </span>
  );
}

function Chip({ skill, accent }: { skill: string; accent: string }) {
  return (
    <span
      className="font-body text-xs px-3 py-1 rounded-full whitespace-nowrap"
      style={{ background: `${accent}14`, border: `1px solid ${accent}30`, color: accent }}
    >
      {skill}
    </span>
  );
}

// ─── 3D tilt skill card ──────────────────────────────────────────────
function SkillCard({ group, accent, index }: {
  group: { label: string; skills: string[] }; accent: string; index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -14, y: px * 14 });
  };
  const onMouseLeave = () => { setTilt({ x: 0, y: 0 }); setHovered(false); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 40, rotateX: -20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        transformStyle: "preserve-3d",
        willChange: "transform",
        background: hovered ? `${accent}0c` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? `${accent}40` : `${accent}18`}`,
        transition: "background 0.25s, border-color 0.25s",
      }}
      className="rounded-xl p-4"
    >
      <div style={{ transform: "translateZ(20px)" }}>
        <p
          className="font-body text-[9px] uppercase tracking-[0.2em] mb-2"
          style={{ color: `${accent}80` }}
        >
          {group.label}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5" style={{ transform: "translateZ(10px)" }}>
        {group.skills.map(s => <Chip key={s} skill={s} accent={accent} />)}
      </div>
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          height: 2, borderRadius: 99, marginTop: "1rem",
          background: `linear-gradient(90deg,${accent},transparent)`,
          transformOrigin: "left",
        }}
      />
    </motion.div>
  );
}

export default function Services() {
  const [ai, setAi] = useState(0);
  const cat = CATS[ai];

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        if (ai < CATS.length - 1) {
          e.preventDefault(); // consume: move to next tab
          setAi(i => i + 1);
        }
        // at last tab → don't preventDefault → App.tsx navigates to next section
      }
      if (e.key === "ArrowUp") {
        if (ai > 0) {
          e.preventDefault(); // consume: move to prev tab
          setAi(i => i - 1);
        }
        // at first tab → don't preventDefault → App.tsx navigates to prev section
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [ai]);

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "var(--bg-deep)" }}
    >
      <InlineNav activeIdx={2} light={false} />
      <div
        className="relative flex-1 flex items-center px-6 md:px-16 gap-8 md:gap-12"
        style={{ background: "var(--bg-deep)" }}
      >
        {/* Ambient glow */}
        <motion.div
          className="absolute right-0 top-1/3 w-96 h-96 pointer-events-none"
          animate={{ background: `radial-gradient(circle,${cat.accent}14 0%,transparent 70%)` }}
          transition={{ duration: 0.6 }}
          style={{ filter: "blur(60px)" }}
        />

        {/* LEFT — SKILLS title (~22%) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex flex-col justify-center items-center shrink-0 gap-4"
          style={{ width: "22%" }}
        >
          {/*
            SKILLS vertical text — wrapped in a plain div so it is completely
            outside Framer Motion's color interpolation scope. The solid white
            rectangle bug was caused by FM animating `background` on the parent
            which invalidated the -webkit-background-clip:text paint layer.
          */}
          <div
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              fontSize: "clamp(2.5rem,5vw,5rem)",
            }}
          >
            <GradientText
              text="SKILLS"
              accent={cat.accent}
              className="font-heading select-none"
              style={{
                backgroundImage: `linear-gradient(180deg, #fff 0%, ${cat.accent} 100%)`,
                transition: "background-image 0.4s ease",
                fontSize: "inherit",
                lineHeight: "inherit",
                letterSpacing: "inherit",
              }}
            />
          </div>

          <div className="w-px h-16" style={{ background: `linear-gradient(180deg,${cat.accent},transparent)` }} />

          {/* Tab dots */}
          <div className="flex flex-col gap-2">
            {CATS.map((c, i) => (
              <motion.button
                key={c.id}
                onClick={() => setAi(i)}
                animate={{ scale: i === ai ? 1.4 : 1, background: i === ai ? c.accent : "rgba(255,255,255,0.2)" }}
                style={{ width: 8, height: 8, borderRadius: 99, border: "none", cursor: "pointer", padding: 0 }}
                title={c.title}
              />
            ))}
          </div>
        </motion.div>

        {/* RIGHT — main card (~78%) */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative rounded-2xl flex-1 overflow-hidden"
          style={{
            maxHeight: "85vh",
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${cat.accent}28`,
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow: `0 0 60px ${cat.accent}12, 0 32px 80px rgba(0,0,0,0.35)`,
            transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          }}
        >
          {/* Tab bar */}
          <div
            className="flex gap-2 p-4 pb-3 flex-wrap"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            {CATS.map((c, i) => (
              <motion.button
                key={c.id}
                onClick={() => setAi(i)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="font-body text-xs flex items-center gap-2 px-4 py-2 rounded-full"
                animate={{
                  background: i === ai ? `${c.accent}18` : "rgba(255,255,255,0.04)",
                  borderColor: i === ai ? `${c.accent}55` : "rgba(255,255,255,0.08)",
                  color: i === ai ? c.accent : "rgba(232,228,255,0.4)",
                }}
                style={{ border: "1px solid", cursor: "pointer", letterSpacing: "0.03em" }}
              >
                <span>{c.icon}</span>
                <span className="font-medium">{c.number}</span>
                <span className="hidden lg:inline">{c.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Scrollable content */}
          <div
            className="p-5 overflow-y-auto"
            style={{ maxHeight: "calc(85vh - 70px)", perspective: "1000px" }}
          >
            {/*
              Category title row — GradientText component used here too so that
              the FM `color` animation on the tab buttons above never bleeds into
              this text (the invisible title bug on tab switch).
            */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">{cat.icon}</span>
              <GradientText
                text={cat.title}
                accent={cat.accent}
                className="font-heading"
                style={{
                  fontSize: "clamp(1.3rem,2.5vw,2rem)",
                  lineHeight: 1,
                }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-3"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
              >
                {cat.groups.map((g, gi) => (
                  <SkillCard key={g.label} group={g} accent={cat.accent} index={gi} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}