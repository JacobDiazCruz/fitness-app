'use state';

import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

export default function Uploader({
  initialFilesList = [],
  setInitialFilesList
}) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files);
    setInitialFilesList(prevFiles => [...prevFiles, ...newFiles]);
  
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataURL = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <input 
        className="invisible h-[0px]" 
        type="file" 
        name="file" 
        id="file" 
        onChange={handleFileChange}
        multiple
      />

      <label for="file" className="cursor-pointer">
        <div className="border-[2px] flex rounded-lg border-gray-200 w-full h-[200px] border-dashed">
          <div className="m-auto text-center w-full">
            <svg t="1685411973368" class="icon m-auto" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4338" id="mx_n_1685411973370" width="60" height="60"><path d="M915.2 280.4l-165-8-9.6-107.6c-2-22.6-22.2-38.4-45.8-36.6L103 176.8c-23.6 2-40.6 21-38.8 43.4l42.4 471.6c2 22.6 22.4 38.4 45.8 36.6l30-2.4-4.8 91.6c-1.2 25.2 18.4 45.6 44.8 47L882.6 896c26.4 1.2 48.2-17.2 49.6-42.4L960 327c1.2-25-18.6-45.4-44.8-46.6z m-709.8 10.6l-14.2 269.6L156.2 610 124 254v-2c2-10 8.8-18 19.2-18.8l522-42.8c10.4-0.8 19.4 6 21 15.8 0 0.4 0.6 0.4 0.6 0.8 0 0.2 0.6 0.4 0.6 0.8l5.4 61.6-438-21c-26.4-0.8-48.2 17.6-49.4 42.6z m668 473.8l-169.6-199-74.8 68.6-138.4-161.6-245.4 261.4L266 336v-0.8c2-10.8 12.4-18.6 23.8-18l582.4 28c11.6 0.6 20.6 9.4 20.8 20.4 0 0.4 0.6 0.6 0.6 1l-20.2 398.2z" p-id="4339" fill="#8f8da0"></path><path d="M768 512c35.2 0 64-28.8 64-64s-28.6-64-64-64c-35.2 0-64 28.6-64 64s28.6 64 64 64z" p-id="4340" fill="#8f8da0"></path></svg>
            <p className="text-medium text-[18px]">
              Drag <span className="text-[#E13291]">files</span> to upload
            </p>
            <p className="text-[14px] mt-1 text-gray-500">Maximum of 3 files</p>
          </div>
        </div>
      </label>

      <div className="flex gap-[20px] mt-5">
        {initialFilesList?.map((file) => (
          <div className="border border-solid border-gray-200 h-[130px] rounded-lg">
            <div className="p-2 flex justify-between">
              <div></div>
              <button onClick={() => alert(1)}>
                <svg t="1685375682678" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2402" width="25" height="25"><path d="M768 384c-19.2 0-32 12.8-32 32l0 377.6c0 25.6-19.2 38.4-38.4 38.4L326.4 832c-25.6 0-38.4-19.2-38.4-38.4L288 416C288 396.8 275.2 384 256 384S224 396.8 224 416l0 377.6c0 57.6 44.8 102.4 102.4 102.4l364.8 0c57.6 0 102.4-44.8 102.4-102.4L793.6 416C800 396.8 787.2 384 768 384z" fill="#272636" p-id="2403"></path><path d="M460.8 736l0-320C460.8 396.8 448 384 435.2 384S396.8 396.8 396.8 416l0 320c0 19.2 12.8 32 32 32S460.8 755.2 460.8 736z" fill="#272636" p-id="2404"></path><path d="M627.2 736l0-320C627.2 396.8 608 384 588.8 384S563.2 396.8 563.2 416l0 320C563.2 755.2 576 768 588.8 768S627.2 755.2 627.2 736z" fill="#272636" p-id="2405"></path><path d="M832 256l-160 0L672 211.2C672 166.4 633.6 128 588.8 128L435.2 128C390.4 128 352 166.4 352 211.2L352 256 192 256C172.8 256 160 268.8 160 288S172.8 320 192 320l640 0c19.2 0 32-12.8 32-32S851.2 256 832 256zM416 211.2C416 198.4 422.4 192 435.2 192l153.6 0c12.8 0 19.2 6.4 19.2 19.2L608 256l-192 0L416 211.2z" fill="#272636" p-id="2406"></path></svg>
              </button>
            </div>
            <div className="rounded-md relative overflow-hidden w-[100px] h-[80px]">
              <Image
                alt="Cover Image"
                src={URL.createObjectURL(file)}
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}