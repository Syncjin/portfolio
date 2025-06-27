import React from "react";
import { Text } from "@/components/ui/Text";

export default function ContactSection() {
  return (
    <section id="contact" className={`min-h-screen flex flex-col justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 bg-black dark:bg-gray-900 text-white dark:text-white`}>
      <Text variant="h2" align="center" className="mb-8">
        Contact
      </Text>
      <Text variant="body" color="muted" align="center">
        연락처 또는 연락 폼이 들어갈 영역입니다.
      </Text>
    </section>
  );
}
