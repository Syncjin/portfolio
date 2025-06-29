"use client";
import React, { useRef, useEffect, useState } from "react";
import { Text, InfoCard } from "@/components/ui";
import { useThemeStore } from "@/store/useThemeStore";

export default function ContactSection() {
  const aboutMeTextRef = useRef<HTMLDivElement>(null);
  const { theme } = useThemeStore();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const aboutMeText = "About Me";

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
    if (isVisible && aboutMeTextRef.current) {
      const chars = aboutMeTextRef.current.querySelectorAll(".about-me-animated-char");
      chars.forEach((char, index) => {
        setTimeout(() => {
          (char as HTMLElement).style.opacity = "1";
          (char as HTMLElement).style.transform = "translateX(0)";
        }, index * 100);
      });
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
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
            <span
              key={idx}
              className="about-me-animated-char inline-block whitespace-pre"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full max-w-6xl mx-auto">
        <InfoCard imageSrc="/contact/user.png" imageAlt="User" title="이름" content="이우진" />
        <InfoCard imageSrc="/contact/calendar.png" imageAlt="Birthday" title="생년월일" content="1993. 10. 11" />
        <InfoCard imageSrc="/contact/location.png" imageAlt="Location" title="위치" content="서울특별시 강북구" />
        <InfoCard imageSrc="/contact/call.png" imageAlt="Phone" title="전화번호" content="010-2377-0695" />
        <InfoCard imageSrc="/contact/sms.png" imageAlt="Email" title="이메일" content="dldndldms@naver.com" />
        <InfoCard imageSrc="/contact/award.png" imageAlt="" title="학력" content="경민대학교(융합소프트웨어학과)" />
      </div>
    </section>
  );
}
