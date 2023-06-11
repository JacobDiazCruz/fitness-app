import { LoadingIcon } from "@/components/global/Icons";

export default function Loading() {
  return (
    <div className="w-full h-[600px] text-white flex items-center">
      <LoadingIcon className="w-6 h-6 m-auto" />
    </div>
  );
}