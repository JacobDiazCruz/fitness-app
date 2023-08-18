import { useState } from "react";
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

interface IDynamicExerciseRenderer {
  exercise: any;
  exerciseType: any;
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
    supersetIndex: null,
    note: null
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
  };

  /**
   * @purpose To return a superset, circuit, or normal exercise component
   * @note if you have an additional exercise type, just add it in the componentMap
   */
  const DynamicExerciseRenderer = ({
    exercise,
    exerciseIndex,
    exerciseType
  }: IDynamicExerciseRenderer) => {
    const groupFieldName = `${exerciseType}Exercises`;
    const groupIndexName = `${exerciseType}Index`

    const componentMap: any = {
      "superset": Superset,
      "circuit": Circuit
    };

    const GroupExercise = componentMap[exerciseType];

    if(exerciseType === "normal") {
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
              handleEditNote({
                exerciseIndex,
                note: exercise.instruction
              });
            }}
          />
        </SelectedExercise>
      );
    }

    return (
      <GroupExercise
        exerciseSecondaryId={exercise?.secondaryId}
        exerciseIndex={exerciseIndex}
      >
        {exercise[groupFieldName]?.map((groupExercise: IExercise, groupExerciseIndex: number) => (
          <SelectedExercise>
            <SelectedExerciseHeader
              exercise={groupExercise}
              showCheckInput={false}
              handleEditSets={() => {
                handleEditSets({
                  exercise: groupExercise,
                  exerciseType,
                  exerciseIndex,
                  [groupIndexName]: groupExerciseIndex
                })
              }}
            />
            <SelectedExerciseBody
              exercise={groupExercise}
              exerciseType={exerciseType}
              handleShowEditNote={() => {
                handleEditNote({
                  exerciseIndex,
                  note: groupExercise.instruction,
                  [groupIndexName]: groupExerciseIndex
                });
              }}
            />
          </SelectedExercise>
        ))}
      </GroupExercise>
    )
  };

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
            <DynamicExerciseRenderer 
              exercise={exercise}
              exerciseType={findExerciseType(exercise)}
              exerciseIndex={exerciseIndex}
            />
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
              supersetIndex: null,
              note: null
            })
          }}
          currentEditedExercise={currentEditedExercise}
        />
      )}
    </>
  );
};