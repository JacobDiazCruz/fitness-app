"use client";

import { useEffect } from "react";

export default function () {

  const containsDuplicate = (nums: number[]) => {
    let storedNums: any = {};
    for(let i = 0; i < nums.length; i++) {
      if(storedNums[nums[i]]) {
        return true;
      }
      storedNums[nums[i]] = true;
    }
    console.log("storedNums", storedNums)
    return false;
  };

  useEffect(() => {
    console.log(containsDuplicate([1, 1, 2, 3, 5]));
  }, []);

  return (
    <div className="workout-page">
      <div className="w-full p-3 "></div>
    </div>
  );
}