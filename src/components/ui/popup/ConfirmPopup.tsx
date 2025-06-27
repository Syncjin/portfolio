"use client";
import React from "react";
import { Text } from "../Text";
import PopupContainer from "./PopupContainer";
import PopupHeader from "./PopupHeader";
import { Button } from "../Button";

interface ConfirmPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "info" | "warning" | "danger";
}

export default function ConfirmPopup({ isOpen, onClose, onConfirm, title, message, confirmText = "확인", cancelText = "취소", type = "info" }: ConfirmPopupProps) {
  const getTypeStyles = () => {
    switch (type) {
      case "warning":
        return "text-yellow-600 dark:text-yellow-400";
      case "danger":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-blue-600 dark:text-blue-400";
    }
  };

  const getConfirmButtonVariant = () => {
    switch (type) {
      case "danger":
        return "danger" as const;
      case "warning":
        return "warning" as const;
      default:
        return "primary" as const;
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <PopupContainer isOpen={isOpen} onClose={onClose}>
      <PopupHeader title={title} onClose={onClose} />

      <div className="p-4 md:p-6">
        <div className="flex items-start gap-3 mb-6">
          <div className={`flex-shrink-0 w-6 h-6 mt-0.5 ${getTypeStyles()}`}>
            {type === "warning" && (
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {type === "danger" && (
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {type === "info" && (
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <Text variant="body" className="text-gray-700 dark:text-gray-300">
            {message}
          </Text>
        </div>

        <div className="flex justify-end gap-3">
          <Button onClick={onClose} variant="secondary">
            {cancelText}
          </Button>
          <Button onClick={handleConfirm} variant={getConfirmButtonVariant()}>
            {confirmText}
          </Button>
        </div>
      </div>
    </PopupContainer>
  );
}
