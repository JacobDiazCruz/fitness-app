import FieldName from "@/components/global/FieldName";
import { ExerciseType, IExercise } from "@/types/exercise";
import { borderColor, tertiaryBgColor, tertiaryTextColor } from "@/utils/themeColors";

interface Props {
  exercise: IExercise;
  exerciseType: ExerciseType;
  handleShowEditNote: () => void;
};

export default function SelectedExerciseBody({
  exercise,
  exerciseType,
  handleShowEditNote
}: Props) {
  const { sets } = exercise;

  return (
    <div className={`w-full p-5 dark:bg-neutral-800 bg-neutral-50`}>
      {/* Sets table */}
      <div>
        <div className="flex gap-[50px] items-center p-2">
          <div className="flex-1">
            <FieldName>
              Set
            </FieldName>
          </div>
          <div className="flex-1">
            <FieldName>
              {exerciseType === "circuit" ? "Time" : "Reps"}
            </FieldName>
          </div>
          <div className="flex-1">
            <FieldName>
              Rest
            </FieldName>
          </div>
        </div>
        {sets?.map((set: any, index: number) => (
          <div key={index} className={`flex gap-[50px] items-center border-t ${borderColor} rounded-md py-1 px-3`}>
            <div className="flex-1">
              <FieldName>{index + 1}</FieldName>
            </div>
            <div className="flex-1">
              <FieldName>
                {exerciseType === "circuit" ? set.time : set.reps}
              </FieldName>
            </div>
            <div className="flex-1">
              <FieldName>{set.rest}</FieldName>
            </div>
          </div>
        ))}
      </div>
      
      {/* Note */}
      <div 
        className={`mt-2 ${tertiaryBgColor} py-2 px-3 rounded-md`}
        onClick={handleShowEditNote}
      >
        <div className={`${tertiaryTextColor} text-[14px]`}>
          {exercise.instruction || "Add note for this exercise"}
        </div>
      </div>
    </div>
  );
};