import Image from "next/image";
import {
  borderColor, 
  secondaryTextColor,
  primaryTextColor 
} from "@/utils/themeColors";
import TableItemActions from "@/components/global/TableItemActions";
interface Props {
  itemId: string;
  name: string;
  weeks: number;
  description: string;
};

export default function TableItem({
  itemId,
  name,
  weeks,
  description,
  createdAt
}: Props) {
  const date = new Date(createdAt);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <div className={`${borderColor} cursor-pointer w-full border-t border-t-solid py-4 px-5`}>
      <div className="flex items-center w-full justify-between">
        <div className="col-1 flex items-center gap-[20px] flex-1">
          <div>
            <h5 className={`${primaryTextColor} font-medium text-[16px]`}>
              {name || '--'}
            </h5>
            <p className="dark:text-neutral-400 text-neutral-800 text-[14px]">
              {description}
            </p>
          </div>
        </div>
        <div className="col-2 flex-1">
          <p className={`${secondaryTextColor} text-[14px]`}>
            {weeks} weeks
          </p>
        </div>
        <div className="col-3 flex-1">
          <p className={`${secondaryTextColor} text-[14px]`}>
            {formattedDate || '--'}
          </p>
        </div>
        <div className="col-5">
          <TableItemActions 
            itemId={itemId}
            editPath={`/manager/programs/edit/${itemId}`}
          />
        </div>
      </div>
    </div>
  );
}