import { useCallback, useState } from "react";
import useWorkout from "@/store/Workout/useWorkout";
import SelectedExercise from "./SelectedExercise";
import DragController from "./DragController";
import Superset from "./Superset";
import { ExerciseType, IExercise } from "@/types/exercise";
import Circuit from "./Circuit";
import SelectedExerciseHeader from "./SelectedExercise/SelectedExerciseHeader";
import SelectedExerciseForm from "./SelectedExercise/SelectedExerciseForm";
import SelectedExerciseSets from "./SelectedExercise/SelectedExerciseSets";
import Modal, { ModalContent, ModalFooter, ModalHeader } from "@/components/global/Modal";
import { primaryTextColor } from "@/utils/themeColors";
import Button from "@/components/global/Button";

interface ISelectedExerciseFactory {
  exercise: IExercise;
  exerciseType: string;
  exerciseIndex: number;
};

interface IEditSet {
  exercise: IExercise;
  exerciseType: ExerciseType;
  exerciseIndex: number;
  supersetIndex?: number;
  circuitIndex?: number;
};

export default function SelectedExercises() {
  const { state } = useWorkout();
  const { selectedExercises } = state;

  const [currentEditedExerciseSet, setCurrentEditedExerciseSet] = useState<IEditSet>(
    // @ts-ignore
    null
  );
  
  const [showEditSets, setShowEditSets] = useState(false);
  const [draggedExercise, setDraggedExercise] = useState<IExercise | null>(null);

  const handleEditSets = (data: IEditSet) => {
    setCurrentEditedExerciseSet(data);
    setShowEditSets(true);
  };

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
                  <SelectedExerciseHeader
                    exercise={supersetExercise}
                    showCheckInput={false}
                    handleEditSets={() => {
                      handleEditSets({
                        exercise: supersetExercise,
                        exerciseType,
                        exerciseIndex,
                        supersetIndex
                      })
                    }}
                  />
                  <SelectedExerciseSets exercise={supersetExercise} />
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
                    handleEditSets={() => {
                      handleEditSets({
                        exercise: circuitExercise,
                        exerciseType,
                        exerciseIndex,
                        circuitIndex: circuitIndex
                      })
                    }}
                  />
                  <SelectedExerciseSets exercise={circuitExercise} />
                </SelectedExercise>
              ))}
            </Circuit>
          );
        case "normal":
          return (
            <SelectedExercise>
              <SelectedExerciseHeader 
                exercise={exercise}
                handleEditSets={() => {
                  handleEditSets({
                    exercise,
                    exerciseType,
                    exerciseIndex
                  })
                }}
              />
              <SelectedExerciseSets exercise={exercise} />
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
        <Modal className="w-[700px] h-[80%]" onClose={() => setShowEditSets(false)}>
          <ModalHeader>
            <div className={`${primaryTextColor}`}>Edit sets</div>
          </ModalHeader>
          <ModalContent>
            <SelectedExerciseForm {...currentEditedExerciseSet} />
          </ModalContent>
          <ModalFooter>
            <div className="flex justify-between">
              <Button className="ml-auto">
                Save
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};