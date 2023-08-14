import Button from "@/components/global/Button";
import Modal, { ModalFooter } from "@/components/global/Modal";
import { IExercise } from "@/types/exercise";
import { useState } from "react";
import YourExercises from "../YourExercises";

interface Props {
  onClose: () => void;
};

export default function SelectExercisesModal({
  onClose
}: Props) {

  const [initialSelectedExercises, setInitialSelectedExercises] = useState<any>([]);

  return (
    <Modal
      className="mobile w-[90%] h-[95%] md:w-[400px]"
      onClose={onClose}
    >
      <div className="py-5 px-3">
        <YourExercises setInitialSelectedExercises={setInitialSelectedExercises}/>
      </div>
      <ModalFooter>
        <Button
          variant="contained"
          className="w-full"
          onClick={() => {
            // setSelectedExercises((prev: IExercise[]) => {
            //   const selected = initialSelectedExercises.filter((exercise: IExercise) => exercise.isSelected);
            //   return [...prev, ...selected];
            // });
            onClose();
          }}
        >
          Select
        </Button>
      </ModalFooter>
    </Modal>
  );
}