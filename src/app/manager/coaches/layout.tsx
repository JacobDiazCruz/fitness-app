import { ReactNode } from "react";
import PaddedWrapper from "@/components/global/PaddedWrapper";

export default function CoachesLayout({
  children
}) {
  return (
    <PaddedWrapper>
      {children}
    </PaddedWrapper>
  );
}