import { borderColor, primaryTextColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import Image from "next/image";
import Modal, { ModalContent } from "../Modal";

interface Props {
  onClose: () => void;
};

export default function CoachingOrderDetailsModal({
  onClose
}: Props) {
  return (
    <Modal onClose={onClose} className="w-[450px] h-[500px]">
      <ModalContent>
        <div className="flex gap-[10px]">
          <div className="rounded-full w-[40px] h-[40px] relative overflow-hidden">
            {localStorage.getItem("thumbnailImage") && (
              <Image
                alt="Trainer Image"
                src={localStorage.getItem("thumbnailImage") || "/"}
                style={{ objectFit: "cover" }}
                fill
              />
            )}
          </div>
          <div>
            <h4 className={`${primaryTextColor} text-[14px]`}>
              John Doe
            </h4>
            <p className={`${tertiaryTextColor} text-[12px]`}>Client</p>
          </div>
        </div>
        <div className={`mt-5 border-t ${borderColor} pt-5`}>
          <div className={`${primaryTextColor} text-[14px]`}>Orders:</div>
          <div className="flex justify-between my-2">
            <div>
              <div className={`${primaryTextColor} text-[14px] font-semibold mt-3 w-[200px] truncate`}>
                Basic Plan
              </div>
              <div className={`${secondaryTextColor} font-light text-[14px]`}>
                30 sessions
              </div>
              <div className="border rounded-md mt-2 w-fit px-1 text-[14px] bg-green-900 text-green-300 border-green-300">
                Active
              </div>
            </div>
            <div className={`${secondaryTextColor} font-light text-[12px] mt-3`}>
              July 20, 2023
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};