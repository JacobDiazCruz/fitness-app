import { primaryTextColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import Image from "next/image";
import { useState } from "react";
import Button from "../Button";
import FieldName from "../FieldName";
import Modal, { ModalContent } from "../Modal";
import Rating from "../Rating";
import TextArea from "../TextArea";

interface Props {
  onClose: () => void;
  coachingData: any;
};

export default function ClientReviewModalForm({
  onClose,
  coachingData
}: Props) {
  const [feedback, setFeedback] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const handleSubmitReview = () => {
    console.log(1);
  };
  
  return (
    <Modal onClose={onClose} className="w-[400px] h-fit">
      <ModalContent>
        <div className="flex gap-[10px]">
          <div className="rounded-full w-[30px] h-[30px] relative overflow-hidden">
            {coachingData?.coach?.thumbnailImage && (
              <Image
                alt="Trainer Image"
                src={coachingData?.coach?.thumbnailImage || "/"}
                style={{ objectFit: "cover" }}
                fill
              />
            )}
          </div>
          <div>
            <h4 className={`${primaryTextColor} text-[12px]`}>
              {coachingData?.coach?.firstName} {coachingData?.coach?.lastName}
            </h4>
            <p className={`${tertiaryTextColor} text-[10px]`}>Coach</p>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex gap-[10px] items-center">
            <input type="checkbox" />
            <span className={`${secondaryTextColor} text-[14px]`}>Rate anonymous</span>
          </div>
          <div className="mt-5">
            <FieldName>Please rate your experience with me</FieldName>
            <Rating 
              value={rating}
              onChange={(val) => {
                setRating(val);
              }}
            />
          </div>
          <div className="mt-7">
            <FieldName>Feedback</FieldName>
            <TextArea 
              value={feedback}
              placeholder="Share your thoughts"
              onChange={((e) => {
                setFeedback(e.target.value)
              })}
            />
          </div>
          
          <Button
            className="w-full mt-8"
            onClick={handleSubmitReview}
          >
            Submit review
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};