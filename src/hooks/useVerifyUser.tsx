import { verifyUserToken } from "@/api/User";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function useVerifyUser() {
  const router = useRouter();
  const [shouldVerify, setShouldVerify] = useState(false); // New state variable
  const [userAccess, setUserAccess] = useState(null);

  /**
   * @Purpose check token request
   */
  const {
    isLoading,
    isError,
    data: verifyUser,
    refetch
  } = useQuery('verifyUser', verifyUserToken, {
    retry: false,
    enabled: shouldVerify // Set enabled to the dependency variable
  });

  useEffect(() => {
    if (isError) {
      router.push("/signin");
    }
  }, [isError]);

  // Function to trigger the verification
  const triggerVerification = () => {
    setShouldVerify(true);
  };

  useEffect(() => {
    if(verifyUser) {
      console.log("verifyUser", verifyUser)
      setUserAccess(verifyUser);
    }
  }, [verifyUser])

  return {
    userAccess,
    isLoading,
    isError,
    triggerVerification
  };
}