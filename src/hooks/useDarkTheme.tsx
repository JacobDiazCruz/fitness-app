import useTheme from "@/contexts/Theme";

export default function useDarkTheme() {
  const { darkMode } = useTheme();

  const borderColor = darkMode ? "border-neutral-700" : "border-neutral-200";
  const primaryBgColor = darkMode ? "bg-black" : "bg-white";
  
  return {
    borderColor,
    primaryBgColor
  };
}