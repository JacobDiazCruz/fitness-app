import Button from "@/components/global/Button";
import FieldName from "@/components/global/FieldName";
import Modal, { ModalContent, ModalFooter } from "@/components/global/Modal";
import TextArea from "@/components/global/TextArea";
import useWorkout from "@/store/Workout/useWorkout";
import { IExercise } from "@/types/exercise";
import { useState } from "react";

interface Props {
  onClose: () => void;
  currentEditedExercise: any;
};

export default function EditNoteModal({
  onClose,
  currentEditedExercise
}: Props) {
  const {
    exerciseIndex,
    circuitIndex,
    supersetIndex
  } = currentEditedExercise;

  const { state, dispatch } = useWorkout();
  const { selectedExercises } = state;

  const [note, setNote] = useState<string>("");

  const saveNote = () => {
    const selectedExercisesCopy = [...selectedExercises];
    let exercise: IExercise;
  
    const isValidCircuitIndex = currentEditedExercise.circuitIndex !== null && currentEditedExercise.circuitIndex >= 0;
    const isValidSupersetIndex = currentEditedExercise.supersetIndex !== null && currentEditedExercise.supersetIndex >= 0;
  
    if (isValidCircuitIndex) {
      exercise = selectedExercisesCopy[exerciseIndex]?.circuitExercises[circuitIndex];
    } else if (isValidSupersetIndex) {
      exercise = selectedExercisesCopy[exerciseIndex]?.supersetExercises[supersetIndex];
    } else {
      exercise = selectedExercisesCopy[exerciseIndex];
    }

    if (exercise) {
      exercise.instruction = note;
    }
  
    dispatch({
      type: "SET_SELECTED_EXERCISES",
      data: selectedExercisesCopy
    });
    onClose();
  };

  return (
    <Modal className="w-[700px] h-[260px]" onClose={onClose} persist>
      <ModalContent>
        <FieldName>Edit note</FieldName>
        <TextArea
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
          placeholder="Add note for this exercise"
        />
      </ModalContent>
      <ModalFooter>
        <div className="flex justify-between">
          <Button
            className="ml-auto"
            onClick={() => {
              saveNote();
            }}
          >
            Save
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};