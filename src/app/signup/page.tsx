'use client'

import { useRouter, useSearchParams } from "next/navigation";
import GooglePopup from "@/components/global/LoginGoogle/GooglePopup";
import Script from "next/script";

export default function Signup() {

  const searchParams = useSearchParams();
  const roleType = searchParams.get("roleType") ?? "";
  const router = useRouter();

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" async defer />
      <div className="signup-page flex h-screen">
        <div className="w-1/2 flex items-center justify-center">
          <div className="px-5 text-center">
            <h1 className="text-6xl">L.</h1>
          </div>
        </div>
        <div className="w-1/2 bg-white flex items-center justify-center">
          <div className="w-3/4">
            <h2 className="font-semibold text-3xl mb-10">Join us</h2>

            <div className="btn-group w-[350px]">
              <GooglePopup roleType={roleType} />
            </div>
            <hr className="my-10 w-[70%]" />
            <p className="text-neutral-500">
              Already have an account?
              <span
                onClick={() => router.push('/signin')}
                className="ml-1 text-darkTheme-950 cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};