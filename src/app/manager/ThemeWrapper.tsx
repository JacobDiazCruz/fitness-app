'use client';

import { primaryBgColor } from "@/utils/themeColors";

export default function ThemeWrapper({children}: any) {
  return (
    <div className={`${primaryBgColor} w-full`}>
      {children}
    </div>
  );
};