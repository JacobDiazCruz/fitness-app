import Button from "@/components/global/Button";
import FieldName from "@/components/global/FieldName";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import { CoachingService } from "@/utils/coachTypes";
import { borderColor, primaryBgColor, primaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
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

  return (
    <Modal onClose={onClose} className="w-[600px] h-[650px]">
      <ModalHeader>
        <ModalTitle>
          Edit Coaching Plan
        </ModalTitle>
      </ModalHeader>
      <ModalContent>
        <div className="w-full">
          <FieldName>Name</FieldName>
          <TextField 
            placeholder="Enter title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full mt-5">
          <FieldName>Description</FieldName>
          <TextArea 
            placeholder="Enter title"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={`w-full my-7 pt-5 border-t ${borderColor}`}>
          <div className="flex justify-between">
            <FieldName>
              (3) Services selected
            </FieldName>
            <p className={`${tertiaryTextColor}`}>Total: PHP 500</p>
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
                <p className={`${tertiaryTextColor} font-light mt-2 text-[14px]`}>
                  {service.price.currency} {service.price.value}
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