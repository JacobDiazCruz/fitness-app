import React from "react";
import { borderColor, secondaryBgColor } from "@/utils/themeColors";

interface Props {
  children: React.ReactNode;
  className?: string;
};

export default function Container({
  children,
  className
}: Props) {
  return (
    <div 
      className={`
        ${className}
        ${borderColor}
        ${secondaryBgColor}
        dark:border bg-white form shadow-md width-full px-4 py-8 md:p-8 rounded-lg
    `}>
      {children}
    </div>
  );
}