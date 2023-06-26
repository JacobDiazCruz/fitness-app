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

const GooglePopup = ({ roleType }: { roleType: string }) => {
  const [loadingGoogle, setLoadingGoogle] = useState<boolean>(false);
  const router = useRouter();

  const googleLogin = () => {
    window?.google?.accounts?.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    });
    window?.google?.accounts?.id?.prompt();
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
        role: roleType,
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
      try {
        const profileData = await getProfile(data.userId);
        const { userId, role, email, firstName, lastName, profileImage } = profileData;

        // set all static values that won't be updated
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("email", email);
        localStorage.setItem("userRole", role);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("thumbnailImage", profileImage?.thumbnailImage);
      } catch (error) {
        console.log("Error fetching profile data:", error);
      }
      
      router.push('/manager/clients');
    },
    onError: (err) => {
      console.log(err);
    }
  });

  useEffect(() => {
    googleLogin();
  }, []);

  return (
    <>
      <div 
        id="g_id_onload"
        data-client_id="1092221046085-4i08852qeo7mc47vetdjt2sd3i7nclh4.apps.googleusercontent.com"
        data-callback="handleCredentialResponse"
      >
      </div>
      <div className="g_id_signin" data-type="standard"></div>
    </>
  );
};

export default GooglePopup;