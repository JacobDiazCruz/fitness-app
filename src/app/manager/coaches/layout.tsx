import { ReactNode } from "react";
import PaddedWrapper from "@/components/global/PaddedWrapper";

export default function CoachesLayout({
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