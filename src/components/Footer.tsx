"use client";
import { Bio } from "@/data/constant";
import { FaGithub, FaLinkedin, FaInstagram, FaHeart } from "react-icons/fa";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const NAV = [
  { label:"About",     href:"#about"     },
  { label:"Skills",    href:"#skills"    },
  { label:"Projects",  href:"#projects"  },
  { label:"Education", href:"#education" },
];

const SOCIALS = [
  { icon:<FaGithub    size={16}/>, href:Bio.github,   label:"GitHub"    },
  { icon:<FaLinkedin  size={16}/>, href:Bio.linkedin,  label:"LinkedIn"  },
  { icon:<FaInstagram size={16}/>, href:Bio.insta,    label:"Instagram" },
];

export default function Footer() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <footer id="contact" style={{ position:"relative", zIndex:2,
      background:"linear-gradient(0deg,rgba(5,5,12,0.95) 0%,transparent 100%)", paddingTop:"60px" }}>
      <div className="glow-line" />

      <div ref={ref} className={`container reveal ${isVisible ? "in" : ""}`}
        style={{ paddingTop:"60px", paddingBottom:"36px" }}>

        {/* ── CTA block ── */}
        <div className="card" style={{ padding:"48px 36px", textAlign:"center", marginBottom:"56px",
          background:"linear-gradient(135deg,rgba(133,76,230,0.06) 0%,rgba(204,0,187,0.04) 100%)",
          borderColor:"rgba(133,76,230,0.22)" }}>
          <div className="label" style={{ justifyContent:"center", marginBottom:"14px" }}>Get in touch</div>
          <h2 style={{ fontSize:"clamp(26px,4vw,42px)", fontWeight:800, marginBottom:"14px", letterSpacing:"-0.5px" }}>
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p style={{ color:"var(--text2)", maxWidth:"440px", margin:"0 auto 28px", fontSize:"15px", lineHeight:1.8 }}>
            I&apos;m open to new opportunities. Whether you have a project in mind or just want to say hi —
            my inbox is always open.
          </p>
          <a href={`mailto:${Bio.email}`} className="btn btn-primary" style={{ fontSize:"15px" }}>
            Say Hello 👋
          </a>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          flexWrap:"wrap", gap:"20px" }}>
          {/* Logo */}
          <a href="#" style={{ fontFamily:"var(--font-d)", fontWeight:800, fontSize:"20px", color:"var(--text)" }}>
            F<span style={{ color:"var(--accent)" }}>.</span>
          </a>

          {/* Nav */}
          <nav style={{ display:"flex", gap:"22px", flexWrap:"wrap" }}>
            {NAV.map(l => (
              <a key={l.label} href={l.href} className="nav-link" style={{ fontSize:"13px" }}>{l.label}</a>
            ))}
          </nav>

          {/* Socials */}
          <div style={{ display:"flex", gap:"8px" }}>
            {SOCIALS.map(s => (
              <FooterIcon key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div style={{ borderTop:"1px solid rgba(133,76,230,0.1)", marginTop:"24px", paddingTop:"22px",
          textAlign:"center", color:"var(--text3)", fontSize:"12px",
          display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", flexWrap:"wrap" }}>
          <span>&copy; {new Date().getFullYear()} {Bio.name}. All rights reserved. Made with</span>
          <FaHeart size={9} style={{ color:"var(--accent)" }}/>
          <span>using Next.js &amp; Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}

/* ── Social icon circle ── */
function FooterIcon({ icon, href, label }: { icon:React.ReactNode; href:string; label:string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      style={{ width:"34px", height:"34px", borderRadius:"50%",
        border:"1px solid rgba(133,76,230,0.18)",
        display:"flex", alignItems:"center", justifyContent:"center",
        color:"var(--text2)", transition:"all .25s" }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "var(--accent)";
        el.style.borderColor = "var(--accent)";
        el.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "var(--text2)";
        el.style.borderColor = "rgba(133,76,230,0.18)";
        el.style.transform = "translateY(0)";
      }}>
      {icon}
    </a>
  );
}
