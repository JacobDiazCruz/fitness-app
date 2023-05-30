'use client';

import AutoComplete from "@/components/global/AutoComplete";
import TextArea from "@/components/global/TextArea";
import Button from "@/components/global/Button";
import TextField from "@/components/global/TextField";
import Uploader from "@/components/global/Uploader";
import Image from "next/image";
import { useState } from "react";
import ManagerLayout from "../../ManagerLayout";
import PageActions from "../PageActions";
import TableItem from "../TableItem";
import EditExercises from "./EditExercises";
import YourExercises from "./YourExercises";

export default function AddWorkout() {
  return (
    <ManagerLayout pageTitle="Add New Workout" backIcon={true} backPath="/manager/workouts">
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
      
      <div className="flex gap-[40px]">
        <div className="form bg-white sticky top-[5em] h-[70vh] shadow-md w-[25%] width-full p-8 rounded-lg mt-5">
          <YourExercises />
        </div>

        <div className="form bg-white shadow-md w-[75%] p-8 rounded-lg mt-5">
          <div className="field">
            <p className="mb-3 text-[14px]">Workout name</p>
            <TextField
              placeholder="e.g. Chest workout"
            />
            <EditExercises />
          </div>
        </div>
      </div>
    </ManagerLayout>
  );
}