import React from "react";
import { borderColor, secondaryBgColor } from "@/utils/themeColors";

export default function Container({
  children,
  className
}: React.ReactNode) {
  return (
    <div className={`
      ${className}
      ${borderColor}
      ${secondaryBgColor}
      dark:border bg-white form shadow-md width-full p-8 rounded-lg
    `}>
      {children}
    </div>
  );
}