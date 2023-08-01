import ItemActionsMenu from "@/components/global/ItemActionsMenu";
import usePrimaryFocusColor from "@/hooks/usePrimaryFocusColor";

import {
  borderColor, 
  secondaryTextColor,
  primaryTextColor
} from "@/utils/themeColors";
import VideoThumbnail from "../../../components/global/VideoThumbnail";
import { useRouter } from "next/navigation";
interface Props {
  itemId: string;
  name: string;
  primaryFocus: string;
  videoLink: string;
  category: string;
  createdAt: string;
};

export default function TableItem({
  itemId,
  name,
  primaryFocus,
  videoLink,
  category,
  createdAt
}: Props) {
  const router = useRouter();
  const { handlePrimaryFocusColor } = usePrimaryFocusColor();

  const date = new Date(createdAt);
  const options: object = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <div className={`${borderColor} flex justify-between cursor-pointer w-full border-t border-t-solid py-6 md:py-4 md:px-5`}>
      <div className="flex flex-col md:flex-row md:items-center w-full justify-between">
        <div className="col-1 flex md:items-center gap-[20px] flex-1">
          {videoLink && (
            <div className="w-[70px] relative overflow-hidden rounded-md cursor-pointer">
              <VideoThumbnail
                videoUrl={videoLink}
              />
            </div>
          )}
          <h5 className={`${primaryTextColor} font-medium text-[14px] truncate w-[200px] md:w-[280px]`}>
            {name || '--'}
          </h5>
        </div>
        <div className="col-3 flex-1 md:ml-0 ml-[90px] md:mt-0">
          <div className={`
              ${handlePrimaryFocusColor(primaryFocus)} 
              w-[fit-content] py-1 px-3 rounded-lg font-medium text-[14px]
            `}
          >
            {primaryFocus || '--'}
          </div>
        </div>
        <div className="col-4 flex-1 md:ml-0 ml-[90px] md:mt-0 mt-2">
          <p className={`${secondaryTextColor} text-[14px]`}>
            {category || '--'}
          </p>
        </div>
        <div className="col-5 flex-1 md:ml-0 ml-[90px] md:mt-0 mt-2">
          <p className={`${secondaryTextColor} text-[14px]`}>
            {formattedDate || '--'}
          </p>
        </div>
        <div className="col-5 hidden md:block">
          {/* For Desktop View */}
          <ItemActionsMenu
            handleEdit={() => {
              router.push(`/manager/exercises/edit/${itemId}`)
            }}
          />
        </div>
      </div>
      {/* For Mobile View */}
      <div className="col-5 block md:hidden">
        <ItemActionsMenu 
          handleEdit={() => {
            router.push(`/manager/exercises/edit/${itemId}`)
          }}
        />
      </div>
    </div>
  );
}