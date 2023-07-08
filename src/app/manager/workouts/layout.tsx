import PaddedWrapper from "@/components/global/PaddedWrapper";
import { ReactNode } from "react";

export default function WorkoutsLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <PaddedWrapper>
      {children}
    </PaddedWrapper>
  );
}