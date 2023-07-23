import { addCoachingPlan, editCoachingPlan } from "@/api/CoachingPlan";
import useAlert from "@/contexts/Alert";
import useCoachingPlan from "@/contexts/CoachingPlan/useCoachingPlan";
import useCoachingService from "@/contexts/CoachingService/useCoachingService";
import Big from "big.js";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";

export default function useCoachingPlanForm() {
  const {
    coachingServices
  }: any = useCoachingService();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<any>("");
  const [grossPrice, setGrossPrice] = useState<any>("");
  const [timeLength, setTimeLength] = useState<any>("");
  const [timeUnit, setTimeUnit] = useState<string>("Week/s");
  const [services, setServices] = useState([]);

  useEffect(() => {
    if(coachingServices?.length) {
      setServices(coachingServices);
    }
  }, [coachingServices]);

  useEffect(() => {
    return () => {
      setName("");
      setDescription("");
      setTotalPrice("");
      setGrossPrice("");
      setTimeLength("");
      setTimeUnit("Week/s");
      setServices([]);
    };
  }, []);

  useEffect(() => {
    const subTotalPrice = new Big(grossPrice || 0);
    const commissionPercentage = subTotalPrice.times(0.15);
    const totalPrice = subTotalPrice.plus(commissionPercentage);

    setTotalPrice(totalPrice);
  }, [grossPrice]);

  const addCoachingPlanMutation = useMutation(addCoachingPlan, {
    onSuccess: async () => {
      // dispatchAlert({
      //   type: "SUCCESS",
      //   message: "Coaching plan added successfully."
      // })
      // refetchCoachingPlans();
      // onClose();
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const editCoachingPlanMutation = useMutation(editCoachingPlan, {
    onSuccess: async () => {
      // dispatchAlert({
      //   type: "SUCCESS",
      //   message: "Coaching plan edited successfully."
      // })
      // refetchCoachingPlans();
      // onClose();
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
    const selectedServices = services
      .filter((service: any) => service.isSelected)
      .map((service: any) => {
        return {
          _id: service._id,
          title: service.title
        }
      });
    
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
        timeLength,
        timeUnit,
        services: selectedServices
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

  return {
    form: {
      name,
      description,
      timeUnit,
      timeLength,
      grossPrice,
      totalPrice
    },
    services,
    setName,
    setTotalPrice,
    setGrossPrice,
    setTimeUnit,
    setTimeLength,
    setDescription,
    setServices,
    submitForm,
    isLoadingAddMutation: addCoachingPlanMutation.isLoading,
    isLoadingEditMutation: editCoachingPlanMutation.isLoading
  };
};