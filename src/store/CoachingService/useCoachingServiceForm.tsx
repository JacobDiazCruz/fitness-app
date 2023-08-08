import { addCoachingService, getCoachingServices } from "@/api/CoachingService";
import { useParams } from "next/navigation";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import useAlert from "../Alert";

const CoachingServiceFormContext = createContext(null);

export interface UseCoachingServiceForm {
  form: {
    title: string;
    description: string;
  },
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  saveForm: () => void;
  isLoadingAddCoachingService: boolean;
};

export const CoachingServiceFormProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const params = useParams();
  const { dispatchAlert }: any = useAlert();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const addCoachingServiceMutation = useMutation(addCoachingService, {
    onSuccess: async () => {
      dispatchAlert({
        type: "SUCCESS",
        message: "Coaching service added successfully."
      });
      // refetchProfile();
      onClose();
    }
  });

  const saveForm = async () => {
    try {
      await addCoachingServiceMutation.mutateAsync({
        title,
        description
      });
    } catch(err) {
      console.log(err);
    }
  };

  const value: UseCoachingServiceForm = {
    form: {
      title,
      description
    },
    setTitle,
    setDescription,
    saveForm,
    isLoadingAddCoachingService: addCoachingServiceMutation.isLoading
  }

  return (
    <CoachingServiceFormContext.Provider value={value}>
      {children}
    </CoachingServiceFormContext.Provider>
  );
};

const useCoachingServiceForm = () => {
  const context = useContext(CoachingServiceFormContext)
  if (context === undefined) {
    throw new Error("useCoachingServiceForm must be used within the CoachingServiceFormContext context")
  }
  return context;
};

export default useCoachingServiceForm;