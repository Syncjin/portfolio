"use client";
import React from "react";
import { Text } from "../Text";
import PopupContainer from "./PopupContainer";
import PopupHeader from "./PopupHeader";
import { Button } from "../Button";

interface AlertPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string | React.ReactNode;
  confirmText?: string;
}

export default function AlertPopup({ isOpen, onClose, title, message, confirmText = "확인" }: AlertPopupProps) {
  return (
    <PopupContainer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-full">
        <PopupHeader title={title} onClose={onClose} />
        <div className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            {typeof message === "string" ? (
              <Text variant="body" size="sm" className="text-gray-700 dark:text-gray-300">
                {message}
              </Text>
            ) : (
              message
            )}
          </div>
        </div>
        <div className="flex justify-end px-4 md:px-6 pb-4">
          <Button onClick={onClose} variant="primary">
            {confirmText}
          </Button>
        </div>
      </div>
    </PopupContainer>
  );
}
