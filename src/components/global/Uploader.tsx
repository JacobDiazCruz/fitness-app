'use state';

import Image from 'next/image';
import { ChangeEvent, memo, useState } from 'react';
import { 
  borderColor, 
  primaryTextColor, 
  secondaryTextColor 
} from "@/utils/themeColors";
import { TrashIcon } from './Icons';

interface Props {
  id?: string;
  max?: number;
  existingFilesList?: Array<string>;
  initialFilesList?: Array<any>;
  setInitialFilesList?: any;
  setExistingFilesList?: any;
};

const Uploader = ({
  id = "file",
  max = 6,
  existingFilesList = [],
  initialFilesList = [],
  setInitialFilesList,
  setExistingFilesList
}: Props) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target?.files;
    console.log("initialFilesList", initialFilesList)
    console.log("max", max)
    if(initialFilesList.length >= max) {
      return;
    }

    if (fileList) {
      const newFiles = Array.from(fileList);
      setInitialFilesList((prevFiles: Array<File>) => [...prevFiles, ...newFiles]);

      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          const dataURL = event.target?.result;
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    const filteredInitialFiles = initialFilesList
      .filter((file: any, fileIndex: number) => fileIndex !== index);
    setInitialFilesList(filteredInitialFiles);
  }

  const handleRemoveExistingFile = (index: number) => {
    const filteredFiles = existingFilesList
      .filter((file: any, fileIndex: number) => fileIndex !== index);
    setExistingFilesList(filteredFiles);
  }

  return (
    <div>
      <input 
        className="invisible h-[0px]" 
        type="file" 
        name={id} 
        id={id}
        onChange={handleFileChange}
        multiple
      />
      <label htmlFor={id} className="cursor-pointer">
        <div className={`${borderColor} border-[2px] flex rounded-lg w-full h-[200px] border-dashed`}>
          <div className="m-auto text-center w-full">
            <svg t="1685411973368" class="icon m-auto" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4338" id="mx_n_1685411973370" width="60" height="60"><path d="M915.2 280.4l-165-8-9.6-107.6c-2-22.6-22.2-38.4-45.8-36.6L103 176.8c-23.6 2-40.6 21-38.8 43.4l42.4 471.6c2 22.6 22.4 38.4 45.8 36.6l30-2.4-4.8 91.6c-1.2 25.2 18.4 45.6 44.8 47L882.6 896c26.4 1.2 48.2-17.2 49.6-42.4L960 327c1.2-25-18.6-45.4-44.8-46.6z m-709.8 10.6l-14.2 269.6L156.2 610 124 254v-2c2-10 8.8-18 19.2-18.8l522-42.8c10.4-0.8 19.4 6 21 15.8 0 0.4 0.6 0.4 0.6 0.8 0 0.2 0.6 0.4 0.6 0.8l5.4 61.6-438-21c-26.4-0.8-48.2 17.6-49.4 42.6z m668 473.8l-169.6-199-74.8 68.6-138.4-161.6-245.4 261.4L266 336v-0.8c2-10.8 12.4-18.6 23.8-18l582.4 28c11.6 0.6 20.6 9.4 20.8 20.4 0 0.4 0.6 0.6 0.6 1l-20.2 398.2z" p-id="4339" fill="#8f8da0"></path><path d="M768 512c35.2 0 64-28.8 64-64s-28.6-64-64-64c-35.2 0-64 28.6-64 64s28.6 64 64 64z" p-id="4340" fill="#8f8da0"></path></svg>
            <p className={`${secondaryTextColor} text-medium text-[18px]`}>
              Drag <span className="text-[#E13291]">files</span> to upload
            </p>
            <p className="text-[14px] mt-1 text-gray-500">Maximum of {max} files</p>
          </div>
        </div>
      </label>

      <div className="flex gap-[20px] mt-5">
        {existingFilesList?.map((file: any, index: number) => (
          <div className={`${borderColor} border border-solid h-[130px] rounded-lg`}>
            <div className="p-2 flex justify-between">
              <div></div>
              <button onClick={() => {
                handleRemoveExistingFile(index)
              }}>
                <TrashIcon className={`${primaryTextColor} w-5 h-5`} />
              </button>
            </div>
            <div className="rounded-md relative overflow-hidden w-[100px] h-[80px]">
              <Image
                alt="Cover Image"
                src={file}
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
          </div>
        ))}

        {initialFilesList?.map((file: any, index: number) => (
          <div className={`${borderColor} border border-solid h-[130px] rounded-lg`}>
            <div className="p-2 flex justify-between">
              <div></div>
              <button onClick={() => {
                handleRemoveFile(index)
              }}>
                <TrashIcon className={`${primaryTextColor} w-5 h-5`} />
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
};

export default memo(Uploader);