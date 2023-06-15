'use client'

import { useState, useEffect } from "react";
import Head from "next/head";
import Button from "@/components/global/Button";
import Link from "next/link";
import { ArrowLeftIcon, FacebookIcon, GoogleIcon } from "@/components/global/Icons";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";
import { loginGoogle } from "@/api/User";
import { getProfile } from "@/api/Profile";

const Signin = () => {
  const [loadingGoogle, setLoadingGoogle] = useState<boolean>(false);
  const router = useRouter();

  const googleLogin = () => {
    window.google?.accounts?.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    });
    window.google?.accounts?.id?.prompt();
  };

  // google init callback
  window.handleCredentialResponse = async (res) => {
    const details = jwt_decode(res.credential);
    try {
      const requestData = {
        firstName: details.given_name,
        lastName: details.family_name,
        thumbnailImage: details.picture,
        originalImage: details.picture,
        username: details.name,
        email: details.email,
        token: res.credential,
        password: "",
        scope: "",
        role: "user",
        type: "google"
      }
      await loginGoogleMutation.mutateAsync(requestData);
    } catch(err) {
      console.log(err)
    }
  }

  // login request
  const loginGoogleMutation = useMutation(loginGoogle, {
    onSuccess: async (data) => {
      const { userId, accessToken, profileImage, firstName, lastName, email } = data;
      localStorage.setItem("userId", userId);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("profileImage", profileImage);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("email", email);
      
      try {
        const profileData = await getProfile(userId);
        const { role } = profileData;
        localStorage.setItem("userRole", role);
      } catch (error) {
        console.log("Error fetching profile data:", error);
      }
      
      router.push('/');
    },
    onError: (err) => {
      console.log(err);
    }
  });

  useEffect(() => {
    googleLogin();
  }, []);

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
            <div 
              id="g_id_onload"
              data-client_id="1092221046085-4i08852qeo7mc47vetdjt2sd3i7nclh4.apps.googleusercontent.com"
              data-callback="handleCredentialResponse"
            >
            </div>
            <div class="g_id_signin" data-type="standard"></div>
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