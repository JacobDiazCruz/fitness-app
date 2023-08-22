"use client";

import { useRouter } from "next/navigation";
import Button from "../../components/global/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { primaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import IconButton from "@/components/global/IconButton";

export default function Header ({
  isLoading,
  pageTitle,
  backPath,
  backIcon,
  handleSubmit,
  disableSubmit,
  showActionButtons = false
}: any) {
  const router = useRouter();

  return (
    <div className="w-full mb-5 md:mb-10 flex md:flex-row flex-col md:items-center justify-between">
      <div className="flex gap-[10px] items-center">
        {backIcon && (
          <IconButton onClick={() => backPath ? router.push(backPath) : router.back()}>
            <AiOutlineArrowLeft className={`${tertiaryTextColor} w-5 h-5`} />
          </IconButton>
        )}
        <h5 className={`${primaryTextColor} text-[22px] text-medium`}>
          {pageTitle}
        </h5>
      </div>
      {showActionButtons && (
        <div className="flex justify-end mt-5 md:mt-0">
          <Button 
            variant="outlined"
            className="mr-3"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleSubmit()}
            loading={isLoading}
            disabled={disableSubmit}
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}