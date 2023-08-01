import { Dispatch, SetStateAction } from "react";
import { IExercise } from "./exercise";

interface IWorkout {
  _id?: string;
  userId?: string;
  name: string;
  exercises: Exercise[];
  description?: string;
  createdAt?: string;
}

interface IHandleChangeSetFieldParams {
  value?: any;
  field?: any;
  supersetExerciseIndex?: number;
  exerciseIndex?: number;
  setIndex?: number;
}

interface IUseWorkout {
  setSelectedExercises?: Dispatch<SetStateAction<any>>;
  onDropFromExercises?: (e: React.DragEvent<HTMLDivElement>) => void;
  handleMergeSuperset?: () => void;
  handleUnmergeSuperset?: (exerciseSecondaryId: string) => void;
  handleAddExerciseSet?: (exerciseType: ExerciseType, index: number, supersetIndex: number) => void;
  handleChangeSetField?: ({
    value,
    field,
    supersetExerciseIndex,
    exerciseIndex,
    setIndex
  }: HandleChangeSetFieldParams) => void;
  hookNewExerciseToSuperset?: (
    hookType: 'next' | 'prev',
    exerciseSecondaryId?: any,
    supersetIndex?: any
  ) => void;
  selectedExercises?: IExercise[];
}

type ExerciseType = "superset" | "normal";