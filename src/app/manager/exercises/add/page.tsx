'use client';

import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import Uploader from "@/components/global/Uploader";
import { useState } from "react";
import ManagerLayout from "../../ManagerLayout";
import PageActions from "../PageActions";
import TableItem from "../TableItem";

export default function AddExercise() {
  const [primayFocusItems, setPrimaryFocusItems] = useState([
    {
      name: "Biceps"
    }
  ]);
  
  const [selectedPrimaryFocusItems, setSelectedPrimaryFocusItems] = useState();

  return (
    <ManagerLayout pageTitle="Add New Exercise" backIcon={true} backPath="/manager/exercises">
      <div className="flex justify-between">
        <div></div>
        <div>
          <Button variant="outlined" className="mr-3">
            Cancel
          </Button>
          <Button variant="contained">
            Submit
          </Button>
        </div>
      </div>
      <div className="form bg-white shadow-md width-full p-8 rounded-lg mt-5">
        <div className="flex gap-[40px]">
          <div className="w-[415px]">
            <div className="field-container">
              <p className="text-[14px] mb-2">Exercise name</p>
              <TextField 
                placeholder="e.g. Incline dumbbell press"
              />
            </div>
            <div className="field-container mt-7">
              <p className="text-[14px] mb-2">Primary focus</p>
              <AutoComplete 
                placeholder="Choose one"
                value={selectedPrimaryFocusItems}
                items={primayFocusItems}
                onChange={(val) => setSelectedPrimaryFocusItems(val)}
              />
            </div>
            <div className="field-container mt-7">
              <p className="text-[14px] mb-2">Category</p>
              <AutoComplete 
                placeholder="Choose category"
                value={selectedPrimaryFocusItems}
                items={primayFocusItems}
                onChange={(val) => setSelectedPrimaryFocusItems(val)}
              />
            </div>
            <div className="field-container mt-7">
              <p className="text-[14px] mb-2">Instructions / Note</p>
              <TextArea 
                placeholder="Write insructions / notes"
              />
            </div>
          </div>
          <div className="w-[415px]">
            <div className="field-container">
              <p className="text-[14px] mb-2">Video link</p>
              <TextField 
                placeholder="Paste a link from youtube or vimeo"
              />
            </div>
            <div className="field-container mt-7">
              <p className="text-[14px] text-[14px]">Upload videos or images</p>
              <p className="text-[#9C9EA0] text-[12px]">Upload your own workout videos and images.</p>
              <Uploader />
            </div>
          </div>
        </div>
      </div>
    </ManagerLayout>
  );
}