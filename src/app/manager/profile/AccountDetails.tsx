import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import { primaryBgColor, primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import Image from "next/image";
import { useState } from "react";
import FormContainer from "./FormContainer";
import { Form } from "./page";

interface Props {
  profileForm: Form;
  uploadedProfileImage: any;
  handleFileChange: void;
  setProfileForm: any;
};

export default function AccountDetails({
  profileForm,
  uploadedProfileImage,
  handleFileChange,
  setProfileForm
}: Props) {

  return (
    <FormContainer
      formTitle="Account Details"
      formDescription="Update your basic account details."
      formIcon={<svg t="1685420135846" class="m-auto icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4402" width="30" height="30"><path d="M885.333333 256H725.333333V198.4C723.2 157.866667 689.066667 128 648.533333 128h-298.666666c-40.533333 2.133333-72.533333 34.133333-72.533334 74.666667V256H138.666667C98.133333 256 64 290.133333 64 330.666667v490.666666C64 861.866667 98.133333 896 138.666667 896h746.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667v-490.666666c0-40.533333-34.133333-74.666667-74.666667-74.666667zM341.333333 202.666667c2.133333-6.4 6.4-10.666667 12.8-10.666667h296.533334c6.4 0 10.666667 6.4 10.666666 10.666667V256H341.333333V202.666667zM138.666667 320h746.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v128H128v-128c0-6.4 4.266667-10.666667 10.666667-10.666667z m277.333333 202.666667h192V576c0 6.4-4.266667 10.666667-10.666667 10.666667h-170.666666c-6.4 0-10.666667-4.266667-10.666667-10.666667v-53.333333z m469.333333 309.333333h-746.666666c-6.4 0-10.666667-4.266667-10.666667-10.666667v-298.666666h224V576c0 40.533333 34.133333 74.666667 74.666667 74.666667h170.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667v-53.333333H896v298.666666c0 6.4-4.266667 10.666667-10.666667 10.666667z" fill="#ffffff" p-id="4403"></path></svg>}
    >
      <div className="form-body flex gap-[40px] mt-7">
        <div className="w-[150px]">
          <input
            className="invisible h-[0px]" 
            type="file" 
            name="profileImage"
            id="profileImage" 
            onChange={handleFileChange}
            multiple={false} 
          />
          <div className="rounded-full bg-gray-300 w-[130px] h-[130px] overflow-hidden relative z-10">
            {(uploadedProfileImage || profileForm?.profileImage) && (
              <Image
                alt="Trainer Image"
                src={uploadedProfileImage ? URL.createObjectURL(uploadedProfileImage) : profileForm?.profileImage}
                style={{ objectFit: "cover" }}
                fill
              />
            )}
          </div>
          <label htmlFor="profileImage" className="cursor-pointer">
            <div className="rounded-full bg-gray-300 w-[40px] h-[40px] flex absolute ml-[90px] mt-[-40px] cursor-pointer z-20">
              <svg t="1685415673467" class="icon m-auto" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5439" width="25" height="25"><path d="M891.787816 243.009639 730.550575 243.009639l-21.103644-41.932018c-2.450818-5.426593-24.76094-53.007261-56.271608-53.007261L366.81127 148.07036c-31.510668 0-53.819766 47.580668-56.087413 52.640917l-21.273513 42.298362L128.198777 243.009639c-31.485085 0-57.110719 25.494651-57.110719 56.83545L71.088058 821.820278c0 31.354102 25.625634 56.861032 57.110719 56.861032L891.774513 878.68131c31.485085 0 57.110719-25.507954 57.110719-56.861032l0.026606-66.443271L948.911838 603.052762 948.911838 299.845089C948.910814 268.50429 923.286204 243.009639 891.787816 243.009639zM510.976694 739.325425c-103.498212 0-187.701986-83.758636-187.701986-186.719612 0-102.947673 84.203774-186.706309 187.701986-186.706309s187.701986 83.758636 187.701986 186.706309C698.67868 655.567813 614.474906 739.325425 510.976694 739.325425zM789.573853 408.743288c-25.481348 0-46.217624-20.736277-46.217624-46.217624 0-25.481348 20.736277-46.204321 46.217624-46.204321 25.481348 0 46.204321 20.722974 46.204321 46.204321C835.779198 388.007011 815.055201 408.743288 789.573853 408.743288z" fill="#272636" p-id="5440"></path><path d="M510.976694 429.027264c-68.579935 0-124.365472 55.432497-124.365472 123.579573 0 68.160379 55.786561 123.605156 124.365472 123.605156s124.365472-55.4458 124.365472-123.605156C635.342166 484.45976 579.555605 429.027264 510.976694 429.027264z" fill="#272636" p-id="5441"></path></svg>
            </div>
          </label>
        </div>
        <div className="flex flex-wrap w-[650px] gap-[15px]">
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
            <TextField
              value={profileForm.contact}
              onChange={(e) => {
                setProfileForm(prev => ({
                  ...prev,
                  contact: e.target.value
                }))
              }}
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
    </FormContainer>
  );
}