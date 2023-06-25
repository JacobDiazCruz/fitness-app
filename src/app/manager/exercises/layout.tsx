import { ReactNode } from "react";
import PaddedWrapper from "@/components/global/PaddedWrapper";

export default function ExercisesLayout({
  children
}) {
  return (
    <PaddedWrapper>
      {children}
    </PaddedWrapper>
  );
}