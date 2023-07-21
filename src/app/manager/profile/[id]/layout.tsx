import { ReactNode } from "react";
import PaddedWrapper from "@/components/global/PaddedWrapper";

export default function ProfileLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <div className="m-auto w-[1200px]">
      <PaddedWrapper>
        {children}
      </PaddedWrapper>
    </div>
  );
};