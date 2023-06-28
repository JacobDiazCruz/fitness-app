import useLocalStorage from "@/hooks/useLocalStorage";
import { ReactNode } from "react";

interface Props {
  roleAccess: string; 
  children: ReactNode;
}

export default function PermissionAccess({
  roleAccess = "Client",
  children
} : Props) {
  const userRole = useLocalStorage('userRole');

  if (userRole === roleAccess || roleAccess === "All") {
    return <>{children}</>
  }

  return <></>;
};