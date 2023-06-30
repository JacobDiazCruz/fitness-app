import { memo, useEffect, useState } from "react";
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

  return (
    <div className="dark:border-neutral-800 border-gray-200 border border-solid overflow-hidden">
      <div className={`${borderColor} py-2 px-4 dark:bg-darkTheme-950 bg-gray-100 border-b h-[55px] flex justify-between items-center`}>
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
            <div className="w-[42px] relative overflow-hidden rounded-md cursor-pointer">
              <VideoThumbnail
                videoUrl={videoLink}
              />
            </div>
          )}
          <div>
            <p className="dark:text-neutral-50 text-darkTheme-950">
              {name}
            </p>
          </div>
          <div className={`${handlePrimaryFocusColor(primaryFocus)} rounded-md text-center px-2 text-[13px]`}>
            {primaryFocus}
          </div>
        </div>
        <IconButton
          onClick={handleRemoveExercise}
        >
          <TrashIcon className="w-5 h-5 dark:text-white text-neutral-800" />
        </IconButton>
      </div>
      <div className={`dark:bg-darkTheme-800 bg-white px-6`}>
        {sets?.map((set: any, setIndex: number) => {
          const {setType, reps, rest} = set;
          return (
            <div key={setIndex} className="flex gap-[15px] py-6">
              <div className="field">
                <p className="dark:text-neutral-50 text-darkTheme-950 mb-2">Set</p>
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
              </div>
              <div className="field">
                <p className="dark:text-neutral-50 text-darkTheme-950 mb-2">
                  Reps
                </p>
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
              </div>
              <div className="field">
                <p className="dark:text-neutral-50 text-darkTheme-950 mb-2">
                  Rest
                </p>
                <TextField
                  onChange={(e) => handleTimeChange({
                    value: e.target.value,
                    field: "reps",
                    exerciseIndex,
                    setIndex
                  })}
                  value={rest}
                />
              </div>
              <div>
                <p className="invisible mb-2">Actions</p>
                {setIndex == sets.length - 1 && (
                  <Button
                    startIcon={<AddIcon />}
                    className="border border-style border-[#EBEDFF] bg-[#EBEDFF] text-[#000E8D]"
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(SelectedExercise);