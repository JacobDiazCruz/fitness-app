import { useState } from "react";
import useWorkout from "@/store/Workout/useWorkout";
import SelectedExercise from "./SelectedExercise";
import DragController from "./DragController";
import Superset from "./Superset";
import { WorkoutContext } from "@/utils/workoutTypes";
import { IExercise } from "@/types/exercise";

interface ISelectedExerciseFactory {
  exercise: IExercise;
  exerciseType: string;
  exerciseIndex: number;
};

export default function SelectedExercises() {
  const {
    selectedExercises
  }: WorkoutContext = useWorkout();

  const [draggedExercise, setDraggedExercise] = useState<IExercise | null>(null);

  /**
   * @purpose To return a superset or normal "SelectedExercise" component
   * @note N/A
   */
  const selectedExerciseFactory = ({
    exercise,
    exerciseType,
    exerciseIndex
  }: ISelectedExerciseFactory) => {

    if (exerciseType === "superset") {
      return (
        <Superset
          exerciseSecondaryId={exercise?.secondaryId}
          exerciseIndex={exerciseIndex}
        >
          {exercise.supersetExercises?.map((supersetExercise: IExercise, supersetIndex: number) => (
            <SelectedExercise>
              <SelectedExercise.Header
                exercise={supersetExercise}
                showCheckInput={false}
              />
              <SelectedExercise.Form
                exercise={supersetExercise}
                exerciseType={exerciseType}
                exerciseIndex={exerciseIndex}
                supersetIndex={supersetIndex}
              />
            </SelectedExercise>
          ))}
        </Superset>
      );
    } else if (exerciseType === "normal") {
      return (
        <SelectedExercise>
          <SelectedExercise.Header exercise={exercise} />
          <SelectedExercise.Form
            exercise={exercise}
            exerciseType={exerciseType}
            exerciseIndex={exerciseIndex}
          />
        </SelectedExercise>
      );
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
              exerciseType: 
                exercise.supersetExercises?.length
                  ? "superset"
                    : "normal",
              exerciseIndex: exerciseIndex
            })}
          </DragController>
        );
      })}
    </>
  );
};