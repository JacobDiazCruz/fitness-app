import { ReactNode } from "react";
import PaddedWrapper from "@/components/global/PaddedWrapper";

export default function CoachLayout({
  children
}) {
  return (
    <PaddedWrapper>
      {children}
    </PaddedWrapper>
  );
}