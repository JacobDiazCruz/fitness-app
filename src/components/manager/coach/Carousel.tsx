import { ArrowLeftIcon, ArrowRightIcon } from "@/components/global/Icons";
import Image from "next/image";
interface Props {
  galleryImages: Array<any>;
};

export default function Carousel({
  galleryImages
}: Props) {

  return (
    <div className="carousel-container">
      <div className="w-full h-[363px] overflow-hidden relative">
        <div className="z-[50] relative flex h-full items-center cursor-pointer justify-between">
          <div onClick={() => alert(1)}>
            <ArrowLeftIcon />
          </div>
          <div onClick={() => alert(2)}>
            <ArrowRightIcon />
          </div>
        </div>
        <Image
          alt="Cover Image"
          fill
          style={{ objectFit: "cover" }}
          src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
        />
      </div>
      <div className="flex py-[14px] px-0">
        {galleryImages.map(image => (
          <div className="w-[150px] h-[104px] overflow-hidden relative mr-[14px]">
            <Image
              alt={image.alt}
              fill
              style={{ objectFit: "cover" }}
              src={image.src}
            />
          </div>
        ))}
      </div>
    </div>
  );
}