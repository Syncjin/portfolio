"use client";
import dynamic from "next/dynamic";

const PopupRenderer = dynamic(() => import("@/components/ui/popup/PopupRenderer"), { ssr: !!false });

export default function ClientPopupWrapper() {
  return <PopupRenderer />;
}
