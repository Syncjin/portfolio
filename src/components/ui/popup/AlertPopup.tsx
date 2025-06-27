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
  console.log("message", message);
  return (
    <PopupContainer isOpen={isOpen} onClose={onClose}>
      <PopupHeader title={title} onClose={onClose} />

      <div className="p-4 md:p-6">
        <div className="flex items-start gap-3 mb-6">
          {typeof message === "string" ? (
            <Text variant="body" className="text-gray-700 dark:text-gray-300">
              {message}
            </Text>
          ) : (
            message
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose} variant="primary">
            {confirmText}
          </Button>
        </div>
      </div>
    </PopupContainer>
  );
}
