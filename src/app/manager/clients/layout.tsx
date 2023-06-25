import { ReactNode } from "react";
import PaddedWrapper from "@/components/global/PaddedWrapper";

export default function ClientsLayout({
  children
}) {
  return (
    <PaddedWrapper>
      {children}
    </PaddedWrapper>
  );
}