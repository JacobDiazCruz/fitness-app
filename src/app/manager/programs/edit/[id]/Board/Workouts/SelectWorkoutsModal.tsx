import { useEffect, useState } from "react";
import { SearchIcon } from "@/components/global/Icons";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import TextField from "@/components/global/TextField";
import Button from "@/components/global/Button";
import { useQuery } from "react-query";
import { listWorkouts } from "@/api/Workout";
import {
  primaryTextColor, 
  secondaryTextColor
} from "@/utils/themeColors";
import { useParams, useSearchParams } from "next/navigation";
import { useMutation } from "react-query";
import { addProgramWorkouts } from "@/api/Program";
import useProgram from "@/store/Program/useProgram";
import { UseProgramContext, UseProgramWorkoutsContext } from "@/utils/programTypes";
import useProgramWorkouts from "@/store/Program/useProgramWorkouts";

interface Props {
  onClose: () => void;
};

export default function SelectWorkoutsModal({ 
  onClose
}: Props) {
  const params = useParams();
  const searchParams = useSearchParams();
  const weekId = searchParams.get("week");

  const [searchVal, setSearchVal] = useState<string>("");
  const [workouts, setWorkouts] = useState<Array<any>>([]);

  const {
    weeks,
    handleEditProgramMutation,
    setProgramDays
  }: UseProgramContext = useProgram()!;

  const {
    selectedDayIndex,
    selectedDayCount
  }: UseProgramWorkoutsContext = useProgramWorkouts()!;

  const { 
    data: initialWorkouts,
  } = useQuery('workouts', listWorkouts, {
    refetchOnMount: true
  });

  const addProgramWorkoutsMutation = useMutation(addProgramWorkouts, {
    onSuccess: async (data) => {
      if(data) {
        return data;
      }
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
  const handleSubmit = async () => {
    const selectedWorkouts = workouts?.filter((workout) => workout.selected).map((workout, index) => ({
      ...workout,
      programDetails: {
        programId: params.id,
        weekId,
        dayIndex: selectedDayIndex,
        dayCount: selectedDayCount,
        positionIndex: index
      }
    }));

    const addResult = await addProgramWorkoutsMutation.mutateAsync({
      workouts: selectedWorkouts
    });

    setProgramDays?.((prevProgramDays: any) => {
      const cloneProgramDays = [...prevProgramDays];
      cloneProgramDays[selectedDayIndex ?? 0].workouts = [
        ...cloneProgramDays[selectedDayIndex ?? 0].workouts,
        ...addResult.data.data
      ];
      return cloneProgramDays;
    });

    handleEditProgramMutation?.(weeks);
    onClose();
  };

  return (
    <Modal onClose={onClose} className="w-[350px] h-[80%]">
      <ModalHeader>
        <ModalTitle>
          Select a Workout
        </ModalTitle>
      </ModalHeader>
      <ModalContent>
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
      </ModalContent>
      <ModalFooter>
        <Button 
          className="w-full text-center" 
          variant="contained"
          onClick={() => handleSubmit()}
        >
          Select
        </Button>
      </ModalFooter>
    </Modal>
  );
};