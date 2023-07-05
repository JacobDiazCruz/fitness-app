'use client';

import { useState, memo } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import AutoComplete from "@/components/global/AutoComplete";
import Button from "@/components/global/Button";
import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import Uploader from "@/components/global/Uploader";
import { UploadIcon } from "@/components/global/Icons";

import { 
  secondaryBgColor, 
  primaryTextColor 
} from "@/utils/themeColors";
import Container from "@/components/global/Container";
import FieldName from "@/components/global/FieldName";
import PaddedWrapper from "@/components/global/PaddedWrapper";
import VideoThumbnail from "../../../components/global/VideoThumbnail";
import VideoModal from "../../../components/global/VideoModal";
import useVideoLinkCoverter from "@/hooks/useVideoLinkConverter";

const MemoizedUploader = memo(Uploader);

export default function ExerciseForm({
  initialFilesList,
  setInitialFilesList,
  exerciseForm,
  setExerciseForm,
  primayFocusItems,
  setPrimaryFocusItems,
  categoryItems,
  setCategoryItems
}) {
  const { videoLinkConverter } = useVideoLinkCoverter();
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <Container>
      <div className="flex gap-[40px] flex-col md:flex-row">
        <div className="w-full md:w-[415px]">
          <div className="field-container">
            <FieldName required>
              Exercise name
            </FieldName>
            <TextField
              placeholder="e.g. Incline dumbbell press"
              value={exerciseForm.name}
              onChange={(e) => setExerciseForm(prev => ({
                ...prev,
                name: e.target.value
              }))}
            />
          </div>
          <div className="field-container mt-7">
            <FieldName required>
              Primary focus
            </FieldName>
            <AutoComplete
              placeholder="Choose one"
              value={exerciseForm.primaryFocus}
              items={primayFocusItems}
              onChange={(val) => setExerciseForm(prev => ({
                ...prev,
                primaryFocus: val
              }))}
            />
          </div>
          <div className="field-container mt-7">
            <FieldName required>
              Category
            </FieldName>
            <AutoComplete 
              placeholder="Choose category"
              value={exerciseForm.category}
              items={categoryItems}
              onChange={(val) => setExerciseForm(prev => ({
                ...prev,
                category: val
              }))}
            />
          </div>
          <div className="field-container mt-7">
            <FieldName>
              Instructions / Note
            </FieldName>
            <TextArea 
              placeholder="Write insructions / notes"
              value={exerciseForm.instruction}
              onChange={(e) => setExerciseForm(prev => ({
                ...prev,
                instruction: e.target.value
              }))}
            />
          </div>
        </div>
        <div className="w-full md:w-[415px]">
          <div className="field-container w-full">
            <FieldName required>
              Video
            </FieldName>
            <TextField
              placeholder="Paste a link from YouTube"
              value={exerciseForm.videoLink}
              onChange={(e) => {
                const inputValue = e.target.value;
                const updatedLink = videoLinkConverter(inputValue);
                setExerciseForm(prev => ({
                  ...prev,
                  videoLink: updatedLink
                }));
              }}
            />
            <div className="flex items-center gap-[10px] mt-3">
              <p className={primaryTextColor}>or</p>
              <Button variant="outlined" startIcon={<UploadIcon />}>
                Upload now
              </Button>
            </div>
          </div>
          <div className="field-container mt-8">
            <FieldName>
              Upload images or videos
            </FieldName>
            <p className="text-[#9C9EA0] text-[12px]">
              Upload your own workout videos and images.
            </p>
            <MemoizedUploader
              initialFilesList={initialFilesList}
              setInitialFilesList={setInitialFilesList}
            />
          </div>
        </div>
        <div>
          {exerciseForm.videoLink && (
            <div 
              onClick={() => {
                setShowVideoModal(true)
              }}
              className="w-[260px] relative overflow-hidden rounded-md cursor-pointer"
            >
              <VideoThumbnail
                videoUrl={exerciseForm.videoLink}
              />
            </div>
          )}
          {showVideoModal && (
            <VideoModal 
              videoUrl={exerciseForm.videoLink}
              handleClose={() => setShowVideoModal(false)}
            />
          )}
        </div>
      </div>
    </Container>
  );
};