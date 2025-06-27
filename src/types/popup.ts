import React from "react";

export type PopupNames = "alert" | "confirm" | "custom";

export type VariantTypes = "primary" | "secondary" | "success" | "warning" | "error" | "info" | "danger";

export interface PopupArgumentsProps {
  type: PopupNames;
  title?: string;
  msg?: string | React.ReactNode;
  data?: unknown;
  textOk?: string;
  textCancel?: string;
  color?: VariantTypes;
  _resolve?: (value: unknown) => unknown;
}

export interface PopupListItemProps extends PopupArgumentsProps {
  popupIdx: number;
  isVisible: boolean;
  full?: boolean;
}
