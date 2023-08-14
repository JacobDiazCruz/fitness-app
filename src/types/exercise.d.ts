import { Dispatch, SetStateAction } from "react";

interface IExerciseFormSection {
  section: string;
  fields: IExerciseFormField[];
};

interface IExerciseFormField {
  label: string;
  subLabel?: string;
  fieldName: string;
  fieldType: string;
  placeholder?: string;
  value: any;
  items?: string[];
  validator?: Array<any>;
};

interface IExerciseStore {
  isExerciseFormValid: boolean;
  initialFilesList: string[];
  setInitialFilesList: Dispatch<any>;
  exerciseForm: IExerciseFormSection[];
  setExerciseForm: Dispatch<SetStateAction<IExerciseFormSection[]>>;
  primaryFocusItems: string[];
  categoryItems: string[];
  setCategoryItems: Dispatch<string[]>;
};

interface IExercise {
  _id?: string;
  secondaryId?: string;
  userId?: string;
  name: string;
  primaryFocus: string;
  category: string;
  videoLink: string;
  instruction: string;
  sets?: any;
  files?: string[];
  checked?: boolean;
  isSelected?: boolean;
  supersetExercises?: Array<any>;
  circuitExercises?: Array<any>;
  createdAt?: string;
  updatedAt?: string;
}

export type ExerciseType = "superset" | "circuit" | "normal";