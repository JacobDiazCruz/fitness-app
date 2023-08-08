import { addProgramWorkouts, editProgram, getProgram } from "@/api/Program";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "react-query";

export default function useAddProgramWorkout() {
  const router = useRouter();
  const searchParams: any = useSearchParams();

  // add program workout essentials
  const programId = searchParams.get("programId");
  const weekId: string = searchParams.get("weekId");
  const dayIndex: number = parseInt(searchParams.get("dayIndex"));
  const dayCount: number = parseInt(searchParams.get("dayCount"));
  const positionIndex: number = parseInt(searchParams.get("positionIndex"));

  const addProgramWorkoutsMutation = useMutation(addProgramWorkouts);
  const editProgramMutation = useMutation(editProgram);

  // Get program data
  const {
    isError: isErrorFetchingProgram,
    data: programData,
  } = useQuery('program', () => {
    if(programId) {
      return getProgram(programId);
    }
  }, {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: false
  });

  /**
   * @purpose To add a new program workout and insert it to the program data
   * @step1 add a program workout first using addProgramWorkoutsMutation
   * @step2 insert/push the latest added program workout to the days data
   * @step3 edit the actual program with the updated days data
   * @step4 redirect back to the edit program page
   * @param workoutName
   * @param workoutDescription
   * @param selectedExercises
   */
  const buildProgramWorkout = async (
    workoutName: string,
    workoutDescription: string,
    selectedExercises: any
  ) => {
    /** @step1 */
    const addResult = await addProgramWorkoutsMutation.mutateAsync({
      workouts: [
        {
          name: workoutName,
          description: workoutDescription,
          exercises: selectedExercises,
          programDetails: {
            programId,
            weekId,
            dayIndex,
            dayCount,
            positionIndex
          }
        }
      ]
    });
    
    /** @step2 */
    const newProgramData = {...programData};
    const days = newProgramData.weeks[parseInt(weekId) - 1].days;

    const daysWithWorkoutIds = days.map((day: any) => {
      const workoutIds = day.workouts.map((workout: any) => {
        return workout._id;
      });
      return { ...day, workouts: workoutIds };
    });

    daysWithWorkoutIds[dayIndex].workouts.push(addResult.data?.data[0]._id);

    /** @step3 */
    editProgramMutation.mutateAsync({
      id: programId,
      data: {
        weekIndex: parseInt(weekId) - 1,
        days: daysWithWorkoutIds
      }
    });

    /** @step4 */
    router.push(`/manager/programs/edit/${programId}?week=${weekId}`);
  }

  return {
    programId,
    buildProgramWorkout
  };
}