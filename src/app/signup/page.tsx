'use client'

import { useState, useEffect } from "react";
import Head from "next/head";
import Button from "@/components/global/Button";
import Link from "next/link";
import { ArrowLeftIcon, CheckIcon, ClientRoleIcon, CoachRoleIcon, FacebookIcon, GoogleIcon } from "@/components/global/Icons";
import { useMutation } from "react-query";
import { useRouter, useSearchParams } from "next/navigation";
import jwt_decode from "jwt-decode";
import { loginGoogle } from "@/api/User";
import { getProfile } from "@/api/Profile";
import { borderColor } from "@/utils/themeColors";
import GooglePopup from "@/components/global/LoginGoogle/GooglePopup";
import Script from "next/script";

export default function Signup() {
  const searchParams = useSearchParams();
  const roleType = searchParams.get("roleType");

  const [selectedRole, setSelectedRole] = useState<string>("");
  const [roles, setRoles] = useState([
    {
      title: "I'm a coach",
      icon: <CoachRoleIcon />,
      description: "I'm here to teach and earn income.",
      type: "Coach"
    },
    {
      title: "I'm a client",
      icon: <ClientRoleIcon />,
      description: "I'm looking for the best coach.",
      type: "Client"
    }
  ]);

  const router = useRouter();

  const handleClickRole = (type: string) => {
    setSelectedRole(type);
    router.push('/signup')
  };

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" async defer />
      <Script src="https://connect.facebook.net/en_US/sdk.js" defer="true" async="true" crossorigin="anonymous" />
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
                className="ml-1 text-neutral-950 cursor-pointer"
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