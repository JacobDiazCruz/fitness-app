import Image from "next/image";
import IconButton from "@/components/global/IconButton";
import TableItemActions from "@/components/global/TableItemActions";
import usePrimaryFocusColor from "@/hooks/usePrimaryFocusColor";

import {
  borderColor, 
  secondaryTextColor,
  primaryTextColor 
} from "@/utils/themeColors";

interface Props {
  itemId: string;
  name: string;
  description: string;
  exercisesCount: number;
  createdAt: number;
};

export default function TableItem({
  itemId,
  name,
  description,
  exercisesCount,
  createdAt
}: Props) {
  const { handlePrimaryFocusColor } = usePrimaryFocusColor();
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
            <p className="dark:text-neutral-400 text-neutral-800">
              {description}
            </p>
            <p className="dark:text-neutral-400 text-neutral-800">
              {exercisesCount} exercises
            </p>
          </div>
        </div>
        <div className="col-5 flex-1">
          <p className={`${secondaryTextColor} text-[14px]`}>
            {formattedDate || '--'}
          </p>
        </div>
        <div className="col-5">
          <TableItemActions 
            itemId={itemId}
            editPath={`/manager/workouts/edit/${itemId}`}
          />
        </div>
      </div>
    </div>
  );
}