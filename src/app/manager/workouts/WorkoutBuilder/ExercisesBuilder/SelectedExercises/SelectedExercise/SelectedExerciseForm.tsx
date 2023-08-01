import { memo, ReactNode } from "react";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import TextField from "@/components/global/TextField";
import { AddIcon } from "@/components/global/Icons";
import useWorkout from "@/contexts/Workout/useWorkout";
import { IExercise } from "@/types/exercise";

interface SelectedExerciseFormProps {
  exercise: IExercise;
  exerciseType: "superset" | "normal";
  supersetIndex?: number;
  exerciseIndex: number;
}

interface HandleTimeChangeParams {
  value: any;
  exerciseIndex: number;
  field: string;
  setIndex: number;
}

const SelectedExerciseForm = ({
  exercise,
  exerciseType,
  supersetIndex = 0,
  exerciseIndex
}: SelectedExerciseFormProps) => {
  const { sets } = exercise;
  const {
    handleAddExerciseSet,
    handleChangeSetField
  } = useWorkout();

  const formatTime = (time: string) => {
    // Remove any non-digit characters
    const digitsOnly = time.replace(/\D/g, "");

    // Extract hours and minutes
    const hours = digitsOnly.slice(0, 2);
    const minutes = digitsOnly.slice(2, 4);

    // Format the time as "HH:MM"
    return `${hours}:${minutes}`;
  };

  const handleTimeChange = ({
    value,
    exerciseIndex,
    field,
    setIndex
  }: HandleTimeChangeParams) => {
    const inputTime = value;
    const formattedTime = formatTime(inputTime);

    handleChangeSetField?.({
      value: formattedTime,
      field,
      supersetExerciseIndex: supersetIndex,
      exerciseIndex,
      setIndex
    });
  };

  const SetCount = ({ count }: { count: number }) => {
    return (
      <div className="md:hidden w-full flex items-center">
        <div className="w-[40%] text-blue-500 bg-blue-950 rounded-lg text-center">
          Set {count}
        </div>
        <div className="bg-blue-500 w-full h-[1px]"></div>
      </div>
    );
  };

  const FieldLabel = ({ children } : { children: ReactNode }) => {
    return (
      <p className="dark:text-neutral-50 text-darkTheme-950 md:mb-2">
        {children}
      </p>
    );
  };

  const Field = ({ children } : { children: ReactNode }) => {
    return (
      <div className="field w-full md:w-auto flex md:block items-center justify-between">
        {children}
      </div>
    );
  };

  return (
    <div className={`dark:bg-darkTheme-800 bg-white px-6 py-6`}>
      {sets?.map((set: any, setIndex: number) => {
        const {setType, reps, rest} = set;
        return (
          <>
            <SetCount count={setIndex + 1} />
            <div
              key={setIndex}
              className={`flex flex-wrap md:flex-nowrap w-full gap-[15px] pt-7 md:pt-4`}
            >
              <Field>
                <FieldLabel>Set</FieldLabel>
                <AutoComplete
                  items={[
                    {
                      name: "Dropset"
                    },
                    {
                      name: "Time-Under Tension"
                    }
                  ]}
                  value={setType}
                  onChange={(value: any) => {
                    handleChangeSetField?.({
                      value,
                      field: "setType",
                      supersetExerciseIndex: supersetIndex,
                      exerciseIndex,
                      setIndex
                    })
                  }}
                />
              </Field>
              <Field>
                <FieldLabel>Reps</FieldLabel>
                <TextField
                  value={reps}
                  type="number"
                  onChange={(e) => handleChangeSetField?.({
                    value: e.target.value,
                    field: "reps",
                    supersetExerciseIndex: supersetIndex,
                    exerciseIndex,
                    setIndex
                  })}
                />
              </Field>
              <Field>
                <FieldLabel>Rest</FieldLabel>
                <TextField
                  onChange={(e) => handleTimeChange?.({
                    value: e.target.value,
                    field: "rest",
                    exerciseIndex,
                    setIndex
                  })}
                  value={rest}
                />
              </Field>
              <Field>
                {setIndex == sets.length - 1 && (
                  <Button
                    startIcon={<AddIcon />}
                    className="w-full md:mt-8 md:w-auto border border-style border-[#EBEDFF] bg-[#EBEDFF] text-[#000E8D]"
                    variant="outlined"
                    onClick={() => handleAddExerciseSet?.(
                      exerciseType, 
                      exerciseIndex,
                      supersetIndex
                    )}
                  >
                    Add a set
                  </Button>
                )}
              </Field>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default memo(SelectedExerciseForm);