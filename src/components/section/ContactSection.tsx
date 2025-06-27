"use client";
import React, { useRef, useEffect } from "react";
import { Text, InfoCard } from "@/components/ui";
import { useThemeStore } from "@/store/useThemeStore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const aboutMeTextRef = useRef<HTMLDivElement>(null);
  const { theme } = useThemeStore();

  // 'About Me' 텍스트를 글자별로 분리
  const aboutMeText = "About Me";

  // About Me 텍스트 애니메이션
  useEffect(() => {
    const chars = gsap.utils.toArray(".about-me-animated-char");
    if (aboutMeTextRef.current && chars.length > 0) {
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
            trigger: aboutMeTextRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="contact"
      className={`flex flex-col justify-center items-center mx-auto px-4 sm:px-6 lg:px-8`}
      style={{
        background: theme === "dark" ? "#18181b" : "#f9f9fb",
        color: theme === "dark" ? "#fff" : "#18181b",
        transition: "background 0.3s, color 0.3s",
        maxHeight: "624px",
        height: "624px",
      }}
    >
      <div ref={aboutMeTextRef} className="mb-25 w-full max-w-6xl mx-auto pt-12 pl-4">
        <Text variant="h2" className="text-left text-3xl sm:text-5xl md:text-6xl">
          {aboutMeText.split("").map((char, idx) => (
            <span key={idx} className="about-me-animated-char inline-block whitespace-pre">
              {char}
            </span>
          ))}
        </Text>
      </div>

      {/* 3열 2행 정보 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full max-w-6xl mx-auto">
        {/* 첫 번째 행 */}
        <InfoCard imageSrc="/contact/user.png" imageAlt="User" title="이름" content="이우진" />
        <InfoCard imageSrc="/contact/calendar.png" imageAlt="Birthday" title="생년월일" content="1993. 10. 11" />
        <InfoCard imageSrc="/contact/location.png" imageAlt="Location" title="위치" content="서울특별시 강북구" />

        {/* 두 번째 행 */}
        <InfoCard imageSrc="/contact/call.png" imageAlt="Phone" title="전화번호" content="010-2377-0695" />
        <InfoCard imageSrc="/contact/sms.png" imageAlt="Email" title="이메일" content="dldndldms@naver.com" />
        <InfoCard imageSrc="/contact/award.png" imageAlt="" title="학력" content="경민대학교(융합소프트웨어학과)" />
      </div>
    </section>
  );
}
