import useLocalStorage from "@/hooks/useLocalStorage";
import { ReactNode } from "react";

interface Props {
  roleAccess: 'Coach' | 'Client' | 'All'; 
  children: ReactNode;
}

export default function PermissionAccess({
  roleAccess = "All",
  children
} : Props) {
  const userRole = useLocalStorage('userRole');

  if (userRole === roleAccess || roleAccess === "All") {
    return <>{children}</>
  }

  return <></>;
};