import { motion } from "framer-motion";
import InlineNav from "./InlineNav";
<InlineNav activeIdx={7} light={false} />
const TESTIMONIALS = [
  {
    quote: "Working with Akshat at Prometheus has been a great experience. He is hardworking, focused, and always ready to learn something new. He helped the team a lot by taking ownership of tasks and guiding others when needed. His interest in AI/ML is strong, and he always comes up with smart and useful ideas. Akshat is friendly, easy to work with, and very dedicated to his work. I’m sure he will do amazing things in the future and succeed in whatever he chooses.",
    name: "Jugraunaq Singh",
    role: "SWE Intern @Zynga | SWE Intern'25 @Paytm | Top Coder'25 @VIT",
    accent: "#64dfdf",
    initials: "PS",
  },
  {
    quote: "I had the pleasure of mentoring Akshat Khandelwal during their internship at Genpact, where he contributed to our projects in the field of Generative AI. From the very beginning, Akshat demonstrated a deep curiosity, strong technical skills, and a genuine passion for AI and innovation. He played a key role in developing and experimenting with LLM-based prototypes, and quickly grasped concepts like prompt engineering, Retrieval-Augmented Generation (RAG), and fine-tuning of large language models. Whether it was integrating APIs, working with OpenAI, or deploying models efficiently, Akshat approached each task with ownership and commitment.Beyond technical skills, he brought creativity and a collaborative attitude to every discussion, consistently adding value to our brainstorming sessions and cross-functional efforts. It's rare to see such maturity and clarity of thought at the intern level. I'm confident that Akshat will be a valuable asset to any organization looking to innovate in the AI space. I highly recommend him and look forward to seeing the impact he will make in the future!",
    name: "Ankit Srivastava",
    role: "Consultant at Genpact | AI & Backend Developer",
    accent: "#5e60ce",
    initials: "GP",
  },
  
];

export default function TestimonialsSection() {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden" style={{ background: "var(--bg-deep)" }}>
      <InlineNav activeIdx={6} light={false} />
      <div className="relative flex-1 flex items-center px-6 md:px-16 gap-8 md:gap-12" style={{ background: "var(--bg-deep)" }}>
      {/* Ambient */}
      <div className="absolute -top-32 right-0 w-[28rem] h-[28rem] pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(100,223,223,.1) 0%,transparent 70%)", filter: "blur(70px)" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(116,0,184,.12) 0%,transparent 70%)", filter: "blur(60px)" }} />

      {/* LEFT — title */}
      <motion.div
        initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex flex-col justify-center items-center shrink-0 gap-4"
        style={{ width: "22%" }}
      >
        <h2 className="font-heading select-none"
          style={{
            fontSize: "clamp(1.5rem,2.8vw,3rem)",
            lineHeight: 0.9, letterSpacing: "-0.02em", writingMode: "vertical-rl",
            textOrientation: "mixed", transform: "rotate(180deg)",
            background: "linear-gradient(180deg,#fff 0%,#64dfdf 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>TESTIMONIALS</h2>
        <div className="w-px h-16" style={{ background: "linear-gradient(180deg,#64dfdf,transparent)" }} />
      </motion.div>

      {/* RIGHT — card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="relative rounded-2xl p-7 md:p-9 flex-1 overflow-y-auto"
        style={{
          maxHeight: "85vh",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(100,223,223,0.2)",
          backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
          boxShadow: "0 0 60px rgba(100,223,223,0.1), 0 32px 80px rgba(0,0,0,0.35)",
        }}
      >
        <p className="font-body text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "rgba(232,228,255,.35)" }}>
          What people say
        </p>
        <div className="flex flex-col gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl p-6 flex gap-5"
              style={{ background: `${t.accent}08`, border: `1px solid ${t.accent}20` }}
            >
              {/* Avatar */}
              <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-heading text-sm"
                style={{ background: `${t.accent}22`, color: t.accent, border: `1px solid ${t.accent}40` }}>
                {t.initials}
              </div>
              <div>
                <p className="font-body text-base leading-relaxed mb-3" style={{ color: "rgba(232,228,255,.75)" }}>
                  "{t.quote}"
                </p>
                <p className="font-heading text-sm" style={{ color: t.accent }}>{t.name}</p>
                <p className="font-body text-xs mt-0.5" style={{ color: "rgba(232,228,255,.35)" }}>{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      </div>
    </div>
  );
}