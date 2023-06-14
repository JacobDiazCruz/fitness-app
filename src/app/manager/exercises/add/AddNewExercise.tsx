'use client';

import { useState, memo } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import Uploader from "@/components/global/Uploader";
import Header from "@/app/manager/Header";
import { addExercise, uploadFiles } from "@/api/Exercise";
import { UploadIcon } from "@/components/global/Icons";
import ExerciseForm from "../ExerciseForm";
import useExercise from "../useExercise";

export default function AddNewExercise() {
  const router = useRouter();
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
      initialFilesList.forEach((file) => {
        formData.append('files', file)
      });

      // call upload files mutation
      const filesRes = await uploadFilesMutation.mutateAsync(formData);

      // call add exercise mutation
      if(filesRes.data.length) {
        await addExerciseMutation.mutateAsync({
          ...exerciseForm,
          files: filesRes.data
        });
        router.push('/manager/exercises');
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <>
      <Header
        pageTitle="Add New Exercise"
        backIcon
        backPath="/manager/exercises"
        showActionButtons
        isLoading={uploadFilesMutation.isLoading || addExerciseMutation.isLoading}
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