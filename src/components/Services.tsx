import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skillCategories = [
  {
    id: "android", number: "01", title: "Android Developer", icon: "📱", accent: "#72efdd",
    groups: [
      { label: "Languages",       skills: ["Kotlin", "Java", "Python", "SQL"] },
      { label: "Android",         skills: ["Jetpack Compose", "Android SDK", "Room DB", "Retrofit", "Hilt", "Material Design 3"] },
      { label: "Kotlin",          skills: ["Coroutines", "Flow", "Sealed Classes", "Extension Functions"] },
      { label: "Architecture",    skills: ["MVVM", "Repository Pattern", "Clean Architecture", "Dependency Injection"] },
      { label: "Backend & APIs",  skills: ["REST APIs", "FastAPI", "Flask", "JWT Authentication"] },
      { label: "AI Integration",  skills: ["Gemini AI", "OpenAI API", "LangChain"] },
      { label: "Cloud & DevOps",  skills: ["AWS EC2", "AWS S3", "IAM", "Docker", "Git", "GitHub"] },
      { label: "CS Fundamentals", skills: ["Data Structures & Algorithms", "LLD", "System Design"] },
    ],
  },
  {
    id: "aiml", number: "02", title: "AI / ML Engineer", icon: "🧠", accent: "#64dfdf",
    groups: [
      { label: "Languages",            skills: ["Python", "Java", "SQL", "JavaScript"] },
      { label: "ML & Data",            skills: ["Scikit-learn", "NumPy", "Pandas", "Matplotlib", "Seaborn"] },
      { label: "ML Algorithms",        skills: ["Linear Regression", "Logistic Regression", "Decision Trees", "Random Forest", "XGBoost", "SVM", "KNN", "K-Means", "PCA", "Feature Engineering"] },
      { label: "Deep Learning",        skills: ["PyTorch", "ANN", "CNN", "RNN", "LSTM", "Transformers", "Transfer Learning"] },
      { label: "Generative AI & LLMs", skills: ["LangChain", "LangGraph", "RAG", "Agentic AI", "OpenAI API", "Gemini AI", "Vector Databases", "Prompt Engineering"] },
      { label: "MLOps & Deployment",   skills: ["FastAPI", "Flask", "Docker", "Streamlit", "AWS EC2", "AWS S3", "Git", "GitHub"] },
      { label: "Certifications",       skills: ["AWS Cloud Practitioner (in progress)"] },
    ],
  },
  {
    id: "fullstack", number: "03", title: "Full Stack Web Developer", icon: "⚡", accent: "#56cfe1",
    groups: [
      { label: "Languages",      skills: ["JavaScript", "TypeScript", "Python", "Java", "SQL"] },
      { label: "Frontend",       skills: ["React.js", "HTML5", "CSS3"] },
      { label: "Backend",        skills: ["Node.js", "Express.js", "FastAPI", "Flask", "REST APIs"] },
      { label: "Databases",      skills: ["PostgreSQL", "MongoDB", "Redis"] },
      { label: "Cloud & DevOps", skills: ["AWS EC2", "AWS S3", "SNS", "IAM", "Docker", "Kubernetes", "Git", "GitHub"] },
      { label: "AI Integration", skills: ["LangChain", "OpenAI API", "Gemini AI", "Prompt Engineering"] },
      { label: "System Design",  skills: ["LLD", "HLD", "Microservices", "Caching", "CAP Theorem"] },
    ],
  },
];

function SkillChip({ skill, accent, index }: { skill: string; accent: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.025, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.1, background: `${accent}26`, boxShadow: `0 0 8px ${accent}38` }}
      className="font-body text-xs px-3 py-1 rounded-full whitespace-nowrap cursor-default"
      style={{ background: `${accent}12`, border: `1px solid ${accent}30`, color: accent, letterSpacing: "0.03em" }}
    >
      {skill}
    </motion.span>
  );
}

function SkillGroup({ group, accent, groupIndex }: { group: { label: string; skills: string[] }; accent: string; groupIndex: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -20, x: -20 }}
      animate={{ opacity: 1, rotateY: 0, x: 0 }}
      transition={{ delay: groupIndex * 0.055, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02, boxShadow: `0 0 18px ${accent}1e` }}
      className="flex flex-col gap-2"
      style={{ background: "rgba(6,0,18,0.55)", border: `1px solid ${accent}18`, borderRadius: "0.875rem", padding: "1rem 1.125rem", transformStyle: "preserve-3d" }}
    >
      <span className="font-body text-xs uppercase tracking-[0.18em] mb-1" style={{ color: `${accent}90` }}>{group.label}</span>
      <div className="flex flex-wrap gap-1.5">
        {group.skills.map((skill, i) => <SkillChip key={skill} skill={skill} accent={accent} index={i} />)}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [active, setActive] = useState<string>("android");
  const current = skillCategories.find((c) => c.id === active)!;

  return (
    <section id="services" className="relative min-h-screen py-24 px-6 md:px-12 noise-overlay overflow-hidden"
      style={{ background: "var(--bg-dark)" }}>
      {/* Ambient */}
      <motion.div className="absolute right-0 top-1/3 w-96 h-96 pointer-events-none"
        animate={{ background: `radial-gradient(circle, ${current.accent}14 0%, transparent 70%)` }}
        transition={{ duration: 0.6 }} style={{ filter: "blur(60px)" }} />
      <div className="absolute left-0 bottom-1/4 w-72 h-72 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(116,0,184,0.1) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(100,223,223,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(100,223,223,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div className="mb-14" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10" style={{ background: `linear-gradient(90deg, transparent, ${current.accent})` }} />
            <span className="font-body text-xs uppercase tracking-[0.3em]" style={{ color: current.accent, opacity: 0.75 }}>What I know</span>
            <div className="h-px w-10" style={{ background: `linear-gradient(90deg, ${current.accent}, transparent)` }} />
          </div>
          <h2 className="font-heading" style={{
            fontSize: "clamp(4rem, 10vw, 8rem)",
            background: `linear-gradient(135deg, #fff 0%, ${current.accent} 50%, #72efdd 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 0.93,
            transition: "background 0.5s ease",
          }}>SKILLS</h2>
        </motion.div>

        {/* Tabs */}
        <motion.div className="flex gap-3 mb-10 flex-wrap" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}>
          {skillCategories.map((cat) => (
            <motion.button key={cat.id} onClick={() => setActive(cat.id)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="font-body text-sm flex items-center gap-2.5 px-5 py-3 rounded-full"
              style={{
                background: active === cat.id ? `${cat.accent}18` : "rgba(6,0,18,0.5)",
                border: `1px solid ${active === cat.id ? cat.accent + "60" : "rgba(86,207,225,0.12)"}`,
                color: active === cat.id ? cat.accent : "rgba(232,228,255,0.45)",
                cursor: "pointer", letterSpacing: "0.02em",
                boxShadow: active === cat.id ? `0 0 14px ${cat.accent}24` : "none",
                transition: "all 0.3s ease",
              }}>
              <span>{cat.icon}</span>
              <span className="font-body font-medium">{cat.number}</span>
              <span className="hidden md:inline">{cat.title}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Category title */}
        <AnimatePresence mode="wait">
          <motion.div key={active + "-header"}
            initial={{ opacity: 0, rotateX: -25, y: -10 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, rotateX: 18, y: 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8" style={{ transformStyle: "preserve-3d" }}>
            <motion.span key={active + "-icon"} initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl">{current.icon}</motion.span>
            <h3 className="font-heading" style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              background: `linear-gradient(135deg, #fff 0%, ${current.accent} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1,
            }}>{current.title}</h3>
            <motion.div layoutId="tab-underline" className="h-0.5 flex-1 max-w-[120px] rounded-full"
              style={{ background: `linear-gradient(90deg, ${current.accent}, transparent)` }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }} />
          </motion.div>
        </AnimatePresence>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={active + "-grid"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }} className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {current.groups.map((group, gi) => (
              <SkillGroup key={group.label} group={group} accent={current.accent} groupIndex={gi} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}