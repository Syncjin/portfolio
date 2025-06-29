"use client";
import React, { useEffect, useState } from "react";

interface MarkdownViewerProps {
  filename: string;
}

export default function MarkdownViewer({ filename }: MarkdownViewerProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(`/md/${filename}`);
        if (response.ok) {
          const text = await response.text();
          setContent(text);
        } else {
          setContent("파일을 찾을 수 없습니다.");
        }
      } catch {
        setContent("파일을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [filename]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  // 간단한 마크다운 파싱 (실제 프로젝트에서는 react-markdown 같은 라이브러리 사용 권장)
  const parseMarkdown = (text: string) => {
    return text.split("\n").map((line, index) => {
      // 제목 처리
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6">
            {line.substring(2)}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-5">
            {line.substring(3)}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-lg font-bold text-gray-900 dark:text-white mb-2 mt-4">
            {line.substring(4)}
          </h3>
        );
      }
      if (line.startsWith("#### ")) {
        return (
          <h4 key={index} className="text-base font-bold text-gray-900 dark:text-white mb-2 mt-3">
            {line.substring(5)}
          </h4>
        );
      }

      // 굵은 텍스트 처리
      if (line.includes("**")) {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={index} className="text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-2">
            {parts.map((part, partIndex) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong key={partIndex} className="font-bold">
                    {part.substring(2, part.length - 2)}
                  </strong>
                );
              }
              return part;
            })}
          </p>
        );
      }

      // 링크 처리
      if (line.includes("[") && line.includes("](") && line.includes(")")) {
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts = line.split(linkRegex);
        return (
          <p key={index} className="text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-2">
            {parts.map((part, partIndex) => {
              if (partIndex % 3 === 1) {
                const url = parts[partIndex + 1];
                return (
                  <a key={partIndex} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    {part}
                  </a>
                );
              } else if (partIndex % 3 === 2) {
                return null;
              }
              return part;
            })}
          </p>
        );
      }

      // 빈 줄 처리
      if (line.trim() === "") {
        return <br key={index} />;
      }

      // 일반 텍스트
      return (
        <p key={index} className="text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-2">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="max-h-96 overflow-y-auto p-4">
      <div className="prose prose-sm sm:prose-base max-w-none">{parseMarkdown(content)}</div>
    </div>
  );
}
