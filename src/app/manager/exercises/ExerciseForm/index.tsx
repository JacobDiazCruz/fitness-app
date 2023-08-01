import Container from "@/components/global/Container";
import FieldName from "@/components/global/FieldName";
import { useExercise } from "@/contexts/Exercise/useExercise";
import ExerciseField from "./ExerciseField";

export default function ExerciseForm() {
  const {
    exerciseForm,
    setExerciseForm
  } = useExercise();

  return (
    <Container>
      <div className="flex gap-[40px] flex-col md:flex-row">
        {exerciseForm.map((form: any, sectionIndex: number) => (
          <div
            key={sectionIndex}
            className="w-full md:w-[415px]"
          >
            {form.fields.map((field: any, fieldIndex: number) => (
              <div 
                key={fieldIndex}
                className="field-container mb-6"
              >
                <FieldName>
                  {field.label}
                </FieldName>
                <p className="text-neutral-400 text-[12px]">
                  {field.subLabel}
                </p>
                <ExerciseField
                  setExerciseForm={setExerciseForm}
                  field={field}
                  fieldIndex={fieldIndex}
                  sectionIndex={sectionIndex}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
}