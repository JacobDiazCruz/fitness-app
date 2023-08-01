'use client';

import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import Header from "@/app/manager/Header";
import { addExercise, uploadFiles } from "@/api/Exercise";
import ExerciseForm from "../ExerciseForm";
import useAlert from "@/contexts/Alert";
import { useExercise } from "@/contexts/Exercise/useExercise";

export default function AddNewExercise() {
  const router = useRouter();
  const { dispatchAlert }: any = useAlert();
  const {
    initialFilesList,
    isExerciseFormValid,
    exerciseForm
  } = useExercise()!;
  
  // add exercise request
  const addExerciseMutation = useMutation(addExercise, {
    onSuccess: async (data) => {
      return data;
    },
    onError: (err) => {
      console.log(err);
    }
  });

  // upload files to cloudinary request
  const uploadFilesMutation = useMutation(uploadFiles, {
    onSuccess: async (data) => {
      return data;
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      initialFilesList.forEach((file: string) => {
        formData.append('files', file)
      });

      // call upload files mutation
      let filesRes: any = null
      if(initialFilesList?.length) {
        filesRes = await uploadFilesMutation.mutateAsync(formData);
      }

      // call add exercise mutation
      const payload = exerciseForm.map((form: any) =>
        Object.fromEntries(
          form.fields.map((field: any) => [field.fieldName, field.value])
        )
      );
      const combinedPayload = Object.assign({}, ...payload);

      await addExerciseMutation.mutateAsync({
        ...combinedPayload
        // files: filesRes?.data.length ? filesRes?.data : []
      });
      dispatchAlert({
        type: "SUCCESS",
        message: "Exercise created successfully"
      });
      router.push('/manager/exercises');
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header
        pageTitle="Add New Exercise"
        backIcon
        backPath="/manager/exercises"
        showActionButtons
        isLoading={uploadFilesMutation.isLoading || addExerciseMutation.isLoading}
        handleSubmit={() => handleSubmit()}
        disableSubmit={!isExerciseFormValid}
      />
      <ExerciseForm />
    </>
  );
}