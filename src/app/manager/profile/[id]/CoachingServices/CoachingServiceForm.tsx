import TextField from "@/components/global/TextField";
import useCoachingServiceForm, { UseCoachingServiceForm } from "@/contexts/CoachingService/useCoachingServiceForm";

export default function CoachingServiceForm() {
  const {
    form,
    setTitle,
    setDescription,
    setPrice
  }: UseCoachingServiceForm = useCoachingServiceForm()!;

  return (
    <div className="pb-5 flex gap-[20px] w-full">
      <div className="w-[226px]">
        <p className="dark:text-neutral-50 text-darkTheme-900 mb-2 text-[14px]">
          Title
        </p>
        <TextField
          value={form.title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="e.g. Nutrition plan"
          className="h-[49px]"
        />
      </div>
      <div className="w-[350px]">
        <p className="dark:text-neutral-50 text-darkTheme-900 mb-2 text-[14px]">
          Description
        </p>
        <TextField
          value={form.description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="h-[49px]"
          placeholder="e.g. I will guide you on how to plan your meals"
        />
      </div>
    </div>
  );
}