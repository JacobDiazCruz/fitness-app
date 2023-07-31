import { primaryTextColor } from "@/utils/themeColors";

interface Props {
  items: string[];
};

export default function TableColumnHeader({
  items
}: Props) {
  return (
    <div className={`${primaryTextColor} hidden md:flex justify-between px-5 py-3 text-[14px]`}>
      {items?.map((item: string) => (
        <div className="flex-1">
          <p>{item}</p>
        </div>
      ))}
      <div className="w-[32px]"></div>
    </div>
  );
};