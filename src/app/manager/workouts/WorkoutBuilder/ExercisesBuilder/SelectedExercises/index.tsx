import { useCallback, useState } from "react";
import useWorkout from "@/store/Workout/useWorkout";
import SelectedExercise from "./SelectedExercise";
import DragController from "./DragController";
import Superset from "./Superset";
import { IExercise } from "@/types/exercise";
import Circuit from "./Circuit";
import SelectedExerciseHeader from "./SelectedExercise/SelectedExerciseHeader";
import SelectedExerciseForm from "./SelectedExercise/SelectedExerciseForm";
import SelectedExerciseSets from "./SelectedExercise/SelectedExerciseSets";
import Modal, { ModalContent, ModalHeader } from "@/components/global/Modal";

interface ISelectedExerciseFactory {
  exercise: IExercise;
  exerciseType: string;
  exerciseIndex: number;
};

export default function SelectedExercises() {
  const { state } = useWorkout();
  const { selectedExercises } = state;

  const [showEditSets, setShowEditSets] = useState(false);
  const [currentEditedExerciseSet] = useState({
    exercise: "",
    exerciseType: "",
    exerciseIndex: 0,
    supersetIndex: 0,
    circuitIndex: 0
  });

  const [draggedExercise, setDraggedExercise] = useState<IExercise | null>(null);

  /**
   * @purpose To return a superset or normal "SelectedExercise" component
   * @note N/A
   */
   const selectedExerciseFactory = useCallback(
    ({ exercise, exerciseType, exerciseIndex }: ISelectedExerciseFactory) => {  
      switch(exerciseType) {
        case "superset":
          return (
            <Superset
              exerciseSecondaryId={exercise?.secondaryId}
              exerciseIndex={exerciseIndex}
            >
              {exercise.supersetExercises?.map((supersetExercise: IExercise, supersetIndex: number) => (
                <SelectedExercise>
                  {/* <SelectedExerciseHeader
                    exercise={supersetExercise}
                    showCheckInput={false}
                  />
                  <SelectedExerciseForm
                    exercise={supersetExercise}
                    exerciseType={exerciseType}
                    exerciseIndex={exerciseIndex}
                    supersetIndex={supersetIndex}
                  /> */}
                </SelectedExercise>
              ))}
            </Superset>
          );
        case "circuit":
          return (
            <Circuit
              exerciseSecondaryId={exercise?.secondaryId}
              exerciseIndex={exerciseIndex}
            >
              {exercise.circuitExercises?.map((circuitExercise: IExercise, circuitIndex: number) => (
                <SelectedExercise>
                  <SelectedExerciseHeader
                    exercise={circuitExercise}
                    showCheckInput={false}
                  />
                  <SelectedExerciseForm
                    exercise={circuitExercise}
                    exerciseType={exerciseType}
                    exerciseIndex={exerciseIndex}
                    circuitIndex={circuitIndex}
                  />
                </SelectedExercise>
              ))}
            </Circuit>
          );
        case "normal":
          return (
            <SelectedExercise>
              <SelectedExerciseHeader exercise={exercise} />
              <SelectedExerciseSets 
                exercise={exercise}
              />
              {/* <SelectedExerciseForm
                exercise={exercise}
                exerciseType={exerciseType}
                exerciseIndex={exerciseIndex}
              /> */}
            </SelectedExercise>
          );
      }
    },
    []
  );

  const findExerciseType = (exercise: IExercise) => {
    if(exercise.supersetExercises?.length) {
      return "superset";
    } else if (exercise.circuitExercises?.length) {
      return "circuit";
    } else {
      return "normal";
    }
  };
  
  return (
    <>
      {selectedExercises?.map((exercise: IExercise, exerciseIndex: number) => {
        return (
          <DragController
            key={exercise.secondaryId}
            exercise={exercise}
            exerciseIndex={exerciseIndex}
            draggedExercise={draggedExercise}
            handleDraggedExercise={(val) => {
              setDraggedExercise(val)
            }}
          >
            {selectedExerciseFactory({
              exercise,
              exerciseType: findExerciseType(exercise),
              exerciseIndex: exerciseIndex
            })}
          </DragController>
        );
      })}

      {showEditSets && (
        <Modal onClose={() => setShowEditSets(false)}>
          <ModalHeader>Edit sets</ModalHeader>
          <ModalContent>
            <SelectedExerciseForm {...currentEditedExerciseSet}/>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};