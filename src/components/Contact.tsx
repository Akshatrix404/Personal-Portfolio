import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const inputStyle: React.CSSProperties = {
  width: "100%", background: "transparent", border: "none",
  borderBottom: "1px solid rgba(100,223,223,0.2)", padding: "1rem 0",
  color: "#e8e4ff", fontFamily: "var(--font-body)", fontSize: "1rem",
  outline: "none", transition: "border-color 0.3s",
};

function Field({ name, placeholder, type = "text", required = true, textarea = false, rows = 4, delay = 0 }: {
  name: string; placeholder: string; type?: string; required?: boolean; textarea?: boolean; rows?: number; delay?: number;
}) {
  const [focused, setFocused] = useState(false);
  const focusStyle: React.CSSProperties = {
    ...inputStyle,
    borderBottomColor: focused ? "var(--pearl-aqua)" : "rgba(100,223,223,0.2)",
    boxShadow: focused ? "0 2px 0 -1px var(--pearl-aqua)" : "none",
  };
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}>
      {textarea ? (
        <textarea name={name} placeholder={placeholder} required={required} rows={rows}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={{ ...focusStyle, resize: "none" }} />
      ) : (
        <input type={type} name={name} placeholder={placeholder} required={required}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={focusStyle} />
      )}
      <style>{`input::placeholder, textarea::placeholder { color: rgba(232,228,255,0.3); font-family: var(--font-body); }`}</style>
    </motion.div>
  );
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true); setError(false);
    emailjs.sendForm("service_yka8czk", "template_rp368p9", formRef.current, "udV-1EEq3t4P7jlzs")
      .then(() => { setSent(true); setLoading(false); formRef.current?.reset(); })
      .catch(() => { setError(true); setLoading(false); });
  };

  return (
    <section id="contact" className="min-h-screen relative py-24 px-6 md:px-12 overflow-hidden noise-overlay"
      style={{ background: "var(--bg-mid)" }}>
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(72,191,227,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(116,0,184,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(100,223,223,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(100,223,223,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* Floating 3D objects */}
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        className="absolute top-16 right-10 w-20 md:w-28 pointer-events-none" aria-hidden="true">
        <img src="/3d-lightning.svg" alt="" className="w-full h-auto"
          style={{ filter: "drop-shadow(0 8px 20px rgba(72,191,227,0.4))" }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
      </motion.div>
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute bottom-10 left-8 w-24 md:w-36 pointer-events-none" aria-hidden="true">
        <img src="/3d-blob.svg" alt="" className="w-full h-auto"
          style={{ filter: "drop-shadow(0 8px 20px rgba(116,0,184,0.4))" }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left */}
          <div>
            <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}>
              <div className="h-px w-10" style={{ background: "linear-gradient(90deg, transparent, var(--pearl-aqua))" }} />
              <span className="font-body text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pearl-aqua)", opacity: 0.7 }}>Get in touch</span>
              <div className="h-px w-10" style={{ background: "linear-gradient(90deg, var(--pearl-aqua), transparent)" }} />
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}
              className="font-heading" style={{
                fontSize: "clamp(4rem, 9vw, 8rem)", lineHeight: 0.9,
                background: "linear-gradient(160deg, #ffffff 0%, var(--pearl-aqua) 60%, var(--royal-violet) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>LET'S GET IN TOUCH</motion.h2>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-10 space-y-4">
              <a href="mailto:ak.professional47@gmail.com" className="flex items-center gap-3 group"
                style={{ color: "rgba(232,228,255,0.5)", fontSize: "0.95rem" }}>
                <span className="text-lg" style={{ color: "var(--pearl-aqua)", opacity: 0.7 }}>✉</span>
                <span className="group-hover:text-white transition-colors duration-200">ak.professional47@gmail.com</span>
              </a>
              <div className="flex items-center gap-3" style={{ color: "rgba(232,228,255,0.5)", fontSize: "0.95rem" }}>
                <span style={{ color: "var(--sky-surge)", opacity: 0.7 }}>📍</span>
                <span>Jaipur, Rajasthan, India</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-10 flex gap-4">
              {[{ label: "GitHub", href: "https://github.com/Akshatrix404" }, { label: "LinkedIn", href: "https://www.linkedin.com/in/akshatkhndelwal01/" }].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="font-body text-xs uppercase tracking-widest px-5 py-2 rounded-full transition-all duration-300"
                  style={{ border: "1px solid rgba(100,223,223,0.2)", color: "rgba(232,228,255,0.5)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--pearl-aqua)"; (e.currentTarget as HTMLElement).style.color = "var(--pearl-aqua)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(100,223,223,0.2)"; (e.currentTarget as HTMLElement).style.color = "rgba(232,228,255,0.5)"; }}>
                  {s.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — form */}
          <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-8">
            <Field name="user_name" placeholder="Your Name" delay={0.15} />
            <Field name="user_email" placeholder="Your Email" type="email" delay={0.25} />
            <Field name="message" placeholder="Your Message" textarea rows={5} delay={0.35} />
            <motion.button type="submit" disabled={loading || sent}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full py-5 rounded-2xl font-body font-semibold uppercase tracking-widest text-sm"
              style={{
                background: sent ? "linear-gradient(135deg, #22c55e, #16a34a)"
                  : "linear-gradient(135deg, var(--royal-violet), var(--slate-blue), var(--pearl-aqua))",
                color: "#fff", cursor: loading || sent ? "default" : "pointer", opacity: loading ? 0.7 : 1,
                boxShadow: "0 0 40px rgba(116,0,184,0.25), 0 0 80px rgba(100,223,223,0.1)",
              }}>
              {sent ? "✓ Message Sent!" : loading ? "Sending…" : "Send Message →"}
            </motion.button>
            {error && <p className="font-body text-sm text-center" style={{ color: "#f87171" }}>Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}