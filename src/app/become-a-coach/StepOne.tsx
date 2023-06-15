import { useEffect, useState } from "react";
import TextField from "@/components/global/TextField";
import Button from "@/components/global/Button";
import { UploadIcon } from "@/components/global/Icons";
import AutoComplete from "@/components/global/AutoComplete";
import AutoCompleteMultiple from "@/components/global/AutoCompleteMultiple";

export default function StepOne({
  stepOneForm,
  setStepOneForm
}: any) {

  const updateFormValue = (index, newValue) => {
    setStepOneForm((prevForm) => {
      const updatedForm = [...prevForm];
      updatedForm[index].value = newValue;
      return updatedForm;
    });
  };

  const [services, setServices] = useState<Array<any>>([
    {
      name: "Nutrition plan"
    },
    {
      name: "Strength Training"
    },
    {
      name: "Calisthenics Training"
    },
    {
      name: "Bodybuilding"
    }
  ]);

  useEffect(() => {
    console.log("ste2pOneForm", stepOneForm);
  }, [stepOneForm])

  return (
    <div className="form border border-solid border-gray-100 rounded-xl px-6 py-8">
      <div className="field mb-7">
        <h4 className="font-medium mb-3">
          Years of coaching experience
        </h4>
        <div className="w-[100px]">
          <TextField
            placeholder="Enter years"
            value={stepOneForm[0].value}
            onChange={(e) => updateFormValue(0, e.target.value)}
          />
        </div>
      </div>
      <div className="field mb-7">
        <h4 className="font-medium mb-3">
          Select your services
        </h4>
        <AutoCompleteMultiple
          placeholder="Select services"
          value={stepOneForm[1].value}
          items={services}
          onChange={(val) => {
            setStepOneForm((prevForm) => {
              const updatedForm = [...prevForm];
              updatedForm[1].value.push(val);
              return updatedForm;
            });
          }}
          removeSelectedItem={(val) => {
            setStepOneForm((prevForm) => {
              const updatedForm = [...prevForm];
              updatedForm[1].value = updatedForm[1].value.filter(item => item !== val);
              return updatedForm;
            });
          }}
        />
      </div>
      <div className="field">
        <h4 className="font-medium mb-3">
          Upload coaching license if you have any
        </h4>
        <Button variant="outlined" startIcon={<UploadIcon />}>
          Upload now
        </Button>
      </div>
    </div>
  );
}