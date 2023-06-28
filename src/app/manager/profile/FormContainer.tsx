import Container from "@/components/global/Container";
import IconButton from "@/components/global/IconButton";
import { PencilIcon } from "@/components/global/Icons";
import { primaryTextColor } from "@/utils/themeColors";

interface Props {
  formTitle: string;
  formDescription: string;
  formIcon: SVGAElement;
  children: React.ReactNode;
};

export default function ProfileForm({
  formTitle,
  formDescription,
  formIcon,
  children
}: Props) {
  return (
    <Container className="mt-7">
      <div className="flex gap-[15px]">
        <div className="rounded-full w-[50px] h-[50px] bg-[#24282C] flex items-center">
          {formIcon}
        </div>
        <div>
          <h3 className="dark:text-neutral-50 text-darkTheme-900 text-[18px] font-medium">
            {formTitle}
          </h3>
          <p className="dark:text-gray-300 text-gray-500 text-[14px] font-light w-[100%]">
            {formDescription}
          </p>
        </div>
      </div>
      {children}
    </Container>
  );
}