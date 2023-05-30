'use client';

import { useState } from "react";
import Button from "@/components/global/Button";
import TextField from "@/components/global/TextField";
import ManagerLayout from "../ManagerLayout";
import Uploader from "@/components/global/Uploader";
import ProfileForm from "./ProfileForm";
import Image from 'next/image';

export default function Profile() {
  const [servicesList, setServicesList] = useState<Array>([
    {
      title: "",
      description: "",
      price: 0
    }
  ]);
  const [profileImage, setProfileImage] = useState<any>();

  const addIcon: SVGAElement = <svg width="14" height="14" viewBox="0 0 14 14" className="mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.4188 7.56763L7.63143 7.58811V13.4148C7.63143 13.7378 7.36999 14 7.04786 14C6.72572 14 6.46428 13.7378 6.46428 13.4148V7.59221L0.585335 7.61328C0.584752 7.61328 0.584168 7.61328 0.583585 7.61328C0.262035 7.61328 0.00117591 7.35287 8.76111e-06 7.02984C-0.00174197 6.70682 0.259117 6.44407 0.58125 6.4429L6.46428 6.42184V0.585187C6.46428 0.261579 6.72572 0 7.04786 0C7.36999 0 7.63143 0.261579 7.63143 0.585187V6.41774L13.4141 6.39726C13.4153 6.39726 13.4158 6.39726 13.4164 6.39726C13.738 6.39726 13.9988 6.65767 14 6.98069C14.0012 7.30371 13.7403 7.56646 13.4188 7.56763Z" fill="#000E8D"/>
  </svg>;

const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.files[0])
  setProfileImage(e.target.files[0]);
};

  return (
    <ManagerLayout>
      <div className="profile">
        <div className="actions flex justify-between">
          <div></div>
          <div>
            <Button variant="outlined" className="mr-3">
              Cancel
            </Button>
            <Button variant="contained">
              Submit
            </Button>
          </div>
        </div>
        <div className="bg-white pb-8 px-8 rounded-lg mt-5 shadow-md">
          <div className="form-body flex items-center">
            <div className="w-[150px]">
              <input className="invisible h-[0px]" type="file" name="profileImage" id="profileImage" onChange={handleFileChange} multiple={false} />
              <div className="rounded-full bg-gray-300 w-[130px] h-[130px] overflow-hidden relative z-10">
                <Image
                  alt="Trainer Image"
                  src={profileImage ? URL.createObjectURL(profileImage) : "/user.png"}
                  style={{ objectFit: "cover" }}
                  fill
                />
              </div>
              <label for="profileImage" className="cursor-pointer">
                <div className="rounded-full bg-gray-300 w-[40px] h-[40px] flex absolute ml-[90px] mt-[-40px] cursor-pointer z-20">
                  <svg t="1685415673467" class="icon m-auto" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5439" width="25" height="25"><path d="M891.787816 243.009639 730.550575 243.009639l-21.103644-41.932018c-2.450818-5.426593-24.76094-53.007261-56.271608-53.007261L366.81127 148.07036c-31.510668 0-53.819766 47.580668-56.087413 52.640917l-21.273513 42.298362L128.198777 243.009639c-31.485085 0-57.110719 25.494651-57.110719 56.83545L71.088058 821.820278c0 31.354102 25.625634 56.861032 57.110719 56.861032L891.774513 878.68131c31.485085 0 57.110719-25.507954 57.110719-56.861032l0.026606-66.443271L948.911838 603.052762 948.911838 299.845089C948.910814 268.50429 923.286204 243.009639 891.787816 243.009639zM510.976694 739.325425c-103.498212 0-187.701986-83.758636-187.701986-186.719612 0-102.947673 84.203774-186.706309 187.701986-186.706309s187.701986 83.758636 187.701986 186.706309C698.67868 655.567813 614.474906 739.325425 510.976694 739.325425zM789.573853 408.743288c-25.481348 0-46.217624-20.736277-46.217624-46.217624 0-25.481348 20.736277-46.204321 46.217624-46.204321 25.481348 0 46.204321 20.722974 46.204321 46.204321C835.779198 388.007011 815.055201 408.743288 789.573853 408.743288z" fill="#272636" p-id="5440"></path><path d="M510.976694 429.027264c-68.579935 0-124.365472 55.432497-124.365472 123.579573 0 68.160379 55.786561 123.605156 124.365472 123.605156s124.365472-55.4458 124.365472-123.605156C635.342166 484.45976 579.555605 429.027264 510.976694 429.027264z" fill="#272636" p-id="5441"></path></svg>
                </div>
              </label>
            </div>
            <div>
              <h2 className="font-medium text-[22px]">John Doe</h2>
              <p className="text-[18px] text-gray-600">Certified Trainer</p>
              <p className="text-[14px] text-gray-500">Metro Manila, Philippines</p>
            </div>
          </div>
        </div>

        <ProfileForm
          formTitle="My Services"
          formIcon={<svg t="1685420135846" class="m-auto icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4402" width="30" height="30"><path d="M885.333333 256H725.333333V198.4C723.2 157.866667 689.066667 128 648.533333 128h-298.666666c-40.533333 2.133333-72.533333 34.133333-72.533334 74.666667V256H138.666667C98.133333 256 64 290.133333 64 330.666667v490.666666C64 861.866667 98.133333 896 138.666667 896h746.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667v-490.666666c0-40.533333-34.133333-74.666667-74.666667-74.666667zM341.333333 202.666667c2.133333-6.4 6.4-10.666667 12.8-10.666667h296.533334c6.4 0 10.666667 6.4 10.666666 10.666667V256H341.333333V202.666667zM138.666667 320h746.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v128H128v-128c0-6.4 4.266667-10.666667 10.666667-10.666667z m277.333333 202.666667h192V576c0 6.4-4.266667 10.666667-10.666667 10.666667h-170.666666c-6.4 0-10.666667-4.266667-10.666667-10.666667v-53.333333z m469.333333 309.333333h-746.666666c-6.4 0-10.666667-4.266667-10.666667-10.666667v-298.666666h224V576c0 40.533333 34.133333 74.666667 74.666667 74.666667h170.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667v-53.333333H896v298.666666c0 6.4-4.266667 10.666667-10.666667 10.666667z" fill="#ffffff" p-id="4403"></path></svg>}
          formDescription="Each service will be priced individually."
        >
          <div class="mt-7">
            {servicesList.map((service: Service, key: number) => (
              <div className="pb-5 flex gap-[20px]">
                <div>
                  <p className="mb-2">Title</p>
                  <TextField 
                    value={service.title}
                    placeholder="e.g. Nutrition plan"
                    className="w-[226px] h-[49px]"
                  />
                </div>
                <div>
                  <p className="mb-2">Description</p>
                  <TextField
                    value={service.description}
                    className="w-[350px] h-[49px]"
                    placeholder="e.g. I will guide you on how to plan your meals"
                  />
                </div>
                <div>
                  <p className="mb-2">Price</p>
                  <TextField
                    value={service.price}
                    placeholder="Enter price"
                    className="w-[90px] h-[49px]"
                  />
                </div>
                <div>
                  <p className="mb-2 invisible">Actions</p>
                  {key == servicesList.length - 1 && (
                    <Button 
                      onClick={() => {
                        setServicesList([...servicesList, 
                          { 
                            title: "", 
                            description: "", 
                            price: 2
                          }
                        ])
                      }}
                      className="bg-[#EBEDFF] h-[49px] text-[#000E8D]"
                    >
                      {addIcon}
                      Add a Service
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ProfileForm>
        
        <ProfileForm
          formTitle="Gallery"
          formIcon={<svg t="1685420066688" class="m-auto icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2413" width="30" height="30"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792z m0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z" p-id="2414" fill="#ffffff"></path><path d="M304 456c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88z m0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z" p-id="2415" fill="#ffffff"></path></svg>}
          formDescription="The images that will be uploaded here will be displayed in a carousel at the top of your profile."
        >
          <Uploader />
        </ProfileForm>
      </div>
    </ManagerLayout>
  );
}