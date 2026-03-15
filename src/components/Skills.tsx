// "use client";
// import Image from "next/image";
// import { skills } from "@/data/constant";
// import { useScrollReveal } from "@/hooks/useScrollReveal";

// export default function Skills() {
//   const { ref: hRef, isVisible: hVis } = useScrollReveal();

//   return (
//     <section id="skills" className="section">
//       <div className="container">

//         {/* Section header */}
//         <div ref={hRef} className={`reveal ${hVis ? "in" : ""}`}
//           style={{ textAlign:"center", marginBottom:"56px" }}>
//           <div className="label" style={{ justifyContent:"center" }}>What I work with</div>
//           <h2 style={{ fontSize:"clamp(30px,5vw,50px)", fontWeight:800, letterSpacing:"-0.5px" }}>
//             My <span className="gradient-text">Skills</span>
//           </h2>
//           <p style={{ color:"var(--text2)", maxWidth:"460px", margin:"14px auto 0", fontSize:"15px" }}>
//             Technologies and tools I use to build fast, scalable, and beautiful products.
//           </p>
//         </div>

//         {/* Category cards */}
//         <div className="skills-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:"22px" }}>
//           {skills.map((cat, i) => (
//             <SkillCard key={cat.title} category={cat} index={i} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ── Sub-component: one skill category card ── */
// function SkillCard({ category, index }: { category: typeof skills[number]; index: number }) {
//   const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
//   const nums = ["01", "02", "03"];

//   return (
//     <div ref={ref} className={`card reveal ${isVisible ? "in" : ""} d${index + 1}`}
//       style={{ padding:"28px 30px" }}>
//       <div style={{ marginBottom:"20px" }}>
//         <div className="label">{nums[index] ?? `0${index+1}`}</div>
//         <h3 style={{ fontSize:"20px", fontWeight:700 }}>{category.title}</h3>
//       </div>
//       <div style={{ display:"flex", flexWrap:"wrap", gap:"10px" }}>
//         {category.skills.map(skill => (
//           <div key={skill.name} className="skill-badge">
//             <img
//             src={skill.image}
//             alt={skill.name}
//             style={{ width: "26px", height: "26px", objectFit: "contain", flexShrink: 0 }}
//           />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { skills } from "@/data/constant";

// Flatten all skills into one array for the marquee
const allSkills = skills.flatMap(cat => cat.skills);

export default function Skills() {
  const { ref: hRef, isVisible: hVis } = useScrollReveal();

  // Duplicate for seamless infinite loop
  const row1 = [...allSkills, ...allSkills];
  const row2 = [...allSkills].reverse();
  const row2Doubled = [...row2, ...row2];

  return (
    <section id="skills" className="section">
      <div className="container">
        {/* Header */}
        <div
          ref={hRef}
          className={`reveal ${hVis ? "in" : ""}`}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <div className="label" style={{ justifyContent: "center" }}>
            What I work with
          </div>
          <h2 style={{ fontSize: "clamp(30px,5vw,50px)", fontWeight: 800, letterSpacing: "-0.5px" }}>
            My <span className="gradient-text">Skills</span>
          </h2>
          <p style={{ color: "var(--text2)", maxWidth: "460px", margin: "14px auto 0", fontSize: "15px" }}>
            Technologies and tools I use to build fast, scalable, and intelligent products.
          </p>
        </div>
      </div>

      {/* ── Marquee rows ── */}
      <div style={{ overflow: "hidden", display: "flex", flexDirection: "column", gap: "16px", padding: "6px 0" }}>

        {/* Row 1 — scrolls left */}
        <div className="marquee-track marquee-left">
          <div className="marquee-inner">
            {allSkills.map((skill, i) => <SkillPill key={`r1a-${i}`} skill={skill} />)}
            {allSkills.map((skill, i) => <SkillPill key={`r1b-${i}`} skill={skill} />)}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="marquee-track marquee-right">
          <div className="marquee-inner">
            {[...allSkills].reverse().map((skill, i) => <SkillPill key={`r2a-${i}`} skill={skill} />)}
            {[...allSkills].reverse().map((skill, i) => <SkillPill key={`r2b-${i}`} skill={skill} />)}
          </div>
        </div>

      </div>

      {/* Category breakdown below */}
      <div className="container" style={{ marginTop: "64px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {skills.map((cat, i) => (
            <CategoryBlock key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Single icon pill in the marquee ── */
function SkillPill({ skill }: { skill: { name: string; image: string } }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 20px",
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "50px",
        flexShrink: 0,
        transition: "border-color .25s, transform .25s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border-h)";
        el.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.transform = "translateY(0)";
      }}
    >
      <img
        src={skill.image}
        alt={skill.name}
        style={{ width: "22px", height: "22px", objectFit: "contain" }}
      />
      <span style={{ fontSize: "13px", color: "var(--text2)", fontWeight: 500 }}>
        {skill.name}
      </span>
    </div>
  );
}

/* ── Category summary block below the marquee ── */
function CategoryBlock({
  category,
  index,
}: {
  category: (typeof skills)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const nums = ["01", "02", "03", "04"];

  return (
    <div
      ref={ref}
      className={`card reveal ${isVisible ? "in" : ""} d${index + 1}`}
      style={{ padding: "20px 22px" }}
    >
      <div className="label" style={{ marginBottom: "8px", fontSize: "10px" }}>
        {nums[index]}
      </div>
      <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "14px" }}>
        {category.title}
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {category.skills.map(s => (
          <span key={s.name} className="tag">{s.name}</span>
        ))}
      </div>
    </div>
  );
}