"use client";
import React, { useRef, useEffect, useState } from "react";
import { Text } from "@/components/ui/Text";
import { Tag } from "@/components/ui/Tag";
import { useThemeStore } from "@/store/useThemeStore";

export default function SkillsSection() {
  const { theme } = useThemeStore();
  const skillsTextRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const skillsText = "Skills";

  const langRef = useRef<HTMLDivElement>(null);
  const frontendRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const ciRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && skillsTextRef.current) {
      const chars = skillsTextRef.current.querySelectorAll(".skills-animated-char");
      chars.forEach((char, index) => {
        setTimeout(() => {
          (char as HTMLElement).style.opacity = "1";
          (char as HTMLElement).style.transform = "translateX(0)";
        }, index * 100);
      });
    }
  }, [isVisible]);

  // Tag 그룹 애니메이션
  useEffect(() => {
    if (!isVisible) return;

    const animateTags = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref.current) {
        const tags = ref.current.querySelectorAll(".skill-tag");
        tags.forEach((tag, index) => {
          setTimeout(() => {
            (tag as HTMLElement).style.opacity = "1";
            (tag as HTMLElement).style.transform = "translateY(0)";
          }, index * 80);
        });
      }
    };

    // 각 카테고리별로 순차적으로 애니메이션 실행
    setTimeout(() => animateTags(langRef), 500);
    setTimeout(() => animateTags(frontendRef), 800);
    setTimeout(() => animateTags(mobileRef), 1100);
    setTimeout(() => animateTags(ciRef), 1400);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
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
            <span
              key={idx}
              className="skills-animated-char inline-block whitespace-pre"
              style={{
                opacity: 0,
                transform: "translateX(30px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
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
              <div
                key={lang.name}
                className="skill-tag"
                style={{
                  opacity: 0,
                  transform: "translateY(30px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                }}
              >
                <Tag icon={lang.logo ?? undefined} text={lang.name} className="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200" />
              </div>
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
              <div
                key={framework.name}
                className="skill-tag"
                style={{
                  opacity: 0,
                  transform: "translateY(30px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                }}
              >
                <Tag icon={framework.logo ?? undefined} text={framework.name} className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200" />
              </div>
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
              <div
                key={mobile.name}
                className="skill-tag"
                style={{
                  opacity: 0,
                  transform: "translateY(30px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                }}
              >
                <Tag icon={mobile.logo ?? undefined} text={mobile.name} className="bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200" />
              </div>
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
              <div
                key={tool.name}
                className="skill-tag"
                style={{
                  opacity: 0,
                  transform: "translateY(30px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                }}
              >
                <Tag icon={tool.logo ?? undefined} text={tool.name} className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
