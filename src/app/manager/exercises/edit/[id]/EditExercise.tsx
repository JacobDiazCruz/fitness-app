'use client';

import { useState, memo, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useMutation } from "react-query";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import Uploader from "@/components/global/Uploader";
import Header from "@/app/manager/Header";
import { editExercise, uploadFiles, getExercise } from "@/api/Exercise";
import { UploadIcon } from "@/components/global/Icons";
import ExerciseForm from "../../ExerciseForm";
import useExercise from "../../../../../hooks/useExercise";
import { useQuery } from "react-query";

export default function EditExercise() {
  const router = useRouter();
  const params = useParams();
  const {
    initialFilesList,
    setInitialFilesList,
    exerciseForm,
    setExerciseForm,
    primayFocusItems,
    setPrimaryFocusItems,
    categoryItems,
    setCategoryItems
  } = useExercise();

  // get exercise data
  const { 
    isLoading,
    isError,
    data: exerciseData,
    error,
    refetch
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
        primaryFocus,
        category,
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
      initialFilesList.forEach((file) => {
        formData.append('files', file);
      });

      // call upload files mutation
      const filesRes = await uploadFilesMutation.mutateAsync(formData);

      // call edit exercise mutation
      await editExerciseMutation.mutateAsync({
        id: params.id,
        data: {
          ...exerciseForm,
          files: filesRes?.data
        }
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
      <ExerciseForm
        initialFilesList={initialFilesList}
        setInitialFilesList={setInitialFilesList}
        exerciseForm={exerciseForm}
        setExerciseForm={setExerciseForm}
        primayFocusItems={primayFocusItems}
        setPrimaryFocusItems={setPrimaryFocusItems}
        categoryItems={categoryItems}
        setCategoryItems={setCategoryItems}
      />
    </>
  );
}