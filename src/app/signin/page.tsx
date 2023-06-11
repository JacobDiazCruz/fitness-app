'use client'

import { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Button from "@/components/global/Button";
import Link from "next/link";
import { ArrowLeftIcon, FacebookIcon, GoogleIcon } from "@/components/global/Icons";
import { useMutation } from "react-query";
import { loginGoogle } from "@/api/User";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";

const Signin: NextPage = () => {
  const [loadingGoogle, setLoadingGoogle] = useState<boolean>(false);
  const router = useRouter();

  const googleLogin = () => {
    window.google?.accounts?.id.initialize({
      client_id: '1092221046085-4i08852qeo7mc47vetdjt2sd3i7nclh4.apps.googleusercontent.com',
      callback: handleCredentialResponse
    });
    window.google?.accounts?.id?.prompt();
    // let gapiInit: any = window.gapi
    // window.gapi?.load("auth2", function () {
    //   var auth2 = gapiInit.auth2.init({
    //     client_id:
    //       "538942194991-rmd7eq6guulpv9bqas3mtmak1lfo6dq2.apps.googleusercontent.com",
    //     cookiepolicy: "single_host_origin"
    //   });
    //   // auth event handler
    //   auth2.attachClickHandler(
    //     document.getElementById("google-btn"),
    //     {},
    //     async function (googleUser: any) {
    //       const profile = googleUser.getBasicProfile();
    //       // The ID token passed to backend
    //       let id_token = googleUser.getAuthResponse().id_token;
    //       let email = profile.getEmail();
    //       setLoadingGoogle(true)
    //       try {
    //         console.log("profasdile", profile)
    //         //Request Payload
    //         const requestData = {
    //           firstName: profile.XZ, // find a way to change this key to dynamic
    //           lastName: profile.nY, // find a way to change this key to dynamic
    //           email: email,
    //           token: id_token,
    //           password: "",
    //           thumbnailImage: profile.LO, // find a way to change this key to dynamic
    //           originalImage: profile.LO, // find a way to change this key to dynamic
    //           username: profile.zf,
    //           scope: googleUser.getAuthResponse().scope,
    //           role: "user",
    //           type: "google"
    //         };
    //         // API Request
    //         await mutate(requestData);
    //       } catch (err) {
    //         console.log(err);
    //       } finally {
    //         setLoadingGoogle(false)
    //       }
    //     }
    //   );
    // });
  };

  window.handleCredentialResponse = async (res) => {
    const details = jwt_decode(res.credential);
    console.log("details", details)
    try {
      const requestData = {
        firstName: details.given_name, // find a way to change this key to dynamic
        lastName: details.family_name, // find a way to change this key to dynamic
        email: details.email,
        token: res.credential,
        password: "",
        thumbnailImage: details.picture, // find a way to change this key to dynamic
        originalImage: details.picture, // find a way to change this key to dynamic
        username: details.name,
        scope: "",
        role: "user",
        type: "google"
      }
      await mutate(requestData);
    } catch(err) {
      console.log(err)
    }
  }

  // login request
  const { mutate, isLoading } = useMutation({
    mutationFn: (req: any) => loginGoogle(req),
      onSuccess: (res: any) => {
        const { data } = res;
        localStorage.setItem("accessToken", data.accessToken);
        router.push('/');
      },
      onError: (err) => {
        console.log(err)
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
            {/* <Button
              id="google-btn"
              variant="outlined"
              className="w-full h-[50px] text-gray-500 font-light mb-5"
              startIcon={<GoogleIcon className="w-6 h-6" />}
              loading={loadingGoogle}
            >
              Sign in with Google
            </Button>
            <Button
              variant="outlined"
              className="w-full h-[50px] text-gray-500 font-light"
              startIcon={<FacebookIcon className="w-6 h-6" />}
            >
              Sign in with Facebook
            </Button> */}
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