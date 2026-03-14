"use client";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import Fardeen from "../../Public/Images/Fardeen.jpg";
import { Bio } from "@/data/constant";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { HiArrowDown } from "react-icons/hi";

const SOCIALS = [
  { icon: <FaGithub   size={17}/>, href: Bio.github,   label:"GitHub"    },
  { icon: <FaLinkedin size={17}/>, href: Bio.linkedin,  label:"LinkedIn"  },
  { icon: <FaInstagram size={17}/>, href: Bio.insta,   label:"Instagram" },
];

const STATS = [
  { value: "2+",  label: "Yrs Coding"  },
  { value: "10+", label: "Projects"    },
  { value: "9.2", label: "CGPA"        },
];

export default function Hero() {
  return (
    <section id="about" className="dot-grid"
      style={{ minHeight:"100vh", paddingTop:"80px", display:"flex", alignItems:"center", position:"relative" }}>

      {/* Fade out dot grid at edges */}
      <div style={{ position:"absolute", inset:0,
        background:"radial-gradient(ellipse at center, transparent 40%, var(--bg) 82%)", zIndex:1 }} />

      <div className="container" style={{ position:"relative", zIndex:2, width:"100%" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"60px", alignItems:"center" }}
          className="max-[900px]:!grid-cols-1 max-[900px]:text-center">

          {/* ── Left column ── */}
          <div style={{ animation:"fadein-l 0.9s cubic-bezier(.4,0,.2,1) both" }}>

            {/* Available badge */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:"8px",
              padding:"5px 16px", background:"rgba(133,76,230,0.1)",
              border:"1px solid rgba(133,76,230,0.28)", borderRadius:"20px",
              fontSize:"12px", color:"#a78bfa", fontWeight:500, marginBottom:"22px" }}>
              <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#4ade80",
                display:"inline-block", boxShadow:"0 0 8px #4ade80", animation:"pulse 2s infinite" }} />
              Available for opportunities
            </div>

            {/* Sub-greeting */}
            <p style={{ color:"var(--text2)", fontSize:"15px", marginBottom:"6px" }}>
              Hello there 👋, I&apos;m
            </p>

            {/* Name */}
            <h1 style={{ fontSize:"clamp(42px,6vw,70px)", fontWeight:800,
              letterSpacing:"-1px", marginBottom:"16px" }}>
              {Bio.name.split(" ")[0]}{" "}
              <span className="gradient-text">{Bio.name.split(" ")[1]}</span>
            </h1>

            {/* Typewriter roles */}
            <div style={{ display:"flex", alignItems:"center", gap:"10px",
              fontSize:"clamp(17px,2.2vw,22px)", color:"var(--text2)",
              fontWeight:300, marginBottom:"22px" }}
              className="max-[900px]:justify-center">
              <span>I build</span>
              <span style={{ color:"var(--accent)", fontWeight:600, fontFamily:"var(--font-d)" }}>
                <Typewriter options={{ strings: Bio.roles, autoStart:true, loop:true, delay:60 }}/>
              </span>
            </div>

            {/* Bio */}
            <p style={{ color:"var(--text2)", fontSize:"15px", lineHeight:1.8,
              maxWidth:"500px", marginBottom:"34px" }}
              className="max-[900px]:mx-auto">
              {Bio.description}
            </p>

            {/* CTA buttons */}
            <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", marginBottom:"36px" }}
              className="max-[900px]:justify-center">
              <a href={Bio.resume} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                View Resume →
              </a>
              <a href="#projects" className="btn btn-ghost">
                See My Work
              </a>
            </div>

            {/* Social icons */}
            <div style={{ display:"flex", gap:"10px" }} className="max-[900px]:justify-center">
              {SOCIALS.map(s => (
                <SocialIcon key={s.label} {...s} />
              ))}
            </div>
          </div>

          {/* ── Right column ── */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"28px",
            animation:"fadein-r 0.9s 0.15s cubic-bezier(.4,0,.2,1) both" }}>

            {/* Avatar with rings */}
            <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {/* Outer ring */}
              <div style={{ position:"absolute", inset:"-32px", borderRadius:"50%",
                border:"1px dashed rgba(204,0,187,0.18)", animation:"spinr 28s linear infinite" }} />
              {/* Inner ring */}
              <div style={{ position:"absolute", inset:"-16px", borderRadius:"50%",
                border:"1.5px dashed rgba(133,76,230,0.3)", animation:"spin 18s linear infinite" }} />
              {/* Glow */}
              <div style={{ position:"absolute", inset:0, borderRadius:"50%",
                background:"radial-gradient(circle, rgba(133,76,230,0.28) 0%, transparent 70%)",
                filter:"blur(18px)", transform:"scale(1.4)" }} />
              {/* Photo */}
              <div className="float-anim" style={{ width:"270px", height:"270px", borderRadius:"50%",
                overflow:"hidden", border:"3px solid rgba(133,76,230,0.5)", position:"relative" }}>
                <Image src={Fardeen} alt="Fardeen Qamar" fill style={{ objectFit:"cover" }} priority/>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display:"flex", gap:"14px", flexWrap:"wrap", justifyContent:"center" }}>
              {STATS.map(s => (
                <div key={s.label} className="card" style={{ padding:"14px 20px", textAlign:"center" }}>
                  <div style={{ fontFamily:"var(--font-d)", fontSize:"26px", fontWeight:700,
                    color:"var(--accent)", lineHeight:1 }}>{s.value}</div>
                  <div style={{ fontSize:"11px", color:"var(--text2)", marginTop:"4px",
                    letterSpacing:"0.05em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ display:"flex", justifyContent:"center", marginTop:"56px" }} className="bounce-anim">
          <a href="#skills" style={{ color:"var(--text3)", display:"flex", flexDirection:"column",
            alignItems:"center", gap:"5px" }}>
            <span style={{ fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase" }}>Scroll</span>
            <HiArrowDown size={15}/>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Sub-component: social icon button ── */
function SocialIcon({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      style={{ width:"38px", height:"38px", borderRadius:"50%",
        border:"1px solid rgba(133,76,230,0.22)", display:"flex",
        alignItems:"center", justifyContent:"center", color:"var(--text2)",
        transition:"all .25s ease" }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "var(--accent)";
        el.style.borderColor = "var(--accent)";
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = "0 8px 20px rgba(133,76,230,.22)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "var(--text2)";
        el.style.borderColor = "rgba(133,76,230,0.22)";
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}>
      {icon}
    </a>
  );
}
