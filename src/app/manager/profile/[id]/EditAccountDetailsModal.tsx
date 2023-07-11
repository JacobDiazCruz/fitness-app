import { editProfileDetails } from "@/api/Profile";
import Button from "@/components/global/Button";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import PhoneInputField from "@/components/global/PhoneInputField";
import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import useAlert from "@/contexts/Alert";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Form } from "./page";

interface EditAccountDetailsModalProps {
  profile: any;
  onClose: () => void;
  refetchProfile: any;
};

export default function EditAccountDetailsModal({
  profile,
  refetchProfile,
  onClose
}: EditAccountDetailsModalProps) {
  const { dispatchAlert }: any = useAlert();
  const [countryCode, setCountryCode] = useState<string>("+63");

  const [profileForm, setProfileForm] = useState<Form>({
    profileImage: null,
    firstName: null,
    lastName: null,
    contact: null
  });

  useEffect(() => {
    if(profile) {
      setProfileForm(prev => ({
        ...prev,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        contact: profile?.contact?.number,
        about: profile?.coachingDetails?.about,
        profileImage: profile?.profileImage?.thumbnailImage
      }));
    }
  }, [profile]);

  const editProfileDetailsMutation = useMutation(editProfileDetails);

  const submitForm = async () => {
    try {
      const res = await editProfileDetailsMutation.mutateAsync({
        ...profileForm,
        contact: {
          countryCode,
          number: profileForm?.contact
        }
      });
      onClose();
      dispatchAlert({
        type: "SUCCESS",
        message: "Profile details edited successfully."
      });
      if(res) {
        refetchProfile();
      }
    } catch(err) {
      console.log(err);
    }
  };

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
            onClick={submitForm}
          >
            Submit
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};