import { ReactNode } from "react";
import Providers from "@/utils/provider";
import PaddedWrapper from "@/components/global/PaddedWrapper";

export default function ProgramsLayout({
  children
}) {
  return (
    <PaddedWrapper>
      {children}
    </PaddedWrapper>
  );
}