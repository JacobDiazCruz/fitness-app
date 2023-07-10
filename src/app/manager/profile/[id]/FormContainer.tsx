import Container from "@/components/global/Container";
import IconButton from "@/components/global/IconButton";
import { PencilIcon } from "@/components/global/Icons";
import { ReactNode } from "react";
interface Props {
  formTitle: string;
  formDescription: string;
  formIcon: ReactNode;
  handleEdit?: any;
  children: React.ReactNode;
};

export default function ProfileForm({
  formTitle,
  formDescription,
  formIcon,
  handleEdit,
  children
}: Props) {
  return (
    <Container className="mt-7">
      <div className="flex gap-[15px]">
        <div className="rounded-full w-[50px] h-[50px] bg-[#24282C] flex items-center">
          {formIcon}
        </div>
        <div>
          <div className="flex items-center">
            <h3 className="dark:text-neutral-50 text-darkTheme-900 text-[18px] font-medium">
              {formTitle}
            </h3>
            <IconButton onClick={handleEdit}>
              <PencilIcon className="text-white w-5 h-5" />
            </IconButton>
          </div>
          <p className="dark:text-gray-300 text-gray-500 text-[14px] font-light w-[100%]">
            {formDescription}
          </p>
        </div>
      </div>
      {children}
    </Container>
  );
}