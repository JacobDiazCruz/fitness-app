import { editProgram } from "@/api/Program";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import useLocalStorage from "./useLocalStorage";

export default function useEditProgram() {
  const router = useRouter();

  // data
  const programId = useLocalStorage("programId");
  const programName = useLocalStorage("programName");
  const programDescription = useLocalStorage("programDescription");
  const programWeeks = JSON.parse(useLocalStorage("programWeeks"));
  const programWorkoutSecondaryId = useLocalStorage("programWorkoutSecondaryId");

  // indeces
  const programWeekIndex = useLocalStorage("programWeekIndex");
  const programDayIndex = useLocalStorage("programDayIndex");
  const programWorkoutIndex = useLocalStorage("programWorkoutIndex");

  // Mutate edit program
  const editProgramMutation = useMutation(editProgram, {
    onSuccess: async (data) => {
      router.back();
    },
    onError: (err) => {
      console.log(err);
    }
  });

  // Handler for edit mutation
  const handleMutateProgram = (updatedWeeks: Array<any>) => {
    editProgramMutation.mutateAsync({
      id: programId,
      data: {
        name: programName,
        description: programDescription,
        weeks: updatedWeeks
      }
    });
  };

  return {
    programWeeks,
    programWeekIndex,
    programDayIndex,
    programWorkoutIndex,
    programWorkoutSecondaryId,
    handleMutateProgram,
    isLoadingEditProgram: editProgramMutation.isLoading
  }
}