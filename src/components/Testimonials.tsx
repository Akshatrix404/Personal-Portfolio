import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InlineNav from "./InlineNav";
<InlineNav activeIdx={6} light={true} />
// ── Curated top certifications only ────────────────────────────────────
const CERTS = [
  {
    id: "bcg-strategy",
    name: "Strategy Consulting Job Simulation",
    issuer: "BCG × Forage",
    initials: "BCG",
    category: "Management Consulting",
    accent: "#6930c3",
    image: "/certificates/bcg-consulting.jpg",
    description:
      "Background research, market sizing, financial modelling, consumer survey design and data analysis — capped off by summarizing findings for a client audience.",
  },

  {
    id: "pwc-consulting",
    name: "Management Consulting Simulation",
    issuer: "PwC × Forage",
    initials: "PwC",
    category: "Management Consulting",
    accent: "#e03131",
    image: "/certificates/pwc-consulting.jpg",
    description:
      "Built a business summary and divestiture interview guide, put together a qualitative synergy presentation, and modelled a deal in Excel with a client-ready email summary.",
  },
  {
    id: "ey-consulting",
    name: "EY Technology Risk Virtual Job Simulation",
    issuer: "EY × Forage",
    initials: "EY",
    category: "Technology Risk",
    accent: "#ffbe0b",
    image: "/certificates/ey-consulting.jpg",
    description:
      "Worked through the basics of technology risk, interacting with the business, asking effective probing questions, and presenting conclusions as part of a risk advisory team.",
  },
  
  {
    id: "quantium-da",
    name: "Data Analytics Job Simulation",
    issuer: "Quantium × Forage",
    initials: "QU",
    category: "Data Analytics",
    accent: "#64dfdf",
    image: "/certificates/quantium-da.jpg",
    description:
      "Customer analytics and data preparation, experimentation and uplift testing, and translating results into commercial recommendations on real retail transaction data.",
  },
  {
    id: "jpmorgan-quant",
    name: "Quantitative Research Job Simulation",
    issuer: "J.P. Morgan × Forage",
    initials: "JP",
    category: "Quant Finance",
    accent: "#56cfe1",
    image: "/certificates/jpmorgan-da.jpg",
    description:
      "Investigated and priced commodity storage contracts from historical price data, then built a credit risk model and bucketed FICO scores for default prediction.",
  },
  {
    id: "bcgx-data-decision",
    name: "Introduction to Data for Decision Makers",
    issuer: "BCG X × Forage",
    initials: "BCGX",
    category: "Data Analytics",
    accent: "#12b886",
    image: "/certificates/bcgx-da.jpg",
    description:
      "Ran a campaign performance analysis end-to-end and communicated the findings in a way built for decision-makers, not just analysts.",
  },
];

// ── Single flip card ────────────────────────────────────────────────────
function CertCard({ cert, delay }: { cert: typeof CERTS[0]; delay: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: "1000px", cursor: "pointer" }}
      onClick={() => setFlipped(f => !f)}
    >
      {/* flip container */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          width: "100%",
          height: 320,
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── FRONT ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            overflow: "hidden",
            background: "#ffffff",
            boxShadow: "0 4px 24px rgba(14,0,37,0.08), 0 1px 4px rgba(14,0,37,0.05)",
            border: "1px solid rgba(94,96,206,0.12)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Top — issuer row (like avatar + name in reference) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 16px 12px",
            }}
          >
            {/* Issuer avatar */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: `${cert.accent}22`,
                border: `1px solid ${cert.accent}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 10,
                color: cert.accent,
                flexShrink: 0,
                letterSpacing: "0.03em",
              }}
            >
              {cert.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#0e0025",
                  margin: 0,
                  lineHeight: 1.2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {cert.issuer}
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  color: "rgba(14,0,37,0.4)",
                  margin: 0,
                  marginTop: 1,
                }}
              >
                Verified Certificate
              </p>
            </div>
            {/* Flip hint */}
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 9,
                color: cert.accent,
                opacity: 0.7,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                flexShrink: 0,
              }}
            >
              tap to flip
            </span>
          </div>

          {/* Cover image area — actual certificate */}
          <div
            style={{
              position: "relative",
              flex: 1,
              overflow: "hidden",
              background: "#f5f4ff",
              margin: "0 0",
            }}
          >
            <img
              src={cert.image}
              alt={`${cert.name} certificate — ${cert.issuer}`}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "50% 30%",
              }}
              loading="lazy"
            />
            {/* Bottom fade for legibility / cohesion with card below */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(180deg, transparent 60%, ${cert.accent}18 100%)`,
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Bottom — name + category (like title + description in reference) */}
          <div style={{ padding: "12px 16px 14px" }}>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: "#0e0025",
                margin: 0,
                lineHeight: 1.25,
              }}
            >
              {cert.name}
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                color: "rgba(14,0,37,0.45)",
                margin: "3px 0 0",
              }}
            >
              {cert.category}
            </p>
            {/* Category pill */}
            <span
              style={{
                display: "inline-block",
                marginTop: 8,
                padding: "3px 10px",
                borderRadius: 99,
                background: `${cert.accent}14`,
                border: `1px solid ${cert.accent}30`,
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                color: cert.accent,
                letterSpacing: "0.04em",
              }}
            >
              {cert.category.split("·")[0].trim()}
            </span>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            overflow: "hidden",
            background: `linear-gradient(160deg,#0d0020 0%,#0a001a 60%,#06001a 100%)`,
            border: `1px solid ${cert.accent}35`,
            boxShadow: `0 4px 32px ${cert.accent}20, 0 1px 4px rgba(0,0,0,0.3)`,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            display: "flex",
            flexDirection: "column",
            padding: "24px 22px",
            justifyContent: "space-between",
          }}
        >
          {/* Back top */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: `${cert.accent}22`,
                  border: `1px solid ${cert.accent}50`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 9,
                  color: cert.accent,
                  letterSpacing: "0.02em",
                  flexShrink: 0,
                }}
              >
                {cert.initials}
              </div>
              <div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: "#ffffff", margin: 0 }}>
                  {cert.name}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: cert.accent, margin: "2px 0 0", opacity: 0.85 }}>
                  {cert.issuer}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: `linear-gradient(90deg,${cert.accent}40,transparent)`, marginBottom: 14 }} />

            {/* Full certificate preview */}
            <div
              style={{
                width: "100%",
                height: 92,
                borderRadius: 10,
                overflow: "hidden",
                background: "#ffffff",
                border: `1px solid ${cert.accent}40`,
                marginBottom: 14,
              }}
            >
              <img
                src={cert.image}
                alt={`${cert.name} full certificate`}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                loading="lazy"
              />
            </div>

            {/* Description */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                lineHeight: 1.6,
                color: "rgba(232,228,255,0.72)",
                margin: 0,
              }}
            >
              {cert.description}
            </p>
          </div>

          {/* Back bottom — tap to flip back hint */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 20 }}>
            <div style={{ flex: 1, height: 1, background: `${cert.accent}20` }} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 9,
                color: cert.accent,
                opacity: 0.6,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              tap to flip back
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main section ────────────────────────────────────────────────────────
export default function Testimonials() {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden" style={{ background: "#f5f4ff" }}>
      <InlineNav activeIdx={5} light={true} />

      <div className="relative flex-1 flex items-center px-6 md:px-16 gap-8 md:gap-12 overflow-hidden" style={{ background: "#f5f4ff" }}>
        {/* Ambient */}
        <div className="absolute top-0 left-1/4 w-96 h-96 pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(116,0,184,.06) 0%,transparent 70%)", filter: "blur(50px)" }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 pointer-events-none"
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
              fontSize: "clamp(1.3rem,2.5vw,2.8rem)",
              lineHeight: 0.9, letterSpacing: "-0.02em",
              writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)",
              background: "linear-gradient(180deg,#0e0025 0%,#5e60ce 60%,#48bfe3 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}
          >
            RECOGNITION
          </h2>
          <div className="w-px h-16" style={{ background: "linear-gradient(180deg,#5e60ce,transparent)" }} />
        </motion.div>

        {/* RIGHT — scrollable card area */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative rounded-2xl flex-1 overflow-hidden"
          style={{
            maxHeight: "calc(100vh - 60px - 2rem)",
            background: "#ffffff",
            border: "1px solid rgba(94,96,206,0.15)",
            boxShadow: "0 0 60px rgba(94,96,206,0.08), 0 32px 80px rgba(14,0,37,0.08)",
          }}
        >
          {/* Header row inside card */}
          <div
            style={{
              padding: "18px 24px 14px",
              borderBottom: "1px solid rgba(94,96,206,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span className="font-body text-xs uppercase tracking-[0.25em]" style={{ color: "#5e60ce", opacity: 0.75 }}>
              Top Certifications &amp; Simulations
            </span>
            <span style={{ flex: 1, height: 1, background: "rgba(94,96,206,0.12)" }} />
            <span className="font-body text-[10px] uppercase tracking-widest" style={{ color: "rgba(14,0,37,0.3)" }}>
              Click card to reveal details
            </span>
          </div>

          {/* Cards grid */}
          <div
            className="overflow-y-auto p-5"
            style={{
              maxHeight: "calc(100vh - 60px - 2rem - 56px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
              alignContent: "start",
            }}
          >
            {CERTS.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} delay={0.08 + i * 0.07} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}