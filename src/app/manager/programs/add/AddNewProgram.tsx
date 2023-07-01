'use client'

import { useState } from "react";
import Header from "@/app/manager/Header";
import Button from "@/components/global/Button";
import TextField from "@/components/global/TextField";
import TextArea from "@/components/global/TextArea";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@/components/global/Icons";
import { primaryTextColor, secondaryBgColor } from "@/utils/themeColors";
import { addProgram } from "@/api/Program";
import { useMutation } from "react-query";
import useAlert from "@/contexts/Alert";
import FieldName from "@/components/global/FieldName";
import Container from "@/components/global/Container";

export default function AddNewProgram() {
  const router = useRouter();
  const [programId, setProgramId] = useState<string>("");
  const { dispatchAlert } = useAlert();

  // form state
  const [programName, setProgramName] = useState<string>("");
  const [programDescription, setProgramDescription] = useState<string>("");
  const [programWeeks, setProgramWeeks] = useState<number | null>(null);

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
    const initialWeeks = [];

    // increment on weeks and add the objects
    // data will look something like this
    // [
    //   {
    //     name: `Week 1`,
    //     days: [
    //       { name: "Day 1", workouts: [] },
    //        ...
    //     ]
    //   },
    // ]
    Array.from({ length: parseInt(programWeeks) }).forEach((_, index) => {
      const weekNumber = index + 1;
      const days = Array.from({ length: 7 }, (_, dayIndex) => {
        const dayNumber = index * 7 + dayIndex + 1;
        return {
          name: `Day ${dayNumber}`,
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
    })
  }

  // Validate form fields
  const isFormValid = programName !== "" && programWeeks > 0;

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
              onChange={(e) => setProgramName(e.target.value)}
            />
          </div>
          <div className="field-container mt-7">
            <FieldName>
              Description
            </FieldName>
            <TextArea 
              placeholder=""
              value={programDescription}
              onChange={(e) => setProgramDescription(e.target.value)}
            />
          </div>
          <div className="field-container mt-7 w-[100px]">
            <FieldName required>
              Weeks
            </FieldName>
            <TextField
              type="number"
              value={programWeeks}
              onChange={(e) => setProgramWeeks(e.target.value)}
            />
          </div>
        </div>
      </Container>
    </>
  );
}