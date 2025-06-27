"use client";
import React from "react";
import { Text } from "./Text";

interface InfoCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  content: string;
}

/**
 * InfoCard 컴포넌트
 *
 * 이미지, 제목, 내용을 포함하는 정보 카드입니다.
 *
 * @example
 * <InfoCard
 *   imageSrc="/contact/user.png"
 *   imageAlt="User"
 *   title="이름"
 *   content="내용"
 * />
 */
export const InfoCard: React.FC<InfoCardProps> = ({ imageSrc, imageAlt, title, content }) => {
  return (
    <div
      className="flex items-start px-4 w-full"
      style={{
        height: "64px",
        maxWidth: "386px",
      }}
    >
      <img src={imageSrc} alt={imageAlt} className="mr-4 w-8 h-8 sm:w-10 sm:h-10" />
      <div className="flex flex-col gap-4">
        <Text variant="body" className="font-bold text-sm">
          {title}
        </Text>
        <Text variant="body" className="text-gray-600 text-xs">
          {content}
        </Text>
      </div>
    </div>
  );
};
