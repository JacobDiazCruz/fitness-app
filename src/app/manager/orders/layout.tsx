import { ReactNode } from "react";
import PaddedWrapper from "@/components/global/PaddedWrapper";

export default function OrdersLayout({
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