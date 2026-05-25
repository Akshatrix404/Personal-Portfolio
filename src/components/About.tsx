import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const floats = [
  { src: "/3d-star.svg",   className: "absolute top-16 left-8 md:left-14",                    w: "w-14 md:w-20", dur: 4.0, delay: 0 },
  { src: "/3d-gem.svg",    className: "absolute top-20 right-8 md:right-14",                   w: "w-14 md:w-20", dur: 5.2, delay: 0.5 },
  { src: "/3d-heart.svg",  className: "absolute bottom-24 left-10 md:left-20",                 w: "w-14 md:w-20", dur: 6.1, delay: 1 },
  { src: "/3d-flower.svg", className: "absolute right-8 md:right-12 top-1/2 -translate-y-1/2", w: "w-14 md:w-20", dur: 7.3, delay: 0.3 },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
      style={{ background: "#ffffff" }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(94,96,206,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(94,96,206,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Colour blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(116,0,184,0.07) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(72,191,227,0.08) 0%, transparent 70%)", filter: "blur(50px)" }} />

      {/* Floating 3D objects */}
      {floats.map((f) => (
        <motion.div
          key={f.src}
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: f.dur, delay: f.delay, ease: "easeInOut" }}
          className={`${f.className} ${f.w} z-10 pointer-events-none`}
          aria-hidden="true"
        >
          <img
            src={f.src}
            alt=""
            className="w-full h-auto"
            style={{ filter: "drop-shadow(0 8px 24px rgba(116,0,184,0.2)) drop-shadow(0 0 10px rgba(100,223,223,0.15))" }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        className="max-w-4xl mx-auto text-center relative z-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        {/* WHO AM I label */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-10" style={{ background: "linear-gradient(90deg, transparent, #5e60ce)" }} />
          <span className="font-body text-xs uppercase tracking-[0.3em]" style={{ color: "#5e60ce", opacity: 0.8 }}>
            Who am I
          </span>
          <div className="h-px w-10" style={{ background: "linear-gradient(90deg, #5e60ce, transparent)" }} />
        </div>

        {/* Heading */}
        <motion.h2
          className="font-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          style={{
            fontSize: "clamp(4rem, 11vw, 10rem)",
            background: "linear-gradient(160deg, #0e0025 0%, #5e60ce 55%, #48bfe3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 0.93,
          }}
        >
          ABOUT ME
        </motion.h2>

        {/* Body */}
        <motion.p
          className="mt-10 text-lg leading-relaxed max-w-3xl mx-auto"
          style={{ color: "#3a3a5c" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          I'm Akshat Khandelwal, a final-year CS Engineering student at VIT with a CGPA of 8.45.
          I build AI-powered full-stack applications, Android apps, and ML systems. Previously
          interned at Genpact as a Generative AI Engineer. Hackathon winner. I love turning complex
          problems into clean, scalable products.
        </motion.p>

        {/* Stats */}
        <motion.div
          className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          {[
            { value: "8.45", label: "CGPA" },
            { value: "6+",   label: "Projects" },
            { value: "2",    label: "Internships" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl py-6 px-4 text-center"
              style={{
                background: "rgba(94,96,206,0.07)",
                border: "1px solid rgba(94,96,206,0.16)",
              }}
              whileHover={{ scale: 1.06, background: "rgba(94,96,206,0.12)" }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <div
                className="font-heading text-4xl"
                style={{
                  background: "linear-gradient(135deg, #5e60ce, #48bfe3)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div className="font-body text-xs uppercase tracking-widest mt-1" style={{ color: "#7a7aaa" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button
          onClick={() => {
            // fire a custom event that App.tsx listens to
            window.dispatchEvent(new CustomEvent("portfolio:navigate", { detail: 6 }));
          }}
          className="inline-block mt-12 font-body text-sm uppercase tracking-widest px-8 py-4 rounded-full"
          style={{ border: "1px solid #5e60ce", color: "#5e60ce", background: "transparent", cursor: "pointer" }}
          whileHover={{ scale: 1.06, background: "#5e60ce", color: "#fff" }}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.55 }}
        >
          CONTACT ME →
        </motion.button>
      </motion.div>
    </section>
  );
}