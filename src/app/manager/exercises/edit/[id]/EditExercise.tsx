'use client';

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useMutation } from "react-query";
import Header from "@/app/manager/Header";
import ExerciseForm from "../../ExerciseForm";
import { useQuery } from "react-query";
import useAlert from "@/contexts/Alert";
import { editExercise, uploadFiles, getExercise } from "@/api/Exercise";
import { useExercise } from "@/contexts/Exercise/useExercise";

export default function EditExercise() {
  const router = useRouter();
  const params = useParams();
  const { dispatchAlert }: any = useAlert();

  const {
    initialFilesList,
    exerciseForm,
    setExerciseForm,
  }: any = useExercise();

  // get exercise data
  const {
    isLoading,
    isError,
    data: exerciseData,
  } = useQuery('exercise', () => getExercise(params.id), {
    refetchOnMount: true
  });

  // assign exercise data to exercise form
  useEffect(() => {
    if (exerciseData) {
      const { 
        name,
        primaryFocus,
        category,
        instruction,
        videoLink,
        files
      } = exerciseData;
  
      setExerciseForm(() => ({
        name,
        primaryFocus: { name: primaryFocus },
        category: { name: category },
        instruction,
        videoLink,
        files
      }))
    }
  }, [exerciseData]);

  // edit exercise request
  const editExerciseMutation = useMutation(editExercise, {
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
        formData.append('files', file);
      });

      // call upload files mutation
      let filesRes: any = null
      if(initialFilesList?.length) {
        filesRes = await uploadFilesMutation.mutateAsync(formData);
      }

      // call edit exercise mutation
      await editExerciseMutation.mutateAsync({
        id: params.id,
        data: {
          ...exerciseForm,
          primaryFocus: exerciseForm.primaryFocus?.name,
          category: exerciseForm.category?.name,
          files: filesRes?.data.length ? filesRes?.data : []
        }
      });
      dispatchAlert({
        type: "SUCCESS",
        message: "Exercise edited successfully"
      });
      router.push('/manager/exercises');
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <>
      <Header
        pageTitle="Edit Exercise"
        backIcon
        backPath="/manager/exercises"
        showActionButtons
        isLoading={uploadFilesMutation.isLoading || editExerciseMutation.isLoading}
        handleSubmit={() => handleSubmit()}
      />
      <ExerciseForm />
    </>
  );
}