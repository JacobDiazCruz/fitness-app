import Image from "next/image";

export default function TableItem() {
  return (
    <div className="bg-white w-full border border-gray-200 border-solid rounded-lg p-5 my-2">
      <div className="flex items-center w-full justify-between">
        <div className="col-1 flex items-center gap-[20px] w-[235px]">
          <div className="rounded-lg bg-gray-300 w-[65px] h-[65px] overflow-hidden relative">
            <Image
              alt="Trainer Image"
              src={"/user.png"}
              style={{ objectFit: "cover" }}
              fill
            />
          </div>
          <div>
            <h5 className="font-medium text-[14px]">Dumbbell Bicep Curls</h5>
          </div>
        </div>
        <div className="col-2 w-[100px]">
          <p className="text-[14px] text-gray-500">Biceps</p>
        </div>
        <div className="col-3 w-[80px]">
          <p className="text-[14px] text-gray-500">Strength</p>
        </div>
        <div className="col-4 w-[100px]">
          <p className="text-[14px] text-gray-500">July 12, 2023</p>
        </div>
        <div className="col-5">
          <button>
            <svg t="1685428629909" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7656" width="20" height="20"><path d="M512 512m-116.949333 0a116.949333 116.949333 0 1 0 233.898666 0 116.949333 116.949333 0 1 0-233.898666 0Z" fill="#b9b6b6" p-id="7657"></path><path d="M512 159.616m-116.949333 0a116.949333 116.949333 0 1 0 233.898666 0 116.949333 116.949333 0 1 0-233.898666 0Z" fill="#b9b6b6" p-id="7658"></path><path d="M512 864.384m-116.949333 0a116.949333 116.949333 0 1 0 233.898666 0 116.949333 116.949333 0 1 0-233.898666 0Z" fill="#b9b6b6" p-id="7659"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
}