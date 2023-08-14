import FieldName from "@/components/global/FieldName";
import { IExercise } from "@/types/exercise";
import { borderColor, secondaryBgColor, tertiaryBgColor } from "@/utils/themeColors";

interface Props {
  exercise: IExercise;
};

export default function SelectedExerciseSets({
  exercise
}: Props) {
  const { sets } = exercise;

  return (
    <div className={`w-full p-5 dark:bg-neutral-800 bg-neutral-50`}>
      <div>
        <div className="flex gap-[50px] items-center p-2">
          <div className="flex-1">
            <FieldName>
              Set
            </FieldName>
          </div>
          <div className="flex-1">
            <FieldName>
              Reps
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
              <FieldName>{set.reps}</FieldName>
            </div>
            <div className="flex-1">
              <FieldName>{set.rest}</FieldName>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};