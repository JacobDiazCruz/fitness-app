import { primaryBgColor, secondaryBgColor } from "@/utils/themeColors";

export default function ThemeWrapper({children}: any) {
  return (
    <div className={`${primaryBgColor} w-full height-[100vh]`}>
      {children}
    </div>
  );
}