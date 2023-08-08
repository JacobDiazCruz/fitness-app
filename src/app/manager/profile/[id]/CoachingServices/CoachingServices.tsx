
import { Dispatch, SetStateAction, useState } from "react";
import FormContainer from "../FormContainer";
import { borderColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import { CoachingService } from "@/utils/coachTypes";
import useCoachingService from "@/store/CoachingService/useCoachingService";
import AddCoachingServiceModal from "./AddCoachingServiceModal";

export default function CoachingServices() {
  const {
    coachingServices
  }: any = useCoachingService();

  // edit modal states
  const [showAddCoachingServiceModal, setShowAddCoachingServiceModal] = useState<boolean>(false);
  const [showEditServicesModal, setShowEditServicesModal] = useState<boolean>(false);

  return (
    <FormContainer
      formTitle="Coaching Services"
      formIcon={<svg className="m-auto icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4402" width="30" height="30"><path d="M885.333333 256H725.333333V198.4C723.2 157.866667 689.066667 128 648.533333 128h-298.666666c-40.533333 2.133333-72.533333 34.133333-72.533334 74.666667V256H138.666667C98.133333 256 64 290.133333 64 330.666667v490.666666C64 861.866667 98.133333 896 138.666667 896h746.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667v-490.666666c0-40.533333-34.133333-74.666667-74.666667-74.666667zM341.333333 202.666667c2.133333-6.4 6.4-10.666667 12.8-10.666667h296.533334c6.4 0 10.666667 6.4 10.666666 10.666667V256H341.333333V202.666667zM138.666667 320h746.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v128H128v-128c0-6.4 4.266667-10.666667 10.666667-10.666667z m277.333333 202.666667h192V576c0 6.4-4.266667 10.666667-10.666667 10.666667h-170.666666c-6.4 0-10.666667-4.266667-10.666667-10.666667v-53.333333z m469.333333 309.333333h-746.666666c-6.4 0-10.666667-4.266667-10.666667-10.666667v-298.666666h224V576c0 40.533333 34.133333 74.666667 74.666667 74.666667h170.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667v-53.333333H896v298.666666c0 6.4-4.266667 10.666667-10.666667 10.666667z" fill="#ffffff" p-id="4403"></path></svg>}
      formDescription="Each service is priced individually."
      handleAdd={() => setShowAddCoachingServiceModal(true)}
    >
      <div className="mt-5">
        {coachingServices.length ? (
          <>
            {coachingServices.map((service: any, index: number) => (
              <div key={index} className={`${borderColor} py-5 flex gap-[20px] w-full border-b last:border-none`}>
                <div className="w-[50%]">
                  <p className="dark:text-neutral-50 text-darkTheme-900 mb-2 text-[16px]">
                    {service.title}
                  </p>
                  <p className={`${tertiaryTextColor} mb-2 text-[14px] line-clamp-3`}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className={tertiaryTextColor}>
            No coaching services yet.
          </p>
        )}
      </div>

      {showAddCoachingServiceModal && (
        <AddCoachingServiceModal
          onClose={() => setShowAddCoachingServiceModal(false)}
        />
      )}
    </FormContainer>
  );
};