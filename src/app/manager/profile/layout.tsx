import { ReactNode } from "react";
import PaddedWrapper from "@/components/global/PaddedWrapper";

export default function ProfileLayout({
  children
}) {
  return (
    <PaddedWrapper>
      {children}
    </PaddedWrapper>
  );
}