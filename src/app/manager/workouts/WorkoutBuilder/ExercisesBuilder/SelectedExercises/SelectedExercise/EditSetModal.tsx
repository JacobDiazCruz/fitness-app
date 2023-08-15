import Button from "@/components/global/Button";
import Modal, { ModalContent, ModalFooter, ModalHeader } from "@/components/global/Modal";
import { primaryTextColor } from "@/utils/themeColors";
import SelectedExerciseForm from "./EditSetForm";

interface Props {
  onClose: () => void;
  currentEditedExerciseSet: any;
};

export default function EditSetModal({
  onClose,
  currentEditedExerciseSet
}: Props) {
  return (
    <Modal className="w-[700px] h-[80%]" onClose={onClose}>
      <ModalHeader>
        <div className={`${primaryTextColor}`}>Edit sets</div>
      </ModalHeader>
      <ModalContent>
        <SelectedExerciseForm {...currentEditedExerciseSet} />
      </ModalContent>
      <ModalFooter>
        <div className="flex justify-between">
          <Button
            className="ml-auto"
            onClick={onClose}
          >
            Save
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};