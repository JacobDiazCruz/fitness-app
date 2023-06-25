import { useEffect, useState } from "react";
import { CloseIcon, SearchIcon } from "@/components/global/Icons";
import Modal from "@/components/global/Modal";
import TextField from "@/components/global/TextField";
import Button from "@/components/global/Button";
import { primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import AutoCompleteMultiple from "@/components/global/AutoCompleteMultiple";
import { listClients } from "@/api/Client";
import { useQuery } from "react-query";
import FieldName from "@/components/global/FieldName";

export default function AssignClientModal({ onClose }: any) {
  const { 
    isLoading, 
    isError,
    data: clients,
    error
  } = useQuery('clients', listClients, {
    refetchOnMount: true
  });

  const [clientsList, setClientsList] = useState<Array<any>>([]);
  const [selectedClients, setSelectedClients] = useState<Array<any>>([]);

  useEffect(() => {
    if(clients) {
      const clientsDetails = [];
      clients?.map((clientData) => {
        const { firstName, lastName } = clientData.client;
        clientsDetails.push({
          ...clientData.client,
          name: `${firstName} ${lastName}`
        })
      });
      console.log("clientsDetails", clientsDetails)
      setClientsList(clientsDetails);
    }
  }, [clients]);
  
  return (
    <Modal onClose={onClose} className="w-[500px] h-[500px] p-7">
      <div className="flex justify-between">
        <h2 className={`${primaryTextColor} font-semibold`}>Assign to Client</h2>
        <button onClick={onClose}>
          <CloseIcon className={`${secondaryTextColor} w-5 h-5`} />
        </button>
      </div>
      <div className="field mt-7">
        <FieldName>
          Assign to
        </FieldName>
        <AutoCompleteMultiple
          placeholder="Select clients"
          value={selectedClients}
          items={clientsList}
          onChange={(val) => {
            setSelectedClients((prevForm) => {
              const updatedForm = [...prevForm];
              updatedForm.push(val);
              return updatedForm;
            });
          }}
          removeSelectedItem={(val) => {
            setSelectedClients((prevForm) => {
              let updatedForm = [...prevForm];
              updatedForm = updatedForm.filter(item => item !== val);
              return updatedForm;
            });
          }}
        />
      </div>
      <div className="field mt-7">
        <FieldName>
          Starting day
        </FieldName>
        <TextField />
      </div>
      <div className="modal-footer absolute left-0 bottom-0 w-full p-4 dark:bg-neutral-950 bg-gray-100">
        <Button className="w-full text-center" variant="contained">
          Assign
        </Button>
      </div>
    </Modal>
  );
}