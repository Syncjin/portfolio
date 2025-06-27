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
        </ul>
      </div>
    </header>
  );
}
