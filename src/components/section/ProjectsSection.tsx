"use client";
import React, { useRef, useEffect, useState, forwardRef, useCallback } from "react";
import { Text, Button, MarkdownViewer } from "@/components/ui";
import { useThemeStore } from "@/store/useThemeStore";
import { usePopupStore } from "@/store/usePopupStore";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP ScrollTrigger 등록
gsap.registerPlugin(ScrollTrigger);

interface ProjectLink {
  title: string;
  url: string;
}
interface Project {
  id: number;
  title: string;
  date: string;
  summary: string;
  description: string;
  link?: ProjectLink[];
  tags: string[];
  image?: string;
  width?: number;
  height?: number;
  isClosed?: boolean;
  md?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = React.memo(
  forwardRef<HTMLDivElement, ProjectCardProps>(({ project }, ref) => {
    return (
      <div ref={ref} className="rounded-lg overflow-hidden cursor-pointer w-9/10 md:w-[420px] mx-auto md:mx-0" style={{ height: project.height || 240 }}>
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={project.width || 420}
            height={project.height || 240}
            className="w-full h-auto object-contain"
            priority={true}
            loading="eager"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div className={`text-gray-500 dark:text-gray-400 text-sm ${project.image ? "hidden" : ""}`}>{project.title}</div>
      </div>
    );
  })
);

ProjectCard.displayName = "ProjectCard";

// 오른쪽 카드 섹션을 별도 컴포넌트로 분리
const ProjectCardsSection = React.memo(({ projects, onRefSet }: { projects: Project[]; onRefSet: (index: number, ref: HTMLDivElement | null) => void }) => {
  return (
    <div className="flex flex-col gap-8" style={{ width: "420px" }}>
      {projects.map((project, index) => (
        <div key={project.id} className="transition-none">
          <ProjectCard
            project={project}
            ref={(el) => {
              onRefSet(index, el);
            }}
          />
        </div>
      ))}
    </div>
  );
});

ProjectCardsSection.displayName = "ProjectCardsSection";

import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const { theme } = useThemeStore();
  const { setOpen } = usePopupStore();
  const projectsTextRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projectsText = "Projects";

  // ref 설정 함수를 메모이제이션
  const handleRefSet = useCallback((index: number, ref: HTMLDivElement | null) => {
    projectRefs.current[index] = ref;
  }, []);

  useEffect(() => {
    if (projectsTextRef.current) {
      const chars = projectsTextRef.current.querySelectorAll(".projects-animated-char");
      gsap.fromTo(
        chars,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
        }
      );
    }
  }, []);

  useEffect(() => {
    if (projectRefs.current.length === 0) return;
    ScrollTrigger.getAll().forEach((t) => t.kill());

    projectRefs.current.forEach((ref, index) => {
      if (!ref) return;

      ScrollTrigger.create({
        trigger: ref,
        start: "top center+=100",
        end: "bottom center-=100",
        onEnter: () => {
          // 이전 상태와 다를 때만 업데이트
          setActiveProject((prev) => (prev !== index ? index : prev));
        },
        onEnterBack: () => {
          // 이전 상태와 다를 때만 업데이트
          setActiveProject((prev) => (prev !== index ? index : prev));
        },
        // 깜빡임 방지를 위한 설정
        once: false,
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const handleShowDetail = async (idx?: number) => {
    const project = typeof idx === "number" ? projects[idx] : projects[activeProject];
    if (project.md) {
      await setOpen({ type: "alert", title: project.title, msg: <MarkdownViewer filename={project.md} /> });
    } else {
      const desc = project.description;
      const parts = desc.split(/(<b>.*?<\/b>)/g);
      let lastWasTitle = false;
      const parsedDesc = parts.map((part, idx) => {
        if (part.startsWith("<b>") && part.endsWith("</b>")) {
          const text = part.replace(/<\/?b>/g, "");
          lastWasTitle = true;
          return (
            <h4 key={idx} className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">
              {text}
            </h4>
          );
        } else if (part.trim() !== "") {
          const className = lastWasTitle
            ? "whitespace-pre-line text-xs sm:text-base text-gray-700 dark:text-gray-200 mb-2 mt-0"
            : "whitespace-pre-line text-xs sm:text-base text-gray-700 dark:text-gray-200 mb-2 mt-2";
          lastWasTitle = false;
          return (
            <p key={idx} className={className}>
              {part}
            </p>
          );
        } else {
          return null;
        }
      });
      await setOpen({ type: "alert", title: project.title, msg: <div>{parsedDesc}</div> });
    }
  };

  return (
    <section
      id="projects"
      className="w-full px-2 sm:px-4 md:px-6 lg:px-8 py-12 md:py-50"
      style={{ background: "#202127", color: theme === "dark" ? "#fff" : "#18181b", transition: "background 0.3s, color 0.3s" }}
    >
      <div ref={projectsTextRef} className="mb-25 w-full max-w-6xl mx-auto pt-12 pl-4  z-10">
        <Text variant="h2" className="text-left text-3xl sm:text-5xl md:text-6xl" color="white" ignoreTheme>
          {projectsText.split("").map((char, idx) => (
            <span key={idx} className="projects-animated-char inline-block whitespace-pre">
              {char}
            </span>
          ))}
        </Text>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <div className="hidden md:flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 flex flex-col items-start justify-start md:sticky md:top-30 md:h-fit z-10">
            <div className="dark:bg-gray-800/80 min-h-[180px] w-full transition-all duration-300 ease-in-out pl-4">
              <Text className="text-2xl font-medium" style={{ color: "#FFAD3A" }}>
                Main Project
              </Text>
              <Text variant="h3" className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold transition-all duration-300 ease-in-out" ignoreTheme style={{ color: "#fff" }}>
                {projects[activeProject].title}
              </Text>
              <Text className="mt-4 text-base sm:text-lg transition-all duration-300 ease-in-out" ignoreTheme style={{ color: "#fff", opacity: 0.6 }}>
                {projects[activeProject].date}
              </Text>
              {projects[activeProject].isClosed && (
                <Text className="mt-4 text-base sm:text-lg transition-all duration-300 ease-in-out" ignoreTheme style={{ color: "#FE4747" }}>
                  *종료된 서비스입니다.
                </Text>
              )}
              <Text variant="body" className="mt-9 text-base sm:text-lg text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out" ignoreTheme style={{ color: "#fff" }}>
                {projects[activeProject].summary}
              </Text>
              <div className="flex flex-col gap-2 mt-8">
                {projects[activeProject].link?.map((link) => (
                  <div key={link.title} className="flex flex-row gap-3 items-center group">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-white group-hover:scale-110 transition-transform duration-200"
                    >{`- ${link.title}`}</a>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="group-hover:scale-110 transition-transform duration-200">
                      <Image src="/projects/export.png" alt={link.title} width={16} height={16} className="w-full h-full object-cover" />
                    </a>
                  </div>
                ))}
              </div>
              <div className="flex flex-row gap-3 flex-wrap mt-9">
                {projects[activeProject].tags.map((tag) => (
                  <div key={tag} className="rounded-2xl px-3 py-1 text-base" style={{ backgroundColor: "#3D4DB363", color: "#fff" }}>
                    {tag}
                  </div>
                ))}
              </div>
              <Button
                className="mt-8 bg-transparent border border-white/50 text-white rounded-none text-base hover:border-[#FFAD3A] hover:text-[#FFAD3A] hover:bg-transparent"
                onClick={() => handleShowDetail(activeProject)}
              >
                자세히 보기
              </Button>
            </div>
          </div>

          <ProjectCardsSection projects={projects} onRefSet={handleRefSet} />
        </div>

        {/* 모바일: 각 프로젝트마다 설명+이미지 세트로 세로 나열 */}
        <div className="flex flex-col gap-12 md:hidden">
          {projects.map((project, idx) => (
            <div key={project.id} className="flex flex-col gap-4">
              {/* 설명 */}
              <div className="dark:bg-gray-800/80 min-h-[180px] w-full transition-colors pl-2">
                <Text className="text-2xl font-medium" style={{ color: "#FFAD3A" }}>
                  Main Project
                </Text>
                <Text variant="h3" className="mt-4 text-xl font-semibold" ignoreTheme style={{ color: "#fff" }}>
                  {project.title}
                </Text>
                <Text className="mt-4 text-base" ignoreTheme style={{ color: "#fff", opacity: 0.6 }}>
                  {project.date}
                </Text>
                {project.isClosed && (
                  <Text className="mt-4 text-base" ignoreTheme style={{ color: "#FE4747" }}>
                    *종료된 서비스입니다.
                  </Text>
                )}
                <Text variant="body" className="mt-9 text-base text-gray-700 dark:text-gray-300" ignoreTheme style={{ color: "#fff" }}>
                  {project.summary}
                </Text>
                <div className="flex flex-col gap-2 mt-8">
                  {project.link?.map((link) => (
                    <div key={link.title} className="flex flex-row gap-3 items-center group">
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-white group-hover:scale-110 transition-transform duration-200">
                        {`- ${link.title}`}
                      </a>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="group-hover:scale-110 transition-transform duration-200">
                        <Image src="/projects/export.png" alt={link.title} width={16} height={16} className="w-full h-full object-cover" />
                      </a>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row gap-3 flex-wrap mt-9">
                  {project.tags.map((tag) => (
                    <div key={tag} className="rounded-2xl px-3 py-1 text-base" style={{ backgroundColor: "#3D4DB363", color: "#fff" }}>
                      {tag}
                    </div>
                  ))}
                </div>
                <Button
                  className="mt-8 bg-transparent border border-white/50 text-white rounded-none text-base hover:border-[#FFAD3A] hover:text-[#FFAD3A] hover:bg-transparent"
                  onClick={() => handleShowDetail(idx)}
                >
                  자세히 보기
                </Button>
              </div>
              {/* 이미지 */}
              <div className="w-full">
                <ProjectCard project={project} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
