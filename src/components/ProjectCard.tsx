"use client";
import Image from "next/image";
import { ProjectType } from "@/app/page";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface Props {
  project:   ProjectType;
  onOpen:    (p: ProjectType) => void;
  index:     number;
  isVisible: boolean;
}

export default function ProjectCard({ project, onOpen, index, isVisible }: Props) {
  return (
    <article
      className={`card reveal ${isVisible ? "in" : ""} d${Math.min(index + 1, 5)}`}
      style={{ overflow:"hidden", display:"flex", flexDirection:"column", cursor:"pointer" }}
      onClick={() => onOpen(project)}>

      {/* Thumbnail */}
      <div style={{ position:"relative", height:"196px", overflow:"hidden",
        borderRadius:"12px 12px 0 0" }}>
        <Image src={project.image} alt={project.title} fill
          style={{ objectFit:"cover", transition:"transform .4s ease" }}
          unoptimized className="proj-img" />

        {/* Hover overlay with links */}
        <div className="proj-overlay" style={{ position:"absolute", inset:0,
          background:"rgba(8,8,16,0.65)", display:"flex", alignItems:"center",
          justifyContent:"center", gap:"14px", opacity:0, transition:"opacity .3s" }}>
          <LinkBtn href={project.github} label="Code"    icon={<FaGithub size={15}/>}  ghost />
          <LinkBtn href={project.webapp} label="Live"    icon={<FaExternalLinkAlt size={13}/>} />
        </div>

        {/* CSS for hover effects on the article */}
        <style>{`
          article:hover .proj-overlay { opacity: 1 !important; }
          article:hover .proj-img     { transform: scale(1.06) !important; }
        `}</style>
      </div>

      {/* Body */}
      <div style={{ padding:"20px 22px", flex:1, display:"flex", flexDirection:"column", gap:"8px" }}>
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
          {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        <h3 style={{ fontSize:"19px", fontWeight:700, color:"var(--text)", lineHeight:1.2 }}>
          {project.title}
        </h3>

        <span style={{ fontSize:"11px", color:"var(--text3)" }}>{project.date}</span>

        <p style={{ fontSize:"14px", color:"var(--text2)", lineHeight:1.7, flex:1,
          display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
          {project.description}
        </p>

        <span style={{ fontSize:"13px", color:"var(--accent)", fontWeight:500, marginTop:"6px" }}>
          View Details →
        </span>
      </div>
    </article>
  );
}

/* ── Small icon button used in hover overlay ── */
function LinkBtn({ href, label, icon, ghost }: { href:string; label:string; icon:React.ReactNode; ghost?:boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onClick={e => e.stopPropagation()}
      style={{ width:"40px", height:"40px", borderRadius:"50%",
        background: ghost ? "rgba(255,255,255,0.1)" : "var(--accent)",
        border: ghost ? "1px solid rgba(255,255,255,0.25)" : "none",
        display:"flex", alignItems:"center", justifyContent:"center",
        color:"#fff", transition:"transform .2s" }}
      aria-label={label}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.12)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
      {icon}
    </a>
  );
}
