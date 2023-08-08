import { Dispatch, SetStateAction, useState } from "react";
import AutoComplete from "@/components/global/AutoComplete";
import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import Uploader from "@/components/global/Uploader";
import VideoModal from "@/components/global/VideoModal";
import VideoThumbnail from "@/components/global/VideoThumbnail";
import { useExercise } from "@/store/Exercise/useExercise";
import useVideoLinkCoverter from "@/hooks/useVideoLinkConverter";
import { IExerciseFormField, IExerciseFormSection } from "@/types/exercise";

interface Props {
  field: IExerciseFormField;
  setExerciseForm: Dispatch<SetStateAction<IExerciseFormSection[]>>;
  sectionIndex: number;
  fieldIndex: number;
};

export default function ExerciseField({
  field,
  setExerciseForm,
  sectionIndex,
  fieldIndex
}: Props) {
  const { videoLinkConverter } = useVideoLinkCoverter();

  const {
    initialFilesList,
    setInitialFilesList
  } = useExercise();

  const [showVideoModal, setShowVideoModal] = useState(false);

  const { 
    fieldName,
    fieldType,
    placeholder,
    items = [],
    value
  } = field;

  const handleSetExerciseForm = (newValue: string) => {
    setExerciseForm((prev: IExerciseFormSection[]) => {
      const updatedForm = [...prev];
      updatedForm[sectionIndex].fields[fieldIndex].value = newValue;
      return updatedForm;
    });
  };

  const handleChangeTextFieldValue = (inputValue: string) => {
    const newInputValue = fieldName === "videoLink" ? 
      videoLinkConverter(inputValue) : inputValue;

    handleSetExerciseForm(newInputValue ?? "");
  };

  switch(fieldType) {
    case "textfield":
      return (
        <>
          <TextField
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleChangeTextFieldValue(e.target.value)}
          />
          {fieldName === "videoLink" && (
            <>
              {value && (
                <div
                  onClick={() => setShowVideoModal(true)}
                  className="w-[260px] mt-5 relative overflow-hidden rounded-md cursor-pointer"
                >
                  <VideoThumbnail videoUrl={value} />
                </div>
              )}
              {showVideoModal && (
                <VideoModal
                  videoUrl={value}
                  handleClose={() => setShowVideoModal(false)}
                />
              )}
            </>
          )}
        </>
      )
    case "autocomplete":
      return (
        <AutoComplete
          placeholder={placeholder}
          value={{ name: value }}
          items={items.map((item: string) => {
            return {
              name: item
            }
          })}
          onChange={(val) => { 
            handleSetExerciseForm(val.name)
          }}
        />
      );
    case "textarea":
      return (
        <TextArea
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChangeTextFieldValue(e.target.value)}
        />
      );
    case "upload":
      return (
        <Uploader
          initialFilesList={initialFilesList}
          setInitialFilesList={setInitialFilesList}
        />
      );
    default:
      return <></>;
  }
};