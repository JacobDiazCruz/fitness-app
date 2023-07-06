import { CloseIcon, PlayIcon } from "@/components/global/Icons";
import useMessageSender from "@/contexts/Message/useMessageSender";
import { borderColor, primaryBgColor } from "@/utils/themeColors";
import Image from "next/image";

export default function MessageInputUploads() {
  const {
    getFile,
    handleRemoveFile,
    initialFilesList
  }: any = useMessageSender();

  return (
    <div className={`${primaryBgColor} ${borderColor} w-full px-3 h-[80px] top-[-80px] py-4 absolute flex gap-[13px] border-t border-t-solid`}>
      {initialFilesList?.map((file: any, index: number) => (
        <div className="h-[45px] w-[45px] bg-gray-200 relative rounded-md">
          <button
            onClick={() => {
              handleRemoveFile(index)
            }}
            className="w-[25px] h-[25px] right-[-8px] mt-[-10px] z-[100] absolute bg-white rounded-full border border-solid border-neutral-300"
          >
            <CloseIcon className="w-4 h-4 m-auto text-darkTheme-950" />
          </button>
          {getFile(file) === "image" ? (
            <div className="h-[45px] w-[45px] bg-gray-200 rounded-md overflow-hidden">
              <Image
                alt="Uploaded Image"
                src={URL.createObjectURL(file)}
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
          ) : (
            <div className="flex items-center h-[45px] w-[45px] bg-gray-500 rounded-md overflow-hidden">
              <div className="w-[20px] h-[20px] ml-3 border border-white flex items-center rounded-full">
                <PlayIcon className="w-3 h-3 text-white m-auto" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}