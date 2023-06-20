import Image from "next/image";
import IconButton from "@/components/global/IconButton";
import TableItemActions from "@/components/global/TableItemActions";
import usePrimaryFocusColor from "@/hooks/usePrimaryFocusColor";
import useDarkTheme from "@/hooks/useDarkTheme";

export default function TableItem({
  itemId,
  name,
  primaryFocus,
  category,
  createdAt,
  coverImage
}) {
  const { handlePrimaryFocusColor } = usePrimaryFocusColor();
  const { 
    borderColor, 
    secondaryTextColor,
    primaryTextColor 
  } = useDarkTheme();
  const date = new Date(createdAt);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <div className={`${borderColor} cursor-pointer w-full border-t border-t-solid py-4 px-5`}>
      <div className="flex items-center w-full justify-between">
        <div className="col-1 flex items-center gap-[20px] flex-1">
          <div className="rounded-md bg-gray-300 w-[50px] h-[50px] overflow-hidden relative">
            <Image
              alt="Trainer Image"
              src={coverImage}
              style={{ objectFit: "cover" }}
              fill
            />
          </div>
          <div>
            <h5 className={`${primaryTextColor} font-medium text-[14px]`}>
              {name || '--'}
            </h5>
          </div>
        </div>
        <div className="col-3 flex-1">
          <div className={`
              ${handlePrimaryFocusColor(primaryFocus)} 
              w-[fit-content] py-2 px-3 rounded-lg font-medium text-[14px]
            `}
          >
            {primaryFocus || '--'}
          </div>
        </div>
        <div className="col-4 flex-1">
          <p className={`${secondaryTextColor} text-[14px]`}>
            {category || '--'}
          </p>
        </div>
        <div className="col-5 flex-1">
          <p className={`${secondaryTextColor} text-[14px]`}>
            {formattedDate || '--'}
          </p>
        </div>
        <div className="col-5">
          <TableItemActions 
            itemId={itemId}
            editPath={`/manager/exercises/edit/${itemId}`}
          />
        </div>
      </div>
    </div>
  );
}