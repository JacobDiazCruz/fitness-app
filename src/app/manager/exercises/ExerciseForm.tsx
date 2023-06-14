'use client';

import { useState, memo } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import Uploader from "@/components/global/Uploader";
import { UploadIcon } from "@/components/global/Icons";

const MemoizedUploader = memo(Uploader);

export default function ExerciseForm({
  initialFilesList,
  setInitialFilesList,
  exerciseForm,
  setExerciseForm,
  primayFocusItems,
  setPrimaryFocusItems,
  categoryItems,
  setCategoryItems
}) {
  return (
    <div className="form bg-white width-full p-5 rounded-lg mt-5">
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
              value={exerciseForm.primaryFocus}
              items={primayFocusItems}
              onChange={(val) => setExerciseForm(prev => ({
                ...prev,
                primaryFocus: val
              }))}
            />
          </div>
          <div className="field-container mt-7">
            <p className="text-[14px] mb-2">Category</p>
            <AutoComplete 
              placeholder="Choose category"
              value={exerciseForm.category}
              items={categoryItems}
              onChange={(val) => setExerciseForm(prev => ({
                ...prev,
                category: val
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
          <div className="field-container w-full">
            <p className="text-[14px] mb-2">Video</p>
            <TextField
              placeholder="Paste a link from youtube or vimeo"
              value={exerciseForm.videoLink}
              onChange={(e) => setExerciseForm(prev => ({
                ...prev,
                videoLink: e.target.value
              }))}
            />
            <div className="flex items-center gap-[10px] mt-3">
              <p>or</p>
              <Button variant="outlined" startIcon={<UploadIcon />}>
                Upload now
              </Button>
            </div>
          </div>
          <div className="field-container mt-8">
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
  );
};