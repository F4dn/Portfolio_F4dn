"use client";
import { useRef, useEffect, useCallback } from "react";
import { experience } from "@/data/constant";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FiExternalLink, FiMapPin, FiBriefcase } from "react-icons/fi";

// Badge colour per experience type
const TYPE_COLORS: Record<string, string> = {
  Internship:   "rgba(96,165,250,0.15)",
  Freelance:    "rgba(52,211,153,0.15)",
  "Open Source":"rgba(251,191,36,0.15)",
  Research:     "rgba(248,113,113,0.15)",
};
const TYPE_TEXT: Record<string, string> = {
  Internship:   "#93c5fd",
  Freelance:    "#6ee7b7",
  "Open Source":"#fcd34d",
  Research:     "#fca5a5",
};

export default function Experience() {
  const { ref: hRef, isVisible: hVis } = useScrollReveal();
  const trackRef = useRef<HTMLDivElement>(null);

  /* ── Drag-to-scroll ── */
  const isDragging = useRef(false);
  const startX    = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current     = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    el.classList.add("dragging");
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    trackRef.current?.classList.remove("dragging");
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x    = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  /* Clean up on unmount */
  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, [onMouseUp]);

  return (
    <section id="experience" className="section" style={{ paddingTop: 0 }}>
      <div className="glow-line" />

      <div style={{ paddingTop: "80px" }}>

        {/* ── Header ── */}
        <div className="container">
          <div ref={hRef} className={`reveal ${hVis ? "in" : ""}`}
            style={{ marginBottom: "52px", textAlign: "center" }}>
            <div className="label" style={{ justifyContent: "center" }}>Where I&apos;ve worked</div>
            <h2 style={{ fontSize: "clamp(30px,5vw,50px)", fontWeight: 800, letterSpacing: "-0.5px" }}>
              My <span className="gradient-text">Experience</span>
            </h2>
            <p style={{ color: "var(--text3)", fontSize: "12px", fontStyle: "italic", marginTop: "10px" }}>
              ← drag to scroll →
            </p>
          </div>
        </div>

        {/* ── Horizontal scroll track ── */}
        {/*  Left + right padding via pseudo‑container trick  */}
        <div style={{ position: "relative" }}>
          {/* Left fade */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "40px", zIndex: 3,
            background: "linear-gradient(90deg, var(--bg), transparent)", pointerEvents: "none" }} />
          {/* Right fade */}
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "40px", zIndex: 3,
            background: "linear-gradient(270deg, var(--bg), transparent)", pointerEvents: "none" }} />

          <div
            ref={trackRef}
            className="exp-track"
            style={{ padding: "12px 80px 28px" , justifyContent: "center" }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseUp}
          >
            {experience.map((exp, i) => (
              <ExpCard key={exp.id} exp={exp} index={i} />
            ))}

            {/* End spacer card — CTA to add more */}
            <div className="exp-card" style={{
              width: "220px", alignItems: "center", justifyContent: "center",
              border: "1px dashed rgba(133,76,230,0.25)",
              background: "rgba(133,76,230,0.03)", gap: "12px",
            }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%",
                border: "1px dashed rgba(133,76,230,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "24px", color: "var(--accent)" }}>
                +
              </div>
              <p style={{ fontSize: "13px", color: "var(--text3)", textAlign: "center",
                lineHeight: 1.6, margin: 0 }}>
                More coming<br />soon…
              </p>
            </div>
          </div>
        </div>

        {/* ── Scroll progress dots ── */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "4px" }}>
          {experience.map((_, i) => (
            <button key={i}
              onClick={() => {
                const el = trackRef.current;
                if (!el) return;
                const card = el.children[i] as HTMLElement;
                el.scrollTo({ left: card.offsetLeft - 40, behavior: "smooth" });
              }}
              style={{ width: "6px", height: "6px", borderRadius: "50%", border: "none",
                background: i === 0 ? "var(--accent)" : "rgba(133,76,230,0.25)",
                cursor: "pointer", padding: 0, transition: "background .3s" }}
              aria-label={`Jump to ${experience[i].company}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Sub-component: single experience card ── */
function ExpCard({ exp, index }: { exp: typeof experience[number]; index: number }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const bgColor  = TYPE_COLORS[exp.type] ?? "rgba(133,76,230,0.12)";
  const txtColor = TYPE_TEXT[exp.type]   ?? "#a78bfa";

  return (
    <div ref={ref} className={`exp-card reveal ${isVisible ? "in" : ""}`}
      style={{ transitionDelay: `${index * 0.1}s` }}>

      {/* Big ghost number */}
      <span className="exp-number">0{index + 1}</span>

      {/* Top row: type badge + optional link */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, padding: "4px 10px",
          borderRadius: "20px", background: bgColor, color: txtColor,
          letterSpacing: "0.05em" }}>
          {exp.type}
        </span>

        {exp.companyUrl && (
          <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--text3)", transition: "color .2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text3)"; }}
            aria-label={`Visit ${exp.company}`}>
            <FiExternalLink size={15} />
          </a>
        )}
      </div>

      {/* Role */}
      <div>
        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)",
          lineHeight: 1.2, marginBottom: "4px" }}>
          {exp.role}
        </h3>
        <p style={{ fontSize: "14px", color: "var(--accent)", fontWeight: 500, margin: 0 }}>
          {exp.company}
        </p>
      </div>

      {/* Meta: date + location */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px",
          fontSize: "12px", color: "var(--text3)" }}>
          <FiBriefcase size={11} />
          {exp.date}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px",
          fontSize: "12px", color: "var(--text3)" }}>
          <FiMapPin size={11} />
          {exp.location}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "var(--border)" }} />

      {/* Description */}
      <p style={{ fontSize: "13px", color: "var(--text2)", lineHeight: 1.75,
        flex: 1, margin: 0 }}>
        {exp.desc}
      </p>

      {/* Skill chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {exp.skills.map(s => (
          <span key={s} className="tag">{s}</span>
        ))}
      </div>
    </div>
  );
}
