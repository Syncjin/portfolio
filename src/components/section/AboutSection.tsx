import React from "react";
import ParticleBackground from "@/components/ParticleBackground";
import { Text } from "@/components/ui/Text";
import { useThemeStore } from "@/store/useThemeStore";

export default function AboutSection() {
  const typingText = "안녕하세요, 프론트엔드 개발자 이우진입니다";
  const { theme } = useThemeStore();

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center mx-auto px-2 sm:px-4 md:px-6 lg:px-8"
      style={{
        background: theme === "dark" ? "#18181b" : "#fff",
        color: theme === "dark" ? "#fff" : "#18181b",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <ParticleBackground particleCount={50} particleSizeRange={[0.1, 0.3]} particleSpeed={0.01} areaSize={5} />
      <div className="text-center relative z-20 w-full flex flex-col items-center">
        <Text variant="h1" align="center" className="mb-6 text-2xl sm:text-3xl md:text-4xl font-bold break-keep leading-tight max-w-xs sm:max-w-md md:max-w-2xl" animation="typing">
          {typingText}
        </Text>
        <div
          className="inline-block w-full sm:w-auto p-3 sm:p-6 rounded-2xl backdrop-blur-sm border border-gray-300/50 bg-white/30 dark:bg-black/10 dark:border-white/10 shadow-xl mt-2 sm:mt-4"
          style={{
            animation: "slideInUp 1s ease-out 2s both",
            opacity: 0,
            transform: "translateY(32px)",
          }}
        >
          <Text variant="body" size="base" color="secondary" align="center" className="mb-0 text-sm sm:text-base md:text-lg break-keep">
            사용자 경험을 중시하며, 아름답고 직관적인 웹, 앱 애플리케이션을 만드는 것을 좋아합니다.
            <br />
            서비스를 개발하며 기술을 도구로서 문제 해결을 하는데 집중합니다.
          </Text>
        </div>
      </div>
    </section>
  );
}
