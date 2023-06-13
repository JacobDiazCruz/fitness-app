'use client';

import { useState } from "react";
import Button from "@/components/global/Button";
import { UploadIcon } from "@/components/global/Icons";
import TextField from "@/components/global/TextField";
import Uploader from "@/components/global/Uploader";
import { useRouter } from "next/navigation";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { becomeCoach } from "@/api/Profile";
import { useMutation } from "react-query";

interface Form {
  label: string;
  field: string;
  value: any;
}

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
  const [stepOneForm, setStepOneForm] = useState<Array<Form>>([
    {
      label: "Years of coaching experience",
      field: "yearsOfExp",
      value: ""
    },
    {
      label: "Are you a full-time or a part-time coach?",
      field: "employmentType",
      value: ""
    },
    {
      label: "Upload coaching license if you have any",
      field: "idImage",
      value: ""
    }
  ]);
  const [stepTwoForm, setStepTwoForm] = useState<Array<Form>>([
    {
      label: "About Me",
      field: "about",
      value: ""
    },
    {
      label: "Upload your portfolio",
      field: "portfolioImages",
      value: []
    }
  ]);

  // login request
  const becomeCoachMutation = useMutation(becomeCoach, {
    onSuccess: async (data) => {
      router.push('/manager/clients?welcomePopup=true')
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const handleNext = () => {
    if(currentStep === 1) {
      setCurrentStep(2)
    } else if (currentStep === 2) {
      becomeCoachMutation.mutateAsync({
        profileId: "",
        data: {}
      })
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
          <StepOne 
            stepOneForm={stepOneForm}
            setStepOneForm={setStepOneForm}
          />
        ) : currentStep === 2 && (
          <StepTwo 
            stepTwoForm={stepTwoForm}
            setStepTwoForm={setStepTwoForm}
          />
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