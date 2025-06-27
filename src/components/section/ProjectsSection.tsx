import React from "react";
import { Text } from "@/components/ui/Text";

// ProjectCard 컴포넌트 (ProjectsSection 내부에서만 사용)
interface Project {
  id: number;
  title: string;
  summary: string;
  description: string;
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6 transition-colors min-h-[140px] flex flex-col gap-2 border border-gray-200 dark:border-gray-700">
      <Text variant="h4" className="font-bold text-lg sm:text-xl md:text-2xl">
        {project.title}
      </Text>
      <Text variant="body" className="text-gray-700 dark:text-gray-300">
        {project.summary}
      </Text>
      <Text variant="body" className="text-gray-500 dark:text-gray-400 text-sm">
        {project.description}
      </Text>
    </div>
  );
}

// 샘플 프로젝트 데이터 6개
const projects = [
  {
    id: 1,
    title: "나중사",
    summary: "집을 조건에 따라 찾는 중개사 상담 서비스",
    description:
      "React, Next.js, React-Native, Electron.js로 구성된 웹, 모바일, 데스크탑 앱 서비스입니다. 나중사 유저 웹은 나중사 소개 사이트이고, 중개사 웹은 중개사들이 매물을 등록, 제안하고 채팅으로 상담할 수 있습니다. React-Native로 유저앱, 중개사앱이 개발되었으며 Electron.js로 중개사 데스크탑앱을 개발했습니다.\n이 프로젝트로 저는 문제없고 생산성을 챙기기 위해 사내에 없던 Docker, GitHub Actions로 CI/CD를 구성하여 운영하었고, 상담 기능인 채팅을 위해 socket.io로 채팅 기능, 메시지별 UI를 구현하였습니다. \n기억나는 이슈 해결 경험으로는 Push와 DeepLink, 유입 경로 확인이 중요했던 서비스라서 Appsflyer를 적극 활용하였고 웹에서는 push message를 통해 sound가 재생되지 않아 필요에 의해 Electron.js로 데스크탑앱을 개발하여 배포하면서 멀티플랫폼 운영을 경험할 수 있었고 특히 중개사 유치를 위해.\n나중사 서비스를 위해 서울대학교 캠퍼스타운 입주, 예비창업패키지를 진행하며 투자유치를 위한 활동도 진행했습니다.",
  },
  {
    id: 2,
    title: "리뷰얼마",
    summary: "사용자 건강 데이터 트래킹 및 맞춤형 피드백 제공 모바일 앱.",
    description: "React Native, Firebase 기반. 걸음수, 수면, 식단 기록 및 AI 건강 코칭 기능.",
  },
  {
    id: 3,
    title: "포트폴리오 웹사이트",
    summary: "개인/기업용 반응형 포트폴리오 템플릿 및 커스텀 빌더.",
    description: "Next.js, TailwindCSS, Vercel 배포. 다양한 테마, 섹션 커스터마이즈, SEO 최적화.",
  },
  {
    id: 4,
    title: "실시간 협업 문서 서비스",
    summary: "여러 사용자가 동시에 편집 가능한 실시간 문서 협업 플랫폼.",
    description: "React, WebSocket, Quill.js 기반. Google Docs 스타일의 동시 편집, 버전 관리, 댓글 기능.",
  },
  {
    id: 5,
    title: "이커머스 쇼핑몰",
    summary: "상품 검색, 결제, 리뷰, 관리자 기능을 갖춘 풀스택 쇼핑몰.",
    description: "Next.js, Express, MongoDB, Stripe 결제 연동. 반응형 UI, 관리자 대시보드, 주문/배송 관리.",
  },
  {
    id: 6,
    title: "사진 공유 SNS",
    summary: "사진 업로드, 피드, 좋아요, 팔로우 기능을 제공하는 SNS 플랫폼.",
    description: "React, Firebase, Cloud Storage 기반. 실시간 피드, 해시태그, 댓글, 알림 기능.",
  },
];

export default function ProjectsSection() {
  // 항상 첫 번째 프로젝트만 설명에 노출
  const activeProject = projects[0];

  return (
    <section id="projects" className="w-full px-2 sm:px-4 md:px-6 lg:px-8 bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-white py-12 md:py-20">
      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* 좌측: 제목 + 설명 (sticky) */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-start pt-2 md:pt-12 pl-2 md:pl-8 md:sticky md:top-20 md:h-fit z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Projects</h2>
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow p-4 md:p-8 min-h-[180px] w-full transition-colors">
            <Text variant="h3" className="mb-2 text-xl sm:text-2xl md:text-3xl font-semibold">
              {activeProject.title}
            </Text>
            <Text variant="body" className="mb-2 text-base sm:text-lg text-gray-700 dark:text-gray-300">
              {activeProject.summary}
            </Text>
            <Text variant="body" className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              {activeProject.description}
            </Text>
          </div>
        </div>
        {/* 우측: 카드 리스트 (1열) */}
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
