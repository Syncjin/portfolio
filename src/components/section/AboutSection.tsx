"use client";
import React, { useState, useEffect } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import { Text } from "@/components/ui/Text";
import { useThemeStore } from "@/store/useThemeStore";

export default function AboutSection() {
  const titleText = "프론트엔드 개발자 <strong>이우진</strong>입니다.";
  const { theme } = useThemeStore();
  const [frontEndVisible, setFrontEndVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFrontEndVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="about"
      className="flex flex-col justify-center items-center mx-auto px-2 sm:px-4 md:px-6 lg:px-8 min-h-[100vh] md:min-h-[960px] md:max-h-[960px]"
      style={{
        background: theme === "dark" ? "#18181b" : "#fff",
        color: theme === "dark" ? "#fff" : "#18181b",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <ParticleBackground particleCount={50} particleSizeRange={[0.1, 0.3]} particleSpeed={0.01} areaSize={5} />
      <div className="text-center relative z-20 w-full flex flex-col items-center">
        <div
          className="mb-6 text-xl sm:text-2xl md:text-4xl font-normal break-keep leading-tight max-w-xs sm:max-w-md md:max-w-2xl relative z-10"
          style={{
            animation: "slideInUp 1s ease-out 1s both",
            opacity: 0,
            transform: "translateY(32px)",
          }}
          dangerouslySetInnerHTML={{ __html: titleText }}
        />
        <div
          className="inline-block w-full sm:w-auto p-3 sm:p-6 mt-2 sm:mt-4 relative z-10"
          style={{
            animation: "slideInUp 1s ease-out 1s both",
            opacity: 0,
            transform: "translateY(32px)",
          }}
        >
          <Text variant="body" size="2xl" color="black" align="center" className="mb-0 text-sm sm:text-base md:text-lg break-keep">
            사용자 경험을 중시하며, 아름답고 직관적인 웹, 앱 애플리케이션을 만드는 것을 좋아합니다.
            <br />
            서비스를 개발하며 기술을 도구로서 문제 해결을 하는데 집중합니다.
          </Text>
        </div>
        <Text
          variant="h1"
          color="white"
          align="center"
          ignoreTheme={true}
          className="absolute font-bold break-keep leading-tight max-w-xs sm:max-w-md md:max-w-2xl text-[48px] sm:text-[72px] md:text-[128px]"
          style={{
            color: "#EEEEEE",
            zIndex: 1,
            top: "-55%",
            whiteSpace: "nowrap",
            opacity: frontEndVisible ? (theme === "dark" ? 0.5 : 1) : 0,
            transform: frontEndVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 1s ease-out, transform 1s ease-out",
          }}
        >
          FRONT-END
        </Text>
      </div>
    </section>
  );
}
