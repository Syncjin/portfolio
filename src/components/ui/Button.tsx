import React from "react";
import { useThemeStore } from "@/store/useThemeStore";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = "primary", size = "md", className = "" }) => {
  const { theme } = useThemeStore();

  const baseClasses = "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: theme === "dark" ? "bg-[#516aec] text-white hover:bg-[#7c8ff0] focus:ring-[#516aec]" : "bg-[#516aec] text-white hover:bg-[#4058d4] focus:ring-[#516aec]",
    secondary: theme === "dark" ? "bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500" : "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </button>
  );
};
