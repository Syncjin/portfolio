"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface TagProps {
  icon?: string;
  text: string;
  className?: string;
  delay?: number; // ms 단위
}

const Tag: React.FC<TagProps> = ({ icon, text, className, delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      ref={ref}
      className={`inline-flex items-center px-4 py-2 rounded-full shadow-sm text-sm font-medium transition-all duration-700 ease-out ${className ?? ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {icon && <Image src={icon} alt={text} width={20} height={20} className="w-5 h-5 mr-2" />}
      {text}
    </span>
  );
};

export { Tag };
