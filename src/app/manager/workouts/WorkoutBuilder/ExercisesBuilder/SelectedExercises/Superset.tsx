import React, { ReactNode } from "react";
import Button from "@/components/global/Button";
import { CubeTransparentIcon } from "@/components/global/Icons";
import useWorkout from "@/contexts/Workout";

export default function Superset({
  children
}: {
  children: ReactNode;
}) {

  return (
    <div className="border-[2px] relative cursor-grab border-solid dark:border-blue-900 border-blue-500 rounded-lg overflow-hidden mt-5">
      {children}
    </div>
  );
};

export const SupersetHeader = ({
  exerciseSecondaryId
}: {
  exerciseSecondaryId?: string;
}) => {
  const {
    handleUnmergeSuperset
  }: any = useWorkout();

  return (
    <div className="bg-blue-100 dark:bg-blue-950 px-5 py-3 flex justify-between">
      <div className="flex gap-[10px] items-center">
        <CubeTransparentIcon className="text-blue-950 dark:text-blue-50 w-4 h-4" />
        <p className="text-blue-950 dark:text-blue-50 font-normal">
          Superset
        </p>
      </div>
      <div>
        <Button
          variant="outlined"
          className="mr-2"
          startIcon={<CubeTransparentIcon />}
          onClick={() => handleUnmergeSuperset(exerciseSecondaryId)}
        >
          Unmerge Superset
        </Button>
      </div>
    </div>
  );
}

Superset.Header = SupersetHeader;