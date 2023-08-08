import Button from "@/components/global/Button";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import useCoachingPlanForm from "@/store/CoachingPlan/useCoachingPlanForm";
import CoachingPlanForm from "./CoachingPlanForm";
interface Props {
  onClose: () => void;
};

export default function AddCoachingPlanModal({
  onClose
}: Props) {

  const {
    submitForm,
    isLoadingAddMutation
  }: any = useCoachingPlanForm();

  return (
    <Modal onClose={onClose} className="w-[1100px] h-[650px]">
      <ModalHeader>
        <ModalTitle>
          Add Coaching Plan
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
              type: "ADD"
            })}
            loading={isLoadingAddMutation}
          >
            Submit
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};