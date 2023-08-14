import { memo, ReactNode, useEffect, useRef, useState } from "react";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import TextField from "@/components/global/TextField";
import { AddIcon } from "@/components/global/Icons";
import { ExerciseType, IExercise } from "@/types/exercise";
import { IHandleChangeSetFieldParams } from "@/types/workout";
import useWorkout from "@/store/Workout/useWorkout";
import useSelectedExerciseController from "@/hooks/workouts/useSelectedExerciseController";

interface SelectedExerciseFormProps {
  exercise: IExercise;
  exerciseType: ExerciseType;
  supersetIndex?: number;
  circuitIndex?: number;
  exerciseIndex: number;
};
interface HandleTimeChangeParams {
  e: any;
  exerciseIndex: number;
  field: string;
  setIndex: number;
};

const SelectedExerciseForm = ({
  exercise,
  exerciseType,
  supersetIndex = 0,
  circuitIndex = 0,
  exerciseIndex
}: any) => {
  const { state, dispatch } = useWorkout();
  const { selectedExercises } = state;
  const { sets } = exercise;

  const {
    handleAddExerciseSet
  } = useSelectedExerciseController();

  const inputRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(0);

  const formatTime = (time: string) => {
    // Remove any non-digit characters
    const digitsOnly = time.replace(/\D/g, "");

    // Extract hours and minutes
    const hours = digitsOnly.slice(0, 2);
    const minutes = digitsOnly.slice(2, 4);

    // Format the time as "HH:MM"
    return `${hours}:${minutes}`;
  };

  const handleChangeSetField = ({
    value,
    field,
    supersetExerciseIndex = 0,
    circuitExerciseIndex = 0,
    exerciseIndex = 0,
    setIndex = 0
  }: IHandleChangeSetFieldParams) => {
    const selectedExercisesCopy = [...selectedExercises];
    const exercise = selectedExercisesCopy[exerciseIndex];

    let updatedSets = [];
    if (exercise.supersetExercises && exercise.supersetExercises.length > 0) {
      const supersetExercise = exercise.supersetExercises[supersetExerciseIndex];
      updatedSets = [...supersetExercise.sets];
      supersetExercise.sets = updatedSets;
    } else if (exercise.circuitExercises && exercise.circuitExercises.length > 0) {
      const circuitExercise = exercise.circuitExercises[circuitExerciseIndex];
      updatedSets = [...circuitExercise.sets];
      circuitExercise.sets = updatedSets;
    } else {
      updatedSets = [...exercise.sets];
      exercise.sets = updatedSets;
    }

    updatedSets[setIndex] = {
      ...updatedSets[setIndex],
      [field]: value
    };

    dispatch({
      type: "SET_SELECTED_EXERCISES",
      data: selectedExercisesCopy
    });
  };

  const handleTimeChange = ({
    e,
    exerciseIndex,
    field,
    setIndex
  }: HandleTimeChangeParams) => {
    const input = e.target;
    const inputTime = input.value;
    const formattedTime = formatTime(inputTime);

    // Store cursor position
    setCursorPosition(input.selectionStart);

    // Update state with new value
    handleChangeSetField({
      value: formattedTime,
      field,
      supersetExerciseIndex: supersetIndex,
      exerciseIndex,
      setIndex
    });

    // Set the cursor position without using setTimeout
    input.selectionStart = cursorPosition;
    input.selectionEnd = cursorPosition;
  };

  useEffect(() => {
    // After a re-render, restore focus and cursor position
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.selectionStart = cursorPosition;
      inputRef.current.selectionEnd = cursorPosition;
    }
  });

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
        const {setType, reps, rest, time = "00:00"} = set;

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
                    handleChangeSetField({
                      value,
                      field: "setType",
                      supersetExerciseIndex: supersetIndex,
                      exerciseIndex,
                      setIndex
                    })
                  }}
                />
              </Field>
              {exerciseType === "circuit" ? (
                <Field>
                  <FieldLabel>Time</FieldLabel>
                  <div className="md:w-[100px]">
                    <TextField
                      value={time}
                      type="number"
                      onChange={(e) => {
                        handleChangeSetField({
                          value: e.target.value,
                          field: "time",
                          circuitExerciseIndex: circuitIndex,
                          exerciseIndex,
                          setIndex
                        });
                      }}
                    />
                  </div>
                </Field>
              ) : (
                <Field>
                  <FieldLabel>Reps</FieldLabel>
                  <TextField
                    value={reps}
                    type="number"
                    onChange={(e) => {
                      e.persist();
                      handleChangeSetField({
                        value: e.target.value,
                        field: "reps",
                        supersetExerciseIndex: supersetIndex,
                        exerciseIndex,
                        setIndex
                      })
                    }}
                  />
                </Field>
              )}
              <Field>
                <FieldLabel>Rest</FieldLabel>
                <div className="md:w-[100px]">
                  <TextField
                    inputRef={inputRef}
                    onChange={(e: any) => {
                      e.persist();
                      handleTimeChange({
                        e,
                        field: "rest",
                        exerciseIndex,
                        setIndex
                      });
                    }}
                    value={rest}
                  />
                </div>
              </Field>
              <Field>
                {setIndex == sets.length - 1 && (
                  <Button
                    startIcon={<AddIcon />}
                    className="w-full md:mt-8 md:w-auto border border-style border-[#EBEDFF] bg-[#EBEDFF] text-[#000E8D]"
                    variant="outlined"
                    onClick={() => {
                      handleAddExerciseSet(
                        exerciseType, 
                        exerciseIndex,
                        supersetIndex
                      )}
                    }
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

export default SelectedExerciseForm;