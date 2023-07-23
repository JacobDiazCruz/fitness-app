import { addCoachingPlan } from "@/api/CoachingPlan";
import Button from "@/components/global/Button";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import useAlert from "@/contexts/Alert";
import { useState } from "react";
import { useMutation } from "react-query";
import CoachingPlanForm from "./CoachingPlanForm";

interface Props {
  servicesList: any;
  refetchCoachingPlans: any;
  onClose: () => void;
};

export default function AddCoachingPlanModal({
  servicesList = [],
  refetchCoachingPlans,
  onClose
}: Props) {
  
  const { dispatchAlert }: any = useAlert();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<any>("");
  const [timeLength, setTimeLength] = useState<any>("");
  const [timeUnit, setTimeUnit] = useState<string>("Week/s");
  const [services, setServices] = useState(servicesList);

  const addCoachingPlanMutation = useMutation(addCoachingPlan, {
    onSuccess: async () => {
      dispatchAlert({
        type: "SUCCESS",
        message: "Coaching plan added successfully."
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

    addCoachingPlanMutation.mutateAsync({
      name,
      description,
      price: {
        currency: "PHP",
        value: price,
        timeLength,
        timeUnit
      },
      services: selectedServices
    });
  };

  return (
    <Modal onClose={onClose} className="w-[1000px] h-[650px]">
      <ModalHeader>
        <ModalTitle>
          Add Coaching Plan
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
            loading={addCoachingPlanMutation.isLoading}
          >
            Submit
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};