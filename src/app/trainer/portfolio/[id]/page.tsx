'use client'

import { useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon } from "@/components/global/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation"

export default function TrainerPortfolio() {
  const router = useRouter()
  const [portfolioImages, setPortfolioImages] = useState([
    {
      name: "Portfolio Image 1",
      imagePath: "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png",
    },
    {
      name: "Portfolio Image 1",
      imagePath: "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png",
    },
    {
      name: "Portfolio Image 1",
      imagePath: "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png",
    },
    {
      name: "Portfolio Image 1",
      imagePath: "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png",
    },
    {
      name: "Portfolio Image 1",
      imagePath: "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png",
    },
    {
      name: "Portfolio Image 1",
      imagePath: "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png",
    }
  ]);

  return (
    <div className="portfolio-page-container">
      <div className="portfolio-page-header flex gap-[100px]">
        <Link href="/trainer" className="flex items-center gap-[8px]">
          <ArrowLeftIcon />
          Go back
        </Link>
        <div className="flex gap-[10px] items-center">
          <div className="rounded-full overflow-hidden w-[50px] h-[50px] relative">
            <Image
              alt="Trainer's Profile Image"
              fill
              style={{ objectFit: "cover" }}
              src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
            />
          </div>
          <h4>John Doe's Portfolio</h4>
        </div>
      </div>
      <div className="flex flex-wrap py-[14px] gap-[20px] px-0 mt-10">
        {portfolioImages.map(image => (
          <div className="bg-white hover:shadow-md cursor-pointer p-3 w-[465px] h-auto rounded-lg">
            <div className="w-full h-[300px] overflow-hidden relative mr-[14px]">
              <Image
                alt={image.alt}
                fill
                style={{ objectFit: "cover" }}
                src={image.imagePath}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}