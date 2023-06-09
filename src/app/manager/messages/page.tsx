'use client';

import { useState } from "react";
import Image from "next/image";

export default function Messages() {
  return (
    <div className="flex h-[90vh]">
      {/* Messages list */}
      <div className="w-[520px] bg-white border-r border-r-solid border-gray-300">
        <div className="p-3 border-t border-t-solid border-gray-300">
          <div className="flex gap-[12px]">
            <div className="rounded-full w-[50px] h-[50px] relative overflow-hidden">
              <Image
                alt="Trainer Image"
                src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
            <div>
              <h4 className="font-semibold">John Doe</h4>
              <p className="font-light text-gray-600 text-[14px]">Last message...</p>
            </div>
          </div>
        </div>
        <div className="p-3 border-t border-t-solid border-gray-300">
          <div className="flex gap-[12px]">
            <div className="rounded-full w-[50px] h-[50px] relative overflow-hidden">
              <Image
                alt="Trainer Image"
                src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
            <div>
              <h4 className="font-semibold">John Doe</h4>
              <p className="font-light text-gray-600 text-[14px]">Last message...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="w-full bg-white p-3">
        <div className="relative">
          {/* OTHER */}
          <div className="flex gap-[12px] mt-3">
            <div className="rounded-full w-[35px] h-[35px] relative overflow-hidden">
              <Image
                alt="Trainer Image"
                src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
            <div className="bg-gray-100 text-gray-900 py-3 px-4 rounded-3xl w-[50%]">
              <p className="text-[14px]">
                Hey hey, just a reminder that I will be out of town for a wedding next week!
              </p>
            </div>
          </div>
          {/* ME */}
          <div className="mt-3 flex flex-row-reverse">
            <div className="flex gap-[12px]">
              <div className="bg-gray-800 text-gray-50 py-3 px-4 rounded-3xl lg:w-[500px]">
                <p className="text-[14px]">
                  Hey hey, just a reminder that I will be out of town for a wedding next week! town for a wedding next week!town for a wedding next week!town for a wedding next week!town for a wedding next week!town for a wedding next week!
                </p>
              </div>
              <div className="rounded-full w-[35px] h-[35px] relative overflow-hidden">
                <Image
                  alt="Trainer Image"
                  src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
                  style={{ objectFit: "cover" }}
                  fill
                />
              </div>
            </div>
          </div>
          <div className="absolute bottom border border-solid border-gray-300 w-full h-[60px]">
            asd
          </div>
        </div>
      </div>

      {/* Profiles */}
      <div className="bg-white w-[500px] border-l border-l-solid border-gray-300 p-6">
        <div className="rounded-full w-[60px] h-[60px] relative overflow-hidden m-auto">
          <Image
            alt="Trainer Image"
            src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        <h3 className="font-semibold text-center mt-1">
          John Doe
        </h3>
      </div>
    </div>
  );
}