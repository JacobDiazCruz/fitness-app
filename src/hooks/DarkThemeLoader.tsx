'use client';

import useTheme from "@/contexts/Theme";
import { useEffect } from "react";

export default function DarkThemeLoader() {
  const { darkMode } = useTheme();

  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  useEffect(() => {
    if (darkMode && window?.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return <></>;
}