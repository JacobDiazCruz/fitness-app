'use client';

import { primaryBgColor, secondaryBgColor } from "@/utils/themeColors";

export default function ThemeWrapper({children}: any) {
  return (
    <div className={`${primaryBgColor} w-full h-[100vh]`}>
      {children}
    </div>
  );
}