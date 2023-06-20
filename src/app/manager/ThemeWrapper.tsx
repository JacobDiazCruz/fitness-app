import { primaryBgColor } from "@/utils/themeColors";

export default function ThemeWrapper({children}: any) {
  return (
    <div className={`${primaryBgColor} p-10 w-full height-[100vh]`}>
      {children}
    </div>
  );
}