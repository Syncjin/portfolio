import type { Metadata } from "next";
import React from "react";
import Header from "@/components/Header";
import AboutSection from "@/components/section/AboutSection";
import SkillsSection from "@/components/section/SkillsSection";
import ProjectsSection from "@/components/section/ProjectsSection";
import ContactSection from "@/components/section/ContactSection";

export const metadata: Metadata = {
  title: "Syncjin Portfolio",
  description: "Frontend 개발자 Syncjin의 포트폴리오 홈페이지입니다. React, Next.js, TypeScript 전문 개발자의 프로젝트와 기술 스택을 확인해보세요.",
  openGraph: {
    title: "Syncjin Portfolio | Frontend Developer & React Specialist",
    description: "Frontend 개발자 Syncjin의 포트폴리오 홈페이지입니다. React, Next.js, TypeScript 전문 개발자의 프로젝트와 기술 스택을 확인해보세요.",
    url: "https://syncjin.com",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Syncjin Portfolio",
      },
    ],
  },
};

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
