import Button from "@/components/global/Button";
import { borderColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";

export default function FooterMenu({
  primaryButton,
  currentExercise,
  currentExerciseSet,
  handleClickPrimaryAction
}: any) {
  return (
    <div className={`actionbar border-t w-full ${borderColor} bg-[#131313] m-auto fixed bottom-0 md:left-0 md:right-0`}>
      <div className="flex items-center justify-between px-5 py-3 h-full">
        <div className="col-1">
          <div className={`text-neutral-400 text-[12px]`}>
            exercise:
          </div>
          <div className={`text-neutral-200 text-[14px] md:text-[16px]`}>
            {currentExercise?.name}
          </div>
        </div>
        <div className={`sets flex gap-[40px] w-fit`}>
          <div>
            <div className={`${secondaryTextColor} text-[14px]`}>Set</div>
            <div className={`${tertiaryTextColor} text-[14px]`}>{currentExerciseSet?.index + 1}</div>
          </div>
          <div>
            <div className={`${secondaryTextColor} text-[14px]`}>Reps</div>
            <div className={`${tertiaryTextColor} text-[14px]`}>7-10</div>
          </div>
        </div>
        <Button 
          variant={primaryButton.variant} 
          onClick={handleClickPrimaryAction}
          startIcon={primaryButton.icon}
        >
          {primaryButton.value}
        </Button>
      </div>
    </div>
  );
};