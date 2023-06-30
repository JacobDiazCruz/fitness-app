import { memo, ReactNode, useEffect, useState } from "react";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import TextField from "@/components/global/TextField";
import Image from "next/image";
import { Exercise } from "@/utils/types";
import { AddIcon, TrashIcon } from "@/components/global/Icons";
import usePrimaryFocusColor from "@/hooks/usePrimaryFocusColor";
import IconButton from "@/components/global/IconButton";
import useWorkout from "@/contexts/Workout";
import VideoThumbnail from "@/components/global/VideoThumbnail";
import { borderColor, primaryBgColor, secondaryBgColor } from "@/utils/themeColors";

const SelectedExercise = ({
  exerciseType,
  name,
  sets,
  imageSrc,
  videoLink,
  onCheck,
  supersetIndex = 0,
  exerciseIndex,
  exerciseId,
  primaryFocus,
  handleRemoveExercise,
  checked,
  showCheckInput = true
}: any) => {
  const {
    handleAddExerciseSet,
    handleChangeSetField,
  } = useWorkout();
  const { handlePrimaryFocusColor } = usePrimaryFocusColor();
  const [selectedSet, setSelectedSet] = useState("");
  const [reps, setReps] = useState("");
  const [value, setValue] = useState("00:00");

  const formatTime = (time: number | string | null) => {
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
    field,
    exerciseIndex,
    setIndex
  }) => {
    const inputTime = value;
    const formattedTime = formatTime(inputTime);
    setValue(formattedTime);

    handleChangeSetField({
      value: formattedTime,
      field: "rest",
      supersetExerciseIndex: supersetIndex,
      exerciseIndex,
      setIndex
    })
  };

  const SetCount = ({ count }: { count: number }) => {
    return (
      <div className="md:hidden w-full flex items-center">
        <div className="w-[40%] text-white bg-blue-600 rounded-lg text-center">
          Set {count}
        </div>
        <div className="bg-blue-600 w-full h-[1px]"></div>
      </div>
    );
  };

  const FieldLabel = ({ children } : { children: ReactNode }) => {
    return (
      <p className="dark:text-neutral-50 text-darkTheme-950 md:mb-2">
        {children}
      </p>
    );
  }

  const Field = ({ children } : { children: ReactNode }) => {
    return (
      <div className="field w-full md:w-auto flex md:block items-center justify-between">
        {children}
      </div>
    );
  }

  return (
    <div className="dark:border-neutral-800 border-gray-200 border border-solid overflow-hidden">
      {/* Header */}
      <div className={`${borderColor} py-5 md:py-2 px-4 dark:bg-darkTheme-950 bg-gray-100 border-b h-auto md:h-[55px] flex justify-between items-center`}>
        <div className="flex gap-[10px] items-center">
          {showCheckInput && (
            <input
              checked
              id="checked-checkbox"
              type="checkbox"
              checked={checked}
              onChange={onCheck}
            />
          )}
          {videoLink && (
            <div className="w-[30%] md:w-[42px] relative overflow-hidden rounded-md cursor-pointer">
              <VideoThumbnail
                videoUrl={videoLink}
              />
            </div>
          )}
          <div className="md:flex md:gap-[15px]">
            <p className="dark:text-neutral-50 text-darkTheme-950">
              {name}
            </p>
            <div className={`${handlePrimaryFocusColor(primaryFocus)} w-fit mt-2 md:mt-0 rounded-md text-center px-2 text-[13px]`}>
              {primaryFocus}
            </div>
          </div>
        </div>
        <IconButton
          onClick={handleRemoveExercise}
        >
          <TrashIcon className="w-5 h-5 dark:text-white text-neutral-800" />
        </IconButton>
      </div>
      
      {/* Body */}
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
                      }
                    ]}
                    value={setType}
                    onChange={(value) => {
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
                <Field>
                  <FieldLabel>Reps</FieldLabel>
                  <TextField
                    value={reps}
                    type="number"
                    onChange={(e) => handleChangeSetField({
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
                    onChange={(e) => handleTimeChange({
                      value: e.target.value,
                      field: "reps",
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
                      onClick={() => handleAddExerciseSet(
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
    </div>
  );
}

export default memo(SelectedExercise);