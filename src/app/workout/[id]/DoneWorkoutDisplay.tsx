import { MuscleFlex } from "@/components/global/Icons";
import { secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";

export default function DoneWorkoutDisplay() {
    return (
      <div className="m-auto">
        <MuscleFlex className="m-auto"/>
        <div className="text-center">
          <div className={`${secondaryTextColor} mt-3 font-medium`}>
            Congratulations!
          </div>
          <div className={`${tertiaryTextColor} font-light`}>
            You made it to the end.
          </div>
        </div>
      </div>
    );
  };