import DarkThemeLoader from "@/hooks/DarkThemeLoader";
import AppContextProvider from "@/store";
import Providers from "@/utils/provider";
import ThemeWrapper from "../manager/ThemeWrapper";

export default function WorkoutLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <AppContextProvider>
        <DarkThemeLoader />
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </AppContextProvider>
    </Providers>
  );
}