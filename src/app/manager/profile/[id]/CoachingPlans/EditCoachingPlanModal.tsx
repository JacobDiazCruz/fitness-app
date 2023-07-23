import { getCoachingPlan } from "@/api/CoachingPlan";
import Button from "@/components/global/Button";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import { useEffect } from "react";
import { useQuery } from "react-query";
import CoachingPlanForm from "./CoachingPlanForm";
import useCoachingPlanForm from "@/contexts/CoachingPlan/useCoachingPlanForm";
import useCoachingService from "@/contexts/CoachingService/useCoachingService";

interface Props {
  selectedPlanId: string;
  onClose: () => void;
};

export default function EditCoachingPlanModal({
  selectedPlanId,
  onClose
}: Props) {

  const {
    coachingServices
  }: any = useCoachingService();
  
  const {
    setName,
    setGrossPrice,
    setTotalPrice,
    setTimeUnit,
    setTimeLength,
    isLoadingEditMutation,
    setDescription,
    setServices,
    submitForm
  }: any = useCoachingPlanForm();

  // get coaching plans
  const {
    data: coachingPlan,
    refetch: refetchCoachingPlan
  } = useQuery('coachingPlan', () => getCoachingPlan(selectedPlanId), {
    refetchOnWindowFocus: false,
    refetchOnMount: true
  });

  useEffect(() => {
    refetchCoachingPlan();
  }, []);

  useEffect(() => {
    if(coachingPlan) {
      setName(coachingPlan.name);
      setDescription(coachingPlan.description);
      setGrossPrice(coachingPlan.grossPrice.value);
      setTotalPrice(coachingPlan.totalPrice.value);
      setTimeLength(coachingPlan.timeLength);
      setTimeUnit(coachingPlan.timeUnit);

      const updatedServicesList = coachingServices.map((service: any) => {
        const isSelected = coachingPlan.services.some(
          (coachingService: any) => coachingService._id === service._id
        );
      
        // Update the isSelected property of the service
        return { ...service, isSelected };
      });
      
      if(updatedServicesList.length) {
        setServices(updatedServicesList);
      }
    }
  }, [coachingPlan]);

  return (
    <Modal onClose={onClose} className="w-[1100px] h-[650px]">
      <ModalHeader>
        <ModalTitle>
          Edit Coaching Plan
        </ModalTitle>
      </ModalHeader>
      <ModalContent>
        <CoachingPlanForm />
      </ModalContent>
      <ModalFooter>
        <div className="flex">
          <Button 
            className="ml-auto"
            onClick={() => submitForm({
              type: "EDIT",
              selectedPlanId
            })}
            loading={isLoadingEditMutation}
          >
            Submit
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};