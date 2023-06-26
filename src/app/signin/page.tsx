'use client'

import { useState, useEffect } from "react";
import Head from "next/head";
import Button from "@/components/global/Button";
import Link from "next/link";
import { ArrowLeftIcon, FacebookIcon, GoogleIcon } from "@/components/global/Icons";
import { useMutation } from "react-query";
import jwt_decode from "jwt-decode";
import { loginGoogle } from "@/api/User";
import { getProfile } from "@/api/Profile";
import GooglePopup from "@/components/global/LoginGoogle/GooglePopup";

const Signin = () => {
  return (
    <div className="signin-page flex h-screen">
      <div className="w-1/2 flex items-center justify-center">
        <div className="px-5 text-center">
          <h1 className="text-6xl">L.</h1>
        </div>
      </div>
      <div className="w-1/2 bg-white flex items-center justify-center">
          <div className="w-3/4">
          <h2 className="font-semibold text-3xl mb-10">Sign in</h2>
          <div className="btn-group w-[70%]">
            <GooglePopup />
          </div>
          <hr className="my-10 w-[70%]" />
          <Link href="/" className="flex items-center gap-[6px] text-[18px]">
            <ArrowLeftIcon />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;