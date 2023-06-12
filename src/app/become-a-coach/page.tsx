'use client';

import { useState } from "react";
import Button from "@/components/global/Button";
import { UploadIcon } from "@/components/global/Icons";
import TextField from "@/components/global/TextField";
import Uploader from "@/components/global/Uploader";
import { useRouter } from "next/navigation";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const Stepper = ({ currentStep }: number) => {
  return (
    <div className="flex items-center gap-[10px] mb-10">
      <div className={`${currentStep === 1 || currentStep === 2 ? 'bg-violet-500' : 'bg-gray-300'} h-[3px] w-full`}></div>
      <div className={`${currentStep === 2 ? 'bg-violet-500' : 'bg-gray-300'} h-[3px] w-full`}></div>
      <div className={`${currentStep === 3 ? 'bg-violet-500' : 'bg-gray-300'} h-[3px] w-full`}></div>
    </div>
  );
}

export default function BecomeACoach() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNext = () => {
    if(currentStep === 1) {
      setCurrentStep(2)
    } else if (currentStep === 2) {
      router.push('/manager/clients?welcomePopup=true')
    }
  }

  const handleBack = () => {
    if(currentStep === 1) {
      router.back()
    } else if (currentStep === 2) {
      setCurrentStep(1)
    }
  }
  
  return (
    <div className="become-coach-app flex items-center h-[100vh] bg-white w-full">
      <div className="form m-auto rounded-lg w-[600px] h-[80%]">
        <Stepper currentStep={currentStep} />
        <h2 className="text-[24px] font-normal mb-6 text-gray-600">
          Step {currentStep}
        </h2>
        {currentStep === 1 ? (
          <StepOne />
        ) : currentStep === 2 && (
          <StepTwo />
        )}
        <div className="mt-12">
          <Button
            variant="contained"
            className="w-full"
            onClick={() => handleNext()}
          >
            Next
          </Button>
          <Button
            className="w-full mt-3"
            onClick={() => handleBack()}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}