import { listClients } from "@/api/Client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function useClients() {
  const [clientsList, setClientsList] = useState([]);

  const {
    isLoading, 
    isError,
    data: clients,
    error
  } = useQuery('clients', listClients, {
    refetchOnMount: true
  });

  useEffect(() => {
    if(clients) {
      const clientsDetails: any = [];
      clients?.map((clientData) => {
        const { firstName, lastName } = clientData.client;
        clientsDetails.push({
          ...clientData.client,
          name: `${firstName} ${lastName}`
        })
      });
      setClientsList(clientsDetails);
    }
  }, [clients]);

  return {
    clientsList
  };
};