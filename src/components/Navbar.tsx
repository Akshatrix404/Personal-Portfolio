import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NavLink { label: string; href: string; }

const NAV_LINKS: NavLink[] = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#services"   },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

function NavItem({ link }: { link: NavLink }) {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <a
      href={link.href}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex flex-col items-center gap-[3px] group"
    >
      <span
        className="font-body text-sm uppercase tracking-widest transition-all duration-200"
        style={{
          color: hovered ? "var(--pearl-aqua)" : "rgba(232,228,255,0.65)",
          fontWeight: 500,
          letterSpacing: "0.14em",
        }}
      >
        {link.label}
      </span>
      <span className="relative h-px w-full overflow-hidden">
        <motion.span
          className="absolute inset-0"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            display: "block",
            background: "linear-gradient(90deg, var(--pearl-aqua), var(--slate-blue))",
          }}
        />
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-[72px] px-8"
      style={{
        background: scrolled
          ? "rgba(10,0,24,0.6)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
        // Smooth gradient fade downward instead of a hard border line
        boxShadow: scrolled
          ? "0 1px 0 0 rgba(100,223,223,0.0), 0 4px 24px 0 rgba(0,0,0,0.35)"
          : "none",
        // Fade-out mask at the bottom edge so it bleeds into the page
        WebkitMaskImage: scrolled
          ? "linear-gradient(to bottom, black 60%, transparent 100%)"
          : "none",
        maskImage: scrolled
          ? "linear-gradient(to bottom, black 60%, transparent 100%)"
          : "none",
        transition: "background 0.5s ease, backdrop-filter 0.5s ease, box-shadow 0.5s ease",
      }}
    >
      <ul className="flex items-center gap-10 md:gap-16">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <NavItem link={link} />
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}