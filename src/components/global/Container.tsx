import React from "react";
import { secondaryBgColor } from "@/utils/themeColors";

export default function Container({
  children,
  className
}: React.ReactNode) {
  return (
    <div className={`${className} ${secondaryBgColor} form shadow-md width-full p-8 rounded-lg`}>
      {children}
    </div>
  );
}