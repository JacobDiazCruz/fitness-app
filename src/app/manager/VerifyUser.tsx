import { verifyUserToken } from "@/api/User";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "react-query";

export default function VerifyUser() {
  const router = useRouter();

  /**
   * @Purpose check token request
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
    // set all dynamic values that can be updated
    if(verifyUser) {
      const { userId } = verifyUser;
      localStorage.setItem("userId", userId);
    }
  }, [verifyUser]);

  useEffect(() => {
    if(isError) {
      router.push("/signin");
    }
  }, [isError])

  return <></>;
}