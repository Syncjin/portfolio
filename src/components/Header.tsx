import React from "react";

const sections = [
  { id: "hero", label: "소개" },
  { id: "skills", label: "기술 스택" },
  { id: "projects", label: "프로젝트" },
  { id: "contact", label: "연락처" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white bg-opacity-80 shadow z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="font-bold text-lg text-gray-900">My Portfolio</div>
        <ul className="flex space-x-6">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
