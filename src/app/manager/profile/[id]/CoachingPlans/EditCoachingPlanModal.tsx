import { editCoachingPlan, getCoachingPlan } from "@/api/CoachingPlan";
import Button from "@/components/global/Button";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import useAlert from "@/contexts/Alert";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import CoachingPlanForm from "./CoachingPlanForm";

interface Props {
  servicesList: any;
  selectedPlanId: string;
  refetchCoachingPlans: any;
  onClose: () => void;
};

export default function EditCoachingPlanModal({
  servicesList,
  refetchCoachingPlans,
  selectedPlanId,
  onClose
}: Props) {
  
  const { dispatchAlert }: any = useAlert();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<any>("");
  const [timeLength, setTimeLength] = useState<any>("");
  const [timeUnit, setTimeUnit] = useState<string>("Week/s");
  const [services, setServices] = useState([]);

  // get coaching plans
  const {
    data: coachingPlan,
    refetch
  } = useQuery('coachingPlan', () => getCoachingPlan(selectedPlanId), {
    refetchOnWindowFocus: false,
    refetchOnMount: true
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if(coachingPlan) {
      setName(coachingPlan.name);
      setDescription(coachingPlan.description);
      setPrice(coachingPlan.price.value);
      setTimeUnit(coachingPlan.price.timeLength);
      setTimeUnit(coachingPlan.price.timeUnit);

      const updatedServicesList = servicesList.map((service: any) => {
        const isSelected = coachingPlan.services.some(
          (coachingService: any) => coachingService._id === service._id
        );
      
        // Update the isSelected property of the service
        return { ...service, isSelected };
      });
      
      if(updatedServicesList.length) {
        setServices(updatedServicesList);
      } else {
        setServices(servicesList);
      }
    }
  }, [coachingPlan]);

  const editCoachingPlanMutation = useMutation(editCoachingPlan, {
    onSuccess: async () => {
      dispatchAlert({
        type: "SUCCESS",
        message: "Coaching plan edited successfully."
      })
      refetchCoachingPlans();
      onClose();
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const submitForm = () => {
    const selectedServices = services
      .filter((service: any) => service.isSelected)
      .map((service: any) => {
        return {
          _id: service._id,
          title: service.title
        }
      });
      
    editCoachingPlanMutation.mutateAsync({
      planId: selectedPlanId,
      data: {
        name,
        description,
        price: {
          currency: "PHP",
          value: price,
          timeLength,
          timeUnit
        },
        services: selectedServices
      }
    });
  };

  return (
    <Modal onClose={onClose} className="w-[1000px] h-[650px]">
      <ModalHeader>
        <ModalTitle>
          Edit Coaching Plan
        </ModalTitle>
      </ModalHeader>
      <ModalContent>
        <CoachingPlanForm 
          form={{
            name,
            description,
            timeUnit,
            timeLength,
            price
          }}
          services={services}
          setName={setName}
          setPrice={setPrice}
          setTimeUnit={setTimeUnit}
          setTimeLength={setTimeLength}
          setDescription={setDescription}
          setServices={setServices}
        />
      </ModalContent>
      <ModalFooter>
        <div className="flex">
          <Button 
            className="ml-auto"
            onClick={() => submitForm()}
            loading={editCoachingPlanMutation.isLoading}
          >
            Submit
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};