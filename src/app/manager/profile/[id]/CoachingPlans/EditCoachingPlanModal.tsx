import { getCoachingPlan } from "@/api/CoachingPlan";
import Button from "@/components/global/Button";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import { useEffect } from "react";
import { useQuery } from "react-query";
import CoachingPlanForm from "./CoachingPlanForm";
import useCoachingPlanForm from "@/contexts/CoachingPlan/useCoachingPlanForm";

interface Props {
  selectedPlanId: string;
  onClose: () => void;
};

export default function EditCoachingPlanModal({
  selectedPlanId,
  onClose
}: Props) {
  const {
    setName,
    setGrossPrice,
    setTotalPrice,
    setTimeUnit,
    setTimeLength,
    setNumberOfSessions,
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
      setNumberOfSessions(coachingPlan.numberOfSessions);
      setTimeLength(coachingPlan.timeLength);
      setTimeUnit(coachingPlan.timeUnit);
      setServices(coachingPlan.services);
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