interface Props {
  children: React.ReactNode
};

export default function ProfileForm({
  formTitle,
  formDescription,
  formIcon,
  children
}: Props) {
  return (
    <div className="dark:bg-neutral-950 bg-white p-8 rounded-lg mt-5 shadow-sm">
      <div className="flex">
        <div className="rounded-full w-[50px] h-[50px] bg-[#24282C] flex items-center">
          {formIcon}
        </div>
        <div className="ml-4">
          <h3 className="dark:text-neutral-50 text-neutral-900 text-[18px] font-medium">
            {formTitle}
          </h3>
          <p className="dark:text-gray-300 text-gray-500 text-[14px] font-light w-[100%]">{formDescription}</p>
        </div>
      </div>
      {children}
    </div>
  );
}