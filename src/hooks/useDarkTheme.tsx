'use client';

import useTheme from "@/contexts/Theme";
import { useEffect } from "react";

export default function useDarkTheme() {
  const { darkMode } = useTheme();

  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  useEffect(() => {
    if (darkMode && window?.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => {
      document.documentElement.classList.remove('dark'); // Cleanup when component unmounts
    };
  }, [darkMode]);

  const borderColor = "dark:border-neutral-700 border-neutral-200";
  const primaryBgColor = "dark:bg-black bg-white";
  const secondaryBgColor = "dark:bg-neutral-950 bg-white";

  const fieldBgColor = "dark:bg-neutral-900 dark:border-neutral-900 bg-[#f6f6f6] border-gray-200"
  
  const primaryTextColor = "dark:text-neutral-200 text-gray-900";
  const secondaryTextColor = "dark:text-neutral-200 text-gray-900";

  return {
    borderColor,
    primaryBgColor,
    secondaryBgColor,
    fieldBgColor,
    primaryTextColor,
    secondaryTextColor
  };
}