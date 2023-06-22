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
    Array.from({ length: parseInt(programWeeks) }).forEach((_, index) => {
      initialWeeks.push({
        name: `Week ${index + 1}`,
        days: [
          { name: "Day 1", workouts: [] },
          { name: "Day 2", workouts: [] },
          { name: "Day 3", workouts: [] },
          { name: "Day 5", workouts: [] },
          { name: "Day 6", workouts: [] },
          { name: "Day 7", workouts: [] }
        ]
      })
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
      <div className={`${secondaryBgColor} form shadow-md width-full p-8 rounded-lg mt-5`}>
        <div className="w-[45%]">
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
      </div>
    </>
  );
}