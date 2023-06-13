'use client'
import Providers from "@/utils/provider";
import Script from "next/script";

export default function Layout({
  children
}) {
  return (
    <Providers>
      <Script src="https://accounts.google.com/gsi/client" async defer />
      <Script src="https://connect.facebook.net/en_US/sdk.js" defer="true" async="true" crossorigin="anonymous" />
      {children}
    </Providers>
  );
}