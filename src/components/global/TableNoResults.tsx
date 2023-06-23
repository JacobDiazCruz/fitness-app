import { borderColor, primaryTextColor } from "@/utils/themeColors";

export default function TableNoResults() {
  return (
    <div className={`${borderColor} border-t border-t-solid`}>
      <p className={`${primaryTextColor} text-center mt-[70px] text-[14px] font-light`}>
        No results found.
      </p>
    </div>
  );
}