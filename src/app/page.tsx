"use client";
import { useState } from "react";
import Hero      from "@/components/Hero";
import Skills    from "@/components/Skills";   
import Experience from "@/components/Experience";
import Projects  from "@/components/Projects";
import Education from "@/components/Education";
import Footer    from "@/components/Footer";
import ProjectModal from "@/components/ProjectModal";
import { projects } from "@/data/constant";

// Derive the project type from the data so it's always in sync
export type ProjectType = (typeof projects)[number];

export default function Home() {
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);

  return (
    <>
      <Hero />
      <Skills />
      <Experience />
      <Projects onOpen={setActiveProject} />
      <Education />
      <Footer />

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
  );
}
