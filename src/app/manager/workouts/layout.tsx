import { ReactNode } from "react";
import Providers from "@/utils/provider";

export default function Layout({
  children
}) {
  return (
    <Providers>
      {children}
    </Providers>
  );
}