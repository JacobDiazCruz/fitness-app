import { listClients } from "@/api/Client";
import { borderColor } from "@/utils/themeColors";
import { useEffect } from "react";
import { useQuery } from "react-query";

export default function SidebarSessionDetails() {

  // list coaching plans
  const { 
    isLoading, 
    isError,
    data: clients = [],
    error
  } = useQuery('clients', listClients, {
    refetchOnMount: true
  });

  useEffect(() => {
    console.log("clients", clients)
  }, [clients]);

  if(isLoading) {
    return <></>;
  }

  return (
    <div className={`${borderColor} border p-2 rounded-lg w-[90%] m-auto`}>
      <div>

      </div>
    </div>
  );
}