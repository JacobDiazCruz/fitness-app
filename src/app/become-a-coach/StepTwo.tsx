import TextArea from "@/components/global/TextArea";
import Uploader from "@/components/global/Uploader";

export default function StepTwo({
  stepTwoForm,
  setStepTwoForm
}) {
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
          About me
        </h4>
        <TextArea 
          placeholder=""
          value={stepTwoForm.value}
          onChange={(e) => updateFormValue(0, e.target.value)}
        />
      </div>
      <div className="field">
        <h4 className="font-medium">
          Upload your portfolio
        </h4>
        <p className="text-gray-500 text-light text-[13px] mt-1">
          You can upload your clients' transformations
        </p>
        <Uploader />
      </div>
    </div>
  );
}