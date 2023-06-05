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
    <div className="bg-white p-8 rounded-lg mt-5 shadow-md">
      <div className="flex">
        <div className="rounded-full w-[50px] h-[50px] bg-[#24282C] flex items-center">
          {formIcon}
        </div>
        <div className="ml-4">
          <h3 className="text-[18px] font-medium">{formTitle}</h3>
          <p className="text-[#9C9EA0] w-[100%]">{formDescription}</p>
        </div>
      </div>
      {children}
    </div>
  );
}