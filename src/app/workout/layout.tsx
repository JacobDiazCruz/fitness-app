import Providers from "@/utils/provider";
import ThemeWrapper from "../manager/ThemeWrapper";

export default function WorkoutLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <ThemeWrapper>
        {children}
      </ThemeWrapper>
    </Providers>
  );
}