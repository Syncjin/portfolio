import React, { useState, useEffect } from "react";
import { cn } from "@/utils/index";
import { useThemeStore } from "@/store/useThemeStore";
import gsap from "gsap";

interface TextProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "body-sm" | "caption" | "overline";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;
  color?: "primary" | "secondary" | "muted" | "white" | "black";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
  align?: "left" | "center" | "right" | "justify";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  animation?: "none" | "fadeIn" | "slideInUp" | "slideInDown" | "slideInLeft" | "slideInRight" | "typing" | "bounce" | "pulse";
  delay?: number;
  duration?: number;
  trigger?: "onMount" | "onScroll" | "onHover";
}

const Text: React.FC<TextProps> = ({
  children,
  variant = "body",
  as,
  className,
  color = "primary",
  weight,
  align = "left",
  size,
  animation = "none",
  delay = 0,
  duration = 1000,
  trigger = "onMount",
}) => {
  const { theme } = useThemeStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);

  const variantStyles = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-semibold",
    h3: "text-2xl font-semibold",
    h4: "text-xl font-medium",
    h5: "text-lg font-medium",
    h6: "text-base font-medium",
    body: "text-base",
    "body-sm": "text-sm",
    caption: "text-xs",
    overline: "text-xs font-medium uppercase tracking-wider",
  };

  const getColorStyle = (color: string) => {
    const isDark = theme === "dark";

    switch (color) {
      case "primary":
        return isDark ? "text-white" : "text-gray-900";
      case "secondary":
        return isDark ? "text-gray-300" : "text-gray-700";
      case "muted":
        return isDark ? "text-gray-400" : "text-gray-500";
      case "white":
        return "text-white";
      case "black":
        return isDark ? "text-white" : "text-black";
      default:
        return isDark ? "text-white" : "text-gray-900";
    }
  };

  const weightStyles = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  };

  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  const sizeStyles = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
  };

  const getAnimationInlineStyle = () => {
    const shouldAnimate = (trigger === "onMount" && isVisible) || (trigger === "onHover" && isHovered);

    if (!shouldAnimate || animation === "none") {
      return {};
    }

    const baseStyle = {
      transition: `all ${duration}ms ease-out`,
    };

    switch (animation) {
      case "fadeIn":
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
        };
      case "slideInUp":
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(32px)",
        };
      case "slideInDown":
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(-32px)",
        };
      case "slideInLeft":
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(-32px)",
        };
      case "slideInRight":
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(32px)",
        };
      case "bounce":
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          animation: isVisible ? "bounce 1s infinite" : "none",
        };
      case "pulse":
        return {
          ...baseStyle,
          opacity: isVisible ? 1 : 0,
          animation: isVisible ? "pulse 2s infinite" : "none",
        };
      default:
        return {};
    }
  };

  // Determine the HTML element to render
  const getElement = () => {
    if (as) return as;
    if (variant.startsWith("h")) return variant as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    return "p";
  };

  const Element = getElement();

  // 타이핑 애니메이션 효과
  useEffect(() => {
    if (animation === "typing" && typeof children === "string") {
      const text = children as string;
      if (typingIndex < text.length) {
        const timer = setTimeout(() => {
          setTypingText(text.slice(0, typingIndex + 1));
          setTypingIndex(typingIndex + 1);
        }, 80);
        return () => clearTimeout(timer);
      }
    }
  }, [typingIndex, children, animation]);

  // 마운트 시 애니메이션 트리거
  useEffect(() => {
    if (trigger === "onMount") {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [trigger, delay]);

  // 스크롤 트리거 (간단한 구현)
  useEffect(() => {
    if (trigger === "onScroll") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          }
        },
        { threshold: 0.1 }
      );

      const element = document.querySelector(`[data-text-animation="${variant}"]`);
      if (element) {
        observer.observe(element);
      }

      return () => observer.disconnect();
    }
  }, [trigger, delay, variant]);

  const classes = cn(variantStyles[variant], getColorStyle(color), weight && weightStyles[weight], alignStyles[align], size && sizeStyles[size], className);

  const displayText = animation === "typing" ? typingText : children;
  const inlineStyle = getAnimationInlineStyle();

  return React.createElement(
    Element,
    {
      className: classes,
      style: inlineStyle,
      "data-text-animation": variant,
      onMouseEnter: trigger === "onHover" ? () => setIsHovered(true) : undefined,
      onMouseLeave: trigger === "onHover" ? () => setIsHovered(false) : undefined,
    },
    displayText
  );
};

export { Text };
