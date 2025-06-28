"use client";
import React, { useState } from "react";
import { useThemeStore } from "@/store/useThemeStore";

const sections = [
  { id: "contact", label: "About Me" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
];

interface HeaderProps {
  activeSection?: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const { theme, toggleTheme } = useThemeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuClick = (sectionId: string) => {
    const sectionEl = document.getElementById(sectionId);
    const headerEl = document.getElementById("header");
    if (sectionEl && headerEl) {
      const headerHeight = headerEl.offsetHeight;
      const sectionTop = sectionEl.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: sectionTop - headerHeight,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 w-full shadow z-50 transition-colors duration-200 ${theme === "dark" ? "bg-gray-900 bg-opacity-80 text-white" : "bg-white bg-opacity-80 text-gray-900"}`}
    >
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="font-bold text-base sm:text-lg">SyncJin</div>
        {/* PC 메뉴 */}
        <div className="hidden sm:flex items-center space-x-6">
          <ul className="flex space-x-6">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => handleMenuClick(section.id)}
                  className={`transition-colors font-medium text-sm sm:text-base bg-transparent border-0 p-0 m-0 cursor-pointer focus:outline-none ${
                    theme === "dark" ? "text-gray-300 hover:text-[#7c8ff0]" : "text-gray-700 hover:text-[#516aec]"
                  } ${activeSection === section.id ? (theme === "dark" ? "text-[#7c8ff0] underline underline-offset-4" : "text-[#516aec] underline underline-offset-4") : ""}`}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
          {/* GitHub 링크 */}
          <a
            href="https://github.com/Syncjin/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-lg transition-colors ${
              theme === "dark" ? "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
            }`}
            aria-label="GitHub 저장소"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700 text-yellow-400" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
            aria-label="테마 변경"
          >
            {theme === "dark" ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
        {/* 모바일 메뉴 아이콘 */}
        <button className="sm:hidden p-2 rounded-lg focus:outline-none" onClick={() => setMobileMenuOpen((v) => !v)} aria-label="메뉴 열기">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      {/* 모바일 메뉴 드롭다운 */}
      <div
        className={`sm:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-900 bg-opacity-95 z-50 shadow-lg
          transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? "opacity-100 translate-y-0 max-h-[400px] pointer-events-auto" : "opacity-0 -translate-y-4 max-h-0 pointer-events-none"}
        `}
        style={{ overflow: "hidden" }}
      >
        <ul className="flex flex-col items-center py-4 gap-4">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => handleMenuClick(section.id)}
                className={`transition-colors font-medium text-base bg-transparent border-0 p-0 m-0 cursor-pointer focus:outline-none ${
                  theme === "dark" ? "text-gray-300 hover:text-[#7c8ff0]" : "text-gray-700 hover:text-[#516aec]"
                } ${activeSection === section.id ? (theme === "dark" ? "text-[#7c8ff0] underline underline-offset-4" : "text-[#516aec] underline underline-offset-4") : ""}`}
              >
                {section.label}
              </button>
            </li>
          ))}
          {/* 모바일 GitHub 링크 */}
          <li>
            <a
              href="https://github.com/Syncjin/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 transition-colors font-medium text-base ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
