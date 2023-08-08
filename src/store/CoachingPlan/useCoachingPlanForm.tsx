import { addCoachingPlan, editCoachingPlan } from "@/api/CoachingPlan";
import useCoachingService from "@/store/CoachingService/useCoachingService";
import Big from "big.js";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import useAlert from "../Alert";
import useCoachingPlan from "./useCoachingPlan";

const CoachingPlanFormContext = createContext(null);

export const CoachingPlanFormProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const { dispatchAlert }: any = useAlert();
  const {
    refetchCoachingPlans,
    setShowAddCoachingPlan,
    setShowEditCoachingPlan
  }: any = useCoachingPlan();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<any>("");
  const [grossPrice, setGrossPrice] = useState<number>(0);
  const [numberOfSessions, setNumberOfSessions] = useState<string>("");
  const [timeLength, setTimeLength] = useState<any>("");
  const [timeUnit, setTimeUnit] = useState<string>("Week/s");
  const [services, setServices] = useState([]);

  useEffect(() => {
    const totalPrice = new Big(grossPrice);
    setTotalPrice(totalPrice);
  }, [grossPrice]);

  const addCoachingPlanMutation = useMutation(addCoachingPlan, {
    onSuccess: async () => {
      dispatchAlert({
        type: "SUCCESS",
        message: "Coaching plan added successfully."
      })
      refetchCoachingPlans();
      setShowAddCoachingPlan(false);
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const editCoachingPlanMutation = useMutation(editCoachingPlan, {
    onSuccess: async () => {
      dispatchAlert({
        type: "SUCCESS",
        message: "Coaching plan edited successfully."
      })
      refetchCoachingPlans();
      setShowEditCoachingPlan(false);
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const submitForm = ({
    type,
    selectedPlanId = ""
  }: {
    type: string;
    selectedPlanId?: string;
  }) => {
    const data = {
      name,
      description,
      grossPrice: {
        currency: "PHP",
        value: grossPrice
      },
      totalPrice: {
        currency: "PHP",
        value: totalPrice
      },
      numberOfSessions,
      timeLength,
      timeUnit,
      services
    };

    if(type === "ADD") {
      addCoachingPlanMutation.mutateAsync(data);
    } else {
      editCoachingPlanMutation.mutateAsync({
        planId: selectedPlanId,
        data
      });
    }
  };

  const value = {
    form: {
      name,
      description,
      timeUnit,
      timeLength,
      grossPrice,
      services,
      numberOfSessions,
      totalPrice
    },
    setName,
    setTotalPrice,
    setNumberOfSessions,
    setGrossPrice,
    setTimeUnit,
    setTimeLength,
    setDescription,
    setServices,
    submitForm,
    isLoadingAddMutation: addCoachingPlanMutation.isLoading,
    isLoadingEditMutation: editCoachingPlanMutation.isLoading
  };

  return (
    <CoachingPlanFormContext.Provider value={value}>
      {children}
    </CoachingPlanFormContext.Provider>
  );
};

const useCoachingPlanForm = () => {
  const context = useContext(CoachingPlanFormContext)
  if (context === undefined) {
    throw new Error("useCoachingPlanForm must be used within the CoachingPlanFormProvider context")
  }
  return context;
};

export default useCoachingPlanForm;