"use client";
import Image from "next/image";
import { education } from "@/data/constant";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Education() {
  const { ref: hRef, isVisible: hVis } = useScrollReveal();
  const { ref: lRef, isVisible: lVis } = useScrollReveal({ threshold: 0.05 });

  return (
    <section id="education" className="section" style={{ paddingTop:0 }}>
      <div className="glow-line" />

      <div className="container" style={{ paddingTop:"80px" }}>

        {/* Header */}
        <div ref={hRef} className={`reveal ${hVis ? "in" : ""}`}
          style={{ textAlign:"center", marginBottom:"60px" }}>
          <div className="label" style={{ justifyContent:"center" }}>My background</div>
          <h2 style={{ fontSize:"clamp(30px,5vw,50px)", fontWeight:800, letterSpacing:"-0.5px" }}>
            Academic <span className="gradient-text">Journey</span>
          </h2>
          <p style={{ color:"var(--text2)", maxWidth:"460px", margin:"14px auto 0", fontSize:"15px" }}>
            The formal training and experiences that shaped my professional path.
          </p>
        </div>

        {/* Timeline */}
        <div ref={lRef} style={{ maxWidth:"760px", margin:"0 auto" }}>
          {education.map((edu, i) => (
            <EduCard key={edu.id} edu={edu} index={i} isVisible={lVis} isLast={i === education.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Sub-component: single education entry ── */
function EduCard({
  edu, index, isVisible, isLast
}: {
  edu: typeof education[number];
  index: number;
  isVisible: boolean;
  isLast: boolean;
}) {
  const dir = index % 2 === 0 ? "reveal-l" : "reveal-r";

  return (
    <div className={`${dir} ${isVisible ? "in" : ""} d${Math.min(index + 1, 5)}`}
      style={{ display:"flex", gap:"20px", alignItems:"flex-start",
        marginBottom: isLast ? 0 : "28px" }}>

      {/* Timeline spine */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
        flexShrink:0, paddingTop:"6px" }}>
        <div className="tl-dot" />
        {!isLast && (
          <div style={{ width:"1px", flex:1, minHeight:"56px", marginTop:"6px",
            background:"linear-gradient(180deg, rgba(133,76,230,0.45) 0%, rgba(133,76,230,0.04) 100%)" }} />
        )}
      </div>

      {/* Card */}
      <div className="card" style={{ padding:"22px 26px", flex:1 }}>
        <div style={{ display:"flex", gap:"14px", alignItems:"flex-start", marginBottom:"12px" }}>
          {/* Logo */}
          <div style={{ width:"48px", height:"48px", borderRadius:"10px", overflow:"hidden",
            background:"rgba(133,76,230,0.08)", border:"1px solid rgba(133,76,230,0.18)",
            flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Image src={edu.img} alt={edu.school} width={36} height={36}
              style={{ objectFit:"cover" }} unoptimized />
          </div>

          <div style={{ flex:1 }}>
            <h3 style={{ fontSize:"16px", fontWeight:700, marginBottom:"3px", lineHeight:1.2 }}>
              {edu.school}
            </h3>
            <p style={{ fontSize:"12px", color:"var(--text3)" }}>{edu.date}</p>
          </div>

          {/* Grade badge */}
          <span style={{ padding:"5px 12px", background:"rgba(133,76,230,0.1)",
            border:"1px solid rgba(133,76,230,0.22)", borderRadius:"20px",
            fontSize:"12px", fontWeight:600, color:"#a78bfa", flexShrink:0 }}>
            {edu.grade}
          </span>
        </div>

        <p style={{ fontSize:"13px", color:"var(--accent)", fontWeight:500, marginBottom:"10px" }}>
          {edu.degree}
        </p>

        <p style={{ fontSize:"14px", color:"var(--text2)", lineHeight:1.75, margin:0 }}>
          {edu.desc}
        </p>
      </div>
    </div>
  );
}
