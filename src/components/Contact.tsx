import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

// ── EmailJS credentials (your existing working ones) ──────────────────────────
const SERVICE_ID  = "service_yka8czk";
const TEMPLATE_ID = "template_rp368p9";
const PUBLIC_KEY  = "udV-1EEq3t4P7jlzs";

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(100,223,223,0.2)",
  padding: "1rem 0",
  color: "#e8e4ff",
  fontFamily: "var(--font-body)",
  fontSize: "1rem",
  outline: "none",
};

function Field({ name, placeholder, type = "text", textarea = false, rows = 4, delay = 0 }: {
  name: string; placeholder: string; type?: string;
  textarea?: boolean; rows?: number; delay?: number;
}) {
  const [focused, setFocused] = useState(false);
  const style: React.CSSProperties = {
    ...inputBase,
    borderBottomColor: focused ? "#64dfdf" : "rgba(100,223,223,0.2)",
    transition: "border-color 0.3s",
  };
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}>
      {textarea
        ? <textarea name={name} placeholder={placeholder} rows={rows} required
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ ...style, resize: "none" }} />
        : <input type={type} name={name} placeholder={placeholder} required
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={style} />
      }
      <style>{`
        input::placeholder, textarea::placeholder {
          color: rgba(232,228,255,0.3);
          font-family: var(--font-body);
        }
      `}</style>
    </motion.div>
  );
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");

    try {
      // emailjs.sendForm reads the form fields by their `name` attributes:
      //   name="user_name"  → {{user_name}} in your EmailJS template
      //   name="user_email" → {{user_email}}
      //   name="message"    → {{message}}
      const result = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      if (result.status === 200 || result.text === "OK") {
        setStatus("sent");
        formRef.current.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact"
      className="min-h-screen relative py-24 px-6 md:px-12 overflow-hidden"
      style={{ background: "var(--bg-mid, #0d0025)" }}>

      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(72,191,227,0.12) 0%,transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(116,0,184,0.15) 0%,transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(100,223,223,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(100,223,223,0.03) 1px,transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">

          {/* ── Left ─────────────────────────────────────────────── */}
          <div>
            <motion.div className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}>
              <div className="h-px w-10"
                style={{ background: "linear-gradient(90deg,transparent,#64dfdf)" }} />
              <span className="font-body text-xs uppercase tracking-[0.3em]"
                style={{ color: "#64dfdf", opacity: 0.7 }}>Get in touch</span>
              <div className="h-px w-10"
                style={{ background: "linear-gradient(90deg,#64dfdf,transparent)" }} />
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="font-heading"
              style={{
                fontSize: "clamp(3rem,7vw,7rem)", lineHeight: 0.9,
                background: "linear-gradient(160deg,#ffffff 0%,#64dfdf 60%,#7400b8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
              LET'S GET<br />IN TOUCH
            </motion.h2>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }} className="mt-10 space-y-4">
              <a href="mailto:ak.professional47@gmail.com"
                className="flex items-center gap-3 group font-body text-sm"
                style={{ color: "rgba(232,228,255,0.5)", textDecoration: "none" }}>
                <span style={{ color: "#64dfdf", opacity: 0.7 }}>✉</span>
                <span className="group-hover:text-white transition-colors duration-200">
                  ak.professional47@gmail.com
                </span>
              </a>
              <div className="flex items-center gap-3 font-body text-sm"
                style={{ color: "rgba(232,228,255,0.5)" }}>
                <span style={{ color: "#48bfe3", opacity: 0.7 }}>📍</span>
                <span>Jaipur, Rajasthan, India</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }} className="mt-10 flex gap-4">
              {[
                { label: "GitHub",   href: "https://github.com/Akshatrix404" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/akshatkhndelwal01/" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="font-body text-xs uppercase tracking-widest px-5 py-2 rounded-full transition-all duration-300"
                  style={{ border: "1px solid rgba(100,223,223,0.2)", color: "rgba(232,228,255,0.5)", textDecoration: "none" }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#64dfdf"; el.style.color = "#64dfdf";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(100,223,223,0.2)"; el.style.color = "rgba(232,228,255,0.5)";
                  }}>
                  {s.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: form ──────────────────────────────────────── */}
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
            <Field name="user_name"  placeholder="Your Name"    delay={0.15} />
            <Field name="user_email" placeholder="Your Email"   type="email" delay={0.25} />
            <Field name="message"    placeholder="Your Message" textarea rows={5} delay={0.35} />

            <motion.button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              whileHover={{ scale: status === "sent" ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 rounded-2xl font-body font-semibold uppercase tracking-widest text-sm"
              style={{
                background: status === "sent"
                  ? "linear-gradient(135deg,#22c55e,#16a34a)"
                  : "linear-gradient(135deg,#7400b8,#5e60ce,#64dfdf)",
                color: "#fff",
                border: "none",
                cursor: status === "sending" || status === "sent" ? "default" : "pointer",
                opacity: status === "sending" ? 0.7 : 1,
                boxShadow: "0 0 40px rgba(116,0,184,0.25)",
                transition: "background 0.4s, opacity 0.3s",
              }}>
              {status === "sent"    ? "✓ Message Sent!"  :
               status === "sending" ? "Sending…"         :
               "Send Message →"}
            </motion.button>

            {/* Error state */}
            {status === "error" && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-4 text-center font-body text-sm"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5" }}>
                <p className="font-semibold mb-1">Failed to send via EmailJS</p>
                <p style={{ opacity: 0.8 }}>
                  Please email directly:{" "}
                  <a href="mailto:ak.professional47@gmail.com"
                    style={{ color: "#64dfdf", textDecoration: "underline" }}>
                    ak.professional47@gmail.com
                  </a>
                </p>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}