'use client'

import Header from "@/components/manager/Header";
import Button from "@/components/global/Button";
import TextField from "@/components/global/TextField";
import TextArea from "@/components/global/TextArea";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@/components/global/Icons";

export default function AddProgram() {
  const router = useRouter();
  return (
    <>
      <Header
        pageTitle="Add New Program"
        backIcon
        backPath="/manager/programs"
      />
      <div className="flex justify-between">
        <div></div>
        <div>
          <Button variant="outlined" className="mr-3">
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={() => router.push('/manager/programs/123')}
            endIcon={<ArrowRightIcon />}
          >
            Next
          </Button>
        </div>
      </div>
      <div className="form bg-white shadow-md width-full p-8 rounded-lg mt-5">
        <div className="w-[45%]">
          <div className="field-container">
            <p className="text-[14px] mb-2">Program name</p>
            <TextField 
              placeholder="e.g. Incline dumbbell press"
            />
          </div>
          <div className="field-container mt-7">
            <p className="text-[14px] mb-2">Description</p>
            <TextArea 
              placeholder=""
            />
          </div>
          <div className="field-container mt-7 w-[100px]">
            <p className="text-[14px] mb-2">Weeks</p>
            <TextField 
              placeholder="1"
            />
          </div>
        </div>
      </div>
    </>
  );
}