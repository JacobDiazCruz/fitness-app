import usePrimaryFocusColor from "@/hooks/usePrimaryFocusColor";
import { borderColor, secondaryTextColor } from "@/utils/themeColors";

export default function ExerciseItem({
  children,
  isExerciseDone,
  currentSecondaryId,
  exercise
}: any) {
  const { handlePrimaryFocusColor } = usePrimaryFocusColor();

  return (
    <div className={`${isExerciseDone(exercise) && "opacity-[0.5]"} my-2 relative p-2 w-full border relative rounded-lg ${exercise.secondaryId === currentSecondaryId ? "border-blue-500 dark:blue-300 bg-blue-50 dark:bg-blue-950" : borderColor}`}>
      <div className={`${secondaryTextColor} text-[13px]`}>
        {exercise.name}
      </div>
      <div className={`${handlePrimaryFocusColor(exercise.primaryFocus)} w-fit rounded-lg px-1 mt-1 text-[10px]`}>
        {exercise.primaryFocus}
      </div>
      {children}
    </div>
  );
};