import Image from "next/image";
import IconButton from "@/components/global/IconButton";
import ItemActionsMenu from "@/components/global/ItemActionsMenu";

import {
  borderColor, 
  secondaryTextColor,
  primaryTextColor
} from "@/utils/themeColors";

export default function TableItem({
  itemId,
  fullName,
  email,
  thumbnailImage,
  createdAt
}) {
  const date = new Date(createdAt);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <div className={`${borderColor} cursor-pointer w-full border-t border-t-solid py-4 px-5`}>
      <div className="flex items-center w-full justify-between">
        <div className="col-1 flex items-center gap-[20px] flex-1">
          <div className="rounded-full bg-gray-300 w-[40px] h-[40px] overflow-hidden relative">
            {thumbnailImage && (
              <Image
                alt="Trainer Image"
                src={thumbnailImage}
                style={{ objectFit: "cover" }}
                fill
              />
            )}
          </div>
          <div>
            <h5 className={`${primaryTextColor} truncate w-[80%] font-medium text-[14px]`}>
              {fullName || '--'}
            </h5>
            <div className={`${secondaryTextColor} text-[12px]`}>
              {email}
            </div>
          </div>
        </div>
        <div className="col-3 flex-1">
          <div className={`${primaryTextColor} text-[14px]`}>
            Active
          </div>
        </div>
        <div className="col-5 flex-1">
          <p className={`${secondaryTextColor} text-[14px]`}>
            {formattedDate || '--'}
          </p>
        </div>
        <div className="col-5">
          <ItemActionsMenu
            itemId={itemId}
            editPath={`/manager/clients/edit/${itemId}`}
          />
        </div>
      </div>
    </div>
  );
}