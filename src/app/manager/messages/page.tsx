'use client';

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/global/Button";
import { ImageIcon } from "@/components/global/Icons";

export default function Messages() {
  return (
    <div className="flex h-[100vh]">
      {/* Messages list */}
      <div className="w-[520px] bg-white border-r border-r-solid border-gray-200">
        <div className="p-3 border-t border-t-solid border-gray-200">
          <div className="flex gap-[12px]">
            <div className="rounded-full w-[50px] h-[50px] relative overflow-hidden">
              <Image
                alt="Trainer Image"
                src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
            <div className="flex justify-between w-[80%]">
              <div>
                <h4 className="font-semibold">John Doe</h4>
                <p className="font-light text-gray-600 text-[14px]">Last message...</p>
              </div>
              <p className="text-gray-500 text-[12px]">May 30</p>
            </div>
          </div>
        </div>
        <div className="p-3 border-t border-t-solid border-gray-200">
          <div className="flex gap-[12px]">
            <div className="rounded-full w-[50px] h-[50px] relative overflow-hidden">
              <Image
                alt="Trainer Image"
                src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
            <div className="flex justify-between w-[80%]">
              <div>
                <h4 className="font-semibold">John Doe</h4>
                <p className="font-light text-gray-600 text-[14px]">Last message...</p>
              </div>
              <p className="text-gray-500 text-[12px]">May 30</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="w-full bg-white relative p-3">
        <div className="relative overflow-auto h-[80vh]">
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
        </div>
        {/* Send */}
        <div className="relative w-full h-[60px]">
          <div 
            className="border-gray-200 h-[60px] overflow-auto border-solid border rounded-lg p-3"
            contentEditable
          ></div>
          <div className="flex justify-between mt-2">
            <div>
              <ImageIcon className="w-8 h-8" />
            </div>
            <div>
              <Button variant="contained">
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Profiles */}
      <div className="bg-white w-[500px] border-l border-l-solid border-gray-200 p-6">
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