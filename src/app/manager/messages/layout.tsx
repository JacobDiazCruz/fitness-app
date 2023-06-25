import { ReactNode } from "react";
import PaddedWrapper from "@/components/global/PaddedWrapper";
import Header from "../Header";

export default function MessagesLayout({
  children
}) {
  return (
    <div>
      <div className="px-10 pt-10">
        <Header pageTitle="Messages" />
      </div>
      {children}
    </div>
  );
}