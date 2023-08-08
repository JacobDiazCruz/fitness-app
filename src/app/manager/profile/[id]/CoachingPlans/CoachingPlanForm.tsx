import AutoCompleteMultiple from "@/components/global/AutoCompleteMultiple";
import FieldName from "@/components/global/FieldName";
import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import TimeLengthField from "@/components/global/TimeLengthField";
import useCoachingPlanForm from "@/store/CoachingPlan/useCoachingPlanForm";
import { coachingServices } from "@/utils/coachingServices";
import { borderColor, primaryTextColor, secondaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import { TbCurrencyPeso } from "react-icons/tb";

export default function CoachingPlanForm() {
  const {
    form,
    setName,
    setGrossPrice,
    setTimeUnit,
    setTimeLength,
    setNumberOfSessions,
    setDescription,
    setServices
  }: any = useCoachingPlanForm();
  
  return (
    <div className="flex gap-[50px]">
      <div className={`${borderColor} border-r pr-[50px] w-full`}>
        <div className={`${secondaryTextColor} font-semibold`}>
          Plan Details
        </div>
        <div className="w-full mt-7">
          <FieldName>Plan name</FieldName>
          <TextField
            placeholder="e.g, Premium"
            value={form.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full mt-7">
          <FieldName>Services you offer</FieldName>
          <AutoCompleteMultiple
            items={coachingServices}
            value={form.services}
            onChange={(item: string) => {
              const newServices = [...form.services, item];
              setServices(newServices);
            }}
            removeSelectedItem={(item: string) => {
              const newServices = form.services.filter((service: string) => {
                return service !== item
              });
              setServices(newServices);
            }}
          />
        </div>
        <div className="w-full mt-7">
          <FieldName>Description</FieldName>
          <TextArea 
            placeholder="Enter title"
            value={form.description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className={`w-full`}>
        <div className={`${secondaryTextColor} font-semibold`}>
          Pricing Details
        </div>
        <div className="w-full flex items-center gap-[15px] mt-7">
          <div className="w-[150px]">
            <FieldName>Price per session</FieldName>
            <TextField
              value={form.grossPrice}
              startIcon={<TbCurrencyPeso className={secondaryTextColor} />}
              type="number"
              onChange={(e) => setGrossPrice(e.target.value)}
            />
          </div>
          <div className={`${tertiaryTextColor} mt-7 text-[14px]`}>
            This is the price that you'll get every after a session.
          </div>
        </div>
        <div className="flex gap-[20px] mt-7">
          <div className="w-[200px]">
            <FieldName>Maximum number of sessions</FieldName>
            <TextField 
              value={form.numberOfSessions}
              type="number"
              onChange={(e) => {
                setNumberOfSessions(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="w-full mt-7">
          <FieldName>Length of Time (until sessions expire)</FieldName>
          <div className="w-[200px]">
            <TimeLengthField
              value={form.timeLength}
              onChange={(e) => {
                setTimeLength(e.target.value);
              }}
              timeUnit={form.timeUnit}
              setTimeUnit={setTimeUnit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};