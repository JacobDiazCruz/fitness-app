import { Dispatch, SetStateAction } from "react";
import { Exercise } from "./types";

export interface HandleChangeSetFieldParams {
  value?: any;
  field?: any;
  supersetExerciseIndex?: number;
  exerciseIndex?: number;
  setIndex?: number;
};

export interface WorkoutContext {
  setSelectedExercises?: Dispatch<SetStateAction<any>>;
  onDropFromExercises?: (e: React.DragEvent<HTMLDivElement>) => void;
  handleMergeSuperset?: void;
  handleUnmergeSuperset?: (exerciseSecondaryId: string) => void;
  handleAddExerciseSet?: (exerciseType: string, index: number, supersetIndex: number) => void;
  handleChangeSetField?: ({
    value,
    field,
    supersetExerciseIndex,
    exerciseIndex,
    setIndex
  }: HandleChangeSetFieldParams) => void;
  hookNewExerciseToSuperset?: (
    hookType: 'next' | 'prev',
    exerciseSecondaryId?: string,
    supersetIndex?: number
  ) => void;
  selectedExercises?: Exercise[];
};