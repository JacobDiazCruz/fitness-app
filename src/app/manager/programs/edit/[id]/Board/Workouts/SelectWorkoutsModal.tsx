import { useEffect, useState } from "react";
import { SearchIcon } from "@/components/global/Icons";
import Modal from "@/components/global/Modal";
import TextField from "@/components/global/TextField";
import Button from "@/components/global/Button";
import { useQuery } from "react-query";
import { listWorkouts } from "@/api/Workout";
import {
  primaryTextColor, 
  secondaryTextColor,
  secondaryBgColor
} from "@/utils/themeColors";
import { useParams } from "next/navigation";
import { useMutation } from "react-query";
import { editProgram } from "@/api/Program";
import useProgram from "@/contexts/Program/useProgram";
import { UseProgramContext, UseProgramWorkoutsContext } from "@/utils/programTypes";
import useProgramWorkouts from "@/contexts/Program/useProgramWorkouts";

interface Props {
  onClose: () => void;
  setSelectedWorkouts: any;
};

export default function SelectWorkoutsModal({ 
  onClose,
  setSelectedWorkouts
}: Props) {
  const [searchVal, setSearchVal] = useState<string>("");
  const [workouts, setWorkouts] = useState<Array<any>>([]);
  const params = useParams();

  const {
    weeks,
    programName,
    programDescription,
    setProgramDays
  }: UseProgramContext = useProgram()!;

  const {
    selectedDayIndex
  }: UseProgramWorkoutsContext = useProgramWorkouts()!;

  const { 
    isLoading,
    data: initialWorkouts,
  } = useQuery('workouts', listWorkouts, {
    refetchOnMount: true
  });

  const editProgramMutation = useMutation(editProgram, {
    onSuccess: async (data) => {
      return data;
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const toggleWorkoutSelection = (index: number) => {
    const updatedWorkouts: Array<any> = [...workouts];
    updatedWorkouts[index].selected = !updatedWorkouts[index].selected;
    setWorkouts(updatedWorkouts);
  };

  // search filter
  useEffect(() => {
    const filteredWorkouts = initialWorkouts?.filter((workout: any) =>
      workout.name.toLowerCase().includes(searchVal.toLowerCase())
    ).map((workout: any) => ({
      ...workout
    }));
  
    setWorkouts(filteredWorkouts);
  }, [searchVal, initialWorkouts]);
  
  // triggered on click of "Select" button
  const handleSelectWorkouts = () => {
    const selectedWorkouts = workouts?.filter((workout) => workout.selected).map((workout) => ({
      ...workout,
      secondaryId: Math.random()
    }));
    setSelectedWorkouts(selectedWorkouts);

    setProgramDays?.((prevProgramDays: any) => {
      const cloneProgramDays = [...prevProgramDays];
      cloneProgramDays[selectedDayIndex ?? 0].workouts = [
        ...cloneProgramDays[selectedDayIndex ?? 0].workouts,
        ...selectedWorkouts
      ];
      return cloneProgramDays;
    });

    editProgramMutation.mutateAsync({
      id: params.id,
      data: {
        name: programName,
        description: programDescription,
        weeks
      }
    });

    onClose();
  };

  return (
    <Modal onClose={onClose} className="w-[350px] h-[80%] p-7">
      <div className="flex justify-between">
        <h2 className={`${primaryTextColor} font-semibold`}>
          Select a Workout
        </h2>
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
              rounded-lg cursor-pointer mb-3 border border-solid p-3 w-full dark:bg-darkTheme-900
              ${workout.selected ? "dark:border-blue-500 bg-indigo-50" : "dark:border-neutral-700"
            }`}
            key={workout.name}
            onClick={() => toggleWorkoutSelection(index)}
          >
            <h3 className={`${primaryTextColor} font-medium text-[14px]`}>
              {workout.name}
            </h3>
            <p className={`${secondaryTextColor} font-regular text-gray-500 mt-1 text-[13px]`}>
              {workout?.exercises?.length} Exercises
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
};