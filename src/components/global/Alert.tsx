import { CheckCircleIcon, CloseIcon } from "./Icons";

export default function Alert() {
  return (
    <div className="m-5 bg-zinc-800 text-white px-5 py-6 rounded-lg fixed left-0 bottom-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <div className="text-green-500">
            <CheckCircleIcon className="text-green-500 w-7 h-7"/>
          </div>
          <p className="font-light">Workout created successfully</p>
        </div>
        <div className="ml-10 cursor-pointer">
          <CloseIcon className="w-5 h-5"/>
        </div>
      </div>
    </div>
  );
}