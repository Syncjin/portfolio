"use client";
import React from "react";

interface PopupContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function PopupContainer({ isOpen, onClose, children, className = "" }: PopupContainerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* 팝업 컨테이너 */}
      <div className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-hidden ${className}`}>{children}</div>
    </div>
  );
}
