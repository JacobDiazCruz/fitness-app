import Button from "@/components/global/Button";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import useCoachingServiceForm, { UseCoachingServiceForm } from "@/contexts/CoachingService/useCoachingServiceForm";
import { Dispatch, SetStateAction } from "react";
import CoachingServiceForm from "./CoachingServiceForm";

interface Props {
  onClose: () => Dispatch<SetStateAction<boolean>>;
};

export default function AddCoachingServiceModal({
  onClose
}: Props) {

  const {
    saveForm,
    isLoadingAddCoachingService
  }: UseCoachingServiceForm = useCoachingServiceForm()!;
  
  return (
    <Modal className="w-[950px] h-[800px]" onClose={onClose}>
      <ModalHeader>
        <ModalTitle>
          Edit Coaching Services
        </ModalTitle>
      </ModalHeader>
      <ModalContent>
        <CoachingServiceForm />
      </ModalContent>
      <ModalFooter>
        <div className="flex justify-between">
          <div></div>
          <Button
            variant="contained"
            onClick={saveForm}
            loading={isLoadingAddCoachingService}
          >
            Save
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};