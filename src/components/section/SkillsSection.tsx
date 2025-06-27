"use client";
import React, { useRef, useEffect } from "react";
import { Text } from "@/components/ui/Text";
import { Tag } from "@/components/ui/Tag";
import { useThemeStore } from "@/store/useThemeStore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const { theme } = useThemeStore();
  const skillsTextRef = useRef<HTMLDivElement>(null);

  // 'Skills' 텍스트를 글자별로 분리
  const skillsText = "Skills";

  // 각 카테고리별 ref
  const langRef = useRef<HTMLDivElement>(null);
  const frontendRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const ciRef = useRef<HTMLDivElement>(null);

  // Skills 텍스트 애니메이션
  useEffect(() => {
    const chars = gsap.utils.toArray(".skills-animated-char");
    if (skillsTextRef.current && chars.length > 0) {
      gsap.fromTo(
        chars,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsTextRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  }, []);

  // Tag 그룹 애니메이션 (기존 코드)
  useEffect(() => {
    const animateTags = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref.current) {
        const tags = ref.current.querySelectorAll(".gsap-skill-tag");
        if (tags.length > 0) {
          gsap.fromTo(
            tags,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      }
    };
    animateTags(langRef);
    animateTags(frontendRef);
    animateTags(mobileRef);
    animateTags(ciRef);
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="skills"
      className={`min-h-screen flex flex-col justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-0`}
      style={{
        background: theme === "dark" ? "#18181b" : "#fff",
        color: theme === "dark" ? "#fff" : "#18181b",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <div ref={skillsTextRef} className="mb-25 w-full max-w-6xl mx-auto pt-12 pl-4">
        <Text variant="h2" className="text-left text-3xl sm:text-5xl md:text-6xl">
          {skillsText.split("").map((char, idx) => (
            <span key={idx} className="skills-animated-char inline-block whitespace-pre">
              {char}
            </span>
          ))}
        </Text>
      </div>
      <div className="w-full max-w-3xl space-y-10">
        {/* Programming Languages */}
        <div>
          <Text variant="h4" className="mb-4">
            Programming Languages
          </Text>
          <div ref={langRef} className="flex flex-wrap gap-3">
            {[
              { name: "JavaScript", logo: null },
              { name: "TypeScript", logo: "/skills/typescript.svg" },
              { name: "Java", logo: null },
              { name: "Objective-C", logo: null },
              { name: "Swift", logo: null },
              { name: "Kotlin", logo: null },
            ].map((lang) => (
              <Tag key={lang.name} icon={lang.logo ?? undefined} text={lang.name} className="gsap-skill-tag bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200" />
            ))}
          </div>
        </div>
        {/* Frontend Development */}
        <div>
          <Text variant="h4" className="mb-4">
            Frontend Development
          </Text>
          <div ref={frontendRef} className="flex flex-wrap gap-3">
            {[
              { name: "React", logo: theme === "dark" ? "/skills/react-logo-dark.svg" : "/skills/react-logo-light.svg" },
              { name: "Next.js", logo: "/skills/nextjs.svg" },
              { name: "React Query", logo: null },
              { name: "Zustand", logo: null },
              { name: "Styled-components", logo: null },
            ].map((framework) => (
              <Tag key={framework.name} icon={framework.logo ?? undefined} text={framework.name} className="gsap-skill-tag bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200" />
            ))}
          </div>
        </div>
        {/* Mobile / Cross-platform */}
        <div>
          <Text variant="h4" className="mb-4">
            Mobile / Cross-platform
          </Text>
          <div ref={mobileRef} className="flex flex-wrap gap-3">
            {[
              { name: "React Native", logo: theme === "dark" ? "/skills/react-logo-dark.svg" : "/skills/react-logo-light.svg" },
              { name: "Electron.js", logo: "/skills/electron.svg" },
            ].map((mobile) => (
              <Tag key={mobile.name} icon={mobile.logo ?? undefined} text={mobile.name} className="gsap-skill-tag bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200" />
            ))}
          </div>
        </div>
        {/* CI/CD Tools */}
        <div>
          <Text variant="h4" className="mb-4">
            CI/CD Tools
          </Text>
          <div ref={ciRef} className="flex flex-wrap gap-3">
            {[
              { name: "GitHub Actions", logo: "/skills/github-mark.svg" },
              { name: "Docker", logo: "/skills/docker-mark-blue.svg" },
            ].map((tool) => (
              <Tag key={tool.name} icon={tool.logo ?? undefined} text={tool.name} className="gsap-skill-tag bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
