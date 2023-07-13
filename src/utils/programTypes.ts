import { Dispatch, SetStateAction } from "react";

export interface Program {
  _id?: string;
  ownerId: string;
  users: Array<any>;
  name: string;
  description: string;
  weeks: number;
  workouts: Array<any>;
  createdAt?: number;
};

export interface UseProgramContext {
  programName?: string;
  programDescription?: string;
  programWeeks?: number | null;
  programDays?: any;
  weeks?: any;
  setProgramName?: Dispatch<SetStateAction<string>>;
  setProgramDescription?: Dispatch<SetStateAction<string>>;
  setProgramWeeks?: Dispatch<SetStateAction<string | number | null>>;
  setProgramDays?: Dispatch<SetStateAction<any>>;
  setWeeks?: Dispatch<SetStateAction<any>>;
  handleEditProgramMutation?: () => void;
};

export interface UseProgramWorkoutsContext {
  programWorkouts?: any;
  setProgramWorkouts?: Dispatch<SetStateAction<any>>;
  refetchProgramWorkouts?: any;
  editProgramWorkoutMutation?: any;
  isLoadingProgramWorkouts?: boolean;
  showAddWorkoutModal?: boolean;
  showWorkoutDetailsModal?: boolean;
  currentWorkoutDetails?: any;
  selectedDayIndex?: number | null;
  setSelectedDayIndex?: Dispatch<SetStateAction<number | null>>;
  setShowAddWorkoutModal?: Dispatch<SetStateAction<boolean>>;
  setShowWorkoutDetailsModal?: Dispatch<SetStateAction<boolean>>;
  setCurrentWorkoutDetails?: Dispatch<SetStateAction<any>>;
  handleDeleteWorkout?: (workout: any, dayIndex: number) => void;
  handleClickWorkout?: (workout: any, dayIndex: number) => void;
  handleEditWorkout?: (
    workoutId?: any,
    workoutSecondaryId?: string,
    workoutIndex?: number,
    dayIndex?: number
  ) => void;
};

export interface UseDraggableWorkoutContext {
  draggedWorkout?: any;
  setDraggedWorkout?: Dispatch<SetStateAction<any>>;
  onDropWorkout?: (e: any, dayIndex: number) => void;
  onDragEnter?: any;
};

export interface ProgramExercise {
  _id?: string;
  secondaryId?: string;
  category?: string;
  createdAt?: string;
  name: string;
  primaryFocus?: string;
  files?: string[];
  instruction?: string;
  videoLink?: string;
  supersetExercises?: ProgramSupersetExercise[];
  sets?: ExerciseSet[];
};

export interface ProgramSupersetExercise {
  _id?: string;
  secondaryId?: string;
  category?: string;
  createdAt?: string;
  name: string;
  primaryFocus?: string;
  files?: Array<string>;
  instruction?: string;
  videoLink?: string;
  sets?: ExerciseSet[];
};

export interface ExerciseSet {
  reps: string | number | null;
  rest: string | null;
  setType: {
    name: string
  };
};
