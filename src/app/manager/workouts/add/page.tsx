'use client';

import AutoComplete from "@/components/global/AutoComplete";
import TextArea from "@/components/global/TextArea";
import Button from "@/components/global/Button";
import TextField from "@/components/global/TextField";
import Uploader from "@/components/global/Uploader";
import Image from "next/image";
import { useState } from "react";
import ManagerLayout from "../../ManagerLayout";
import PageActions from "../TableActions";
import TableItem from "../TableItem";
import EditExercises from "./EditExercise";
import YourExercises from "./YourExercises";
import Header from "@/app/manager/Header";

export default function AddWorkout() {

  return (
    <>
      <Header 
        pageTitle="Add New Workout"
        backIcon
        backPath="/manager/workouts"
        showActionButtons
      />
      <div className="flex gap-[40px]">
        <div className="form bg-white sticky top-[5em] h-[80vh] shadow-md w-[25%] p-8 rounded-lg mt-5">
          <YourExercises />
        </div>

        <div className="form bg-white shadow-md w-[75%] p-8 rounded-lg mt-5">
          <EditExercises />
        </div>
      </div>
    </>
  );
}