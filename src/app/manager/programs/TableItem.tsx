import Image from "next/image";

export default function TableItem() {
  return (
    <div className="bg-white w-full border border-gray-200 border-solid rounded-lg p-5 my-2">
      <div className="flex items-center w-full justify-between">
        <div className="col-2 w-[90%]">
          <p className="text-[16px] text-medium">Total body program</p>
          <p className="text-[14px] text-gray-500">3 weeks</p>
          <p className="text-[14px] text-gray-500 w-[60%] mt-3">Loosely based off of Mark Rippetoe’s Starting Strength. A full body, free weight program that is designed for newcomers or those that have taken a break from weight training. Even if you're not a newbie. This program is beneficial to all.</p>
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