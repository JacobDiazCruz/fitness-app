import { ReactNode } from "react";

interface Props {
  children: ReactNode;
};

export default function SelectedExercise ({
  children
}: Props) {
  return (
    <div className="dark:border-neutral-800 border-gray-200 border border-solid overflow-hidden">
      {children}
    </div>
  );
};