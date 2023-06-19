import useDarkTheme from "@/hooks/useDarkTheme";

export default function ThemeWrapper({children}: any) {
  const { primaryBgColor } = useDarkTheme();

  return (
    <div className={`${primaryBgColor} p-10 w-full height-[100vh]`}>
      {children}
    </div>
  );
}