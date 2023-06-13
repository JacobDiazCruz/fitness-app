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
import PageActions from "../TableActions";
import TableItem from "../TableItem";
import { addExercise, uploadFiles } from "@/api/Exercise";

const MemoizedUploader = memo(Uploader);

export default function AddExerciseForm() {
  const router = useRouter();
  const [primayFocusItems, setPrimaryFocusItems] = useState([
    {
      name: "Biceps"
    }
  ]);
  const [initialFilesList, setInitialFilesList] = useState([]);
  
  const [exerciseForm, setExerciseForm] = useState({
    name: "",
    focus: "",
    category: "",
    instruction: "",
    videoLink: "",
    files: []
  });

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
      })

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
        handleSubmit={() => handleSubmit()}
      />
      <div className="form bg-white shadow-md width-full p-8 rounded-lg mt-5">
        <div className="flex gap-[40px]">
          <div className="w-[415px]">
            <div className="field-container">
              <p className="text-[14px] mb-2">Exercise name</p>
              <TextField 
                placeholder="e.g. Incline dumbbell press"
                value={exerciseForm.name}
                onChange={(e) => setExerciseForm(prev => ({
                  ...prev,
                  name: e.target.value
                }))}
              />
            </div>
            <div className="field-container mt-7">
              <p className="text-[14px] mb-2">Primary focus</p>
              <AutoComplete 
                placeholder="Choose one"
                value={exerciseForm.focus}
                items={primayFocusItems}
                onChange={(val) => setExerciseForm(prev => ({
                  ...prev,
                  focus: val
                }))}
              />
            </div>
            <div className="field-container mt-7">
              <p className="text-[14px] mb-2">Category</p>
              <AutoComplete 
                placeholder="Choose category"
                value={exerciseForm.category}
                items={primayFocusItems}
                onChange={(val) => setExerciseForm(prev => ({
                  ...prev,
                  focus: val
                }))}
              />
            </div>
            <div className="field-container mt-7">
              <p className="text-[14px] mb-2">Instructions / Note</p>
              <TextArea 
                placeholder="Write insructions / notes"
                value={exerciseForm.instruction}
                onChange={(e) => setExerciseForm(prev => ({
                  ...prev,
                  instruction: e.target.value
                }))}
              />
            </div>
          </div>
          <div className="w-[415px]">
            <div className="field-container">
              <p className="text-[14px] mb-2">Video link</p>
              <TextArea 
                placeholder="Paste a link from youtube or vimeo"
                value={exerciseForm.videoLink}
                onChange={(e) => setExerciseForm(prev => ({
                  ...prev,
                  videoLink: e.target.value
                }))}
              />
            </div>
            <div className="field-container mt-7">
              <p className="text-[14px] text-[14px]">Upload videos or images</p>
              <p className="text-[#9C9EA0] text-[12px]">Upload your own workout videos and images.</p>
              <MemoizedUploader 
                initialFilesList={initialFilesList}
                setInitialFilesList={setInitialFilesList}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}