"use client";
import { projects } from "@/data/constant";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ProjectCard from "./ProjectCard";
import { ProjectType } from "@/app/page";

interface Props { onOpen: (p: ProjectType) => void; }

export default function Projects({ onOpen }: Props) {
  const { ref: hRef, isVisible: hVis } = useScrollReveal();
  const { ref: gRef, isVisible: gVis } = useScrollReveal({ threshold: 0.05 });

  return (
    <section id="projects" className="section" style={{ paddingTop:0 }}>
      <div className="glow-line" />

      <div className="container" style={{ paddingTop:"80px" }}>

        {/* Header */}
        <div ref={hRef} className={`reveal ${hVis ? "in" : ""}`}
          style={{ textAlign:"center", marginBottom:"56px" }}>
          <div className="label" style={{ justifyContent:"center" }}>What I&apos;ve built</div>
          <h2 style={{ fontSize:"clamp(30px,5vw,50px)", fontWeight:800, letterSpacing:"-0.5px" }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ color:"var(--text2)", maxWidth:"460px", margin:"14px auto 0", fontSize:"15px" }}>
            A selection of things I&apos;ve built — from algorithm visualizers to full-stack web apps.
          </p>
        </div>

        {/* Grid */}
        <div ref={gRef}
          style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(310px,1fr))", gap:"24px" }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} onOpen={onOpen} index={i} isVisible={gVis} />
          ))}
        </div>
      </div>
    </section>
  );
}
