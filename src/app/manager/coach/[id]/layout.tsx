import { ReactNode } from "react";
import PaddedWrapper from "@/components/global/PaddedWrapper";

export default function CoachLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <PaddedWrapper>
      {children}
    </PaddedWrapper>
  );
}