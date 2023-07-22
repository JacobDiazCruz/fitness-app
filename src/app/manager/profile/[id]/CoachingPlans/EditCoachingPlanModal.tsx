import Button from "@/components/global/Button";
import FieldName from "@/components/global/FieldName";
import { DropdownIcon } from "@/components/global/Icons";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import TimeLengthField from "@/components/global/TimeLengthField";
import { CoachingService } from "@/utils/coachTypes";
import { borderColor, primaryBgColor, primaryTextColor, secondaryBgColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import { Dispatch, SetStateAction, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

interface Props {
  servicesList: any;
  setServicesList: Dispatch<SetStateAction<any>>;
  onClose: any;
};

export default function EditCoachingPlanModal({
  servicesList,
  setServicesList,
  onClose
}: Props) {

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<any>("");
  const [planLength, setPlanLength] = useState<any>("");
  const [timeUnit, setTimeUnit] = useState<string>("");

  return (
    <Modal onClose={onClose} className="w-[1000px] h-[650px]">
      <ModalHeader>
        <ModalTitle>
          Edit Coaching Plan
        </ModalTitle>
      </ModalHeader>
      <ModalContent>
        <div className="flex gap-[50px]">
          <div className={`${borderColor} border-r pr-[50px] w-full`}>
            <div className="w-full">
              <FieldName>Plan name</FieldName>
              <TextField 
                placeholder="e.g, Premium"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full flex items-center gap-[15px] mt-7">
              <div className="w-[200px]">
                <FieldName>Price</FieldName>
                <TextField 
                  value={price}
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="w-[180px]">
                <FieldName>Length of plan</FieldName>
                <TimeLengthField 
                  value={planLength}
                  onChange={(e) => {
                    setPlanLength(e.target.value);
                  }}
                  timeUnit={timeUnit} 
                  setTimeUnit={setTimeUnit}
                />
              </div>
            </div>
            {planLength && (
              <div className={`${tertiaryTextColor} text-[14px] mt-2`}>
                PHP{price} for {planLength} {timeUnit}
              </div>
            )}
            <div className="w-full mt-7">
              <FieldName>Description</FieldName>
              <TextArea 
                placeholder="Enter title"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className={`w-full`}>
            <div className="flex justify-between">
              <FieldName>
                Select services to offer
              </FieldName>
              <FieldName>
                3 Selected
              </FieldName>
            </div>
            {servicesList?.map((service: CoachingService, key: number) => (
              <div 
                onClick={() => {
                  const newOrderOptions = [...servicesList];
                  newOrderOptions[key].isSelected = !servicesList[key].isSelected;
                  setServicesList(newOrderOptions);
                }}
                className={`
                  flex p-4 mt-4 rounded-lg border border-solid cursor-pointer justify-between 
                  ${service?.isSelected ? 'border-teal-500 dark:border-teal-900 bg-teal-50 dark:bg-teal-950' : `${primaryBgColor} dark:border-neutral-700`}
                `}
              >
                <div>
                  <p className={`${primaryTextColor} font-semibold text-[14px]`}>
                    {service.title}
                  </p>
                </div>

                <div className={`
                  w-[25px] h-[25px] border border-solid rounded-full flex items-center 
                  ${service.isSelected ? 'border-none' : borderColor}`
                }>
                  {service.isSelected && (
                    <FaCheckCircle className="w-[25px] h-[25px] text-teal-500"/>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <div className="flex">
          <Button className="ml-auto">
            Submit
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};