"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/utils/index";
import { useThemeStore } from "@/store/useThemeStore";

/**
 * Text 컴포넌트 - 디자인 시스템
 *
 * 이 컴포넌트는 일관된 타이포그래피 시스템을 제공합니다.
 *
 * @example
 * // 기본 사용법
 * <Text variant="h1">제목</Text>
 * <Text variant="body" color="muted">본문 텍스트</Text>
 *
 * // 애니메이션과 함께
 * <Text variant="h2" animation="slideInUp" trigger="onScroll">애니메이션 텍스트</Text>
 *
 * // 커스텀 스타일링
 * <Text variant="body" size="lg" weight="bold" color="primary">강조 텍스트</Text>
 */

interface TextProps {
  children: React.ReactNode;
  /** 텍스트 변형 - 미리 정의된 스타일 */
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "body-sm" | "caption" | "overline";
  /** HTML 요소 타입 - variant와 별개로 렌더링될 요소 지정 */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  /** 추가 CSS 클래스 */
  className?: string;
  /** 텍스트 색상 - 테마에 따라 자동 변경 */
  color?: "primary" | "secondary" | "muted" | "white" | "black";
  /** 폰트 굵기 */
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
  /** 텍스트 정렬 */
  align?: "left" | "center" | "right" | "justify";
  /** 폰트 크기 - variant보다 우선순위 높음 */
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  /** 애니메이션 타입 */
  animation?: "none" | "fadeIn" | "slideInUp" | "slideInDown" | "slideInLeft" | "slideInRight" | "typing" | "bounce" | "pulse";
  /** 애니메이션 지연 시간 (ms) */
  delay?: number;
  /** 애니메이션 지속 시간 (ms) */
  duration?: number;
  /** 애니메이션 트리거 조건 */
  trigger?: "onMount" | "onScroll" | "onHover";
  /** 인라인 스타일 */
  style?: React.CSSProperties;
  /** 테마 영향을 무시하고 고정 색상 사용 */
  ignoreTheme?: boolean;
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
  style,
  ignoreTheme,
}) => {
  const { theme } = useThemeStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);

  /**
   * 텍스트 변형별 기본 스타일
   *
   * Typography Scale:
   * - h1: 36px (text-4xl) - 메인 제목
   * - h2: 30px (text-3xl) - 섹션 제목
   * - h3: 24px (text-2xl) - 서브 섹션 제목
   * - h4: 20px (text-xl) - 카드 제목
   * - h5: 18px (text-lg) - 작은 제목
   * - h6: 16px (text-base) - 가장 작은 제목
   * - body: 16px (text-base) - 기본 본문
   * - body-sm: 14px (text-sm) - 작은 본문
   * - caption: 12px (text-xs) - 캡션, 설명
   * - overline: 12px (text-xs) - 오버라인, 카테고리
   */
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

  /**
   * 색상 시스템
   *
   * 다크/라이트 테마에 따라 자동으로 색상이 변경됩니다.
   * - primary: 메인 텍스트 색상
   * - secondary: 보조 텍스트 색상
   * - muted: 비활성화된 텍스트 색상
   * - white: 흰색 (고정)
   * - black: 검은색 (고정)
   */
  const getColorStyle = (color: string) => {
    // ignoreTheme이 true이면 테마에 관계없이 고정 색상 사용
    if (ignoreTheme) {
      switch (color) {
        case "white":
          return "text-white";
        case "black":
          return "text-black";
        default:
          return "text-gray-900";
      }
    }

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

  /**
   * 폰트 굵기 시스템
   *
   * Tailwind CSS의 font-weight 클래스와 매핑:
   * - light: 300
   * - normal: 400
   * - medium: 500
   * - semibold: 600
   * - bold: 700
   * - extrabold: 800
   */
  const weightStyles = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  };

  /**
   * 텍스트 정렬 옵션
   */
  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  /**
   * 폰트 크기 시스템
   *
   * Tailwind CSS의 text-size 클래스와 매핑:
   * - xs: 12px
   * - sm: 14px
   * - base: 16px
   * - lg: 18px
   * - xl: 20px
   * - 2xl: 24px
   * - 3xl: 30px
   * - 4xl: 36px
   * - 5xl: 48px
   * - 6xl: 60px
   */
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

  /**
   * 애니메이션 인라인 스타일 생성
   *
   * 지원하는 애니메이션:
   * - fadeIn: 페이드 인
   * - slideInUp: 아래에서 위로 슬라이드
   * - slideInDown: 위에서 아래로 슬라이드
   * - slideInLeft: 왼쪽에서 오른쪽으로 슬라이드
   * - slideInRight: 오른쪽에서 왼쪽으로 슬라이드
   * - bounce: 바운스 효과
   * - pulse: 펄스 효과
   */
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

  /**
   * HTML 요소 결정 로직
   *
   * 1. as prop이 있으면 해당 요소 사용
   * 2. variant가 h1-h6이면 해당 heading 요소 사용
   * 3. 기본값은 p 요소
   */
  const getElement = () => {
    if (as) return as;
    if (variant.startsWith("h")) return variant as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    return "p";
  };

  const Element = getElement();

  /**
   * 타이핑 애니메이션 효과
   *
   * 문자열을 한 글자씩 순차적으로 표시합니다.
   * 80ms 간격으로 한 글자씩 추가됩니다.
   */
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

  /**
   * 마운트 시 애니메이션 트리거
   *
   * 컴포넌트가 마운트된 후 delay 시간만큼 대기한 후 애니메이션 시작
   */
  useEffect(() => {
    if (trigger === "onMount") {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [trigger, delay]);

  /**
   * 스크롤 트리거 애니메이션
   *
   * Intersection Observer를 사용하여 요소가 화면에 나타날 때 애니메이션 시작
   */
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

  // 최종 클래스 조합
  const classes = cn(variantStyles[variant], getColorStyle(color), weight && weightStyles[weight], alignStyles[align], size && sizeStyles[size], className);

  // 표시할 텍스트 결정 (타이핑 애니메이션인 경우)
  const displayText = animation === "typing" ? typingText : children;
  const inlineStyle = getAnimationInlineStyle();

  return React.createElement(
    Element,
    {
      className: classes,
      style: { ...inlineStyle, ...style },
      "data-text-animation": variant,
      onMouseEnter: trigger === "onHover" ? () => setIsHovered(true) : undefined,
      onMouseLeave: trigger === "onHover" ? () => setIsHovered(false) : undefined,
    },
    displayText
  );
};

export { Text };
