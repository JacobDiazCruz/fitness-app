import Providers from "@/utils/provider";
import Script from "next/script";
import GooglePopup from "./GooglePopup";

export default function LoginGoogle() {
  return (
    <Providers>
      <Script src="https://accounts.google.com/gsi/client" defer />
      <Script src="https://connect.facebook.net/en_US/sdk.js" defer="true" async="true" crossorigin="anonymous" />
      <GooglePopup />
    </Providers>
  );
}