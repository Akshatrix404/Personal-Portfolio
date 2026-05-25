import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Jugraunaq Singh",
    company: "SWE Intern @ Zynga | SWE Intern'25 @ Paytm | Top Coder'25 @ VIT",
    relation: "Managed Akshat directly",
    text: "Working with Akshat at Prometheus has been a great experience. He is hardworking, focused, and always ready to learn something new. He helped the team a lot by taking ownership of tasks and guiding others when needed. His interest in AI/ML is strong, and he always comes up with smart and useful ideas. Akshat is friendly, easy to work with, and very dedicated to his work. I'm sure he will do amazing things in the future and succeed in whatever he chooses.",
    color: "#5e60ce",
  },
  {
    name: "Ankit Srivastava",
    company: "Consultant at Genpact | AI & Backend Developer",
    relation: "Was Akshat's mentor",
    text: "I had the pleasure of mentoring Akshat Khandelwal during their internship at Genpact, where he contributed to our projects in the field of Generative AI. From the very beginning, Akshat demonstrated a deep curiosity, strong technical skills, and a genuine passion for AI and innovation. He played a key role in developing and experimenting with LLM-based prototypes, and quickly grasped concepts like prompt engineering, RAG, and fine-tuning of large language models. Beyond technical skills, he brought creativity and a collaborative attitude to every discussion. It's rare to see such maturity and clarity of thought at the intern level. I'm confident that Akshat will be a valuable asset to any organization looking to innovate in the AI space.",
    color: "#48bfe3",
  },
];

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="relative rounded-2xl p-8 flex flex-col gap-5"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${t.color}20`,
        boxShadow: `0 4px 32px ${t.color}0d, 0 1px 4px rgba(94,96,206,0.06)`,
      }}
    >
      {/* Quote mark */}
      <div className="flex items-start justify-between">
        <span className="font-heading text-6xl leading-none select-none"
          style={{ color: t.color, opacity: 0.18, lineHeight: 0.8 }} aria-hidden="true">"</span>
        {/* LinkedIn badge */}
        <span className="font-body text-xs px-2 py-1 rounded-full flex items-center gap-1"
          style={{ background: "rgba(10,102,194,0.08)", border: "1px solid rgba(10,102,194,0.2)", color: "rgba(10,102,194,0.75)", letterSpacing: "0.04em" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </span>
      </div>

      {/* Text */}
      <p className="font-body text-base leading-relaxed flex-1" style={{ color: "#3a3a5c" }}>{t.text}</p>

      {/* Author */}
      <div className="flex items-center gap-4 mt-2">
        <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-body font-semibold text-sm"
          style={{ background: `linear-gradient(135deg, ${t.color}22, ${t.color}0a)`, border: `1px solid ${t.color}30`, color: t.color }}>
          {t.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-body font-semibold text-sm" style={{ color: "#0e0025" }}>{t.name}</p>
          <p className="font-body text-xs truncate" style={{ color: "#7a7aaa", letterSpacing: "0.04em" }}>{t.company}</p>
          <p className="font-body text-xs mt-0.5" style={{ color: `${t.color}99`, letterSpacing: "0.04em" }}>{t.relation}</p>
        </div>
        <div className="h-px w-10 shrink-0"
          style={{ background: `linear-gradient(90deg, transparent, ${t.color}45)` }} />
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="min-h-screen py-24 px-6 md:px-12 relative overflow-hidden"
      style={{ background: "#ffffff" }}>
      {/* Subtle grid — same as About */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(94,96,206,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(94,96,206,0.05) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      {/* Colour blobs — same palette as About */}
      <div className="absolute top-0 left-1/4 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(116,0,184,0.06) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(72,191,227,0.07) 0%, transparent 70%)", filter: "blur(50px)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header — mirrors About label style */}
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: "linear-gradient(90deg, transparent, #5e60ce)" }} />
            <span className="font-body text-xs uppercase tracking-[0.3em]" style={{ color: "#5e60ce", opacity: 0.8 }}>Kind words</span>
            <div className="h-px w-10" style={{ background: "linear-gradient(90deg, #5e60ce, transparent)" }} />
          </div>
          <h2 className="font-heading flex items-end gap-4 flex-wrap"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.93 }}>
            <span style={{
              background: "linear-gradient(160deg, #0e0025 0%, #5e60ce 55%, #48bfe3 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              WHAT PEOPLE<br />ARE SAYING
            </span>
            <span className="text-5xl" aria-hidden="true">🔥</span>
          </h2>
        </motion.div>

        <div className="columns-1 md:columns-2 gap-5 space-y-5">
          {testimonials.map((t, i) => (
            <div key={t.name} className="break-inside-avoid">
              <TestimonialCard t={t} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}