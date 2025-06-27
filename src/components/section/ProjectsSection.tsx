import React, { useRef, useEffect, useState } from "react";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { useThemeStore } from "@/store/useThemeStore";
import { usePopupStore } from "@/store/usePopupStore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ProjectCard 컴포넌트 (ProjectsSection 내부에서만 사용)
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
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(({ project }, ref) => {
  return (
    <div
      ref={ref}
      className="rounded-lg overflow-hiddenflex items-center justify-center w-[80vw] max-w-full mx-auto md:w-[420px]"
      style={{
        height: project.height || 240,
      }}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-auto object-contain"
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
});

ProjectCard.displayName = "ProjectCard";

const projects: Project[] = [
  {
    id: 1,
    title: "나중사",
    date: "2023.01 ~ 2025.05",
    summary: "집을 조건에 따라 찾는 중개사 상담 서비스",
    description:
      "<b>프로젝트 요약</b>\nReact, Next.js, React-Native, Electron.js로 구성된 웹, 모바일, 데스크탑 앱 서비스입니다. 나중사 유저 웹은 나중사 소개 사이트이고, 중개사 웹은 중개사들이 매물을 등록, 제안하고 채팅으로 상담할 수 있습니다. React-Native로 유저앱, 중개사앱이 개발되었으며 Electron.js로 중개사 데스크탑앱을 개발했습니다.\n<b>주요 성과</b>\n문제없고 생산성을 챙기기 위해 사내에 없던 Docker, GitHub Actions로 CI/CD를 구성하여 운영하었고, 상담 기능인 채팅을 위해 socket.io로 채팅 기능, 메시지별 UI를 구현하였습니다. \n기억나는 이슈 해결 경험으로는 Push와 DeepLink, 유입 경로 확인이 중요했던 서비스라서 Appsflyer를 적극 활용하였고 웹에서는 push message를 통해 sound가 재생되지 않아 필요에 의해 Electron.js로 데스크탑앱을 개발하여 배포하면서 멀티플랫폼 운영을 경험할 수 있었습니다.\n<b>외부 활동</b>\n중개사 유치를 위해 나중사 서비스를 위해 서울대학교 캠퍼스타운 입주, 예비창업패키지를 진행하며 투자유치를 위한 활동도 진행했습니다.",
    link: [
      {
        title: "유저웹",
        url: "https://najoongsa.com",
      },
      {
        title: "유저앱(Android)",
        url: "https://play.google.com/store/apps/details?id=com.najoongsa.user.app&hl=ko",
      },
      {
        title: "유저앱(iOS)",
        url: "https://apps.apple.com/kr/app/%EB%82%98%EC%A4%91%EC%82%AC/id6470787996",
      },
      {
        title: "중개사앱(Android)",
        url: "https://play.google.com/store/apps/details?id=com.najoongsa.realtor.app&hl=ko",
      },
      {
        title: "중개사앱(iOS)",
        url: "https://apps.apple.com/kr/app/%EB%82%98%EC%A4%91%EC%82%AC-%EC%A4%91%EA%B0%9C%EC%82%AC-%EC%A0%84%EC%9A%A9/id6476068129",
      },
      {
        title: "중개사 웹",
        url: "https://realtor.najoongsa.com",
      },
    ],
    tags: ["React", "Next.js", "React-native", "Electron.js", "Appsflyer", "Socket.io", "Docker", "Github actions", "Styled-components"],
    image: "/projects/thumbnail_01.png",
    width: 420,
    height: 600,
  },
  {
    id: 2,
    title: "부산 EXPO the WAVE",
    date: "2023.01 ~ 2023.06",
    summary: "2030 부산세계박람회: 대한상공회의소",
    description:
      "<b>프로젝트 요약</b>\n부산 엑스포 유치를 위한 웹사이트로 환경이란 주제를 가진 커뮤니티 사이트입니다.\n<b>주요 성과</b>\nReact를 사용하지 않고 컴포넌트를 thymeleaf로 구현하였고 외국인에게 배포하기 위해 다국어 기능이 포함 되었습니다.",
    link: [{ title: "웹사이트", url: "https://challenges.thewave.net/?lang=KO" }],
    tags: ["Thymeleaf", "Java", "Spring"],
    image: "/projects/thumbnail_02.png",
    width: 420,
    height: 400,
  },
  {
    id: 3,
    title: "MBC Kokiri",
    date: "2021.09 ~ 2022.07",
    summary: "드라마 컨텐츠를 이용한 한국어 공부 앱, 관리자 사이트",
    description:
      "<b>프로젝트 요약</b>\n드라마 컨텐츠를 재생하는 플레이어와 한국어 공부를 할 수 있는 자막과 퀴즈를 제공하는 앱입니다.\n<b>주요성과</b>\nReact-Native, redux를 사용하여 개발되었고 한국과 베트남으로 배포하기 위해 다국어 기능을 적용했습니다. jw player를 사용하여 개발되었으나 개발당시 영상을 자막에 맞게 정지하거나 이동해야 기능이 있었고 jw player는 1초단위로만 이동이 가능해서 영상과 자막의 싱크가 안맞는 문제가 있었습니다. jw player sdk를 확인해 요구사항에 맞게 React-Native의 NativeModule로 커스텀하여 사용했던 경험이 있습니다.",
    link: [
      { title: "웹사이트", url: "https://kokiri.co/" },
      { title: "AOS앱", url: "https://play.google.com/store/apps/details?id=com.koy.kokiri" },
      { title: "IOS앱", url: "https://apps.apple.com/us/app/kokiri-learn-korean/id1585934625" },
    ],
    tags: ["React-native", "Next.js", "Redux", "JW Player"],
    image: "/projects/thumbnail_03.png",
    width: 420,
    height: 600,
  },
  {
    id: 4,
    title: "리뷰얼마",
    date: "2020.06 ~ 2020.12",
    summary: "영수증 인증을 통한 리뷰 작성에 대한 리워드 앱, 관리자 사이트",
    description:
      "<b>프로젝트 요약</b>\n입점한 매장에서 사장님이 리워드를 등록하고 해당 가게를 이용 후 리뷰를 작성한 유저가 리워드를 얻어가는 서비스입니다.\n<b>주요 성과</b>\n기존에는 리뷰만 작성하면 되었었는데 경쟁사중 네이버의 영수증인증이 나왔고 2주만에 기획, 디벨롭해서 OCR로 영수증을 분석하는 알고리즘을 개발 및 배포하였습니다. 네이버 기사에 나왔어서 순식간의 4000명의 사장님들을 만날 수 있었습니다.",
    tags: ["React-native", "Next.js", "ocr"],
    image: "/projects/thumbnail_04.png",
    width: 420,
    height: 600,
    isClosed: true,
  },
];

export default function ProjectsSection() {
  const { theme } = useThemeStore();
  const { setOpen } = usePopupStore();
  const projectsTextRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  const projectsText = "Projects";

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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = projectRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setActiveProject(index);
            }
          }
        });
      },
      {
        threshold: 0.5, // 카드가 50% 이상 보일 때
        rootMargin: "-20% 0px -20% 0px", // 화면 중앙 부근에서 트리거
      }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleShowDetail = async (idx?: number) => {
    const project = typeof idx === "number" ? projects[idx] : projects[activeProject];
    // description에서 <b>~</b> 부분을 찾아 분리
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
    await setOpen({
      type: "alert",
      title: project.title,
      msg: <div>{parsedDesc}</div>,
    });
  };

  return (
    <section
      id="projects"
      className="w-full px-2 sm:px-4 md:px-6 lg:px-8 py-12 md:py-20"
      style={{
        background: "#202127",
        color: theme === "dark" ? "#fff" : "#18181b",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <div ref={projectsTextRef} className="mb-25 w-full max-w-6xl mx-auto pt-12 pl-4 md:sticky md:top-20 z-10">
        <Text variant="h2" className="text-left text-3xl sm:text-5xl md:text-6xl" color="white" ignoreTheme>
          {projectsText.split("").map((char, idx) => (
            <span key={idx} className="projects-animated-char inline-block whitespace-pre">
              {char}
            </span>
          ))}
        </Text>
      </div>

      {/* PC: 기존 구조, 모바일: 설명+이미지 세트로 나열 */}
      <div className="w-full max-w-6xl mx-auto">
        {/* PC: flex-row, 모바일: flex-col */}
        <div className="hidden md:flex flex-col md:flex-row gap-8">
          {/* 좌측: 제목 + 설명 (sticky) */}
          <div className="w-full md:w-1/2 flex flex-col items-start justify-start md:sticky md:top-70 md:h-fit z-10">
            <div className="dark:bg-gray-800/80 min-h-[180px] w-full transition-colors pl-4">
              <Text className="text-2xl font-medium" style={{ color: "#FFAD3A" }}>
                Main Project
              </Text>
              <Text variant="h3" className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold" ignoreTheme style={{ color: "#fff" }}>
                {projects[activeProject].title}
              </Text>
              <Text className="mt-4 text-base sm:text-lg" ignoreTheme style={{ color: "#fff", opacity: 0.6 }}>
                {projects[activeProject].date}
              </Text>
              {projects[activeProject].isClosed && (
                <Text className="mt-4 text-base sm:text-lg" ignoreTheme style={{ color: "#FE4747" }}>
                  *종료된 서비스입니다.
                </Text>
              )}
              <Text variant="body" className="mt-9 text-base sm:text-lg text-gray-700 dark:text-gray-300" ignoreTheme style={{ color: "#fff" }}>
                {projects[activeProject].summary}
              </Text>
              <div className="flex flex-col gap-2 mt-8">
                {projects[activeProject].link?.map((link) => (
                  <div key={link.title} className="flex flex-row gap-3 items-center group">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base text-white group-hover:scale-110 transition-transform duration-200">
                      {`- ${link.title}`}
                    </a>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="group-hover:scale-110 transition-transform duration-200">
                      <img src="/projects/export.png" alt={link.title} className="w-full h-full object-cover" style={{ width: 16, height: 16 }} />
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
          {/* 우측: 카드 리스트 (1열) */}
          <div className="flex flex-col gap-8" style={{ width: "420px" }}>
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                ref={(el) => {
                  projectRefs.current[index] = el;
                }}
              />
            ))}
          </div>
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
                        <img src="/projects/export.png" alt={link.title} className="w-full h-full object-cover" style={{ width: 16, height: 16 }} />
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
