import { Dispatch, SetStateAction } from "react";

export interface ExerciseForm {
  name: string;
  primaryFocus: {
    name: string
  };
  category: {
    name: string
  };
  instruction: string;
  videoLink: string;
  files: Array<any>;
};

export interface ExerciseContext {
  initialFilesList: Array<any>;
  setInitialFilesList: Dispatch<SetStateAction<any>>;
  exerciseForm: ExerciseForm;
  setExerciseForm: Dispatch<SetStateAction<ExerciseForm>>;
  primayFocusItems: any;
  setPrimaryFocusItems: Dispatch<SetStateAction<any>>;
  categoryItems: any;
  setCategoryItems: Dispatch<SetStateAction<any>>;
};