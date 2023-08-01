'use client';

import { verifyUserToken } from "@/api/User";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "react-query";

export default function VerifyUser() {
  const router = useRouter();

  /**
   * @purpose check token request
   */
  const {
    isLoading,
    isError,
    data: verifyUser
  } = useQuery('verifyUser', verifyUserToken, {
    refetchOnMount: true,
    retry: false
  });

  useEffect(() => {
    if(isError) {
      router.push("/signin");
    }
  }, [isError]);

  useEffect(() => {
    if(verifyUser) {
      localStorage.setItem("profileId", verifyUser.profileId);
    }
  }, [verifyUser]);

  return <></>;
}