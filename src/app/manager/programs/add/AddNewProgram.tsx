"use client";

import Header from "@/app/manager/Header";
import TextField from "@/components/global/TextField";
import TextArea from "@/components/global/TextArea";
import { useRouter } from "next/navigation";
import { addProgram } from "@/api/Program";
import { useMutation } from "react-query";
import FieldName from "@/components/global/FieldName";
import Container from "@/components/global/Container";
import useProgram from "@/store/Program/useProgram";
import { UseProgramContext } from "@/utils/programTypes";

export default function AddNewProgram() {
  const router = useRouter();
  const {
    programName,
    programDescription,
    programWeeks,
    setProgramName,
    setProgramDescription,
    setProgramWeeks
  }: UseProgramContext = useProgram()!;

  const addProgramMutation = useMutation(addProgram, {
    onSuccess: async (data) => {
      router.push(`/manager/programs/edit/${data.data.insertedId}?week=1`);
    },
    onError: (err) => {
      console.log(err);
    }
  });

  // submit form
  const handleSubmit = () => {
    // add weeks based on inputted number of weeks
    const initialWeeks: Array<any> = [];

    // increment on weeks and add the objects
    // data will look like this
    // [
    //   {
    //     name: `Week 1`,
    //     days: [
    //       { name: "Day 1", workouts: [] },
    //        ...
    //     ]
    //   },
    // ]
    Array.from({ length: parseInt(String(programWeeks)) }).forEach((_, index) => {
      const weekNumber = index + 1;
      const days = Array.from({ length: 7 }, (_, dayIndex) => {
        const dayNumber = index * 7 + dayIndex + 1;
        return {
          name: `Day ${dayNumber}`,
          dayCount: dayNumber,
          workouts: []
        };
      });

      const weekObject = {
        name: `Week ${weekNumber}`,
        days: days
      };

      initialWeeks.push(weekObject);
    });

    addProgramMutation.mutateAsync({
      name: programName,
      description: programDescription,
      weeks: initialWeeks,
      users: []
    });
  }

  // Validate form fields
  const isFormValid = programName !== "" && (programWeeks ?? 0) > 0;

  return (
    <>
      <Header
        pageTitle="Add New Program"
        backIcon
        backPath="/manager/programs"
        isLoading={addProgramMutation.isLoading}
        handleSubmit={() => handleSubmit()}
        disableSubmit={!isFormValid}
        showActionButtons
      />
      <Container>
        <div className="w-full md:w-[45%]">
          <div className="field-container">
            <FieldName required>
              Program name
            </FieldName>
            <TextField
              placeholder="e.g. Incline dumbbell press"
              value={programName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setProgramName?.(e.target.value)
              }}
            />
          </div>
          <div className="field-container mt-7">
            <FieldName>
              Description
            </FieldName>
            <TextArea 
              value={programDescription}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setProgramDescription?.(e.target.value)
              }}
            />
          </div>
          <div className="field-container mt-7 w-[100px]">
            <FieldName required>
              Weeks
            </FieldName>
            <TextField
              type="number"
              value={programWeeks}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setProgramWeeks?.(e.target.value)
              }}
            />
          </div>
        </div>
      </Container>
    </>
  );
}