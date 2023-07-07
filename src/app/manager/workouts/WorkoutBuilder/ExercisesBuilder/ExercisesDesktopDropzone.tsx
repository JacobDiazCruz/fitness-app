import { BarbellIcon } from "@/components/global/Icons";

export default function DekstopDropzone() {
  return (
    <div className="border-[2px] hidden md:flex rounded-lg border-dashed dark:border-neutral-800 border-gray-200 mt-5 h-[196px] items-center">
      <div className="m-auto">
        <div className="rounded-full w-[52px] h-[52px] dark:bg-darkTheme-900 bg-gray-100 flex m-auto items-center">
          <BarbellIcon className="m-auto w-6 h-6 fill-gray-500" />
        </div>
        <p className="dark:text-neutral-400 text-neutral-500 mt-3 text-[16px]">
          Drag &amp; Drop your exercise
        </p>
      </div>
    </div>
  );
};