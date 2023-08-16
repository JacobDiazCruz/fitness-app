import usePrimaryFocusColor from "@/hooks/usePrimaryFocusColor";
import { secondaryTextColor } from "@/utils/themeColors";
import Image from "next/image";

export default function CurrentExercise({
  currentExercise
}: any) {
  const { handlePrimaryFocusColor } = usePrimaryFocusColor();

  return (
    <>
      <div className={`text-[14px] font-semibold ${secondaryTextColor}`}>
        {currentExercise?.name}
      </div>
      <div className={`${handlePrimaryFocusColor(currentExercise?.primaryFocus)} w-fit rounded-lg px-1 mt-1 text-[10px]`}>
        {currentExercise?.primaryFocus}
      </div>
      <div className="coach-instructions flex flex-col gap-[5px] mt-7">
        <div className="-mb-4">
          <div className="w-[45px] h-[45px] rounded-full relative overflow-hidden">
            <Image 
              src={localStorage.getItem("thumbnailImage") || "/"}
              fill
              alt="Trainer Image"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className={`${secondaryTextColor} font-light text-[14px] rounded-xl p-3 w-fit dark:bg-neutral-50 bg-neutral-200`}>
          <div className="text-neutral-950 w-[150px] mt-1 text-[12px]">
            {currentExercise?.instruction}
          </div>
        </div>
      </div>
    </>
  );
}