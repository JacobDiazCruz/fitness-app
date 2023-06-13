import TextField from "@/components/global/TextField";
import Button from "@/components/global/Button";
import { UploadIcon } from "@/components/global/Icons";

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
  }

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
          Are you a full-time or a part-time coach?
        </h4>
        <TextField
          placeholder="Enter years"
          value={stepOneForm[1].value}
          onChange={(e) => updateFormValue(1, e.target.value)}
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