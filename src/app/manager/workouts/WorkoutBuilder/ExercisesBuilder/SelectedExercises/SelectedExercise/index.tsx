import { memo, ReactNode } from "react";
import SelectedExerciseForm from "./SelectedExerciseForm";
import SelectedExerciseHeader from "./SelectedExerciseHeader";

interface Props {
  children: ReactNode;
};

function SelectedExercise ({
  children
}: Props) {
  return (
    <div className="dark:border-neutral-800 border-gray-200 border border-solid overflow-hidden">
      {children}
    </div>
  );
};

export default memo(SelectedExercise);