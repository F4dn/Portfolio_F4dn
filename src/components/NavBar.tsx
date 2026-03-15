"use client";
import { useState, useEffect } from "react";
import { Bio } from "@/data/constant";
import { FaBars, FaTimes, FaGithub } from "react-icons/fa";

const LINKS = [
  { label: "About",     href: "#about"     },
  { label: "Skills",    href: "#skills"    },
  { label: "Experience", href: "#experience" },
  { label: "Projects",  href: "#projects"  },
  { label: "Education", href: "#education" },
  { label: "Contact",   href: "#contact"   },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle: React.CSSProperties = {
    background:     scrolled ? "rgba(13,13,20,0.88)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)"          : "none",
    borderBottom:   scrolled ? "1px solid rgba(133,76,230,0.12)" : "none",
    transition:     "all 0.4s ease",
  };

  return (
    <nav style={navStyle}>
      <div className="container" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:"68px" }}>

        {/* Logo */}
        <a href="#" style={{ fontFamily:"var(--font-d)", fontWeight:800, fontSize:"22px", color:"var(--text)" }}>
          F<span style={{ color:"var(--accent)" }}>.</span>
        </a>

        {/* Desktop nav */}
        <ul style={{ display:"flex", gap:"32px", listStyle:"none", margin:0, padding:0 }} className="hidden md:flex">
          {LINKS.map(l => (
            <li key={l.label}>
              <a href={l.href} className="nav-link">{l.label}</a>
            </li>
          ))}
        </ul>

        {/* GitHub CTA */}
        <a href={Bio.github} target="_blank" rel="noopener noreferrer"
          className="btn btn-ghost hidden md:inline-flex"
          style={{ padding:"9px 20px", fontSize:"13px", gap:"7px" }}>
          <FaGithub size={15}/> GitHub
        </a>

        {/* Hamburger */}
        <button className="md:hidden" onClick={() => setOpen(o => !o)}
          style={{ background:"none", border:"none", color:"var(--text)", padding:"6px" }}>
          {open ? <FaTimes size={20}/> : <FaBars size={20}/>}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ background:"rgba(13,13,20,0.97)", backdropFilter:"blur(20px)", borderTop:"1px solid rgba(133,76,230,0.12)" }}>
          <div className="container" style={{ padding:"24px", display:"flex", flexDirection:"column", gap:"20px" }}>
            {LINKS.map(l => (
              <a key={l.label} href={l.href} className="nav-link" style={{ fontSize:"16px" }} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href={Bio.github} target="_blank" rel="noopener noreferrer"
              className="btn btn-primary" style={{ alignSelf:"flex-start" }}>
              GitHub Profile
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
