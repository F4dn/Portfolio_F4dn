"use client";
import Image from "next/image";
import { skills } from "@/data/constant";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Skills() {
  const { ref: hRef, isVisible: hVis } = useScrollReveal();

  return (
    <section id="skills" className="section">
      <div className="container">

        {/* Section header */}
        <div ref={hRef} className={`reveal ${hVis ? "in" : ""}`}
          style={{ textAlign:"center", marginBottom:"56px" }}>
          <div className="label" style={{ justifyContent:"center" }}>What I work with</div>
          <h2 style={{ fontSize:"clamp(30px,5vw,50px)", fontWeight:800, letterSpacing:"-0.5px" }}>
            My <span className="gradient-text">Skills</span>
          </h2>
          <p style={{ color:"var(--text2)", maxWidth:"460px", margin:"14px auto 0", fontSize:"15px" }}>
            Technologies and tools I use to build fast, scalable, and beautiful products.
          </p>
        </div>

        {/* Category cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(310px, 1fr))", gap:"22px" }}>
          {skills.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Sub-component: one skill category card ── */
function SkillCard({ category, index }: { category: typeof skills[number]; index: number }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const nums = ["01", "02", "03"];

  return (
    <div ref={ref} className={`card reveal ${isVisible ? "in" : ""} d${index + 1}`}
      style={{ padding:"28px 30px" }}>
      <div style={{ marginBottom:"20px" }}>
        <div className="label">{nums[index] ?? `0${index+1}`}</div>
        <h3 style={{ fontSize:"20px", fontWeight:700 }}>{category.title}</h3>
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:"10px" }}>
        {category.skills.map(skill => (
          <div key={skill.name} className="skill-badge">
            <Image src={skill.image} alt={skill.name} width={20} height={20}
              style={{ objectFit:"contain" }} unoptimized />
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  );
}
