import React, { useEffect, useState } from "react";

interface Props {
  numberOfStars?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  value: number;
  onChange: (val: number) => void;
}

export default function Rating({ 
  numberOfStars = 5, 
  size = "lg",
  value,
  onChange
}: Props) {
  const [stars, setStars] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const starsObj: { [key: number]: boolean } = {};
    for (let i = 1; i <= numberOfStars; i++) {
      starsObj[i] = false;
    }
    setStars(starsObj);
  }, [numberOfStars]);

  const sizesMap = {
    xs: "w-2 h-2",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  };

  const handleClick = (index: number) => {
    const updatedStars: { [key: number]: boolean } = {};
    for (let i = 1; i <= numberOfStars; i++) {
      updatedStars[i] = i <= index;
    }
    onChange(index);
    setStars(updatedStars);
  };

  return (
    <div className="flex items-center gap-[10px]">
      {Object.keys(stars).map((key: string) => {
        const index = parseInt(key);
        return (
          <svg
            key={index}
            onClick={() => handleClick(index)}
            aria-hidden="true"
            className={`${sizesMap[size]} cursor-pointer ${
              stars[index] ? "text-teal-400" : "text-neutral-500"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
};