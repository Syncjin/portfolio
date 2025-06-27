"use client";

import React from "react";
import Header from "@/components/Header";
import AboutSection from "@/components/section/AboutSection";
import SkillsSection from "@/components/section/SkillsSection";
import ProjectsSection from "@/components/section/ProjectsSection";
import ContactSection from "@/components/section/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <AboutSection />
      <ContactSection />
      <SkillsSection />
      <ProjectsSection />
    </>
  );
}
