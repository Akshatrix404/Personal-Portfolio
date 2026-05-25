import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
  {
    company: "PrAIs IT Solutions Private Limited",
    logo: "🤖", logoColor: "#64dfdf", type: "Internship",
    location: "Gurugram, Haryana, India · Remote",
    roles: [
      {
        title: "AI/ML Intern", period: "May 2026 – Present", duration: "1 mo",
        points: ["Working on AI/ML projects in a remote capacity", "Applying machine learning techniques to real-world problems"],
        skills: ["AI/ML", "Python"],
      },
    ],
  },
  {
    company: "Genpact",
    logo: "G", logoColor: "#a78bfa", type: "Internship",
    location: "Gurugram, Haryana, India · Hybrid",
    roles: [
      {
        title: "Finance Gen AI Intern", period: "May 2025 – Jul 2025", duration: "3 mos",
        points: [
          "Built Autonomous AI Agents for data analysis and automation — Skill Analyzer, Invoice Analyzer, Data Converters",
          "This internship became the foundation of my daily LinkedIn content on AI in finance — where I now share what I built, what broke, and what I learned.",
        ],
        skills: ["Generative AI", "Python", "LangChain", "FastAPI", "OpenAI", "RAG", "Automation"],
      },
    ],
  },
  {
    company: "Team Prometheus VIT",
    logo: "⚡", logoColor: "#f59e0b", type: "Full-time · 8 mos",
    location: "Vellore, Tamil Nadu, India · On-site",
    roles: [
      {
        title: "Senior Core – AI/ML", period: "Mar 2025 – May 2025", duration: "3 mos",
        points: ["Promoted to Senior Core Member", "Conducted 25+ recruitment interviews", "Led task assignment and workflow optimization"],
        skills: ["Workflow Optimization", "Interviewing & Recruitment"],
      },
      {
        title: "Junior Core – AI/ML", period: "Oct 2024 – Feb 2025", duration: "5 mos",
        points: ["Rewrote AI codebase using Python, Java, reinforcement learning", "Researched latest RoboSoccer technologies and events", "Organized workshops and member engagement campaigns"],
        skills: ["Python", "Java", "Reinforcement Learning", "RoboSoccer"],
      },
    ],
  },
];

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
      style={{ borderBottom: "1px solid rgba(100,223,223,0.07)" }}
    >
      <button onClick={() => setOpen((o) => !o)} className="w-full text-left py-8 flex items-center gap-5 group"
        style={{ background: "none", border: "none", cursor: "pointer" }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-2xl font-bold transition-transform duration-300 group-hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${exp.logoColor}22, ${exp.logoColor}0a)`, border: `1px solid ${exp.logoColor}30`, color: exp.logoColor, fontFamily: "monospace" }}>
          {exp.logo}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading" style={{
            fontSize: "clamp(1.4rem, 2.5vw, 2rem)", lineHeight: 1.1,
            background: `linear-gradient(135deg, #fff 40%, ${exp.logoColor} 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>{exp.company}</h3>
          <p className="font-body text-sm mt-1" style={{ color: "rgba(232,228,255,0.35)" }}>{exp.type} · {exp.location}</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}
          className="shrink-0" style={{ color: exp.logoColor, opacity: 0.6 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <div className="pb-8 pl-[76px] flex flex-col gap-8">
              {exp.roles.map((role, ri) => (
                <motion.div key={role.title} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: ri * 0.08, duration: 0.4 }}
                  className="relative pl-5" style={{ borderLeft: `2px solid ${exp.logoColor}25` }}>
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full" style={{ background: exp.logoColor, opacity: 0.7 }} />
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <span className="font-body font-semibold text-base" style={{ color: "#fff" }}>{role.title}</span>
                    <span className="font-body text-xs" style={{ color: `${exp.logoColor}90` }}>{role.period} · {role.duration}</span>
                  </div>
                  <ul className="flex flex-col gap-1.5 mb-4">
                    {role.points.map((pt, pi) => (
                      <li key={pi} className="font-body text-sm flex gap-2" style={{ color: "rgba(232,228,255,0.5)" }}>
                        <span style={{ color: exp.logoColor, opacity: 0.6, marginTop: "2px" }}>–</span>{pt}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((skill) => (
                      <span key={skill} className="font-body text-xs px-2.5 py-0.5 rounded-full"
                        style={{ background: `${exp.logoColor}12`, border: `1px solid ${exp.logoColor}28`, color: exp.logoColor, opacity: 0.85 }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-24 px-6 md:px-12 noise-overlay relative overflow-hidden"
      style={{ background: "var(--bg-dark)" }}>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(116,0,184,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(100,223,223,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(100,223,223,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: "linear-gradient(90deg, transparent, var(--pearl-aqua))" }} />
            <span className="font-body text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pearl-aqua)", opacity: 0.7 }}>
              Where I've worked
            </span>
            <div className="h-px w-10" style={{ background: "linear-gradient(90deg, var(--pearl-aqua), transparent)" }} />
          </div>
          <h2 className="font-heading" style={{
            fontSize: "clamp(3.5rem, 9vw, 7rem)", lineHeight: 0.93,
            background: "linear-gradient(135deg, #fff 0%, rgba(100,223,223,0.8) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>EXPERIENCE</h2>
        </motion.div>

        <div>
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}