import Button from "@/components/global/Button";
import { CloseIcon, ConfettiIcon } from "@/components/global/Icons";
import Modal from "@/components/global/Modal";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import { borderColor, primaryTextColor, secondaryBgColor, secondaryTextColor } from "@/utils/themeColors";

export default function WelcomePopup() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const search = searchParams.get('welcomePopup')
    if(search) {
      setShowModal(true);
    }
  }, []);
  
  return (
    <>
      {showModal && (
        <Modal className="w-[650px] h-[250px]" onClose={() => setShowModal(false)}>
          <div className={`${borderColor} flex px-6 py-4 justify-between border-b-solid border-b`}>
            <p className={`${primaryTextColor} font-medium`}>
              Getting Started
            </p>
            <button onClick={() => setShowModal(false)}>
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="py-6 px-12">
            <h2 className={`${primaryTextColor} font-semibold text-[28px] flex items-center`}>
              Welcome to Dashboard!
              <ConfettiIcon className="w-6 h-6 ml-2" />
            </h2>
            <p className={`${secondaryTextColor} mt-2 font-light`}>
              Let's start by updating your 
              <span 
                className={`${primaryTextColor} font-semibold mx-1 cursor-pointer`}
                onClick={() => {
                  setShowModal(false);
                  router.push('/manager/profile')
                }}
              >
                profile
              </span> 
              and coaching services
            </p>
            <hr className={`${borderColor} my-5`} />
            {/* <h4 className={`${primaryTextColor} text-[14px] font-semibold mb-5`}>
              Learn how to use
            </h4>
            <div className="flex gap-[15px]">
              <div className={`${borderColor} flex gap-[15px] cursor-pointer border-solid border rounded-lg p-4`}>
                <div className="w-[40%] bg-gray-200"></div>
                <h4 className="text-[14px] font-normal">Manager Overview</h4>
              </div>
              <div className={`${borderColor} flex gap-[15px] cursor-pointer border-solid border rounded-lg p-4`}>
                <div className="w-[40%] bg-gray-200"></div>
                <h4 className="text-[14px] font-normal">Creating a program</h4>
              </div>
              <div className={`${borderColor} flex gap-[15px] cursor-pointer border-solid border border-gray-200 rounded-lg p-4`}>
                <div className="w-[40%] bg-gray-200"></div>
                <h4 className="text-[14px] font-normal">
                  Handling multiple clients
                </h4>
              </div>
            </div> */}
          </div>
        </Modal>
      )}
    </>
  );
}