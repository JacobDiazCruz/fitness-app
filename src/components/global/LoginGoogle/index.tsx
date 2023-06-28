import Providers from "@/utils/provider";
import Script from "next/script";
import GooglePopup from "./GooglePopup";

export default function LoginGoogle() {
  return (
    <Providers>
      <Script src="https://accounts.google.com/gsi/client" defer />
      <GooglePopup />
    </Providers>
  );
}