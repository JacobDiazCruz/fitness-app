import { useEffect, useState } from "react";
import { CloseIcon, SearchIcon } from "@/components/global/Icons";
import Modal from "@/components/global/Modal";
import TextField from "@/components/global/TextField";
import Button from "@/components/global/Button";

import { useQuery } from "react-query";
import { listWorkouts } from "@/api/Workout";
import {
  primaryTextColor, 
  secondaryTextColor,
  borderColor,
  secondaryBgColor
} from "@/utils/themeColors";

export default function SelectWorkoutModal({ 
  onClose,
  setSelectedWorkouts,
  setProgramDays,
  selectedDayIndex
}: any) {
  const [searchVal, setSearchVal] = useState<string>("");
  const [workouts, setWorkouts] = useState([]);

  const { 
    isLoading, 
    isError,
    data: initialWorkouts,
    error
  } = useQuery('workouts', listWorkouts, {
    refetchOnMount: true
  });

  const toggleWorkoutSelection = (index: number) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[index].selected = !updatedWorkouts[index].selected;
    setWorkouts(updatedWorkouts);
  };

  // search filter
  useEffect(() => {
    const filteredWorkouts = initialWorkouts?.filter((workout) =>
      workout.name.toLowerCase().includes(searchVal.toLowerCase())
    ).map((workout) => ({
      ...workout,
      secondaryId: Math.random()
    }));
  
    setWorkouts(filteredWorkouts);
  }, [searchVal, initialWorkouts]);
  
  // triggered on click of "Select" button
  const handleSelectWorkouts = () => {
    const selectedWorkouts = workouts?.filter((workout) => workout.selected);
    setSelectedWorkouts(selectedWorkouts);

    setProgramDays(prevProgramDays => {
      const cloneProgramDays = [...prevProgramDays];
      cloneProgramDays[selectedDayIndex].workouts = [
        ...cloneProgramDays[selectedDayIndex].workouts,
        ...selectedWorkouts
      ];
      return cloneProgramDays;
    });

    onClose();
  };

  return (
    <Modal onClose={onClose} className="w-[350px] h-[80%] p-7">
      <div className="flex justify-between">
        <h2 className={`${primaryTextColor} font-semibold`}>
          Select a Workout
        </h2>
        <button onClick={onClose}>
          <CloseIcon className="w-5 h-5 dark:text-neutral-400 text-neutral-600" />
        </button>
      </div>
      <div className="workouts-list mt-6">
        <TextField 
          startIcon={
            <SearchIcon className={`${secondaryTextColor} w-4 h-4`} />
          } 
          placeholder="Search workout"
          value={searchVal}
          className="bg-gray-100"
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <p className={`${secondaryTextColor} text-[13px] mt-4 mb-2`}>
          {workouts?.length} workouts
        </p>
        {workouts?.map((workout, index) => (
          <div
            className={`
              ${borderColor}
              rounded-lg cursor-pointer mb-3 border border-solid p-3 w-full 
              ${workout.selected ? "dark:bg-neutral-800 bg-indigo-50 border-indigo-700" : ""
            }`}
            key={workout.name}
            onClick={() => toggleWorkoutSelection(index)}
          >
            <h3 className={`${primaryTextColor} font-medium text-[14px]`}>
              {workout.name}
            </h3>
            <p className={`${secondaryTextColor} font-regular text-gray-500 mt-1 text-[13px]`}>
              {workout?.exercises.length} Exercises
            </p>
          </div>
        ))}
      </div>
      <div className={`${secondaryBgColor} modal-footer absolute left-0 bottom-0 w-full p-4`}>
        <Button 
          className="w-full text-center" 
          variant="contained"
          onClick={() => handleSelectWorkouts()}
        >
          Select
        </Button>
      </div>
    </Modal>
  );
}