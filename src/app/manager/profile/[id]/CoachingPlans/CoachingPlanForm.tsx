import FieldName from "@/components/global/FieldName";
import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import TimeLengthField from "@/components/global/TimeLengthField";
import useCoachingPlanForm from "@/contexts/CoachingPlan/useCoachingPlanForm";
import { CoachingService } from "@/utils/coachTypes";
import { borderColor, primaryBgColor, primaryTextColor, tertiaryTextColor } from "@/utils/themeColors";
import { FaCheckCircle } from "react-icons/fa"

export default function CoachingPlanForm() {

  const {
    form,
    services,
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
        <div className="w-full">
          <FieldName>Plan name</FieldName>
          <TextField
            placeholder="e.g, Premium"
            value={form.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full flex items-center gap-[15px] mt-7">
          <div className="w-[100px]">
            <FieldName>Gross Price</FieldName>
            <TextField 
              value={form.grossPrice}
              type="number"
              onChange={(e) => setGrossPrice(e.target.value)}
            />
          </div>
          <div className={`${tertiaryTextColor} mt-7`}>
            + 15% = 
          </div>
          <div className="w-[100px]">
            <FieldName>Total Price</FieldName>
            <TextField 
              value={form.totalPrice}
              type="number"
              disabled
            />
          </div>
        </div>
        {/* <div className={`${tertiaryTextColor} mt-2 text-[14px]`}>
          Our commission fee, which is 15%, will be added to the Net Price, which represents the total amount to the client.
        </div> */}
        <div className="flex gap-[20px] mt-7">
          <div className="w-[200px]">
            <FieldName>Number of Sessions</FieldName>
            <TextField 
              value={form.numberOfSessions}
              type="number"
              onChange={(e) => {
                setNumberOfSessions(e.target.value);
              }}
            />
          </div>
          <div className="w-full">
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
        <div className="flex justify-between">
          <FieldName>
            Select services to offer
          </FieldName>
          <FieldName>
            3 Selected
          </FieldName>
        </div>
        {services?.map((service: CoachingService, key: number) => (
          <div 
            onClick={() => {
              const newOrderOptions = [...services];
              newOrderOptions[key].isSelected = !services[key].isSelected;
              setServices(newOrderOptions);
            }}
            className={`
              flex p-4 mt-4 rounded-lg border border-solid cursor-pointer justify-between 
              ${service?.isSelected ? 'border-teal-500 dark:border-teal-900 bg-teal-50 dark:bg-teal-950' : `${primaryBgColor} dark:border-neutral-700`}
            `}
          >
            <div>
              <p className={`${primaryTextColor} font-semibold text-[14px]`}>
                {service.title}
              </p>
            </div>

            <div className={`
              w-[25px] h-[25px] border border-solid rounded-full flex items-center 
              ${service.isSelected ? 'border-none' : borderColor}`
            }>
              {service.isSelected && (
                <FaCheckCircle className="w-[25px] h-[25px] text-teal-500"/>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};