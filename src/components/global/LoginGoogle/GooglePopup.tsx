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
import useVerifyUser from "@/hooks/useVerifyUser";

const GooglePopup = ({ roleType }: { roleType?: string }) => {
  const [loadingGoogle, setLoadingGoogle] = useState<boolean>(false);
  const router = useRouter();
  const { triggerVerification, userAccess } = useVerifyUser();

  const googleLogin = () => {
    window?.google?.accounts?.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    });
    window?.google?.accounts?.id?.prompt();
  };

  // google init callback
  window.handleCredentialResponse = async (res: any) => {
    const details: any = jwt_decode(res.credential);
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
        // call verify user token
        localStorage.setItem("accessToken", data.accessToken);        
        triggerVerification();

        // call get profile
        const profileData = await getProfile({ userId: data?.userId });
        const { role, email, firstName, lastName, profileImage } = profileData;
        
        // set all static values that won't be updated
        localStorage.setItem("userId", data?.userId);
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
    const loadGoogleAuth = async () => {
      const googleAuthScript = document.createElement("script");
      googleAuthScript.src = "https://accounts.google.com/gsi/client";
      googleAuthScript.async = true;
      googleAuthScript.defer = true;
      googleAuthScript.onload = () => {
        // Initialize Google Auth
        if (window?.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
          });
        }
      };
      document.body.appendChild(googleAuthScript);
    };

    loadGoogleAuth();
  }, []);

  return (
    <>
      <div 
        id="g_id_onload"
        data-client_id="1092221046085-4i08852qeo7mc47vetdjt2sd3i7nclh4.apps.googleusercontent.com"
        data-callback="handleCredentialResponse"
        data-cancel_on_tap_outside="false"
      >
      </div>
      <div className="g_id_signin" data-type="standard"></div>
    </>
  );
};

export default GooglePopup;