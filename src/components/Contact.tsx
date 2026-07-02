import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE  = "service_yka8czk";
const EMAILJS_TEMPLATE = "template_rp368p9";
const EMAILJS_PUBLIC   = "udV-1EEq3t4P7jlzs";

const LINKS = [
  { label: "Email",    value: "ak.professional47@gmail.com", href: "mailto:ak.professional47@gmail.com" },
  { label: "Phone",    value: "+91 6378401213",               href: "tel:+916378401213" },
  { label: "LinkedIn", value: "akshatkhndelwal01",            href: "https://linkedin.com/in/akshatkhndelwal01/" },
  { label: "GitHub",   value: "Akshatrix404",                 href: "https://github.com/Akshatrix404" },
];

type Status = "idle" | "sending" | "sent" | "error";

function Field({
  label, value, onChange, type = "text", textarea = false, rows = 5,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; textarea?: boolean; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const sharedStyle: React.CSSProperties = {
    width: "100%", background: "transparent", border: "none",
    borderBottom: `1.5px solid ${focused ? "#64dfdf" : "rgba(100,223,223,0.2)"}`,
    color: "#0e0025", fontFamily: "inherit", fontSize: "0.9rem",
    padding: "0.5rem 0", outline: "none", resize: "none",
    transition: "border-color 0.25s",
  };
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(14,0,37,.4)" }}>{label}</label>
      {textarea ? (
        <textarea rows={rows} style={sharedStyle} value={value}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onChange={e => onChange(e.target.value)} />
      ) : (
        <input type={type} style={sharedStyle} value={value}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onChange={e => onChange(e.target.value)} />
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const send = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        from_name: form.name, reply_to: form.email,
        subject: "Portfolio Contact", message: form.message,
      }, EMAILJS_PUBLIC);
      setStatus("sent");
    } catch { setStatus("error"); }
  };

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden px-6 md:px-16 gap-8 md:gap-12" style={{ background: "#f5f4ff" }}>
      {/* Light ambient */}
      <div className="absolute top-0 left-1/4 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(116,0,184,.06) 0%,transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(72,191,227,.06) 0%,transparent 70%)", filter: "blur(50px)" }} />

      {/* LEFT — vertical title */}
      <motion.div
        initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex flex-col justify-center items-center shrink-0 gap-4"
        style={{ width: "22%" }}
      >
        <h2 className="font-heading select-none"
          style={{
            fontSize: "clamp(2rem,4vw,4.5rem)",
            lineHeight: 0.9, letterSpacing: "-0.02em", writingMode: "vertical-rl",
            textOrientation: "mixed", transform: "rotate(180deg)",
            background: "linear-gradient(180deg,#0e0025 0%,#5e60ce 55%,#48bfe3 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>CONTACT</h2>
        <div className="w-px h-16" style={{ background: "linear-gradient(180deg,#5e60ce,transparent)" }} />
      </motion.div>

      {/* RIGHT — card (light), split: info left / inline form right */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="relative rounded-2xl p-8 md:p-10 flex-1 overflow-y-auto"
        style={{
          maxHeight: "85vh", background: "#ffffff",
          border: "1px solid rgba(94,96,206,0.15)",
          boxShadow: "0 0 60px rgba(94,96,206,0.08), 0 32px 80px rgba(14,0,37,0.08)",
        }}
      >
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left sub-column — headline + links */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: "linear-gradient(90deg,transparent,#5e60ce)" }} />
              <span className="font-body text-xs uppercase tracking-[0.3em]" style={{ color: "#5e60ce", opacity: 0.75 }}>Get in touch</span>
            </div>
            <h3 className="font-heading mb-5"
              style={{
                fontSize: "clamp(2rem,4vw,3rem)",
                background: "linear-gradient(135deg,#0e0025 0%,#5e60ce 50%,#48bfe3 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1.05,
              }}>Let's build something.</h3>
            <p className="font-body text-base md:text-lg max-w-xl mb-8 leading-relaxed" style={{ color: "rgba(14,0,37,.6)" }}>
              Open to AI/ML engineering, data analyst, full-stack, and strategy/consulting roles — internships
              and full-time. The fastest way to reach me is email; I usually reply within a day.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {LINKS.map((l, i) => (
                <motion.a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="rounded-xl px-5 py-3.5 flex flex-col gap-1"
                  style={{ background: "rgba(94,96,206,0.04)", border: "1px solid rgba(94,96,206,0.12)", textDecoration: "none" }}>
                  <span className="font-body text-xs uppercase tracking-[0.2em]" style={{ color: "#5e60ce", opacity: 0.7 }}>{l.label}</span>
                  <span className="font-body text-sm" style={{ color: "rgba(14,0,37,.75)" }}>{l.value}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right sub-column — inline form */}
          <div className="rounded-2xl p-6"
            style={{ background: "rgba(94,96,206,0.03)", border: "1px solid rgba(94,96,206,0.1)" }}>
            {status === "sent" ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-8">
                <span className="text-5xl">✅</span>
                <p className="font-heading text-xl" style={{ color: "#5e60ce" }}>Message sent!</p>
                <p className="font-body text-sm" style={{ color: "rgba(14,0,37,.55)" }}>I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Field label="Name *" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
                <Field label="Email *" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
                <Field label="Message *" textarea rows={5} value={form.message} onChange={v => setForm(f => ({ ...f, message: v }))} />

                {status === "error" && (
                  <div className="rounded-xl p-3" style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)" }}>
                    <p className="font-body text-sm" style={{ color: "#dc2626" }}>
                      Something went wrong. You can also email me directly at{" "}
                      <a href="mailto:ak.professional47@gmail.com" style={{ color: "#dc2626", textDecoration: "underline" }}>
                        ak.professional47@gmail.com
                      </a>.
                    </p>
                  </div>
                )}

                <motion.button whileHover={{ scale: status === "sending" ? 1 : 1.02 }} whileTap={{ scale: 0.98 }} onClick={send}
                  disabled={status === "sending"}
                  className="font-body text-sm font-medium py-3.5 rounded-full mt-1 w-full"
                  style={{
                    backgroundImage: status === "sending" ? "none" : "linear-gradient(135deg,#64dfdf 0%,#5e60ce 60%,#7400b8 100%)",
                    background: status === "sending" ? "rgba(94,96,206,0.15)" : undefined,
                    color: status === "sending" ? "#5e60ce" : "#fff",
                    border: "none", cursor: status === "sending" ? "default" : "pointer", letterSpacing: "0.04em",
                    boxShadow: status === "sending" ? "none" : "0 0 24px rgba(94,96,206,.2)",
                  }}>
                  {status === "sending" ? "Sending…" : "Send Message"}
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}