import React from "react";
import { useThemeStore } from "@/store/useThemeStore";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  const { theme } = useThemeStore();

  const baseClasses = `p-6 rounded-lg shadow-md transition-colors duration-200 ${theme === "dark" ? "bg-gray-800 text-white border border-gray-700" : "bg-white text-gray-900 border border-gray-200"}`;

  return <div className={`${baseClasses} ${className}`}>{children}</div>;
};
