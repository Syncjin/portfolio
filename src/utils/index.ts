// Utils exports
export * from "./format";
export * from "./validation";
export * from "./constants";

// Utility function to combine class names
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
