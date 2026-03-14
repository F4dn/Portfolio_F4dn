"use client";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { ProjectType } from "@/app/page";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

interface Props { project: ProjectType; onClose: () => void; }

export default function ProjectModal({ project, onClose }: Props) {
  // Lock body scroll + Esc to close
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const portal = document.getElementById("overlays");
  if (!portal) return null;

  return ReactDOM.createPortal(
    /* Backdrop */
    <div className="modal-bg" onClick={onClose}
      style={{ position:"fixed", inset:0, zIndex:1000,
        background:"rgba(5,5,12,0.88)", backdropFilter:"blur(14px)",
        display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>

      {/* Modal panel */}
      <div className="card modal-content" onClick={e => e.stopPropagation()}
        style={{ maxWidth:"680px", width:"100%", maxHeight:"90vh",
          overflowY:"auto", borderRadius:"20px", position:"relative" }}>

        {/* Close button */}
        <button onClick={onClose}
          style={{ position:"absolute", top:"14px", right:"14px", zIndex:10,
            width:"34px", height:"34px", borderRadius:"50%",
            background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)",
            color:"var(--text)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <FaTimes size={13}/>
        </button>

        {/* Cover image */}
        <div style={{ position:"relative", height:"260px", borderRadius:"16px 16px 0 0", overflow:"hidden" }}>
          <Image src={project.image} alt={project.title} fill
            style={{ objectFit:"cover" }} unoptimized />
          <div style={{ position:"absolute", inset:0,
            background:"linear-gradient(to bottom, transparent 50%, var(--card) 100%)" }} />
        </div>

        {/* Content */}
        <div style={{ padding:"24px 28px 28px" }}>
          {/* Tags */}
          <div style={{ display:"flex", gap:"7px", flexWrap:"wrap", marginBottom:"14px" }}>
            {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>

          {/* Title + date */}
          <h2 style={{ fontSize:"26px", fontWeight:800, marginBottom:"4px" }}>{project.title}</h2>
          <p style={{ fontSize:"12px", color:"var(--text3)", marginBottom:"18px" }}>{project.date}</p>

          {/* Description */}
          <p style={{ color:"var(--text2)", fontSize:"15px", lineHeight:1.8, marginBottom:"22px" }}>
            {project.description}
          </p>

          {/* Team */}
          {project.member.length > 0 && (
            <div style={{ marginBottom:"24px" }}>
              <p style={{ fontSize:"11px", color:"var(--text3)", letterSpacing:"0.1em",
                textTransform:"uppercase", marginBottom:"10px" }}>Team</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
                {project.member.map(m => (
                  <a key={m.name} href={m.linkedin} target="_blank" rel="noopener noreferrer"
                    style={{ display:"flex", alignItems:"center", gap:"8px",
                      padding:"5px 14px 5px 7px",
                      background:"rgba(133,76,230,0.08)",
                      border:"1px solid rgba(133,76,230,0.2)", borderRadius:"20px",
                      color:"var(--text)", fontSize:"13px", transition:"all .2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(133,76,230,0.2)"; }}>
                    <Image src={m.img} alt={m.name} width={24} height={24}
                      style={{ borderRadius:"50%", objectFit:"cover" }} unoptimized/>
                    {m.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="btn btn-ghost" style={{ flex:1, minWidth:"130px" }}>
              <FaGithub size={15}/> View Code
            </a>
            <a href={project.webapp} target="_blank" rel="noopener noreferrer"
              className="btn btn-primary" style={{ flex:1, minWidth:"130px" }}>
              <FaExternalLinkAlt size={13}/> Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>,
    portal
  );
}
