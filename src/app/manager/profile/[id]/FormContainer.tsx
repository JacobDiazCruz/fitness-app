import Container from "@/components/global/Container";
import IconButton from "@/components/global/IconButton";
import { primaryTextColor } from "@/utils/themeColors";
import { ReactNode } from "react";
import { HiOutlinePencil, HiPlus } from 'react-icons/hi';
interface Props {
  formTitle: string;
  formDescription: string;
  formIcon: ReactNode;
  handleEdit?: any;
  handleAdd?: any;
  children: React.ReactNode;
};

export default function FormContainer({
  formTitle,
  formDescription,
  formIcon,
  handleEdit,
  handleAdd,
  children
}: Props) {
  return (
    <Container className="mt-7">
      <div className="flex gap-[15px]">
        <div className="rounded-full w-[50px] h-[50px] bg-[#24282C] flex items-center">
          {formIcon}
        </div>
        <div className="flex justify-between w-full">
          <div className="w-full">
            <h3 className="dark:text-neutral-50 text-darkTheme-900 text-[18px] font-medium">
              {formTitle}
            </h3>
            <p className="dark:text-gray-300 text-gray-500 text-[14px] font-light w-[100%]">
              {formDescription}
            </p>
          </div>
          <div>
            {handleEdit && (
              <IconButton onClick={handleEdit}>
                <HiOutlinePencil className={`${primaryTextColor} w-6 h-6`} />
              </IconButton>
            )}
            {handleAdd && (
              <IconButton onClick={handleAdd}>
                <HiPlus className={`${primaryTextColor} w-6 h-6`} />
              </IconButton>
            )}
          </div>
        </div>
      </div>
      {children}
    </Container>
  );
};