import { useCallback, useState } from "react";
import useWorkout from "@/store/Workout/useWorkout";
import SelectedExercise from "./SelectedExercise";
import DragController from "./DragController";
import Superset from "./Superset";
import { ExerciseType, IExercise } from "@/types/exercise";
import Circuit from "./Circuit";
import SelectedExerciseHeader from "./SelectedExercise/SelectedExerciseHeader";
import SelectedExerciseBody from "./SelectedExercise/SelectedExerciseBody";
import EditSetModal from "./SelectedExercise/EditSetModal";
import EditNoteModal from "./SelectedExercise/EditNoteModal";

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
  const [currentEditedExercise, setCurrentEditedExercise] = useState({
    exerciseIndex: null,
    circuitIndex: null,
    supersetIndex: null
  });
  
  const [showEditSets, setShowEditSets] = useState(false);
  const [showEditNote, setShowEditNote] = useState(false);
  const [draggedExercise, setDraggedExercise] = useState<IExercise | null>(null);

  const handleEditSets = (data: IEditSet) => {
    setCurrentEditedExerciseSet(data);
    setShowEditSets(true);
  };

  const handleEditNote = (data: any) => {
    setCurrentEditedExercise((prev) => ({
      ...prev,
      ...data
    }));
    setShowEditNote(true);
  }

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
                  <SelectedExerciseBody 
                    exercise={supersetExercise} 
                    exerciseType={exerciseType}
                    handleShowEditNote={() => {
                      handleEditNote({ 
                        exerciseIndex,
                        supersetExercise
                      });
                    }}
                  />
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
                  <SelectedExerciseBody 
                    exercise={circuitExercise} 
                    exerciseType={exerciseType}
                    handleShowEditNote={() => {
                      handleEditNote({ 
                        exerciseIndex,
                        circuitIndex
                      });
                    }}
                  />
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
              <SelectedExerciseBody 
                exercise={exercise} 
                exerciseType={exerciseType}
                handleShowEditNote={() => {
                  handleEditNote({ exerciseIndex });
                }}
              />
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
              setDraggedExercise(val);
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
        <EditSetModal
          onClose={() => setShowEditSets(false)}
          currentEditedExerciseSet={currentEditedExerciseSet}
        />
      )}

      {showEditNote && (
        <EditNoteModal
          onClose={() => {
            setShowEditNote(false);
            setCurrentEditedExercise({
              exerciseIndex: null,
              circuitIndex: null,
              supersetIndex: null
            })
          }}
          currentEditedExercise={currentEditedExercise}
        />
      )}
    </>
  );
};