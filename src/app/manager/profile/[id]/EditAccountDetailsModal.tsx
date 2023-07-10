import Button from "@/components/global/Button";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import PhoneInputField from "@/components/global/PhoneInputField";
import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import { Dispatch, SetStateAction } from "react";
import { Form } from "./page";

interface EditAccountDetailsModalProps {
  profileForm: Form;
  uploadedProfileImage: any;
  handleFileChange: void;
  setProfileForm: Dispatch<SetStateAction<any>>;
  countryCode: string;
  setCountryCode: any;
  onClose: () => void;
  handleSubmit: () => void;
};

export default function EditAccountDetailsModal({
  profileForm,
  setProfileForm,
  countryCode,
  setCountryCode,
  handleSubmit,
  onClose
}: EditAccountDetailsModalProps) {

  return (
    <Modal onClose={onClose} className="w-[700px] h-fit">
      <ModalHeader>
        <ModalTitle>
          Edit Account Details
        </ModalTitle>
      </ModalHeader>
      <ModalContent>
        <div className="form-body flex gap-[40px]">
          <div className="flex flex-wrap w-full gap-[15px]">
            <div className="field w-half">
              <p className="dark:text-neutral-50 text-darkTheme-900 mb-2 text-[14px]">
                First name
              </p>
              <TextField
                value={profileForm.firstName}
                onChange={(e) => {
                  setProfileForm(prev => ({
                    ...prev,
                    firstName: e.target.value
                  }))
                }}
              />
            </div>
            <div className="field w-half">
              <p className="dark:text-neutral-50 text-darkTheme-900 mb-2 text-[14px]">
                Last name
              </p>
              <TextField
                value={profileForm.lastName}
                onChange={(e) => {
                  setProfileForm(prev => ({
                    ...prev,
                    lastName: e.target.value
                  }))
                }}
              />
            </div>
            <div className="field w-full mt-4">
              <p className="dark:text-neutral-50 text-darkTheme-900 mb-2 text-[14px]">
                Email
              </p>
              <TextField
                disabled={true}
                value={profileForm.email}
              />
            </div>
            <div className="field w-full mt-4">
              <p className="dark:text-neutral-50 text-darkTheme-900 mb-2 text-[14px]">
                Contact number
              </p>
              <PhoneInputField 
                placeholder="xxxxxxxxx"
                className="h-[49px]"
                value={profileForm.contact}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
                onChange={(e) => setProfileForm(prev => ({
                  ...prev,
                  contact: e.target.value
                }))}
              />
            </div>
            <div className="field w-full mt-4">
              <p className="dark:text-neutral-50 text-darkTheme-900 mb-2 text-[14px]">
                About 
              </p>
              <TextArea
                disabled
                value={profileForm.about}
                onChange={(e) => {
                  setProfileForm(prev => ({
                    ...prev,
                    about: e.target.value
                  }))
                }}
              />
            </div>
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <div className="flex justify-between">
          <div></div>
          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};