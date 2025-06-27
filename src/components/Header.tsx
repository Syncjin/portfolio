"use client";
import React from "react";
import { useThemeStore } from "@/store/useThemeStore";

const sections = [
  { id: "about", label: "소개" },
  { id: "skills", label: "기술 스택" },
  { id: "projects", label: "프로젝트" },
  { id: "contact", label: "연락처" },
];

interface HeaderProps {
  activeSection?: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 w-full shadow z-50 transition-colors duration-200 ${theme === "dark" ? "bg-gray-900 bg-opacity-80 text-white" : "bg-white bg-opacity-80 text-gray-900"}`}
    >
      <nav className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="font-bold text-lg">My Portfolio</div>
        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => {
                    const sectionEl = document.getElementById(section.id);
                    const headerEl = document.getElementById("header");
                    if (sectionEl && headerEl) {
                      const headerHeight = headerEl.offsetHeight;
                      const sectionTop = sectionEl.getBoundingClientRect().top + window.scrollY;
                      window.scrollTo({
                        top: sectionTop - headerHeight,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={`transition-colors font-medium bg-transparent border-0 p-0 m-0 cursor-pointer focus:outline-none ${
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
      </nav>
    </header>
  );
}
