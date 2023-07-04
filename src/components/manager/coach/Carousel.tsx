import IconButton from "@/components/global/IconButton";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/global/Icons";
import { primaryTextColor } from "@/utils/themeColors";
import Image from "next/image";
import { useState } from "react";

interface Props {
  galleryImages: Array<any>;
}

export default function Carousel({ galleryImages = [] }: Props) {
  const [coverImage, setCoverImage] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleChangeCoverImage = (action: string) => {
    let nextIndex;
    if (action === "next") {
      nextIndex = (currentImageIndex + 1) % galleryImages.length;
    } else if (action === "back") {
      nextIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    }
    setCurrentImageIndex(nextIndex);
  };

  return (
    <div className="carousel-container">
      <div className="bg-neutral-900 flex items-center px-[10px]">
        <IconButton onClick={() => handleChangeCoverImage("back")}>
          <ArrowLeftIcon className={`text-white w-7 h-7`} />
        </IconButton>
        <div className="w-full mx-2 h-fit h-[350px] max-h-[350px] overflow-hidden relative">
          {galleryImages?.length && (
            <img
              alt="Cover Gallery Image"
              className="w-auto h-auto m-auto"
              src={galleryImages[currentImageIndex]}
              style={{ objectFit: "cover" }}
              fill
            />
          )}
        </div>
        <IconButton onClick={() => handleChangeCoverImage("next")}>
          <ArrowRightIcon className={`text-white w-7 h-7`} />
        </IconButton>
      </div>
      <div className="flex py-[14px] px-0">
        {galleryImages?.map((image, index) => (
          <div
            key={index}
            className={`
              ${index === currentImageIndex && 'border-[2px] border-solid border-blue-500 opacity-40'} 
              w-[180px] h-[120px] rounded-md overflow-hidden relative mr-[14px] cursor-pointer
            `}
            onClick={() => {
              setCurrentImageIndex(index)
            }}
          >
            <Image
              alt="Gallery Image"
              fill
              style={{ objectFit: "cover" }}
              src={image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
