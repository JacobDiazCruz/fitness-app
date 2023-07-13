import { useEffect, useState } from "react";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import Button from "@/components/global/Button";
import { primaryTextColor } from "@/utils/themeColors";
import { listClients } from "@/api/Client";
import { useMutation, useQuery } from "react-query";
import FieldName from "@/components/global/FieldName";
import DatePickerField from "@/components/global/DatePickerField";
import AutoComplete from "@/components/global/AutoComplete";
import { assignProgramToClient } from "@/api/Program";
import { useParams } from "next/navigation";
import useAlert from "@/contexts/Alert";

export default function AssignClientModal({ onClose }: any) {
  const params = useParams();
  const { dispatchAlert }: any = useAlert()!;

  const {
    isLoading,
    isError,
    data: clients,
    error
  } = useQuery('clients', listClients, {
    refetchOnMount: true
  });

  const [clientsList, setClientsList] = useState<Array<any>>([]);
  
  const [startingDate, setStartingDate] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

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
      setClientsList(clientsDetails);
    }
  }, [clients]);

  const assignProgramToClientMutation = useMutation(assignProgramToClient, {
    onSuccess: async (data) => {
      dispatchAlert({
        type: "SUCCESS",
        message: `Program assigned to ${selectedClient?.name}!`
      });
      onClose();
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const handleAssign = () => {
    assignProgramToClientMutation.mutateAsync({
      id: params.id,
      client: {
        userId: selectedClient?.userId,
        fullName: selectedClient?.name,
        thumbnailImage: selectedClient?.thumbnailImage,
        startingDate
      }
    });
  };
  
  return (
    <Modal onClose={onClose} className="w-[500px] h-[500px]">
      <ModalHeader>
        <ModalTitle>
          Assign to Client
        </ModalTitle>
      </ModalHeader>
      <ModalContent>
        <div className="field mt-7">
          <FieldName>
            Assign to
          </FieldName>
          <AutoComplete
            placeholder="Select client"
            value={selectedClient}
            items={clientsList}
            onChange={(val) => {
              setSelectedClient(val)
            }}
            removeSelectedItem={(val) => setSelectedClient(null)}
          />
        </div>
        <div className="field mt-7">
          <FieldName>
            Starting date
          </FieldName>
          <DatePickerField
            value={startingDate}
            onChange={(val) => setStartingDate(val)}
          />
        </div>
      </ModalContent>
      <ModalFooter>
        <Button 
          className="w-full text-center"
          variant="contained"
          onClick={() => handleAssign()}
          loading={assignProgramToClientMutation?.isLoading}
        >
          Assign
        </Button>
      </ModalFooter>
    </Modal>
  );
};