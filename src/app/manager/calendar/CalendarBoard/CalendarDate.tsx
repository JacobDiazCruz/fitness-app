import { primaryTextColor, tertiaryTextColor } from "@/utils/themeColors";

interface CalendarDateProps { 
  handleClick: () => void;
  activeDate: string;
  formattedDate: string;
};

export default function CalendarDate({
  handleClick,
  activeDate,
  formattedDate
}: CalendarDateProps) {
  return (
    <li
      onClick={handleClick}
      className="flex-1"
    >
      <div 
        className={`${activeDate} w-fit m-auto px-2 py-1 cursor-pointer`}
      >
        <p className={`${tertiaryTextColor} text-center text-[16px]`}>
          {formattedDate}
        </p>
      </div>
    </li>
  );
};