import Container from "@/components/global/Container";
import TextArea from "@/components/global/TextArea";
import Uploader from "@/components/global/Uploader";
import { primaryTextColor, secondaryTextColor } from "@/utils/themeColors";

export default function StepTwo({
  stepTwoForm,
  setStepTwoForm
}) {
  const updateFormValue = (index, newValue) => {
    setStepTwoForm((prevForm) => {
      const updatedForm = [...prevForm];
      updatedForm[index].value = newValue;
      return updatedForm;
    });
  }
  
  return (
    <Container>
      <div className="field mb-7">
        <h4 className={`${primaryTextColor} font-medium mb-3`}>
          About me
        </h4>
        <TextArea 
          placeholder=""
          value={stepTwoForm[0].value}
          onChange={(e) => updateFormValue(0, e.target.value)}
        />
      </div>
      <div className="field">
        <h4 className={`${primaryTextColor} font-medium`}>
          Upload your portfolio
        </h4>
        <p className={`${secondaryTextColor} text-light text-[13px] mt-1`}>
          You can upload your clients' transformations
        </p>
        <Uploader />
      </div>
    </Container>
  );
}