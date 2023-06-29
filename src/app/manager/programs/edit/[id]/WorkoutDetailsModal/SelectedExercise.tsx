import VideoThumbnail from "@/components/global/VideoThumbnail";
import usePrimaryFocusColor from "@/hooks/usePrimaryFocusColor";
import { borderColor, primaryBgColor, primaryTextColor, secondaryTextColor, tertiaryBgColor } from "@/utils/themeColors";

export default function SelectedExercise ({
  name,
  instruction,
  videoLink,
  primaryFocus,
  sets,
  setShowVideoModal,
  setCurrentVideoLink,
}: any) {
  const { handlePrimaryFocusColor } = usePrimaryFocusColor();

  return (
    <div className={`${borderColor} w-full border shadow-sm border-solid rounded-lg overflow-hidden`}>
      {/* Header */}
      <div className={`${tertiaryBgColor} py-2 px-4 flex justify-between items-center`}>
        <div className="flex gap-[15px]">
          {videoLink && (
            <div
              className="w-[100px] relative overflow-hidden rounded-md"
            >
              <VideoThumbnail
                videoUrl={videoLink}
                onClick={() => {
                  setShowVideoModal(true)
                  setCurrentVideoLink(videoLink)
                }}
              />
            </div>
          )}
          <div className="w-[50%]">
            <p className={`${primaryTextColor} text-[14px] font-semibold`}>
              {name}
            </p>
            <p className={`${secondaryTextColor} text-[12px] font-light mt-2`}>
              {instruction}
            </p>
          </div>
        </div>
        <div className="flex">
          <div className={`${handlePrimaryFocusColor(primaryFocus)} rounded-md text-center px-2 text-[11px] whitespace-nowrap`}>
            {primaryFocus}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={`${primaryBgColor} p-6 text-center text-[13px]`}>
        <div className="headers flex gap-[15px]">
          <div className="field w-[100px] flex">
            <p className={`${secondaryTextColor} font-light`}>
              Set
            </p>
          </div>
          <div className="field w-[100px] flex">
            <p className={`${secondaryTextColor} font-light`}>
              Set type
            </p>
          </div>
          <div className="field w-[100px] flex">
            <p className={`${secondaryTextColor} font-light`}>
              Reps
            </p>
          </div>
          <div className="field w-[100px] flex">
            <p className={`${secondaryTextColor} font-light`}>
              Rest
            </p>
          </div>
        </div>
        <div className="mt-4">
          {sets?.map((set: any, index: number) => {
            const { setType, reps, rest } = set;
            return (
              <div className="flex gap-[15px] mt-2">
                <div className="field w-[100px] flex">
                  <p className={`${primaryTextColor} font-light`}>
                    {index + 1}
                  </p>
                </div>
                <div className="field w-[100px] flex">
                  <p className={`${primaryTextColor} font-light`}>
                    {setType?.name || '--'}
                  </p>
                </div>
                <div className="field w-[100px] flex">
                  <p className={`${primaryTextColor} font-light`}>
                    {reps || '--'}
                  </p>
                </div>
                <div className="field w-[100px] flex">
                  <p className={`${primaryTextColor} font-light`}>
                    {rest || '--'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}