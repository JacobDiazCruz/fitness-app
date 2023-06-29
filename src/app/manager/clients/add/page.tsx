'use client';

import Button from "@/components/global/Button";
import Container from "@/components/global/Container";
import TextField from "@/components/global/TextField";
import Header from "@/app/manager/Header";
import { primaryTextColor } from "@/utils/themeColors";
import { useMutation } from "react-query";
import { addClient } from "@/api/Client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAlert from "@/contexts/Alert";
import FieldName from "@/components/global/FieldName";

interface ClientForm {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
};

export default function AddNewClient () {
  const router = useRouter();
  const { dispatchAlert } = useAlert();
  const [clientForm, setClientForm] = useState<ClientForm>({
    firstName: "",
    lastName: "",
    email: "",
    contact: ""
  });

  const addClientMutation = useMutation(addClient, {
    onSuccess: async (data) => {
      router.push('/manager/clients');
      dispatchAlert({
        type: "SUCCESS",
        message: "Client created successfully"
      });
    },
    onError: (err) => {
      console.log(err);
    }
  });

  return (
    <div className="add-new-client">
      <Header
        pageTitle="Add New Client"
        backIcon
        backPath="/manager/clients"
        showActionButtons
        isLoading={addClientMutation.isLoading}
        handleSubmit={() => addClientMutation.mutateAsync(clientForm)}
      />
      <Container>
        <div className="flex gap-[20px] w-full md:w-[700px] flex-col md:flex-row">
          <div className="w-full md:w-[50%]">
            <FieldName>
              First name
            </FieldName>
            <TextField
              placeholder="First name"
              className="h-[49px]"
              value={clientForm.firstName}
              onChange={(e) => setClientForm(prev => ({
                ...prev,
                firstName: e.target.value
              }))}
            />
          </div>
          <div className="w-full md:w-[50%]">
            <FieldName>
              Last name
            </FieldName>
            <TextField
              placeholder="Last name"
              className="h-[49px]"
              value={clientForm.lastName}
              onChange={(e) => setClientForm(prev => ({
                ...prev,
                lastName: e.target.value
              }))}
            />
          </div>
        </div>
        <div className="w-full md:w-[700px] mt-7">
          <FieldName>
            Email address
          </FieldName>
          <TextField
            placeholder="e.g. johndoe@email.com"
            className="h-[49px]"
            value={clientForm.email}
            onChange={(e) => setClientForm(prev => ({
              ...prev,
              email: e.target.value
            }))}
          />
        </div>
        <div className="w-full md:w-[700px] mt-7">
          <FieldName>
            Contact number
          </FieldName>
          <TextField
            placeholder="xxxxxxxxx"
            className="h-[49px]"
            value={clientForm.contact}
            onChange={(e) => setClientForm(prev => ({
              ...prev,
              contact: e.target.value
            }))}
          />
        </div>
      </Container>
    </div>
  );
}